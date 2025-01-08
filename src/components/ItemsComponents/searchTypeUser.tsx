interface SearchTypeUserProps {
  selectedType: string;
  handleTypeItem: (event: SelectChangeEvent) => void;  // Mise à jour ici
}
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

const SearchTypeUser = ({selectedType, handleTypeItem}: SearchTypeUserProps) => {
  return (
      <div className="flex flex-col mt-8 mb-5">
          <div className="gap-2 flex flex-col">
            <FormControl fullWidth>
                <InputLabel id="type-select-label">Type de vendeur</InputLabel>
                <Select
                  labelId="type-select-label"
                  id="type-select"
                  value={selectedType}
                  label="Type de vendeur"
                  onChange={handleTypeItem}
                  sx={{
                    color: '#767676',
                    '& .MuiSelect-select': {
                      padding: '8px', // Gestion du padding à l'intérieur du select
                      fontSize: '13px' // Taille du texte dans le select lui-même
                    }
                  }}
                >
                <MenuItem value="all">Tous</MenuItem>
                <MenuItem value="1">Professionnel</MenuItem>
                <MenuItem value="0">Particulier</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
  )
}

export default SearchTypeUser;