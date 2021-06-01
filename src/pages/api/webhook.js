import { buffer } from 'micro'
import * as admin from 'firebase-admin'


// Secure a connection to firebase from backend
const serviceAccount = require('../../../permissions.json')
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app();

//Estavlish connection to stripe

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET

const fullfillOrder = async (session) => {
    console.log('Fullfilling Order!!!')

    return app
        .firestore()
        .collection('users')
        .doc(session.metadata.email)
        .collection('orders')
        .doc(session.id)
        .set({
            amount: session.amount_total / 100, 
            amount_shipping: session.total_details_amount_shipping / 100,
            images: JSON.parse(session.metadata.images),
            title: JSON.parse(session.metadata.titles),
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            console.log(`SUCCESS: Order ${session.id} has been added to Database!`)
        })
}

export default async (req, res) => {
    if(req.method === 'POST'){
        const requestBuffer = await buffer(req)
        const payload = requestBuffer.toString()
        const sig = req.headers["stripe-signature"]

        let event;

        // Verify (came from stripe)
        try{
            event = await stripe.webhooks.constructEvent(payload, sig, endpointSecret)
        }catch(err){
            console.log('ERROR', err.message)
            return res.status(400).send( `Webhook error:  ${err.message}`)
        }
        if(event.type === "checkout.session.completed"){
            const session = event.data.object

            // Fullfill the order
            return fullfillOrder(session).then(() => res.status(200)).catch(err=> res.status(400).send(`Webhook error:  + ${err.message}`))
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}
