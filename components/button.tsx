export const Button = ({children, className, type="button", ...props}: React.ComponentProps<"button">) => {

    return(
        <button {...props} className={`text-white bg-ink hover:bg-ink/80 cursor-pointer p-2 ${className}`} type={type}>
            {children}
        </button>
    )
}