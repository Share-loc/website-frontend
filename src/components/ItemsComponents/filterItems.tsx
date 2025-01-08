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
      } xl:block rounded-xl bg-white w-[25%] h-full`}>
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
            className="border border-[#BABABA] text-sm text-[#BABABA] rounded-md p-1 w-[100%] duration-100 hover:bg-gray hover:text-blue hover:duration-100"
            onClick={resetInfo}>
            Effacer les filtres
          </button>
          <button
            className="border border-transparent bg-[#FEB24D] text-white text-sm rounded-md p-1 w-[100%] duration-100 hover:bg-transparent hover:border hover:border-[#FEB24D] hover:text-[#FEB24D] hover:duration-100"
            onClick={applyFilters}>
            Lancer la recherche
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterItems;
