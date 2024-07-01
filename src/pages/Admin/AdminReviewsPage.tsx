import { useEffect, useState } from "react";
import { getToken } from "../../const/func";
import { FaEye, FaTrash } from "react-icons/fa6";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const AdminReviewsPage = () => {

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

    const [reviews, setReviews] = useState<Review[]>([]);

    interface Review {
        id: number;
        reviewer: {
            id: number;
            username: string;
            avatar: string | null;
        };
        reviewed: {
            id: number;
            username: string;
            avatar: string | null;
        };
        rate: number;
        content: string;
        created_at: string;
        reservation: any[]; // Ajustez selon la structure réelle de vos données de réservation
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/reviews`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }
        )
            .then((response) => response.json())
            .then((response) => setReviews(response))
            .catch((error) => console.error('Erreur lors de la récupération des évaluations : ', error));
    }, []);

    const renderStars = (rate?: number) => {
        if(rate === undefined){
            return <span className="text-gray-500">Aucune note</span>;
        }
        const stars = [];
        for (let i = 0; i < rate; i++) {
            stars.push(<span key={i} className="text-yellow-500">★</span>);
        }
        return stars;
    }

    const handleDelete = (id: number) => {
        const confirm = window.confirm('Voulez-vous vraiment supprimer cette évaluation ?');
        if (!confirm) {
            return;
        }

        fetch(`${import.meta.env.VITE_API_URL}/reviews/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`,
                }
            }
        ).then((response) => response.json())
        .then((response) => {
            if (response.error) {
                console.error('Erreur lors de la suppression de l\'évaluation : ', response.error);
            } else {
                setReviews(reviews.filter((review) => review.id !== id));
            }
        })
        .catch((error) => console.error('Erreur lors de la suppression de l\'évaluation : ', error));
    }

    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const [infoModalState, setInfoModal] = useState(false);
    
    const handleInfoModalClose = () => {
        setInfoModal(false);
        setSelectedReview(null);
    }

    const openInfoModal = (review: Review) => {
        setSelectedReview(review);
        setInfoModal(true);
    }

    return (
        <>
            <Modal
                open={infoModalState}
                onClose={handleInfoModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <p className="text-2xl font-semibold text-gray-900 mb-4">Informations de l'évaluation</p>
                <p className="text-lg text-gray-900 mb-4">ID: {selectedReview?.id}</p>
                <p className="text-lg text-gray-900 mb-4">Evalué: {selectedReview?.reviewed.username} (id: {selectedReview?.reviewed.id})</p>
                <p className="text-lg text-gray-900 mb-4">Evaluateur: {selectedReview?.reviewer.username} (id: {selectedReview?.reviewer.id})</p>
                <p className="text-lg text-gray-900 mb-4">Note: {renderStars(selectedReview?.rate)}</p>
                <p className="text-lg text-gray-900 mb-4">Contenu: {selectedReview?.content}</p>
                <p className="text-lg text-gray-900 mb-4">Date de création: {selectedReview?.created_at ? new Date(selectedReview.created_at).toLocaleDateString('fr-FR') : 'Date non disponible'}
                </p>

                </Box>
            </Modal>

            <p className="text-2xl font-semibold text-gray-900 mb-4">Evaluations</p>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                        Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                        Evalué
                        </th>
                        <th scope="col" className="px-6 py-3">
                        Evaluateur
                        </th>
                        <th scope="col" className="px-6 py-3">
                        Note
                        </th>
                        <th scope="col" className="px-6 py-3">
                        Date de création
                        </th>
                        <th scope="col" className="px-6 py-3">
                        Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                {reviews.map((review) => (
                    <tr className="hover:bg-white border-b " key={review.id}>
                        <th
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap"
                        >
                        {review.id}
                        </th>
                        <td className="px-6 py-4">{review.reviewed.username}</td>
                        <td className="px-6 py-4">{review.reviewer.username}</td>
                        <td className="px-6 py-4">{renderStars(review.rate)}</td>
                        <td className="px-6 py-4">{new Date(review.created_at).toLocaleDateString('fr-FR')}</td>
                        <td className="px-6 py-4">
                            <button className="bg-gray hover:bg-gray-dark font-bold py-3 px-3 me-2 rounded-lg" onClick={() => openInfoModal(review)}>
                                <FaEye />
                            </button>
                            <button className="bg-red-500 hover:bg-red-800 duration-200 text-white font-bold py-3 px-3 rounded-lg" onClick={() => handleDelete(review.id)} >
                                <FaTrash />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

export default AdminReviewsPage;