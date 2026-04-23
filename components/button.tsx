type ButtonVariant = "primary" | "outline" | "ghost"

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
    primary:
        "text-white bg-ink hover:bg-ink/80 disabled:bg-muted disabled:cursor-not-allowed",
    outline:
        "text-ink bg-transparent border border-ink hover:bg-ink/5 disabled:text-muted disabled:border-hair disabled:cursor-not-allowed",
    ghost:
        "text-muted bg-transparent hover:text-ink hover:underline underline-offset-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline",
}

interface ButtonProps extends React.ComponentProps<"button"> {
    variant?: ButtonVariant
}

export const Button = ({
    children,
    className,
    type = "button",
    variant = "primary",
    ...props
}: ButtonProps) => {
    return (
        <button
            {...props}
            className={`${VARIANT_CLASSES[variant]} cursor-pointer p-2 transition-colors ${className ?? ""}`}
            type={type}
        >
            {children}
        </button>
    )
}
