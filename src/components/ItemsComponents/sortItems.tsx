import { useState } from "react";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import FilterItems from "./filterItems";

const SortItems = ({
  categories,
  selectedOrder,
  handleSelectChangeOrder,
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
  fetchApiData,
  villeRecherche,
  resetInfo,
  numberItems,
}: any) => {
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [clickCount, setClickCount] = useState(0);

  const handleTogglePopper = (event: any) => {
    setAnchorEl(event.currentTarget);
    setIsPopperOpen((prev) => !prev);
    setClickCount((prevCount) => prevCount + 1);
  };

  const buttonColor = clickCount % 2 === 0 ? "primary" : "secondary";
  const buttonStyle = {
    backgroundColor: buttonColor === "primary" ? "#22AFAF" : "#FEA634",
    color: "white",
    padding: "5px 10px",
    lineHeight: "1.25rem",
  };

  return (
    <div className="md:bg-gray-100 w-[100%] md:p-2 rounded-xl flex justify-between flex-col mb-5 md:mb-5 md:flex-row md:items-center">
      <p className="text-black text-sm xl:w-[50%] sm:w-[50%] mb-3 md:mb-0 xl:mb-0">
        Nombre de résultat : {numberItems}
      </p>
      <div className="flex items-center gap-2 xl:w-[50%] sm:w-[100%] justify-between">
        <p className="text-black text-s xl:w-[50%] sm:w-[100%] text-end hidden xl:block">
          Trier par :
        </p>

        <PopupState variant="popper" popupId="demo-popup-popper">
          {(popupState) => (
            <div className="flex gap-2 items-center w-[50%] xl:hidden">
              <Button
                variant="contained"
                {...bindToggle(popupState)}
                className="w-full text-xs"
                onClick={handleTogglePopper}
                style={buttonStyle}>
                {isPopperOpen ? "Fermer les filtres" : "Ouvrir les filtres"}
              </Button>

              <Popper open={isPopperOpen} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                      <FilterItems
                        categories={categories}
                        handleTitleSearchChange={handleTitleSearchChange}
                        categorieSearch={categorieSearch}
                        handleSelectChangeCategory={handleSelectChangeCategory}
                        handleCitySearchChangeMap={handleCitySearchChangeMap}
                        suggestions={suggestions}
                        selectSuggestionMap={selectSuggestionMap}
                        handlePriceMinimumChange={handlePriceMinimumChange}
                        handlePriceMaximumChange={handlePriceMaximumChange}
                        selectedType={selectedType}
                        handleTypeItem={handleTypeItem}
                        fetchApiData={fetchApiData}
                        villeRecherche={villeRecherche}
                        resetInfo={resetInfo}
                        isDisplayed={true}
                      />
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </div>
          )}
        </PopupState>

        <div className="flex gap-2 items-center w-[50%]">
          <select
            className="rounded-md text-sm bg-white border border-[#BABABA] w-[100%] py-[5px] px-[10px]"
            value={selectedOrder} // Lier la valeur sélectionnée à l'état
            onChange={handleSelectChangeOrder} // Mettre à jour l'état lors du changement de sélection
          >
            <option value="recentItems">les plus récents</option>
            <option value="ancienItems">les plus anciens</option>
            <option value="priceAsc">prix croissant</option>
            <option value="priceDesc">prix decroissant</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SortItems;
