import Image from "next/image";
import { 
    MenuIcon, 
    SearchIcon, 
    ShoppingCartIcon
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import {selectItems} from "../slices/basketSlice"
function Header() {
    const [ session, loading ] = useSession();
    const router = useRouter();
    const items = useSelector(selectItems);
    return (
        <header>
           
            <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
            {/* sm:flex-grow-0 means it wont grow if screen goes small or larger for mobile responsive */}
         <Image 
         src="https://links.papareact.com/f90" 
         width={150}
         height={40}
         objectFit="contain"
         className="cursor-pointer"
         onClick={() => router.push('/')}
         />
        </div>
<div className="hidden relative items-center flex-grow cursor-pointer rounded-md h-10 bg-yellow-400 sm:flex hover:bg-yellow-500">
    <input placeholder="Search Products... (Live Search)" className="p-2 px-5 h-full width-6 flex-grow rounded flex-shrink rounded-l-md focus:outline-none"  type ="text"  />
    <SearchIcon className="h-12 p-4"/>
    </div>
    {/* right navbar */}
    
    <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
   <div onClick={!session ? signIn : signOut} className="link">
                     <p className="hover:underline font-bold"> {session ? `Hello, ${session.user.name}` : 'Hello,Sign In'}</p>
                        <p className="font-extrabold md:text-sm">Account & Lists</p>
                    </div>
                    
                    
    <div className="link"><p >Returns</p>
    <p className="font-extrabold md:text-sm" >& Orders</p>
    </div>

    <div className="link relative flex items-center"  onClick={() => router.push('/checkout')}>
    <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded text-black font-bold">{items.length}</span>
        <ShoppingCartIcon className="h-10"   />
    <p className="font-extrabold md:text-sm hidden md:inline mt-2 ">Basket</p>
    {/* md means medium screen when we reach md the basket is visible else it is hidden */}
    </div>
</div>

        </div>
        {/* Bottom nav */}
        <div className="flex space-x-3 p-2 pl-6 items-center bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center"> 
                    <MenuIcon className="h-6 mr-1"/>
                    All
                </p>
                <p className="link">Prime Video</p>
                <p className="link">Amazon Business</p>
                <p className="link">Today's deals</p>
                <p className="link hidden lg:inline-flex">Electronics</p>
                <p className="link hidden lg:inline-flex">Food & Grocery</p>
                <p className="link hidden lg:inline-flex">Electronics</p>
                <p className="link hidden lg:inline-flex">Prime</p>
                <p className="link hidden lg:inline-flex">Buy again</p>
                <p className="link hidden lg:inline-flex">Shopping Toolkit</p>
                <p className="link hidden lg:inline-flex">Mens & Womens</p>   
        </div>
        </header>
    )
}

export default Header

