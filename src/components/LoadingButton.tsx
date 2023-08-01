import { ReactNode } from "react";

type Props = {
  type?: "button" | "submit" | "reset";
  className?: string;
  isLoading?: boolean;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

function LoadingButton({
  type,
  className,
  isLoading,
  children,
  onClick,
  disabled,
}: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${className} ${
        isLoading ? "opacity-60 pointer-events-none flex justify-center" : ""
      } ${
        disabled
          ? "bg-gray-500 !text-gray-300 opacity-80 cursor-not-allowed"
          : ""
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
