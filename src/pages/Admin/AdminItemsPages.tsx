import { useEffect, useState } from "react";
import { getToken } from "../../const/func";
import { FaCheck, FaEye, FaTrash } from "react-icons/fa6";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const AdminItemsPage = () => {

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

    const [items, setItems] = useState<Item[]>([]);

    interface Item {
        id: number,
        user: {
            id: number,
            username: string,
            is_verified: boolean,
            email: string,
        },
        category: {
            name: string,
        },
        title: string,
        body: string,
        status: string,
        price: number,
        location: string,
        show_phone: boolean,
        item_pictures: {
            id: number,
            path: string,
            fullPath: string,
        }[],
        publicPhoneNumber: string,
        activeItemPictures: {
            id: number,
            path: string,
            fullPath: string,
        }[],
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/items/admin/all`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`,
                }
            }
        )
            .then((response) => response.json())
            .then((response) => setItems(response))
            .catch((error) => console.error('Erreur lors de la récupération des annonces : ', error));
    });

    const [infoModalState, setInfoModalState] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    const openInfoModal = (item: Item) => {
        setSelectedItem(item);
        setInfoModalState(true);
    }

    const handleCloseInfoModal = () => {
        setInfoModalState(false);
    }

    const handleItemValidation = (item: Item) => {
        const isConfirmed = confirm('Voulez-vous vraiment approuver cette annonce ?');
        if (!isConfirmed) {
            return;
        }

        fetch(`${import.meta.env.VITE_API_URL}/items/${item.id}/validate`, {
            method: 'PUT',
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`,
                },
        })
            .then((response) => {
                if (!response.ok) {
                    console.error('Erreur lors de l\'approbation de l\'annonce : ', response.status);
                } else{
                    setItems(items.map(i => {
                        if (i.id === item.id) {
                          // Supposons que vous ayez un champ `isValidated` pour indiquer si le report est validé
                          return { ...i, status: 'approved' };
                        }
                        return i;
                      }));
                }
                return response;
            })
            .catch((error) => console.error('Erreur lors de l\'approbation de l\'annonce : ', error));
        
    }

    const handleDelete = (item: Item) => {
        const isConfirmed = confirm('Voulez-vous vraiment supprimer cette annonce ?');
        if (!isConfirmed) {
            return;
        }

        fetch(`${import.meta.env.VITE_API_URL}/items/${item.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    console.error('Erreur lors de la suppression de l\'annonce : ', response.status);
                } else{
                    setItems(items.filter((i) => i.id !== item.id));
                }
                return response;
            })
            .catch((error) => console.error('Erreur lors de la suppression de l\'annonce : ', error));
    }

    return (
        <>
            <Modal
                open={infoModalState}
                onClose={handleCloseInfoModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <p className="text-2xl font-semibold text-gray-900 mb-4">Informations de l'annonce</p>
                <p className="text-lg text-gray-900 mb-4">ID: {selectedItem?.id}</p>
                <p className="text-lg text-gray-900 mb-4">Titre: {selectedItem?.title}</p>
                <p className="text-lg text-gray-900 mb-4">Catégorie: {selectedItem?.category.name}</p>
                <p className="text-lg text-gray-900 mb-4">Utilisateur: {selectedItem?.user.email}</p>
                <p className="text-lg text-gray-900 mb-4">Description: {selectedItem?.body}</p>
                <p className="text-lg text-gray-900 mb-4">Prix: {selectedItem?.price}</p>
                <p className="text-lg text-gray-900 mb-4">Localisation: {selectedItem?.location}</p>
                <p className="text-lg text-gray-900 mb-4">Téléphone: {selectedItem?.show_phone ? selectedItem?.publicPhoneNumber : 'Non affiché'}</p>
                <p className="text-lg text-gray-900 mb-4">Photos:</p>
                {selectedItem?.activeItemPictures.map((picture) => (
                    <img key={picture.id} src={import.meta.env.VITE_DOMAIN + '/' + picture.fullPath} alt="item picture" className="w-1/4" />
                ))}
                </Box>
            </Modal>
            <p className="text-2xl font-semibold text-gray-900 mb-4">Annonces</p>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                    Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Catégorie
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Utilisateur
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <tr className="hover:bg-white border-b " key={item.id}>
                        <th
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap"
                        >
                        {item.id}
                        </th>
                        <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded ${item.status === "waiting_for_approval" ? ' bg-orange-200' : ''} ${item.status === "approved" ? ' bg-green-400' : ''} `}>
                                {item.status === "waiting_for_approval" ? 'En attente' : 'Approuvé'}
                            </span>
                        </td>
                        <td className="px-6 py-4">{item.category.name}</td>
                        <td className="px-6 py-4">{item.user.email}</td>
                        <td className="px-6 py-4">
                            <button className="bg-gray hover:bg-gray-dark font-bold py-3 px-3 me-2 rounded-lg" onClick={() => openInfoModal(item)}>
                                <FaEye />
                            </button>
                            {
                                item.status === "waiting_for_approval" && (
                                    <button className="bg-green-400 hover:bg-green-600 font-bold py-3 px-3 me-2 rounded-lg" onClick={() => handleItemValidation(item)}>
                                        <FaCheck />
                                    </button>
                                )
                            }
                            <button className="bg-red-500 hover:bg-red-800 duration-200 text-white font-bold py-3 px-3 rounded-lg" onClick={() => handleDelete(item)} >
                                <FaTrash />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default AdminItemsPage;