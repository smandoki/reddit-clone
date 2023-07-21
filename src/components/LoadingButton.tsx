import { ReactNode } from "react";

type Props = {
  type?: "button" | "submit" | "reset";
  className?: string;
  isLoading?: boolean;
  children?: ReactNode;
  onClick?: () => void;
};

function LoadingButton({
  type,
  className,
  isLoading,
  children,
  onClick,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} ${
        isLoading ? "opacity-60 pointer-events-none flex justify-center" : ""
      }`}
    >
      {isLoading ? (
        <div className="animate-spin border-4 rounded-full h-5 w-5 border-gray-300 border-t-white"></div>
      ) : (
        children
      )}
    </button>
  );
}

export default LoadingButton;
