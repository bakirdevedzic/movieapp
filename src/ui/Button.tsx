type ButtonProps = {
  onClick: () => void;
  text: string;
};

function Button({ onClick, text }: ButtonProps) {
  return (
    <button
      className="border-primary-orange rounded-lg text-primary-orange p-3 border w-[100px] hover:bg-primary-orange hover:text-white hover:border-primary-orange font-outfit font-bold text-sm"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
