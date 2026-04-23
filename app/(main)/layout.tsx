
import Navbar from "@/components/navbar";
import type { ReactNode } from "react";

interface Props {
    children : ReactNode
}
export default function Layout({children}:Props){
    return(
        <>
            <Navbar/>
            <div className="mx-auto w-5xl my-10">
                {children}
            </div>
        </>
    )
}