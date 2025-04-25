import SearchBar from "./searchBar";
import SearchCategorie from "./searchCategorie";
import SearchPrice from "./searchPrice";
import SearchTypeUser from "./searchTypeUser";
import SearchMap from "./searchMap";

const FilterItems = ({
  categories,
  handleTitleSearchChange,
  categorieSearch,
  handleSelectChangeCategory,
  handleCitySearchChangeMap,
  suggestions,
  selectSuggestionMap,
  handlePriceMinimumChange,
  handlePriceMaximumChange,
  selectedType,
  handleTypeItem,
  applyFilters,
  villeRecherche,
  titleSearch,
  priceMin,
  priceMax,
  resetInfo,
  isDisplayed,
}: any) => {
  return (
    <div
      className={`${
        isDisplayed ? "block w-full shadow-xl" : "hidden"
      } xl:block rounded-xl bg-gray-100 w-[25%] h-full`}>
      <div className="py-7 px-5">
        <p className="text-center text-md font-bold">Filtrer les résultats</p>
        <SearchBar
          handleTitleSearchChange={handleTitleSearchChange}
          titleSearch={titleSearch}
        />
        <SearchCategorie
          categorieSearch={categorieSearch}
          handleSelectChangeCategory={handleSelectChangeCategory}
          categories={categories}
        />
        <SearchMap
          villeRecherche={villeRecherche}
          handleCitySearchChangeMap={handleCitySearchChangeMap}
          suggestions={suggestions}
          selectSuggestionMap={selectSuggestionMap}
        />
        <SearchPrice
          handlePriceMinimumChange={handlePriceMinimumChange}
          handlePriceMaximumChange={handlePriceMaximumChange}
          priceMin={priceMin}
          priceMax={priceMax}
        />
        <SearchTypeUser
          selectedType={selectedType}
          handleTypeItem={handleTypeItem}
        />
        <div className="flex flex-col-reverse gap-2">
          <button
            className="border border-[#8e8e8e] text-sm text-[#8e8e8e] rounded-md p-1 w-[100%] duration-100 hover:bg-gray hover:text-blue hover:duration-100"
            onClick={resetInfo}>
            Effacer les filtres
          </button>
          <button
            className="border border-transparent bg-primary text-white text-sm rounded-md p-1 w-[100%] duration-100 hover:bg-transparent hover:border hover:border-primary hover:text-primary hover:duration-100"
            onClick={applyFilters}>
            Lancer la recherche
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterItems;
