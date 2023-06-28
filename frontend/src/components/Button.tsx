
interface ButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  onClick?: () => void;
}

export function Button({ label, type="button", isLoading=false, onClick, ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-sm shadow-lg ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={onClick}
      {...rest}
      disabled={isLoading}
    >
      {isLoading ? "Carregando..." : label}
    </button>
  );
}