import React from 'react';

const SearchBar = ({ handleCitySearchChange }) => {
    return (
        <div className="flex flex-col my-5">
            <p className="text-xs mb-1 font-bold">Recherche</p>
            <input
              type="text"
              className="rounded-xl p-1 text-sm bg-white border-2 border-[#BABABA]"
              onChange={handleCitySearchChange}
            />
          </div>
    );
};

export default SearchBar;