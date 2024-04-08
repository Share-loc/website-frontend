import { useState } from 'react'
import Image from '../components/Image'
import { FaPhone } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";


const ProductPage = () => {

    const [product, setProduct] = useState({
        id: 1,
        name: 'Product name',
        category: 'Product category',
        price: 10000,
        description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: 'product image',
        canPayWith: ['Visa', 'Mastercard', 'Paypal']
    })

    const [user, setUser] = useState({
        id: 1,
        name: 'User name',
        type: 'Particulier',
        phone: '06 00 00 00 00',
        location: 'user location'
    })

    function formatPrice(price: number) {
        const formatedPrice = `${price/100}€`
        return formatedPrice
    }

    return (
        <>
            <Image src={product.image} alt={product.name} width='100%' height='300px' />
            <div>
                <h2 className='mt-10 mb-3 text-3xl font-bold text-black'>{product.name}</h2>
                <p className='mb-5 text-xl font-semibold text-blue'>{formatPrice(product.price)} par jour</p>
                <p className='text-lg font-medium text-black'>{product.description}</p>
                <h3 className='my-3 text-lg font-normal text-black'>Catégorie: {product.category}</h3>
            </div>
            <div>
                <h2 className='mt-10 mb-3 text-3xl font-bold text-black'>Information utiles</h2>
                <div className='grid grid-cols-2 text-black'>
                    <div className='flex flex-row items-center justify-between p-3 w-fit gap-3'>
                        <FaPhone className='text-blue'/>
                        <p>{user.phone}</p>
                    </div>
                    <div className='flex flex-row items-center justify-between p-3 w-fit gap-3'>
                        <FaLocationDot className='text-blue'/>
                        <p>{user.location}</p>
                    </div>
                    <div className='flex flex-row items-center justify-between p-3 w-fit gap-3'>
                        <MdAccountCircle className='text-blue'/>
                        <p>{user.type}</p>
                    </div>
                </div>
            </div>
            <div>
                <h2 className='mt-10 mb-3 text-3xl font-bold text-black'>Moyens de paiement acceptés</h2>
                <div className='grid grid-cols-2 text-black'>
                    {
                        product.canPayWith.map((payMethod, index) => (
                            <div key={index} className='flex flex-row items-center justify-between p-3 w-fit gap-3'>
                                <FaCheck className='text-blue'/>
                                <p>{payMethod}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div>
                <h2 className='mt-10 mb-3 text-3xl font-bold text-black'>Profil du membre</h2>
                <div className='w-fit p-5 rounded-lg shadow flex justify-center items-center flex-col border-[.5px] border-gray'>
                    <div className='flex flex-row items-center justify-between py-3 px-24 w-fit gap-3 mb-5'>
                        <MdAccountCircle className='text-blue w-6 h-6'/>
                        <p>{user.name}</p>
                    </div>
                    <button className='w-fit px-7 py-3 bg-blue text-white font-medium rounded-lg hover:bg-blue/90 ease-out duration-300'>
                        Contacter {user.name}
                    </button>
                </div>
            </div>
        </>
    )
}

export default ProductPage