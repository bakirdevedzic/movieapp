type TabProps = {
  onClick: () => void;
  text: string;
  active: boolean;
};

function Tab({ onClick, text, active }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`border-primary-black text-primary-black p-3 border w-[100px] hover:bg-primary-orange hover:text-white hover:border-primary-orange font-outfit font-bold text-sm ${
        active ? "bg-primary-orange text-white border-primary-orange" : ""
      } ${
        text === "Movies"
          ? "rounded-l-lg border-r-0"
          : "rounded-r-lg border-l-0"
      }`}
    >
      {text}
    </button>
  );
}

export default Tab;
