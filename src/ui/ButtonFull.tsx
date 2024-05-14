type ButtonFullProps = {
  onClick: () => void;
  text: string;
};

function ButtonFull({ onClick, text }: ButtonFullProps) {
  return (
    <button
      className="border-primary-orange whitespace-nowrap rounded-lg bg-primary-orange text-white p-3 border w-max us:w-[100%] font-outfit font-bold text-sm"
      onClick={onClick}
    >
      <div>{text}</div>
    </button>
  );
}

export default ButtonFull;
