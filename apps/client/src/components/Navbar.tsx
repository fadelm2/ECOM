import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { Bell, Home, ShoppingCart } from "lucide-react";
import ShoppingCartIcon from "./ShoppingCartIcon";


const Navbar = () => {
    return (
        <nav className="w-full flex items-center justify-between border-b border-gray-200 border-gray-200 pb-4">
            {/* LEFT */}
            <Link href="/" className="flex items-center" >
                <Image
                    src="/logo.png"
                    alt="TrendFadel"
                    width={36}
                    height={36}
                    className="w-6 h-6 md:w-9 md:h-9"
                />
                <p className="hidden md:block text-md font-medium tracking-wider">
                    TRENDFADEL.
                </p>
            </Link>
            {/* RIGHT */}
            <SearchBar />
            <Link href="/" >
                <Home className="w-4 h-4 text-gray-600"></Home>
            </Link>

            <Bell className="w-4 h-4 text-gray-600"/>
            <ShoppingCartIcon/>

            <Link href="/login">Sign in</Link>

        </nav>
    )
}

export default Navbar;