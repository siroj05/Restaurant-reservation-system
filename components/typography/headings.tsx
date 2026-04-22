interface Props {
  children: React.ReactNode;
  className?: string;
}

export function Display({ children, className }: Props) {
  return (
    <h1 className={`text-5xl font-bold ${className ?? ""}`}>
      {children}
    </h1>
  );
}

export function H1({ children, className }: Props) {
  return (
    <h1 className={`text-4xl font-bold ${className ?? ""}`}>
      {children}
    </h1>
  );
}

export function H2({ children, className }: Props) {
  return (
    <h2 className={`text-3xl font-semibold ${className ?? ""}`}>
      {children}
    </h2>
  );
}

export function H3({ children, className }: Props) {
  return (
    <h3 className={`text-xl font-semibold ${className ?? ""}`}>
      {children}
    </h3>
  );
}

export function H4({ children, className }: Props) {
  return (
    <h4 className={`text-lg font-semibold ${className ?? ""}`}>
      {children}
    </h4>
  );
}