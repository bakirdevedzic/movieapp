import { FiSearch } from "react-icons/fi";

type SearchProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

function Search({ onChange, value }: SearchProps) {
  return (
    <div className="bg-gray-100 flex flex-row h-[50px] w-[100%] py-2 px-3 rounded-md font-outfit items-center border-gray-300 border gap-2 ">
      <div className="text-gray-500 text-lg">
        <FiSearch />
      </div>

      <input
        type="text"
        onChange={onChange}
        value={value}
        placeholder="Search..."
        className="bg-gray-100 w-[100%] h-[100%] outline-none font-outfit font-normal text-gray-800 "
      />
    </div>
  );
}

export default Search;
