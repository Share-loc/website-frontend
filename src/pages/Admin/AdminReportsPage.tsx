import { useEffect, useState } from "react";
import { getToken } from "../../const/func";
import { FaCheck, FaEye, FaTrash } from "react-icons/fa6";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const AdminReportsPage = () => {

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

    const [reports , setReports] = useState<Report[]>([]);

    interface Report {
        id: number;
        reporter: {
            id: number;
            email: string;
            username: string;
        },
        reporter_message: string,
        created_at: string,
        status: string,
        message?: {
            id: number,
            content: string,
        },
        review?:{
            id: number,
            content: string,
        },
        item?: {
            id: number,
            title: string,
        },
        user?: {
            id: number,
            email: string,
            username: string,
        },
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/report`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            }
        )
            .then((response) => response.json())
            .then((response) => setReports(response))
            .catch((error) => console.error('Erreur lors de la récupération des signalements : ', error));
    }, []);

    const handleDelete = (id: number) => {

        const confirm = window.confirm('Voulez-vous vraiment supprimer ce signalement ?');
        if (!confirm) {
            return;
        }

        fetch(`${import.meta.env.VITE_API_URL}/report/delete/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`,
                }
            }
        )
            .then((response) => {
                if (!response.ok) {
                    console.error('Erreur lors de la suppression du signalement : ', response.status);
                } else {
                    setReports(reports.filter((report) => report.id !== id));
                }
                return response;
            })
            .catch((error) => console.error('Erreur lors de la suppression du signalement : ', error));
    }

    const handleReportValidation = (report: Report) => {
            
            const confirm = window.confirm('Voulez-vous vraiment valider ce signalement ?');
            if (!confirm) {
                return;
            }
    
            fetch(`${import.meta.env.VITE_API_URL}/report/validate/${report.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getToken()}`,
                    }
                }
            )
                .then((response) => {
                    if (!response.ok) {
                        console.error('Erreur lors de la validation du signalement : ', response.status);
                    } else {
                        setReports(reports.map((r) => {
                            if (r.id === report.id) {
                                r.status = 'reviewed';
                            }
                            return r;
                        }));
                    }
                    return response;
                })
                .catch((error) => console.error('Erreur lors de la validation du signalement : ', error));
        }

    const [infoModalState, setInfoModalState] = useState(false);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);

    const handleClose = () => {
        setInfoModalState(false);
        setSelectedReport(null);
    }

    const openInfoModal = (report: Report) => {
        setInfoModalState(true);
        setSelectedReport(report);
    }

    return (
        <>
            <Modal
                open={infoModalState}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <p className="text-2xl font-semibold text-gray-900 mb-4">Informations du signalement</p>
                <p className="text-lg text-gray-900 mb-4">ID: {selectedReport?.id}</p>
                <p className="text-lg text-gray-900 mb-4">Status: {selectedReport?.status === "waiting_to_be_reviewed" ? 'En attente' : 'Traité'}</p>
                <p className="text-lg text-gray-900 mb-4">Date de signalement: {selectedReport && new Date(selectedReport.created_at).toLocaleDateString('fr-FR')}</p>
                <p className="text-lg text-gray-900 mb-4">Signalé par: {selectedReport?.reporter.username} (id: {selectedReport?.reporter.id})</p>
                <p className="text-lg text-gray-900 mb-4">Message du signaleur: {selectedReport?.reporter_message}</p>
                {selectedReport?.user && (
                    <p className="text-lg text-gray-900 mb-4">Utilisateur signalé: {selectedReport.user.username} (id: {selectedReport.user.id})</p>
                )}
                {selectedReport?.item && (
                    <p className="text-lg text-gray-900 mb-4">Annonce signalée: {selectedReport.item.title} (id: {selectedReport.item.id})</p>
                )}
                {selectedReport?.review && (
                    <p className="text-lg text-gray-900 mb-4">Avis signalé: {selectedReport.review.content} (id: {selectedReport.review.id})</p>
                )}
                {selectedReport?.message && (
                    <p className="text-lg text-gray-900 mb-4">Message signalé: {selectedReport.message.content} (id: {selectedReport.message.id})</p>
                )}
                </Box>
            </Modal>

            <p className="text-2xl font-semibold text-gray-900 mb-4">Signalements</p>
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
                    Date de signalement
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Objet du signalement
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {reports.map((report) => (
                    <tr className="hover:bg-white border-b " key={report.id}>
                        <th
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap"
                        >
                        {report.id}
                        </th>
                        <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded ${report.status === "waiting_to_be_reviewed" ? ' bg-orange-200' : ''} ${report.status === "reviewed" ? ' bg-green-400' : ''} `}>
                                {report.status === "waiting_to_be_reviewed" ? 'En attente' : 'Traité'}
                            </span>
                        </td>
                        <td className="px-6 py-4">{new Date(report.created_at).toLocaleDateString('fr-FR')}</td>
                        <td className="px-6 py-4">
                            {report.item ? 'annonce' : report.user ? 'utilisateur' : report.review ? 'avis' : 'message'}
                        </td>
                        <td className="px-6 py-4">
                            <button className="bg-gray hover:bg-gray-dark font-bold py-3 px-3 me-2 rounded-lg" onClick={() => openInfoModal(report)}>
                                <FaEye />
                            </button>
                            { 
                                report.status === "waiting_to_be_reviewed" && (
                                    <button className="bg-green-400 hover:bg-green-600 font-bold py-3 px-3 me-2 rounded-lg" onClick={() => handleReportValidation(report)}>
                                        <FaCheck />
                                    </button>
                                )
                            }
                            <button className="bg-red-500 hover:bg-red-800 duration-200 text-white font-bold py-3 px-3 rounded-lg" onClick={() => handleDelete(report.id)} >
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

export default AdminReportsPage;