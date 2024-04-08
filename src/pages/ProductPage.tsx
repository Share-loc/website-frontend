import { useState } from 'react'

const ProductPage = () => {

    const [product, setProduct] = useState({
        id: 1,
        name: 'product name',
        price: 100,
        description: 'product description'

    })

    const [user, setUser] = useState({
        id: 1,
        name: 'user name',
        email: 'user email',
        phone: 'user phone'
    })

    return (
        <div>ProductPage</div>
    )
}

export default ProductPage