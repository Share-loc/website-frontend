import { useEffect, useState } from "react";
import { FaEye, FaPen, FaTrash } from "react-icons/fa6";
import { getToken } from "../../const/func";
import { Avatar, Box, Modal } from "@mui/material";

const AdminUsersPape = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [userSelected, setUserSelected] = useState<User | null>(null);
    const [open, setOpen] = useState(false);

    const [userEmail, setUserEmail] = useState('');
    const [userUsername, setUserUsername] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userFirstName, setUserFirstName] = useState('');
    const [userRoles, setUserRoles] = useState<string[]>([]);

    const openEditPopup = (user: User) => {
        setUserSelected(user);
        setUserEmail(user.email);
        setUserUsername(user.username);
        setUserLastName(user.last_name);
        setUserFirstName(user.first_name);
        setUserRoles(user.roles);
        setOpen(true);
    }

    const closeEditPopup = () => {
        setUserSelected(null);
        setUserEmail('');
        setUserUsername('');
        setUserLastName('');
        setUserFirstName('');
        setUserRoles([]);
        setOpen(false);
    }

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
    interface User {
        id?: number;
        username: string;
        first_name: string;
        last_name: string;
        avatar: string;
        email: string;
        roles: string[];
        created_at: string;
        // isVerified: boolean;
        // isPro: boolean;
        // isBanned: boolean;
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`,
            }
        })
            .then((response) => response.json())
            .then((response) => setUsers(response))
            .catch((error) => console.error('Erreur lors de la récupération des Utilisateurs : ', error));
    }, []);

    const handleDelete = (id: number | undefined) => {
        const isConfirmed = confirm('Voulez-vous vraiment supprimer cet utilisateur ?');
        if (!isConfirmed) {
            return;
        }

        fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            }
        }).then((response) => {
            if (!response.ok) {
                console.error('Erreur lors de la suppression de l\'utilisateur : ', response.status);
            } else{
                setUsers(users.filter((user) => user.id !== id));
            }
            return response;
        })
        .catch((error) => console.error('Erreur lors de la suppression de l\'utilisateur : ', error));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const updatedUser: User = {
            id: userSelected?.id,
            email: userEmail,
            username: userUsername,
            last_name: userLastName,
            first_name: userFirstName,
            avatar: userSelected?.avatar || '',
            created_at: userSelected?.created_at || '',
            roles: userRoles,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userSelected?.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`,
                },
                body: JSON.stringify({ email: userEmail, username: userUsername, last_name: userLastName, first_name: userFirstName, roles: userRoles }),
            });
    
            if (!response.ok) {
                console.error('Erreur lors de la soumission de l\'utilisateur : ', response.status);
                return;
            }
            const newUsers = users.map((user) => user.id === userSelected?.id ? updatedUser : user);
            setUsers(newUsers);
        } catch (error) {
            console.error('Erreur lors de la soumission de l\'utilisateur : ', error);
        }

        closeEditPopup();
    }

    const handleRoleChange = (role: string) => {
        if (userRoles.includes(role)) {
            setUserRoles(userRoles.filter((r) => r !== role));
        } else {
            setUserRoles([...userRoles, role]);
        }
    }

    const [infoModalOpen, setInfoModalOpen] = useState(false);
    const handleInfoModalOpen = () => setInfoModalOpen(true);
    const handleInfoModalClose = () => setInfoModalOpen(false);

    const openInfoPopup = (user: User) => {
        setUserSelected(user);
        setUserEmail(user.email);
        setUserUsername(user.username);
        setUserLastName(user.last_name);
        setUserFirstName(user.first_name);
        setUserRoles(user.roles);
        handleInfoModalOpen();
    }

    const closeInfoPopup = () => {
        setUserSelected(null);
        setUserEmail('');
        setUserUsername('');
        setUserLastName('');
        setUserFirstName('');
        setUserRoles([]);
        handleInfoModalClose();
    }

    return (
        <>
            <Modal
                open={infoModalOpen}
                onClose={closeInfoPopup}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <p className="text-2xl font-semibold text-gray-900 mb-4">Informations de la catégorie</p>
                <p className="text-lg font-semibold text-gray-900 mb-2">Avatar:</p>
                <Avatar src={userSelected?.avatar} alt={userSelected?.username} className="mb-4" />
                <p className="text-lg font-semibold text-gray-900 mb-4">Email: {userSelected?.email}</p>
                <p className="text-lg font-semibold text-gray-900 mb-4">Pseudo: {userSelected?.username}</p>
                <p className="text-lg font-semibold text-gray-900 mb-4">Nom: {userSelected?.last_name}</p>
                <p className="text-lg font-semibold text-gray-900 mb-4">Prénom: {userSelected?.first_name}</p>
                <p className="text-lg font-semibold text-gray-900 mb-4">Date de création du compte: {new Date(userSelected?.created_at ?? new Date()).toLocaleDateString('fr-FR') }</p>
                </Box>
            </Modal>
            <Modal
                open={open}
                onClose={closeEditPopup}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <p className="text-2xl font-semibold text-gray-900 mb-4">Modifier l'utilisateur</p>
                <form 
                onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="text"
                            placeholder="Email de l'utilisateur"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value) }
                        />
                        <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="username">
                            Pseudo
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Pseudo de l'utilisateur"
                            value={userUsername}
                            onChange={(e) => setUserUsername(e.target.value)}
                        />
                        <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="last_name">
                            Nom
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="last_name"
                            type="text"
                            placeholder="Nom de l'utilisateur"
                            value={userLastName}
                            onChange={(e) => setUserLastName(e.target.value)}
                        />
                        <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="first_name">
                            Prénom
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="first_name"
                            type="text"
                            placeholder="Prénom de l'utilisateur"
                            value={userFirstName}
                            onChange={(e) => setUserFirstName(e.target.value)}
                        />
                        <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                            Rôles
                        </label>
                        <div className="flex gap-2">
                            <label className="inline-flex items-center">
                                <input 
                                    type="checkbox" 
                                    className="form-checkbox" 
                                    checked={userRoles.includes('ROLE_ADMIN')} 
                                    onChange={() => handleRoleChange('ROLE_ADMIN')}
                                />
                                <span className="ml-2">Administrateur</span>
                            </label>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                            <button
                                className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Modifier
                            </button>
                        </div>
                    </div>
                </form>
                </Box>
            </Modal>
            <p className="text-2xl font-semibold text-gray-900 mb-4">Utilisateurs</p>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                    Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Avatar
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Nom d'utilisateur
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Info 
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr className="hover:bg-white border-b " key={user.id}>
                        <th
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap">{user.id}</th>
                        <td className="px-6 py-4">
                            <Avatar src={user.avatar} alt={user.username} />
                        </td>
                        <td className="px-6 py-4">{user.username}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4 flex gap-2">{user.roles.map((role, index) => (
                            <span key={index} className={`label ${role === "ROLE_USER" ? 'bg-blue' : 'bg-red-400' } bg-blue  px-2 py-1 text-white rounded`}>
                                {role === "ROLE_USER" ? 'Utilisateur' : 'Administrateur'}
                            </span>
                        ))}</td>
                        {/* <td className="px-6 py-4">{user.isPro ? 'Oui' : 'Non'}</td>
                        <td className="px-6 py-4">{user.isBanned ? 'Oui' : 'Non'}</td> */}

                        <td className="px-6 py-4">
                            <button className="bg-gray hover:bg-gray-dark font-bold py-3 px-3 me-2 rounded-lg" onClick={() => openInfoPopup(user)}>
                                <FaEye />
                            </button>
                            <button className="bg-blue hover:bg-blue-dark text-white font-bold py-3 px-3 me-2 rounded-lg" onClick={() => openEditPopup(user)}>
                                <FaPen />
                            </button>
                            <button className="bg-red-500 hover:bg-red-800 duration-200 text-white font-bold py-3 px-3 rounded-lg" onClick={() => handleDelete(user.id)} >
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

export default AdminUsersPape;