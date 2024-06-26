import { useState } from 'react'
import Input from '../components/Input'
import { getToken } from '../const/func'
import { useNavigate } from 'react-router-dom'

const AdPage = () => {

  const navigate = useNavigate()

  /**
   * The formData state is used to store the form data.
   */
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    price: 0,
    location: '',
    phone_number: '',
    category_id: 0,
  })

  const [images, setImages] = useState<File[]>([])

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setImages(Array.from(files));
    } else if (name === 'price' || name === 'category_id') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: Number(value),
      }));
    }
    else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  }

  /**
   * This function is called when the form is submitted.
   */
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    // Convert price and category_id to numbers

    try {
      /**
       * The fetch function is used to send a request to the server.
       */
      const response = await fetch(`${import.meta.env.VITE_API_URL}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          /**
           * The Authorization header is used to authenticate the user.
           */
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        const data = await response.json();

        /**
         * If images are selected, they are uploaded to the server.
         */
        if (images.length > 0) {
          const formData = new FormData();
          images.forEach((image, _) => {
            formData.append('pictures[]', image);
          });

          const imageUploadResponse = await fetch(`${import.meta.env.VITE_API_URL}/items/${data.id}/upload-pictures`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${getToken()}`
            },
            body: formData,
          });

          if (imageUploadResponse.ok) {
            const imageData = await imageUploadResponse.json();
            console.log(imageData);
          } else {
            const errorImageData = await imageUploadResponse.json();
            console.log('An error occurred during image upload: ' + errorImageData.message);
          }
        }
        console.log(data)
        navigate('/')
      } else {
        const errorData = await response.json();
        console.log('An error occurred: ' + errorData.message);
      }
    } catch (error) {
      console.log('An error occurred: ' + error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex min-h-full flex-1 flex-col justify-center items-center py-12 lg:px-8 w-full">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Faites votre annonce !
          </h2>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} method="POST">
            <Input 
              label="Titre de l'annonce*"
              id='title'
              name='title'
              type='text'
              value={formData.title}
              onChange={handleChange}
              required
            />
            <Input
              label="Description de l'annonce*"
              id='body'
              name='body'
              type='text'
              value={formData.body}
              onChange={handleChange}
              required
            />
            <Input
              label='Prix*'
              id='price'
              name='price'
              type='number'
              value={formData.price.toString()}
              onChange={handleChange}
              required
            />
            <Input
              label='Lieu de disponibilité*'
              id='location'
              name='location'
              type='text'
              value={formData.location}
              onChange={handleChange}
              required
            />
            <Input
              label='Numéro de téléphone*'
              id='phone_number'
              name='phone_number'
              type='tel'
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
            <Input
              label="Catégorie du produit*"
              id='category_id'
              name='category_id'
              type='number'
              value={formData.category_id.toString()}
              onChange={handleChange}
              required
            />
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                Images du produit
              </label>
              <input 
                id="image1"
                name="images"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="my-2 block w-full border border-black shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue focus:ring-blue disabled:opacity-50 disabled:pointer-events-none
                file:bg-white file:border-0
                file:me-4
                file:py-3 file:px-4
                cursor-pointer"
              />
              <input 
                id="image2"
                name="images"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="my-2 block w-full border border-black shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue focus:ring-blue disabled:opacity-50 disabled:pointer-events-none
                file:bg-white file:border-0
                file:me-4
                file:py-3 file:px-4
                cursor-pointer"
              />
              <input 
                id="image3"
                name="images"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="my-2 block w-full border border-black shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue focus:ring-blue disabled:opacity-50 disabled:pointer-events-none
                file:bg-white file:border-0
                file:me-4
                file:py-3 file:px-4
                cursor-pointer"
              />
            </div>
            <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-orange-100 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-orange-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black duration-300 ease-out"
                >
                  Déposer l'annonce
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdPage