import CardItems from "./cardItems";

interface AllCardsItemsProps {
  items: any;
  filter: boolean;
}

const AllCardsItems = ({ items, filter }: AllCardsItemsProps) => {   
  const gridClass = filter
    ? "xl:grid-cols-3"
    : "xl:grid-cols-4";
  
  return (
    <div className={`grid grid-cols-2 lg:grid-cols-3 ${gridClass} 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-5 w-full`}>
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
