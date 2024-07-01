import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaEye, FaTrash } from "react-icons/fa6";
import { getToken } from "../../const/func";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const AdminCategoriesPage = () => {

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '1px solid #000',
    boxShadow: 24,
    borderRadius: '10px',
    p: 4,
  };

  interface Category {
    id: number;
    name: string;
  }

    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryName, setCategoryName] = useState('');
    const [editCategory, setEditCategory] = useState<Category | null>(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/categories`)
            .then((response) => response.json())
            .then((response) => setCategories(response))
            .catch((error) => console.error('Erreur lors de la récupération des catégories : ', error));
    }, []);

    const handleDelete = (id: number) => {
      const isConfirmed = confirm('Voulez-vous vraiment supprimer cette catégorie ?');
      if (!isConfirmed) {
          return;
      }

        fetch(`${import.meta.env.VITE_API_URL}/categories/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    console.error('Erreur lors de la suppression de la catégorie : ', response.status);
                } else{
                    setCategories(categories.filter((category) => category.id !== id));
                }
                return response;
            })
            .catch((error) => console.error('Erreur lors de la suppression de la catégorie : ', error));
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const url = `${import.meta.env.VITE_API_URL}/categories${editCategory ? `/${editCategory.id}` : ''}`
        const method = editCategory ? 'PATCH' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`,
            },
            body: JSON.stringify({ name: categoryName }),
        });

        if (!response.ok) {
            console.error('Erreur lors de la soumission de la catégorie : ', response.status);
        } else {
            const updatedOrNewCategory = await response.json();
            if(editCategory){
              setCategories(categories.map((category) => category.id === updatedOrNewCategory.id ? updatedOrNewCategory : category));
            }
            else{
              setCategories([...categories, updatedOrNewCategory]);
            }
            handleClose();
            setEditCategory(null);
            setCategoryName('');
        }
    }

    const openCreatePopup = () => {
        setEditCategory(null);
        setCategoryName('');
        handleOpen();
    }

    const openEditPopup = (category: Category) => {
        setEditCategory(category);
        setCategoryName(category.name);
        handleOpen();
    }

    const [infoModalOpen, setInfoModalOpen] = useState(false);
    const handleInfoModalOpen = () => setInfoModalOpen(true);
    const handleInfoModalClose = () => setInfoModalOpen(false);

    const openInfoModal = (category: Category) => {
        setEditCategory(category);
        handleInfoModalOpen();
    }

  return (
    <>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p className="text-2xl font-semibold text-gray-900 mb-4">{editCategory ? 'Modifier la catégorie': 'Ajouter une catégorie' }</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Nom
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Nom de la catégorie"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                { editCategory ? 'Modifier' : 'Ajouter' }
              </button>
            </div>
          </form>
        </Box>
      </Modal>

      <Modal
        open={infoModalOpen}
        onClose={handleInfoModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p className="text-2xl font-semibold text-gray-900 mb-4">Informations de la catégorie</p>
          <p className="text-lg font-semibold text-gray-900 mb-4">Nom: {editCategory?.name}</p>
        </Box>
      </Modal>

      <p className="text-2xl font-semibold text-gray-900 mb-4">Catérories</p>
      <button className="bg-blue hover:bg-blue text-white font-bold py-2 px-4 rounded mb-4" onClick={openCreatePopup}>
        Ajouter une catégorie
      </button>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Libelle
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
        {categories.map((category) => (
            <tr className="hover:bg-white border-b " key={category.id}>
                <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap"
                >
                {category.id}
                </th>
                <td className="px-6 py-4">{category.name}</td>
                <td className="px-6 py-4">
                    <button className="bg-gray hover:bg-gray-dark font-bold py-3 px-3 me-2 rounded-lg" onClick={() => openInfoModal(category)}>
                        <FaEye />
                    </button>
                    <button className="bg-blue hover:bg-blue-dark text-white font-bold py-3 px-3 me-2 rounded-lg" onClick={() => openEditPopup(category)}>
                        <FaPen />
                    </button>
                    <button className="bg-red-500 hover:bg-red-800 duration-200 text-white font-bold py-3 px-3 rounded-lg" onClick={() => handleDelete(category.id)} >
                        <FaTrash />
                    </button>
                </td>
            </tr>
        ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminCategoriesPage;
