import React, { useEffect, useState } from "react";
import AllCardsItems from "../components/ItemsComponents/allCardsItems";
import FilterItems from "../components/ItemsComponents/filterItems";
import SortItems from "../components/ItemsComponents/sortItems";

const ItemsPage = () => {
  const [items, setItems] = useState<any>([]);
  const [selectedOption, setSelectedOption] = useState("recentItems");
  const [selectedType, setSelectedType] = useState("all");
  const [categories, setCategories] = useState<any>([]);
  const [titleSearch, setTitleSearch] = useState("");

  const [villeRecherche, setVilleRecherche] = useState("");
  const [categorieSearch, setCategorieSearch] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [suggestions, setSuggestions] = useState([]);

    const [selectedCity, setSelectedCity] = useState("");
    
  const handleTitleSearchChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setTitleSearch(value);
  };

  const handlePriceMinimumChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setPriceMin(value);
    console.log(value);
  };

  const handlePriceMaximumChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setPriceMax(value);
    console.log(value);
  };

  const handleTypeItem = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedType(value);
    console.log(value);
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

  const selectSuggestion = (suggestion: {
    label: string;
    city: string;
    postcode: string;
  }) => {
    setVilleRecherche(`${suggestion.city} (${suggestion.postcode})`);
    setSuggestions([]);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleSelectChangeCat = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setCategorieSearch(value);
  };
    
  const fetchApiData = async () => {
      try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/items/filterItems?title_like=${titleSearch}&category=${categorieSearch}&priceMin=${priceMin}&priceMax=${priceMax}&type=${selectedType}&location_like=${villeRecherche}&orderBy=${selectedOption}`,
        {
          method: "GET",
        }
      );
          console.log(response);
      const data = await response.json();
      data; // Traiter les données reçues
      setItems(data);
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
    }
  };
    
    const resetInfo = () => {
        setTitleSearch("");
        setCategorieSearch("");
        setPriceMin("");
        setPriceMax("");
        setVilleRecherche("");
        fetchApiData();
    };
    

  const fetchCategory = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/categories`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      data;
      setCategories(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };

    useEffect(() => {
        resetInfo();
    fetchCategory();
    fetchApiData();
  }, [selectedOption, selectedCity]);

  return (
    <div className="w-full flex gap-5">
      <FilterItems
        handleTitleSearchChange={handleTitleSearchChange}
        categorieSearch={categorieSearch}
        handleSelectChangeCat={handleSelectChangeCat}
        categories={categories}
        handleCitySearchChangeMap={handleCitySearchChangeMap}
        suggestions={suggestions}
        selectSuggestion={selectSuggestion}
        handlePriceMinimumChange={handlePriceMinimumChange}
        handlePriceMaximumChange={handlePriceMaximumChange}
        selectedType={selectedType}
        handleTypeItem={handleTypeItem}
        fetchApiData={fetchApiData}
        selectedCity={selectedCity}
        villeRecherche={villeRecherche}
        resetInfo={resetInfo}
        isDisplayed={false}
      />
      <div className="xl:w-[75%] lg:w-[75%] md:w-[75%] sm:w-[100%] xs:w-[100%]">
        <SortItems
          items={items}
          selectedOption={selectedOption}
          handleSelectChange={handleSelectChange}
          handleTitleSearchChange={handleTitleSearchChange}
          categorieSearch={categorieSearch}
          handleSelectChangeCat={handleSelectChangeCat}
          categories={categories}
          handleCitySearchChangeMap={handleCitySearchChangeMap}
          suggestions={suggestions}
          selectSuggestion={selectSuggestion}
          handlePriceMinimumChange={handlePriceMinimumChange}
          handlePriceMaximumChange={handlePriceMaximumChange}
          selectedType={selectedType}
          handleTypeItem={handleTypeItem}
          fetchApiData={fetchApiData}
          selectedCity={selectedCity}
          villeRecherche={villeRecherche}
          resetInfo={resetInfo}
        />
        <AllCardsItems items={items} />
      </div>
    </div>
  );
};

export default ItemsPage;
