import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import Footer from "../components/Footer";
import { getSession } from "next-auth/client";
export default function Home({products}) {
  return (
    <div className="bg-gradient-to-r  from-pink-500 to-yellow-500  hover:from-green-400 hover:to-blue-500 ...">
      <Head>
        <title>Amazon </title>
      </Head>
    
<Header />

<main  className="mx-auto" style={{ maxWidth: '1920px' }}>
  {/* Banner */}
  <Banner />
  {/* Production build */}
  <ProductFeed products={products} />
</main>
     <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
const session = await getSession(context);

  const products = await fetch('https://fakestoreapi.com/products').then(response => response.json())

  return { props: {
    products,
    session
  },
 };
}