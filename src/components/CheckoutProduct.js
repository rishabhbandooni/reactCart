import { StarIcon } from "@heroicons/react/solid"
import Image from "next/image";
import Currency from 'react-currency-formatter';
import { addToBasket, removeFromBasket } from "../slices/basketSlice";
import { useDispatch } from "react-redux";

function CheckoutProduct( {
    id,
    title,
    price,
    rating,
    description,
    category,
    image,
    hasPrime,
   
   
}){
const dispatch = useDispatch();

const addItemToBasket = ()=>{
    const product = {id, title, price,rating, description,category, image ,hasPrime};
dispatch(addToBasket(product));
}
const removeItemFromBasket =() =>{
    dispatch(removeFromBasket({id}));
}
    return (
        <div className='grid grid-cols-5  transition duration-500 ease-in-out  transform hover:-translate-y-1 hover:scale-110 ...'> 
        <Image src={image} height ={200} width={200} objectFit="contain" />
      
         <div className="col-span-3 mx-5">
             <p>{title}</p>
    <div className="flex">
          {Array(rating)
          .fill()
          .map((_,i )=> (
<StarIcon key={i} className="h-5 text-yellow-500" />
         ))}
        </div>
        <p className="text-xs mt-2 mb-2 line-clamp-3">{description}</p>
     
             <Currency quantity={price * 73} currency ="INR" /> 

              {hasPrime && (
                  <div className="flex items-center space-x-2">
                    <img 
                    loading="lazy"
                    img className="w-12"
                    src="https://links.papareact.com/fdw" alt=""  /> 
                     <p className="text-xs text-gray-500">Free Next-day delivery</p>
                  </div>
              )}     
        </div>
        <div className="flex flex-col space-y-2 my-auto justify-self-end">
  <button onClick={addItemToBasket} className="mt-auto button">Add to Basket</button>

  <button onClick={removeItemFromBasket} className="mt-auto button">Remove from Basket</button>
  </div>
        </div>
    );
}

export default CheckoutProduct
