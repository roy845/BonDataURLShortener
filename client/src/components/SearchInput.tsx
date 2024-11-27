type SearchInputProps = {
  searchKeyword: string;
  setSearchKeyword: (value: React.SetStateAction<string>) => void;
};

const SearchInput = ({ searchKeyword, setSearchKeyword }: SearchInputProps) => {
  return (
    <input
      type="text"
      placeholder="Search by short code"
      value={searchKeyword}
      onChange={(e) => {
        setSearchKeyword(e.target.value);
      }}
      className="border border-gray-300 rounded px-4 py-2 w-1/2"
    />
  );
};

export default SearchInput;
