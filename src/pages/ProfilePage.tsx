import { useEffect, useState } from 'react'
import { getToken } from '../const/func'
import axios from 'axios'
import { Link } from 'react-router-dom';

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
        <div className='grid grid-cols-2'>
          {Object.keys(userItems).length === 0 ? (
            <p>Vous n'avez pas encore d'annonces.</p>
          ) : (
            Object.keys(userItems).map(key => {
              const item = userItems[key];
              return (
                <Link to={`/product/${item.id}`} key={item.id}>
                  <div key={item.id} className='shadow-xl border-gray border-[.5px] rounded-xl p-5 m-3 flex flex-col gap-2'>
                    <div className='self-center my-3'>
                      { item.activeItemPictures.length === 0 ? 
                        (
                          <p>Pas d'image</p>
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
                        {item.price} €
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
                    
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </>
  )
}

export default ProfilePage