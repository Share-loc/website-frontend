interface SearchMapProps {
    villeRecherche: string;
    handleCitySearchChangeMap: (event: React.ChangeEvent<HTMLInputElement>) => void;
    suggestions: any;
    selectSuggestionMap: (suggestion: any) => void;
    searchRadius: string;
    handleRadiusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    isValidCity: boolean;
    isCheckingCity: boolean;
}

const SearchMap = ({ villeRecherche, handleCitySearchChangeMap, suggestions, selectSuggestionMap, searchRadius,
    handleRadiusChange,
    isValidCity,
    isCheckingCity}: SearchMapProps) => {
    return (
        <div className="flex flex-col my-5">
            <p className="text-xs mb-1">Localisation</p>
            <div className="relative">
                <input
                    type="text"
                    value={villeRecherche}
                    onChange={handleCitySearchChangeMap}
                    className={`rounded-md p-1 text-sm bg-white border w-full ${
                        (villeRecherche.length >=1 && !isValidCity) ? "border-red-500" : "border-[#BABABA]"
                    }`}
                    placeholder="Ex: Paris 75011"
                />
                
                {/* Indicateurs visuels */}
                {isCheckingCity && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <svg className="animate-spin h-4 w-4 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                    </div>
                )}

                {isValidCity && !isCheckingCity && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
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
                                className="p-2 hover:bg-gray-100 cursor-pointer text-sm">
                                {suggestion.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Messages d'aide */}
            {villeRecherche.length >= 3 && suggestions.length > 0 && !isValidCity && !isCheckingCity && (
                <p className="text-xs text-orange-500 mt-1">
                    Veuillez sélectionner une ville dans la liste
                </p>
            )}

            {villeRecherche.length >= 3 && suggestions.length === 0 && !isValidCity && !isCheckingCity && (
                <p className="text-xs text-red-500 mt-1">
                    Aucune ville trouvée. Vérifiez l'orthographe.
                </p>
            )}

            {/* Message d'erreur si le champ est rempli mais pas valide */}
            {villeRecherche.length >= 3 && !isValidCity && !isCheckingCity && suggestions.length === 0 && (
                <p className="text-xs text-red-500 mt-1">
                    Format attendu : Ville CodePostal (ex: Paris 75011)
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
    )
}

export default SearchMap;