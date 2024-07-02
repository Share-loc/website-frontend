interface SearchTypeUserProps {
    selectedType: string;
    handleTypeItem: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SearchTypeUser = ({selectedType, handleTypeItem}: SearchTypeUserProps) => {
    return (
        <div className="flex flex-col my-5">
            <p className="text-xs mb-2 font-bold">Type de vendeur</p>
            <div className="gap-2 flex flex-col">
              <select
                className="rounded-md p-1 text-sm bg-white border border-[#BABABA] w-[100%]"
                value={selectedType} // Lier la valeur sélectionnée à l'état
                onChange={handleTypeItem} // Mettre à jour l'état lors du changement de sélection
              >
                <option value="all">Tous</option>
                <option value="1">Professionnel</option>
                <option value="0">Particulier</option>
              </select>
            </div>
          </div>
    )
}

export default SearchTypeUser;