import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaEye, FaTrash } from "react-icons/fa6";
import { getToken } from "../../const/func";

const AdminCategoriesPage = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/categories`)
            .then((response) => response.json())
            .then((response) => setCategories(response))
            .catch((error) => console.error('Erreur lors de la récupération des catégories : ', error));
    }, []);

    const handleDelete = (id) => {
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

  return (
    <>
      <p className="text-2xl font-semibold text-gray-900 mb-4">Catérories</p>
      <button className="bg-blue hover:bg-blue text-white font-bold py-2 px-4 rounded mb-4">
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
                    <button className="bg-gray hover:bg-gray-dark font-bold py-3 px-3 me-2 rounded-lg">
                        <FaEye />
                    </button>
                    <button className="bg-blue hover:bg-blue-dark text-white font-bold py-3 px-3 me-2 rounded-lg">
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
