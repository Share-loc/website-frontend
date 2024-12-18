import {
  FormControl,
} from "@mui/material";

interface Category {
  id: string;
  name: string;
}
interface SearchCategorieProps {
  categorieSearch: string;
  handleSelectChangeCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  categories: Category[];
}

const SearchCategorie = ({
  categorieSearch,
  handleSelectChangeCategory,
  categories,
}: SearchCategorieProps) => {
  return (
    <div className="flex flex-col my-5">
      <p className="text-xs mb-1">Catégorie</p>
      <FormControl fullWidth>
        <select
          value={categorieSearch}
          onChange={handleSelectChangeCategory}
          className="rounded-md p-1 text-sm bg-white border-[#BABABA]">
          <option value="">Sélectionner une catégorie</option>
          {categories &&
            categories.map((category: Category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
      </FormControl>
    </div>
  );
};

export default SearchCategorie;
