import { useEffect, useState } from 'react'
import { getUserid, getToken } from '../const/func'
import axios from 'axios'

interface User {
  email: string;
  username: string;
  avatar: string | null;

}

const ProfilePage = () => {

  const [user, setUser] = useState<User>({
    email: '',
    username: '',
    avatar: null,
  })

  const [showInputs, setShowInputs] = useState({
    avatar: false,
    email: false,
    username: false,
  })

  // handle show inputs take input name as argument and return the showInputs state with the input name set to opposite of current value
  const handleShowInputs = (input: string) => {
    setShowInputs({
      ...showInputs,
      [input]: !showInputs[input]
    })
  }

  // fetch user data on component mount
  const handleSubmit = () => {
    // TODO: fetch to update user data
    console.log('submit');
  }

  useEffect(() => {
    // get user id in local storage
    const userid = getUserid();
    const token = getToken();
    if (!userid || !token) {
      // user is already redirect to login page if not logged in
      return;
    }
    // fetch user data with token from local storage
    axios.get(`${import.meta.env.VITE_API_URL}/users/${userid}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setUser(
        {
          email: response.data.email,
          username: response.data.username,
          avatar: response.data.avatar,
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
          <button onClick={handleSubmit} className={`text-blue ${showInputs.username ? 'block' : 'hidden'}`}>Submit</button>
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
          <button onClick={handleSubmit} className={`text-blue ${showInputs.username ? 'block' : 'hidden'}`}>Submit</button>
          <button onClick={() => handleShowInputs('email')} className="text-blue">
            {showInputs.email ? 'Annuler' : 'Modifier'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage