import { useState } from 'react'
import Input from '../components/Input'

const RegisterPage = () => {

  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    username: '',
    password: ''
  })
  const [responseMessage, setResponseMessage] = useState('')

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        const data = await response.json();
        setResponseMessage('Registration successful!');
        console.log('Success:', data);
      } else {
        const errorData = await response.json();
        setResponseMessage('Registration failed: ' + errorData.message);
        console.error('Error:', errorData);
      }
    } catch (error) {
      setResponseMessage('An error occurred: ' + error);
      console.error('Error:', error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex min-h-full flex-1 flex-col justify-center items-center py-12 lg:px-8 w-full">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Rejoignez-nous
          </h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} method="POST">
            <Input 
              label='Prénom'
              id='firstname'
              name='firstname'
              type='text'
              value={formData.firstname}
              onChange={handleChange}
              required
            />

            <Input 
              label='Nom'
              id='lastname'
              name='lastname'
              type='text'
              value={formData.lastname}
              onChange={handleChange}
              required
            />

            <Input 
              label="Nom d' utilisateur"
              id='username'
              name='username'
              type='text'
              value={formData.username}
              onChange={handleChange}
              required
            />

            <Input 
              label='Adresse email'
              id='email'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              autoComplete='email'
              required
            />

            <Input
              label='Mot de passe'
              id='password'
              name='password'
              type='password'
              value={formData.password}
              onChange={handleChange}
              autoComplete='current-password'
              required
            />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-orange-100 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-orange-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black duration-300 ease-out"
              >
                Finaliser inscription
              </button>
            </div>
          </form>
          {responseMessage && (
            <div className="mt-4 text-center text-sm text-red-600">
              {responseMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RegisterPage