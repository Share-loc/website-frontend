import React, { useEffect, useState } from "react";
import AllCardsItems from "../components/ItemsComponents/allCardsItems";
import FilterItems from "../components/ItemsComponents/filterItems";
import SortItems from "../components/ItemsComponents/sortItems";
import { useSearchParams } from "react-router-dom";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const ItemsPage = () => {
  const [items, setItems] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchValid, setIsSearchValid] = useState(false);
  const [isResetFilter, setIsResetFilter] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [numberItems, setNumberItems] = useState(0);

  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [selectedOrder, setSelectedOrder] = useState(
    searchParams.get("orderBy") || "recentItems"
  );
  const [selectedType, setSelectedType] = useState(
    searchParams.get("type") || "all"
  );
  const [titleSearch, setTitleSearch] = useState(
    searchParams.get("title") || ""
  );
  const [villeRecherche, setVilleRecherche] = useState(
    searchParams.get("location") || ""
  );
  const [categorieSearch, setCategorieSearch] = useState(
    searchParams.get("category") || ""
  );
  const [priceMin, setPriceMin] = useState(searchParams.get("priceMin") || "");
  const [priceMax, setPriceMax] = useState(searchParams.get("priceMax") || "");

  const [tempTitleSearch, setTempTitleSearch] = useState(titleSearch);
  const [tempCategorieSearch, setTempCategorieSearch] = useState(categorieSearch);
  const [tempPriceMin, setTempPriceMin] = useState(priceMin);
  const [tempPriceMax, setTempPriceMax] = useState(priceMax);
  const [tempVilleRecherche, setTempVilleRecherche] = useState(villeRecherche);
  const [tempSelectedType, setTempSelectedType] = useState(selectedType);

  const updateSearchParams = () => {
    const params: any = {
      title: titleSearch,
      category: categorieSearch,
      location: villeRecherche,
      priceMin,
      priceMax,
      type: selectedType,
      page,
    };

    // Supprime les paramètres vides pour garder une URL propre
    Object.keys(params).forEach((key) => {
      if (!params[key]) {
        delete params[key];
      }
    });

    setSearchParams(params);
  };

  const handleTitleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setTempTitleSearch(value);
  };

  const handlePriceMinimumChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setTempPriceMin(value);
  };

  const handlePriceMaximumChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setTempPriceMax(value);
  };

  const handleTypeItem = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setTempSelectedType(value);
  };

  const handleCitySearchChangeMap = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setVilleRecherche(value);
    if (value.length > 2) {
      try {
        const response = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${value}&type=municipality&autocomplete=1`
        );
        const data = await response.json();
        const filteredSuggestions = data.features
          .filter((feature: any) => feature.properties.score >= 0.5) // Filtrer les résultats par score
          .map((feature: any) => ({
            label: `${feature.properties.city} (${feature.properties.postcode})`,
            city: feature.properties.city,
            postcode: feature.properties.postcode,
          }));
        filteredSuggestions;
        setSuggestions(filteredSuggestions);
      } catch (error) {
        console.error("Erreur lors de la récupération des suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestionMap = (suggestion: {
    label: string;
    city: string;
    postcode: string;
  }) => {
    setTempVilleRecherche(`${suggestion.city} (${suggestion.postcode})`);
    setSuggestions([]);
  };

  const handleSelectChangeOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOrder(e.target.value);
  };

  const handleSelectChangeCategory = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setTempCategorieSearch(value);
  };

  const fetchCategory = async () => {
    try {
      setError(null);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/categories`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setError("Erreur lors de la récupération des catégories. Veuillez réessayer plus tard.");
    }
  };

  const fetchApiData = async (currentPage = page) => {
    try {
      setError(null);
      setLoading(true);
      const params = new URLSearchParams({
        title_like: titleSearch,
        category: categorieSearch,
        priceMin: priceMin,
        priceMax: priceMax,
        type: selectedType,
        location_like: villeRecherche,
        orderBy: selectedOrder,
      });

      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/items/filterItems?${params.toString()}&page=${currentPage}&limit=9`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setTotalPages(Math.ceil(data.totalItems / 9));
      setNumberItems(data.totalItems);
      setItems(data.items);
    } catch (error) {
      setError("Une erreur s'est produite lors de la récupération des données. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async () => {
    setTitleSearch(tempTitleSearch);
    setCategorieSearch(tempCategorieSearch);
    setPriceMin(tempPriceMin);
    setPriceMax(tempPriceMax);
    setVilleRecherche(tempVilleRecherche);
    setSelectedType(tempSelectedType);
    setPage(1);
    setIsSearchValid(true);
    fetchApiData();
  };

  const resetInfo = async () => {
    setTitleSearch("");
    setCategorieSearch("");
    setPriceMin("");
    setPriceMax("");
    setVilleRecherche("");
    setSelectedType("all");
    setSelectedOrder("recentItems");
    setTempTitleSearch("");
    setTempCategorieSearch("");
    setTempPriceMin("");
    setTempPriceMax("");
    setTempVilleRecherche("");
    setTempSelectedType("all");
    setPage(1);
    setIsResetFilter(true);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    fetchCategory()
  }, []);

  useEffect(() => {
    updateSearchParams();
  }, [
    titleSearch,
    categorieSearch,
    villeRecherche,
    priceMin,
    priceMax,
    selectedType,
    selectedOrder,
    page,
  ]);

  useEffect(() => {
    fetchApiData();
  }, [page]);

  useEffect(() => {
    fetchApiData();
    isResetFilter ? setIsResetFilter(false) : null
    isSearchValid ? setIsSearchValid(false) : null
    }, [selectedOrder, isSearchValid, isResetFilter]);


  return (
    <div className="w-full flex gap-5">
      <FilterItems
        handleTitleSearchChange={handleTitleSearchChange}
        categorieSearch={tempCategorieSearch}
        handleSelectChangeCategory={handleSelectChangeCategory}
        categories={categories}
        handleCitySearchChangeMap={handleCitySearchChangeMap}
        suggestions={suggestions}
        selectSuggestionMap={selectSuggestionMap}
        handlePriceMinimumChange={handlePriceMinimumChange}
        handlePriceMaximumChange={handlePriceMaximumChange}
        selectedType={tempSelectedType}
        handleTypeItem={handleTypeItem}
        applyFilters={applyFilters}
        villeRecherche={tempVilleRecherche}
        resetInfo={resetInfo}
        titleSearch={tempTitleSearch}
        priceMin={tempPriceMin}
        priceMax={tempPriceMax}
        isDisplayed={false}
      />
      <div className="xl:w-[75%] lg:w-[100%] md:w-[100%] sm:w-[100%] xs:w-[100%]">
        <SortItems
          selectedOrder={selectedOrder}
          handleSelectChangeOrder={handleSelectChangeOrder}
          handleTitleSearchChange={handleTitleSearchChange}
          categorieSearch={tempCategorieSearch}
          handleSelectChangeCategory={handleSelectChangeCategory}
          categories={categories}
          handleCitySearchChangeMap={handleCitySearchChangeMap}
          suggestions={suggestions}
          selectSuggestionMap={selectSuggestionMap}
          handlePriceMinimumChange={handlePriceMinimumChange}
          handlePriceMaximumChange={handlePriceMaximumChange}
          selectedType={tempSelectedType}
          handleTypeItem={handleTypeItem}
          fetchApiData={fetchApiData}
          villeRecherche={tempVilleRecherche}
          resetInfo={resetInfo}
          numberItems={numberItems}
        />
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <AllCardsItems items={items} />
        )}
        <div className="flex justify-evenly items-center mt-10">
          <button
            className="text-2xl"
            onClick={handlePreviousPage}
            disabled={page === 1}>
            <FaArrowLeft />
          </button>
          <span className="text-lg">
            {page} sur {totalPages}
          </span>
          <button
            className="text-2xl"
            onClick={handleNextPage}
            disabled={page === totalPages}>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemsPage;
