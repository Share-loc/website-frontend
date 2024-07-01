import React from 'react';

const SearchCategorie = ({ categorieSearch, handleSelectChangeCat, categories }) => {
    return (
        <div className="flex flex-col my-5">
            <p className="text-xs mb-1 font-bold">Catégorie</p>
                <select className="rounded-xl p-1 text-sm bg-white border-2 border-[#BABABA]" value={categorieSearch} onChange={handleSelectChangeCat}>
                <option value="0">Sélectionnez une catégorie</option>
              {Object.keys(categories).length === 0 ? (
                    <option disabled>Vous n'avez pas encore d'annonces.</option>
              ) : (
                Object.keys(categories).map((key) => {
                  const categorieOption = categories[key];
                  return (
                    <option value={categorieOption.id} key={categorieOption.id}>
                      {categorieOption.name}
                    </option>
                  );
                })
              )}
            </select>
          </div>
    );
};

export default SearchCategorie;