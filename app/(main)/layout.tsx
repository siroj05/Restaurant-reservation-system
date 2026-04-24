
import Navbar from "@/components/navbar";
import type { ReactNode } from "react";

interface Props {
    children : ReactNode
}
export default function Layout({children}:Props){
    return(
        <>
            <Navbar/>
            <div className="mx-auto my-10 w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </>
    )
}