import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle'
import TextIcon from '../components/TextIcon';
import { FaPhone } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";


const ProductPage = () => {

    const { id } = useParams()

    const [product, setProduct] = useState({
        email: '',
        username: '',
        category: '',
        title: '',
        body: '',
        price: 0,
        location: '',
        publicPhoneNumber: '',
        fullPath: '',
    })

    useEffect(() => {
        /**
         * Fetch data from the server
         */
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/items/${id}`)
                console.log(response.data)
                setProduct({
                    email: response.data.user.email,
                    username: response.data.user.username,
                    category: response.data.category.name,
                    title: response.data.title,
                    body: response.data.body,
                    price: response.data.price,
                    location: response.data.location ? response.data.location : 'Non renseigné',
                    publicPhoneNumber: response.data.publicPhoneNumber ? response.data.publicPhoneNumber : 'Non renseigné',
                    fullPath: response.data.activeItemPictures[0].fullPath ? response.data.activeItemPictures[0].fullPath : 'Non renseigné',
                })
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [id])

    function formatPrice(price: number) {
        const formatedPrice = `${price/100}€`
        return formatedPrice
    }

    return (
        <>
            <img className='w-[400px] h-[400] contain' src={`${import.meta.env.VITE_IMAGE_URL}/${product.fullPath}`} alt={product.title} />
            <div>
                <SectionTitle>{product.title}</SectionTitle>
                <p className='mb-5 text-xl font-semibold text-blue'>{formatPrice(product.price)} par jour</p>
                <p className='text-lg font-medium text-black'>{product.body}</p>
                <h3 className='my-3 text-lg font-normal text-black'>Catégorie: {product.category}</h3>
            </div>
            <div>
                <SectionTitle>Informations utiles</SectionTitle>
                <div className='grid grid-cols-2 text-black'>
                    <TextIcon>
                        <FaPhone className='text-blue'/>
                        <p>{product.publicPhoneNumber}</p>
                    </TextIcon>
                    <TextIcon>
                        <FaLocationDot className='text-blue'/>
                        <p>{product.location}</p>
                    </TextIcon>
                    <TextIcon>
                        <MdAccountCircle className='text-blue'/>
                        <p>{product.category}</p>
                    </TextIcon>
                </div>
            </div>
            <div>
                <SectionTitle>Profil du membre</SectionTitle>
                <div className='w-fit p-5 rounded-lg shadow flex justify-center items-center flex-col border-[.5px] border-gray'>
                    <div className='flex flex-row items-center justify-between py-3 px-24 w-fit gap-3 mb-5'>
                        <MdAccountCircle className='text-blue w-6 h-6'/>
                        <p>{product.username}</p>
                    </div>
                    <button className='w-fit px-7 py-3 bg-blue text-white font-medium rounded-lg hover:bg-blue/90 ease-out duration-300'>
                        Contacter {product.username}
                    </button>
                </div>
            </div>
        </>
    )
}

export default ProductPage