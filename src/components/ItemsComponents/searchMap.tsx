interface SearchMapProps {
    selectedCity: string;
    villeRecherche: string;
    handleCitySearchChangeMap: (event: React.ChangeEvent<HTMLInputElement>) => void;
    suggestions: any;
    selectSuggestion: (suggestion: any) => void;
}

const SearchMap = ({ selectedCity, villeRecherche, handleCitySearchChangeMap, suggestions, selectSuggestion}: SearchMapProps) => {
    return (
        <div className="flex flex-col my-5">
            <p className="text-xs mb-1">Localisation</p>
            <input
              type="text"
              value={villeRecherche}
              onChange={handleCitySearchChangeMap}
              className="rounded-md p-1 text-sm bg-white border-[#BABABA]"
            />
            {suggestions.length > 0 && (
              <ul className="z-10 max-h-60 overflow-auto bg-white border border-gray-200 rounded-md mt-1 w-full">
                {suggestions.map((suggestion: any, index: number) => (
                  <li
                    key={index}
                    value={selectedCity}
                    onClick={() => selectSuggestion(suggestion)}
                    className="p-2 hover:bg-gray-100 cursor-pointer">
                    {suggestion.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
    )
}

export default SearchMap;