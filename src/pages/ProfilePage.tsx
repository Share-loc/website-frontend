import { useEffect, useState } from 'react'
import { getToken } from '../const/func'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { IoImageSharp } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

interface User {
  id: number;
  email: string;
  username: string;
  avatar: string;
  first_name: string;
  last_name: string;
}

const ProfilePage = () => {

  const [user, setUser] = useState<User>({
    id: 0,
    email: '',
    username: '',
    avatar: '',
    first_name: '',
    last_name: '',
  })

  const [userItems, setUserItems] = useState<any>([])

  const handleDeleteItem = async (id: number) => {
    try {
      const token = getToken();
      await axios.delete(`${import.meta.env.VITE_API_URL}/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserItems(userItems.filter((item: any) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getToken();
        /**
         * The fetch function is used to send a request to the server to get the user data.
         */
        const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}/users/personal-data`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = userResponse.data;
        setUser({
          id: userData.id,
          email: userData.email,
          username: userData.username,
          avatar: userData.avatar,
          first_name: userData.first_name,
          last_name: userData.last_name,
        });

        /**
         * The fetch function is used to send a request to the server to get the user items.
         */
        const itemsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/users/${userData.id}/items`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserItems(itemsResponse.data); 
        console.log(itemsResponse.data);
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold mb-10">Mon profil</h1>
        <div className="flex flex-col items-start gap-5">
          {user.avatar && <img src={user.avatar} alt="avatar" className="w-32 h-32 rounded-full" />}
          <div className="flex gap-5">
            <p className="text-lg font-bold">
              <span className='text-blue mr-10'>Nom d'utilisateur :</span>
              {user.username}
            </p>
          </div>
          <div className="flex gap-5">
            <p className="text-lg font-bold">
              <span className='text-blue mr-10'>Email :</span>
              {user.email}
            </p>
          </div>
          <div className="flex gap-5">
            <p className="text-lg font-bold">
              <span className='text-blue mr-10'>Prénom :</span>
              {user.first_name}
            </p>
          </div>
          <div className="flex gap-5">
            <p className="text-lg font-bold">
              <span className='text-blue mr-10'>Nom :</span>
              {user.last_name}
            </p>
          </div>
        </div>
      </div>
      <div>
        <h2 className='text-3xl font-bold my-10'>
          Mes annonces
        </h2>
        <div className='grid grid-cols-3'>
          {Object.keys(userItems).length === 0 ? (
            <p>Vous n'avez pas encore d'annonces.</p>
          ) : (
            Object.keys(userItems).map(key => {
              const item = userItems[key];
              return (
                <div key={item.id} className='shadow-xl border-gray border-[.5px] rounded-xl p-5 m-3 hover:scale-105 duration-100 ease-out hover:border-blue'>
                    <div className='self-center my-3'>
                      { item.activeItemPictures.length === 0 ? 
                        (
                          <div className='w-24 h-24 bg-gray rounded flex justify-center items-center'>
                            <IoImageSharp className='w-12 h-12 text-blue' />
                          </div>
                        )
                        :
                        (
                          <img src={`${import.meta.env.VITE_IMAGE_URL}/${item.activeItemPictures[0].fullPath}`} className='w-24 h-24' />
                        )
                      }
                    </div>
                    <div className="flex gap-5">
                      <p className="text-lg font-bold">
                        <span className='text-blue mr-10'>Title :</span>
                        {item.title}
                      </p>
                    </div>
                    <div className="flex gap-5">
                      <p className="text-lg font-bold">
                        <span className='text-blue mr-10'>Mensualités :</span>
                        {item.price} € / mois
                      </p>
                    </div>
                    <div className="flex gap-5">
                      <p className="text-lg font-bold">
                        <span className='text-blue mr-10'>Description :</span>
                        {item.body}
                      </p>
                    </div>
                    <div className="flex gap-5">
                      <p className="text-lg font-bold">
                        <span className='text-blue mr-10'>Lieu :</span>
                        {item.location}
                      </p>
                    </div>
                    <div className="flex gap-5">
                      <p className="text-lg font-bold">
                        <span className='text-blue mr-10'>Catégorie :</span>
                        {item.category.name}
                      </p>
                    </div>
                    <div className='flex flex-col'>
                      <Link to={`/product/${item.id}`} className='mt-3 flex bg-blue hover:bg-blue/70 text-white text-xs w-2/3 self-center justify-center py-1 rounded gap-3 items-center'>
                        Voir l'annonce
                        <FaArrowRight className='w-3 h-3' />
                      </Link>
                      <button 
                        className='mt-3 flex bg-red-500 hover:bg-red-500/70 text-white text-xs w-2/3 self-center justify-center py-1 rounded gap-3 items-center'
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        Supprimer
                        <FaTrash className='w-3 h-3' />
                      </button>
                    </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  )
}

export default ProfilePage