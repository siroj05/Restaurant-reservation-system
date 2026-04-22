interface Props {
  children: React.ReactNode;
  className?: string;
}

export function Body({ children, className }: Props) {
  return (
    <p className={`text-base ${className ?? ""}`}>
      {children}
    </p>
  );
}

export function BodySm({ children, className }: Props) {
  return (
    <p className={`text-sm text-muted ${className ?? ""}`}>
      {children}
    </p>
  );
}