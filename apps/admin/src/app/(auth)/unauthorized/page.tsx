"use client"

import { useAuth } from "@clerk/nextjs";


const Page = () => {
    const { signOut} = useAuth();

    return(
        <div className="">
            <h1> You Do no have An acces!</h1>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    )
}

export default Page;