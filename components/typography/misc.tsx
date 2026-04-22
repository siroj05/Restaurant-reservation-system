interface Props {
  children: React.ReactNode;
  className?: string;
}

export function Caption({ children, className }: Props) {
  return (
    <span className={`text-xs leading-normal ${className ?? ""}`}>
      {children}
    </span>
  );
}
