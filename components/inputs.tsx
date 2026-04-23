export function Input({
    type,
    disabled = false,
    className = "",
    ...props
}: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            disabled={disabled}
            {...props}
            className={`bg-surface border-muted border-1 p-2 p-1 ${className}`}
        />
    )
}

export function InputDate({
    disabled = false,
    className = "",
    ...props
}: React.ComponentProps<"input">) {
    return (
        <input
            type="date"
            disabled={disabled}
            {...props}
            className={`bg-surface border-muted border-1 p-2 p-1 ${className}`}
        />
    )
}

export function InputTime({
    disabled = false,
    className = "",
    ...props
}: React.ComponentProps<"input">) {
    return (
        <input
            type="time"
            disabled={disabled}
            {...props}
            className={`bg-surface border-muted border-1 p-2 p-1 ${className}`}
        />
    )
}