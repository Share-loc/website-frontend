interface SearchBarProps {
    handleTitleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    titleSearch: string;
}

const SearchBar = ({ handleTitleSearchChange, titleSearch }: SearchBarProps) => {
    return (
        <div className="flex flex-col my-5">
            <p className="text-xs mb-1 font-bold">Recherche</p>
            <input
          type="text"
          value={titleSearch}
              className="rounded-xl p-1 text-sm bg-white border-2 border-[#BABABA]"
              onChange={handleTitleSearchChange}
            />
          </div>
    );
};

export default SearchBar;