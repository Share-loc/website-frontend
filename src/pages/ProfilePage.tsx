import { useEffect, useState } from 'react'
import { getUserid, getToken } from '../const/func'
import axios from 'axios'

interface User {
  email: string;
  username: string;
  avatar: string;
  first_name: string;
  last_name: string;
}

const ProfilePage = () => {

  const [user, setUser] = useState<User>({
    email: '',
    username: '',
    avatar: '',
    first_name: '',
    last_name: '',
  })

  const [showInputs, setShowInputs] = useState({
    avatar: false,
    email: false,
    username: false,
    first_name: false,
    last_name: false,
  })

  // handle show inputs take input name as argument and return the showInputs state with the input name set to opposite of current value
  const handleShowInputs = (input: string) => {
    console.log(showInputs);
    setShowInputs({
      ...showInputs,
      [input]: !showInputs[input]
    })
  }

  useEffect(() => {
    const token = getToken();
    // fetch user data with token from local storage
    axios.get(`${import.meta.env.VITE_API_URL}/users/personal-data`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setUser(
        {
          email: response.data.email,
          username: response.data.username,
          avatar: response.data.avatar,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
        }
      )
    })

  }, [getUserid(), getToken()])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">Mon profil</h1>
      <div className="flex flex-col items-start gap-5">
        {user.avatar && <img src={user.avatar} alt="avatar" className="w-32 h-32 rounded-full" />}
        <div className="flex gap-5">
          <p className="text-lg font-bold">
            <span className='text-blue mr-10'>Nom d'utilisateur :</span>
            {user.username}
          </p>
          <input type="text" className={`border-b-2 border-blue ${showInputs.username ? 'block' : 'hidden'}`} />
          <button onClick={() => handleShowInputs('username')} className="text-blue">
            {showInputs.username ? 'Annuler' : 'Modifier'}
          </button>
        </div>
        <div className="flex gap-5">
          <p className="text-lg font-bold">
            <span className='text-blue mr-10'>Email :</span>
            {user.email}
          </p>
          <input type="text" className={`border-b-2 border-blue ${showInputs.email ? 'block' : 'hidden'}`} />
          <button onClick={() => handleShowInputs('email')} className="text-blue">
            {showInputs.email ? 'Annuler' : 'Modifier'}
          </button>
        </div>
        <div className="flex gap-5">
          <p className="text-lg font-bold">
            <span className='text-blue mr-10'>Prénom :</span>
            {user.first_name}
          </p>
          <input type="text" className={`border-b-2 border-blue ${showInputs.first_name ? 'block' : 'hidden'}`} />
          <button onClick={() => handleShowInputs('first_name')} className="text-blue">
            {showInputs.first_name ? 'Annuler' : 'Modifier'}
          </button>
        </div>
        <div className="flex gap-5">
          <p className="text-lg font-bold">
            <span className='text-blue mr-10'>Nom :</span>
            {user.last_name}
          </p>
          <input type="text" className={`border-b-2 border-blue ${showInputs.last_name ? 'block' : 'hidden'}`} />
          <button onClick={() => handleShowInputs('last_name')} className="text-blue">
            {showInputs.last_name ? 'Annuler' : 'Modifier'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage