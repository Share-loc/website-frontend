interface SearchMapProps {
    villeRecherche: string;
    handleCitySearchChangeMap: (event: React.ChangeEvent<HTMLInputElement>) => void;
    suggestions: any;
    selectSuggestionMap: (suggestion: any) => void;
    searchRadius: string;
    handleRadiusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    isValidCity: boolean;
}

const SearchMap = ({
  villeRecherche,
  handleCitySearchChangeMap,
  suggestions,
  selectSuggestionMap,
  searchRadius,
  handleRadiusChange,
  isValidCity
}: SearchMapProps) => {
  

  // Fonction pour déterminer la couleur de la bordure
  const getBorderColor = () => {
    if (isValidCity) return "border-[#BABABA]"; // Normal quand valide
    if (villeRecherche.length >= 3 && !isValidCity) return "border-red-500"; // Rouge si texte mais pas valide
    return "border-[#BABABA]"; // Normal par défaut
  };

  return (
    <div className="flex flex-col my-5">
      <p className="text-xs mb-1">Localisation</p>
      <div className="relative">
        <input
          type="text"
          value={villeRecherche}
          onChange={handleCitySearchChangeMap}
          className={`rounded-md p-1 text-sm bg-white border w-full ${getBorderColor()}`}
          placeholder="Ex: Paris 75011"
        />

        {/* Icône de validation */}
        {isValidCity && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <svg
              className="h-4 w-4 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
        )}

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <ul className="absolute z-10 max-h-60 overflow-auto bg-white border border-gray-200 rounded-md mt-1 w-full">
            {suggestions.map((suggestion: any, index: number) => (
              <li
                key={index}
                value={suggestion.label}
                onClick={() => selectSuggestionMap(suggestion)}
                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {suggestion.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Messages d'aide */}
      {villeRecherche.length >= 3 &&
        !isValidCity &&
        suggestions.length === 0 && (
          <p className="text-xs text-red-500 mt-1">
            Aucune ville trouvée. Format attendu : Ville CodePostal (ex: Paris
            75011)
          </p>
        )}

      {villeRecherche.length >= 3 && !isValidCity && suggestions.length > 0 && (
        <p className="text-xs text-orange-500 mt-1">
          Veuillez sélectionner une ville dans la liste
        </p>
      )}

      {/* Champ rayon - affiché seulement si ville valide */}
      {isValidCity && (
        <div className="mt-3">
          <p className="text-xs mb-1">Rayon de recherche</p>
          <select
            value={searchRadius}
            onChange={handleRadiusChange}
            className="rounded-md p-1 text-sm bg-white border-[#BABABA] w-full"
          >
            <option value="">Aucun rayon</option>
            <option value="5">5 km</option>
            <option value="10">10 km</option>
            <option value="25">25 km</option>
            <option value="50">50 km</option>
            <option value="100">100 km</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default SearchMap;