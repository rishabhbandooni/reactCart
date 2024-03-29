import Image from "next/image";
import {useState} from "react";
import {StarIcon} from "@heroicons/react/solid"
import Currency from 'react-currency-formatter';
import { addToBasket } from "../slices/basketSlice";
import { useDispatch } from "react-redux";
function Product({id,title,price,description,category,image}) {
    const dispatch = useDispatch()
    const MAX_RATING = 5
    const MIN_RATING = 1
    const [rating] =useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    );
    const [hasPrime] = useState(Math.random() < 0.5 );
    const addItemToBasket = () => {
        const product = {id, title, price,rating, description,category, image ,hasPrime};
        //sending the product as an action to the REDUX STORE ..the basket slice
        dispatch(addToBasket(product));
      
    };
    return (
       <div className="relative flex flex-col m-5  border-2 border-yellow-500  bg-white text-black z-30 p-10 transition duration-500 ease-in-out  transform hover:-translate-y-1 hover:scale-110  ...  " >
           <p className="absolute top-2 right-2 text-xs italic text-gray-400">{category}</p>
           <Image src={image}
            width={200}
            height={200}
            objectFit="contain"/>

            <h4 className="my-3">{title}</h4>
            <div className="flex">
            {Array(rating).fill().map((_, index) => (
                            <StarIcon key={index} className="h-5 text-yellow-500" />
                        ))}
            </div>
            <p className="text-xs my-2 line-clamp-2  ">{description}</p>
                  
      <div className="mb-5">
     <Currency quantity={price *73} currency="INR"  />
                    </div>
                    {hasPrime && (
                        <div className="flex items-center space-x-2 -mt-5">
                            <img className="w-12" src ="https://links.papareact.com/fdw" alt="" />
                            <p className="text-xs text-gray-500">FREE Next-Day Delivery</p>
                            </div>
                    )}
                    <button onClick={addItemToBasket} className="mt-auto button">Add To Basket</button>
       </div>
    )
}

export default Product
