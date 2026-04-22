
import Navbar from "@/components/navbar";
import type { ReactNode } from "react";

interface Props {
    children : ReactNode
}
export default function Layout({children}:Props){
    return(
        <>
            <Navbar/>
            <div>
                {children}
            </div>
        </>
    )
}