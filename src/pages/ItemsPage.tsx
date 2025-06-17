import React, { useEffect, useState } from "react";
import AllCardsItems from "../components/ItemsComponents/allCardsItems";
import FilterItems from "../components/ItemsComponents/filterItems";
import SortItems from "../components/ItemsComponents/sortItems";
import { useSearchParams } from "react-router-dom";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { CircularProgress } from "@mui/material";
import apiClient from "@/service/api/apiClient";
import SEO from "@/components/SEO/SEO";

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


  //Variable temporaire pour les champs de recherche
  const [tempTitleSearch, setTempTitleSearch] = useState(titleSearch);
  const [tempCategorieSearch, setTempCategorieSearch] = useState(categorieSearch);
  const [tempPriceMin, setTempPriceMin] = useState(priceMin);
  const [tempPriceMax, setTempPriceMax] = useState(priceMax);
  const [tempVilleRecherche, setTempVilleRecherche] = useState(villeRecherche);
  const [tempSelectedType, setTempSelectedType] = useState(selectedType);

  const [searchRadius, setSearchRadius] = useState(searchParams.get("radius") || "")
  const [tempSearchRadius, setTempSearchRadius] = useState(searchRadius);
  const [isValidCity, setIsValidCity] = useState(false);
  const [cityCoordinates, setCityCoordinates] = useState<
    [number, number] | null
  >(() => {
    const lat = searchParams.get("latitude");
    const lng = searchParams.get("longitude");
    if (lat && lng) {
      return [parseFloat(lng), parseFloat(lat)];
    }
    return null;
  });

  useEffect(() => {
    if (villeRecherche && cityCoordinates) {
      setIsValidCity(true);
    }
  }, [villeRecherche, cityCoordinates]);

  // Fonction pour mettre à jour les paramètres de recherche Url
  const updateSearchParams = () => {
    const params: any = {
      title: titleSearch,
      category: categorieSearch,
      location: villeRecherche,
      radius: searchRadius,
      priceMin,
      priceMax,
      type: selectedType,
      page,
    };

    // Ajouter les coordonnées si une ville valide est sélectionnée
    if (villeRecherche && isValidCity && cityCoordinates) {
      params.latitude = cityCoordinates[1].toString();
      params.longitude = cityCoordinates[0].toString();
    }

    // Supprime les paramètres vides pour garder une URL propre
    Object.keys(params).forEach((key) => {
      if (!params[key]) {
        delete params[key];
      }
    });

    setSearchParams(params);
  };

  const handleTitleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTempTitleSearch(value);
  };

  const handlePriceMinimumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTempPriceMin(value);
  };

  const handlePriceMaximumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTempPriceMax(value);
  };

  const handleTypeItem = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setTempSelectedType(value);
  };

  // Fonction pour la recherche de ville avec l'API de l'état
  const handleCitySearchChangeMap = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setTempVilleRecherche(value);
    setIsValidCity(false);
    setCityCoordinates(null);
    setTempSearchRadius("");
    if (value.length > 2) {
      try {
        const response = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${value}&type=municipality&autocomplete=1`
        );
        const data = await response.json();
        const filteredSuggestions = data.features
          .filter((feature: any) => feature.properties.score >= 0.5) // Filtrer les résultats par score
          .map((feature: any) => ({
            label: `${feature.properties.city} ${feature.properties.postcode}`,
            city: feature.properties.city,
            postcode: feature.properties.postcode,
            coordinates: feature.geometry.coordinates,
          }));

        setSuggestions(filteredSuggestions);

        // Vérifier si on a une seule suggestion qui correspond parfaitement au texte saisi
        if (filteredSuggestions.length === 1 && filteredSuggestions[0].label == value) {
          setIsValidCity(true);
          setCityCoordinates(filteredSuggestions[0].coordinates);
          setSuggestions([]);
        }

      } catch (error) {
        console.error("Erreur lors de la récupération des suggestions de ville :", error);
        setError(
          "Erreur lors de la récupération des suggestions de ville. Veuillez réessayer plus tard."
        );
      }
    } else {
      setSuggestions([]);
    }
  };

  // Fonction pour sélectionner une suggestion de ville
  const selectSuggestionMap = (suggestion: {
    label: string;
    city: string;
    postcode: string;
    coordinates: [number, number];
  }) => {
    setTempVilleRecherche(suggestion.label);
    setCityCoordinates(suggestion.coordinates);
    setIsValidCity(true);
    setSuggestions([]);
  };

   // Fonction pour gérer le changement de rayon
  const handleRadiusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setTempSearchRadius(value);
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

  // Fonction pour récupérer les catégories
  const fetchCategory = async () => {
    try {
      setError(null);
      const response = await apiClient.get("/categories");
      setCategories(response.data);
    } catch (error) {
      setError(
        "Erreur lors de la récupération des catégories. Veuillez réessayer plus tard."
      );
    }
  };

  // Fonction pour récupérer les données recherchées
  const fetchApiData = async (currentPage = page) => {
    try {
      setError(null);
      setLoading(true);
      // Création des paramètres de recherche
      const params: any = {
        title_like: titleSearch,
        category: categorieSearch,
        priceMin: priceMin,
        priceMax: priceMax,
        type: selectedType,
        orderBy: selectedOrder,
        page: currentPage,
        limit: 9,
      };

      if (villeRecherche && isValidCity && cityCoordinates && searchRadius) {
        params.latitude = cityCoordinates[1];
        params.longitude = cityCoordinates[0];
        params.radius = searchRadius;
      } else if (villeRecherche) {
        // Recherche textuelle classique
        params.location_like = villeRecherche;
      }

      const response = await apiClient.get("/items/filterItems", { params });

      if (response.status === 401) {
        setLoading(false);
        return;
      }

      const data = response.data;
      setTotalPages(Math.ceil(data.totalItems / 9));
      setNumberItems(data.totalItems);
      setItems(data.items);
    } catch (error) {
      setError(
        "Une erreur s'est produite lors de la récupération des données. Veuillez réessayer plus tard."
      );
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour appliquer les filtres de recherche
  const applyFilters = async () => {
     // Validation de la ville si un rayon est sélectionné
    if (tempSearchRadius && !isValidCity) {
      setError("Veuillez sélectionner une ville valide pour utiliser la recherche par rayon.");
      return;
    }

    setTitleSearch(tempTitleSearch);
    setCategorieSearch(tempCategorieSearch);
    setPriceMin(tempPriceMin);
    setPriceMax(tempPriceMax);
    setVilleRecherche(tempVilleRecherche);
    setSearchRadius(tempSearchRadius);
    setSelectedType(tempSelectedType);
    setSuggestions([]);
    setPage(1);
    setIsSearchValid(true);
  };

  // Fonction pour réinitialiser les filtres
   const resetInfo = async () => {
    setTitleSearch("");
    setCategorieSearch("");
    setPriceMin("");
    setPriceMax("");
    setVilleRecherche("");
    setSearchRadius("");
    setSelectedType("all");
    setSelectedOrder("recentItems");
    setTempTitleSearch("");
    setTempCategorieSearch("");
    setTempPriceMin("");
    setTempPriceMax("");
    setTempVilleRecherche("");
    setTempSearchRadius("");
    setTempSelectedType("all");
    setIsValidCity(false);
    setCityCoordinates(null);
    setSuggestions([]);
    setPage(1);
    setIsResetFilter(true);
  };

  // Fonction pour passer à la page suivante
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  // Fonction pour passer à la page précédente
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Effet pour récupérer les données lors du chargement de la page
  useEffect(() => {
    fetchCategory();
  }, []);

  // Mettre à jour les paramètres de recherche lors de la recherche
  useEffect(() => {
    updateSearchParams();
  }, [
    titleSearch,
    categorieSearch,
    villeRecherche,
    searchRadius,
    priceMin,
    priceMax,
    selectedType,
    selectedOrder,
    page,
  ]);

  // Mettre à jour les données lors du changement de page
  useEffect(() => {
    if (!isResetFilter || !isSearchValid) {
      fetchApiData();
    }
  }, [page, selectedOrder]);

  // Mettre à jour les données lors de la recherche
  useEffect(() => {
    if (isResetFilter || isSearchValid) {
      fetchApiData();
    }
    isResetFilter ? setIsResetFilter(false) : null;
    isSearchValid ? setIsSearchValid(false) : null;
  }, [isSearchValid, isResetFilter]);

  return (
    <>
      <SEO 
        title="Annonces"
        description="Découvrez toutes les annonces de location sur ShareLoc"
        keywords="annonces, location, biens, ShareLoc"
        canonicalUrl="/annonces"
      />
      <div className="flex gap-5 w-full">
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
          searchRadius={tempSearchRadius}
          handleRadiusChange={handleRadiusChange}
          isValidCity={isValidCity}
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
              <div className="flex justify-center items-center h-full">
                <CircularProgress color="inherit"/>
              </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <AllCardsItems
              filter={true}
              items={items}
            />
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
    </>
  );
};

export default ItemsPage;
