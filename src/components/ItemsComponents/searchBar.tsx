interface SearchBarProps {
    handleTitleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    titleSearch: string;
}

const SearchBar = ({ handleTitleSearchChange, titleSearch }: SearchBarProps) => {
    return (
        <div className="flex flex-col my-5">
            <p className="text-xs mb-1">Recherche</p>
            <input
          type="text"
          value={titleSearch}
              className="rounded-md p-1 text-sm bg-white border-[#BABABA]"
              onChange={handleTitleSearchChange}
            />
          </div>
    );
};

export default SearchBar;