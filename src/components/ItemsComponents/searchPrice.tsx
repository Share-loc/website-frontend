interface SearchPriceProps {
  handlePriceMinimumChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handlePriceMaximumChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  priceMin: string;
  priceMax: string;
}

const SearchPrice = ({
  handlePriceMinimumChange,
  handlePriceMaximumChange,
  priceMin,
  priceMax,
}: SearchPriceProps) => {
  return (
    <div className="flex flex-col my-5">
      <p className="text-xs mb-1">Prix</p>
      <div className="flex justify-between gap-2 w-full">
        <div className="relative w-[50%]">
          <input
            type="text"
            placeholder="Minimum"
            value={priceMin}
            className="rounded-md w-[100%] p-1 text-sm bg-white border-[#BABABA] pl-2 pr-6"
            onChange={handlePriceMinimumChange}
          />
          <span className="absolute inset-y-0 right-1 flex items-center text-sm text-[#BABABA] p-1">
            €
          </span>
        </div>
        <div className="relative w-[50%]">
          <input
            type="text"
            placeholder="Maximum"
            value={priceMax}
            className="rounded-md w-[100%] p-1 text-sm bg-white border-[#BABABA] pl-2 pr-6"
            onChange={handlePriceMaximumChange}
          />
          <span className="absolute inset-y-0 right-1 flex items-center text-sm text-[#BABABA] p-1">
            €
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchPrice;
