import React from "react";
import CardItems from "./cardItems";

const AllCardsItems = ({ items }) => {
  return (
    <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-5 w-full">
      {Object.keys(items).length === 0 ? (
        <p>Vous n'avez pas encore d'annonces.</p>
      ) : (
        Object.keys(items).map((key) => {
          const item = items[key];
          return <CardItems item={item} key={item.id} />;
        })
      )}
    </div>
  );
};

export default AllCardsItems;
