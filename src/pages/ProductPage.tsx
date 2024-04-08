import { useState } from 'react'
import Image from '../components/Image'
import SectionTitle from '../components/SectionTitle'
import TextIcon from '../components/TextIcon';
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
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At harum voluptatibus ipsum, placeat totam magnam neque eum natus fugiat non praesentium. Nobis distinctio laboriosam natus ipsum illum minus. Quaerat consectetur recusandae sed nostrum corporis enim sequi mollitia expedita debitis doloribus, placeat repudiandae, ipsa sint libero praesentium hic nesciunt est? Vitae.',
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
            <Image src={'/renault.jpeg'} alt={product.name} />
            <div>
                <SectionTitle>{product.name}</SectionTitle>
                <p className='mb-5 text-xl font-semibold text-blue'>{formatPrice(product.price)} par jour</p>
                <p className='text-lg font-medium text-black'>{product.description}</p>
                <h3 className='my-3 text-lg font-normal text-black'>Catégorie: {product.category}</h3>
            </div>
            <div>
                <SectionTitle>Informations utiles</SectionTitle>
                <div className='grid grid-cols-2 text-black'>
                    <TextIcon>
                        <FaPhone className='text-blue'/>
                        <p>{user.phone}</p>
                    </TextIcon>
                    <TextIcon>
                        <FaLocationDot className='text-blue'/>
                        <p>{user.location}</p>
                    </TextIcon>
                    <TextIcon>
                        <MdAccountCircle className='text-blue'/>
                        <p>{user.type}</p>
                    </TextIcon>
                </div>
            </div>
            <div>
                <SectionTitle>Moyens de paiement acceptés</SectionTitle>
                <div className='grid grid-cols-2 text-black'>
                    {
                        product.canPayWith.map((payMethod, index) => (
                            <div key={index}>
                                <TextIcon>
                                    <FaCheck className='text-blue'/>
                                    <p>{payMethod}</p>
                                </TextIcon>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div>
                <SectionTitle>Profil du membre</SectionTitle>
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