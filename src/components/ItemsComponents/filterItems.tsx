import React from "react";
import SearchBar from "./searchBar";
import SearchCategorie from "./searchCategorie";
import SearchPrice from "./searchPrice";
import SearchTypeUser from "./searchTypeUser";
import SearchMap from "./searchMap";

const FilterItems = ({
    handleTitleSearchChange,
    categorieSearch,
    handleSelectChangeCat,
    categories,
    handleCitySearchChangeMap,
      suggestions,
      selectSuggestion,
    handlePriceMinimumChange,
    handlePriceMaximumChange,
    selectedType,
    handleTypeItem,
    fetchApiData,
    selectedCity,
  villeRecherche,
  resetInfo
}) => {
  return (
    <div className="hidden md:block rounded-xl bg-white w-[25%] h-full">
      <div className="py-7 px-5">
        <p className="text-center text-md font-bold">Filtrer les résultats</p>
        <SearchBar handleCitySearchChange={handleTitleSearchChange} />
        <SearchCategorie
          categorieSearch={categorieSearch}
          handleSelectChangeCat={handleSelectChangeCat}
          categories={categories}
        />
        <SearchMap
          selectedCity={selectedCity}
          villeRecherche={villeRecherche}
          handleCitySearchChangeMap={handleCitySearchChangeMap}
          suggestions={suggestions}
          selectSuggestion={selectSuggestion}
        />
        <SearchPrice
          handlePriceMinimumChange={handlePriceMinimumChange}
          handlePriceMaximumChange={handlePriceMaximumChange}
        />
        <SearchTypeUser
          selectedType={selectedType}
          handleTypeItem={handleTypeItem}
        />
        <div className="flex justify-between gap-2">
          <button className="border border-[#BABABA] text-sm text-[#BABABA] rounded-md p-1 w-[50%] duration-100 hover:bg-gray hover:text-blue hover:duration-100" onClick={resetInfo}>
            Effacer les filtres
          </button>
          <button
            className="bg-blue text-white text-sm rounded-md p-1 w-[50%] duration-100 hover:bg-transparent hover:border hover:border-blue hover:text-blue hover:duration-100"
            onClick={fetchApiData}>
            Lancer la recherche
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterItems;
