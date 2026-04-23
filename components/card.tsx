import type { ReactNode } from "react"

export const Card = (
    {children}:{
        children : ReactNode
    }
) => <div className="w-[200px] h-[100px] bg-surface p-2 border-hair border flex flex-col justify-center items-center" >
    <div>
        {children}
    </div>
</div >