import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
interface SearchCategorieProps {
    categorieSearch: string;
    handleSelectChangeCat: (event: SelectChangeEvent) => void;
    categories: any;
}

const SearchCategorie = ({ categorieSearch, handleSelectChangeCat, categories }: SearchCategorieProps) => {
    return (
      <div className="flex flex-col mt-8 mb-5">
      <FormControl fullWidth>
        <InputLabel id="categorie-select-label">Catégorie</InputLabel>
        <Select
          labelId="categorie-select-label"
          id="categorie-select"
          value={categorieSearch || "0"}
          label="Catégorie"
          onChange={handleSelectChangeCat}
          sx={{
            color: '#767676',
            '& .MuiSelect-select': {
              padding: '8px', // Gestion du padding à l'intérieur du select
              fontSize: '13px' // Taille du texte dans le select lui-même
            }
          }}
        >
          <MenuItem value="0">Sélectionnez une catégorie</MenuItem> {/* Option par défaut */}
          {Object.keys(categories).length === 0 ? (
            <MenuItem disabled>Vous n'avez pas encore d'annonces.</MenuItem>
          ) : (
            Object.keys(categories).map((key) => {
              const categorieOption = categories[key];
              return (
                <MenuItem value={categorieOption.id} key={categorieOption.id}>
                  {categorieOption.name}
                </MenuItem>
              );
            })
          )}
        </Select>
      </FormControl>
    </div>
    );
};

export default SearchCategorie;