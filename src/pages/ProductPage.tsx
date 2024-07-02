import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Image from '../components/Image';
import SectionTitle from '../components/SectionTitle';
import TextIcon from '../components/TextIcon';
import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import AuthContext from '../components/context/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import { fr } from 'date-fns/locale';
import styled from 'styled-components';
import { format, parseISO } from 'date-fns';
import { getToken } from "../const/func.ts";
import NotFoundPage from "./NotFoundPage.tsx";


registerLocale("fr", fr);

const CustomDatePickerWrapper = styled.div`
    .react-datepicker {
        border: 1px solid #d6d6d6;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 100%;
    }
    .react-datepicker__input-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .react-datepicker__header {
        border-bottom: 1px solid #d6d6d6;
        padding: 10px 0;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        text-transform: uppercase;
    }
    .react-datepicker__current-month {
        font-size: 18px;
        color: rgba(50, 50, 50, 0.5);
    }
    .react-datepicker__day {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        margin: 2px 4px;
        font-size: 14px;
    }
    .react-datepicker__day--selected {
        background-color: rgb(34 175 175 / 0.9);
        color: white;
        border-radius: 50%;
    }
    .react-datepicker__day--today {
        font-weight: bold;
        color: rgb(34 175 175 / 0.9);
    }
    .react-datepicker__day--outside-month {
        color: #d6d6d6;
    }
    .react-datepicker__day--disabled {
        color: #d6d6d6;
    }
    .react-datepicker__navigation {
        top: 11px;
        line-height: 1.7rem;
    }
    .react-datepicker__navigation-icon {
        border-color: white;
    }
    .react-datepicker__navigation--previous {
        left: 10px;
        border-right-color: white;
    }
    .react-datepicker__navigation--next {
        right: 10px;
        border-left-color: white;
    }
    .react-datepicker__week {
        display: flex;
        justify-content: space-between;
    }
    .react-datepicker__day--in-range {
        background-color: white;
        color: rgb(34 175 175 / 0.9);
        font-weight: bold;
    }
    .react-datepicker__day--in-selecting-range {
        background-color: white;
        color: rgb(34 175 175 / 0.9);
        font-weight: bold;
    }
    .react-datepicker__day--selected {
        background-color: rgb(34 175 175 / 0.9);
        color: white;
    }
    .react-datepicker__day--keyboard-selected {
        background-color: rgb(34 175 175 / 0.9);
        color: white;
        border-radius: 50%;
    }
    .react-datepicker__day:hover {
        background-color: rgb(34 175 175 / 0.9);
        color: white;
        border-radius: 50%;
    }
    .react-datepicker__day-names {
        display: flex;
        justify-content: space-between;
    }
    .react-datepicker__day-name {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .custom-select {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background: none;
        padding: 0 !important;
        margin: 0 !important;
    }
`;

const ProductPage = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
        id: 0,
        email: '',
        username: '',
        avatar: '',
        publicPhoneNumber: '',
    });
    const { userState } = useContext(AuthContext);
    const [product, setProduct] = useState({
        id: 0,
        category: {},
        title: '',
        body: '',
        price: 0,
        location: '',
        itemPictures: {},
        activeItemPictures: {}
    });
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startHour, setStartHour] = useState('00');
    const [startMinute, setStartMinute] = useState('00');
    const [endHour, setEndHour] = useState('00');
    const [endMinute, setEndMinute] = useState('00');
    const [responseStatus, setResponseStatus] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/items/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                setResponseStatus(response.status);

                if (response.status !== 200) {
                    return;
                }

                const item = await response.json();

                setUser({
                    id: item.user.id,
                    email: item.user.mail,
                    username: item.user.username,
                    avatar: item.user.avatar,
                    publicPhoneNumber: item.publicPhoneNumber,
                });
                setProduct({
                    id: item.id,
                    category: item.category,
                    title: item.title,
                    body: item.body,
                    price: item.price,
                    location: item.location,
                    itemPictures: item.itemPictures,
                    activeItemPictures: item.activeItemPictures
                });
            } catch (error) {
                setResponseStatus(500);
                console.error('Error fetching product data:', error);
            }

        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const startAt = `${format(parseISO(startDate.toISOString()), "yyyy-MM-dd")} ${startHour}:${startMinute}`;
            const endAt = `${format(parseISO(endDate.toISOString()), "yyyy-MM-dd")} ${endHour}:${endMinute}`;

            const reservationData = {
                item: product.id,
                start_at: startAt,
                end_at: endAt,
                price: product.price
            };
            const response = await fetch(`${import.meta.env.VITE_API_URL}/reservations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                },
                body: JSON.stringify(reservationData)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Error making reservation:', error);
        }
    };

    if (responseStatus && responseStatus !== 200) {
        return <NotFoundPage />;
    }

    const generateOptions = (start, end) => {
        const options = [];
        for (let i = start; i <= end; i++) {
            options.push(
                <option key={i} value={i < 10 ? `0${i}` : i}>
                    {i < 10 ? `0${i}` : i}
                </option>
            );
        }
        return options;
    };

    const firstActiveItemPicture = product.activeItemPictures?.[0]?.fullPath || 'Chemin par défaut ou gestion de l\'absence d\'image';

    return (
        <>
            <img className='w-[400px] h-[400] contain' src={`${import.meta.env.VITE_DOMAIN}/${firstActiveItemPicture}`}
                 alt={product.title}/>
            <div className="flex flex-col lg:flex-row justify-between px-4">
                <section className="lg:w-3/4 lg:pr-8">
                    <div>
                        <SectionTitle>{product.title}</SectionTitle>
                        <p className='mb-5 text-xl font-semibold text-blue'>{product.price}€ par jour</p>
                        <p className='text-lg font-medium text-black'>{product.body}</p>
                        <h3 className='my-3 text-lg font-normal text-black'>Catégorie: {product.category.name}</h3>
                    </div>
                    <div>
                        <SectionTitle>Informations utiles</SectionTitle>
                        <div className='grid grid-cols-1 sm:grid-cols-2 text-black'>
                            <TextIcon>
                                <FaPhone className='text-blue'/>
                                <p>{user.publicPhoneNumber}</p>
                            </TextIcon>
                            <TextIcon>
                                <FaLocationDot className='text-blue'/>
                                <p>{product.location}</p>
                            </TextIcon>
                            <TextIcon>
                                <MdAccountCircle className='text-blue'/>
                                <p>{user.username}</p>
                            </TextIcon>
                        </div>
                    </div>
                </section>

                <section className="lg:w-1/4">
                    <div>
                        <h2 className="mt-10 mb-3 text-xl font-bold text-black">Profil du membre</h2>
                        <div
                            className='w-full p-5 rounded-lg shadow flex justify-center items-center flex-col border-[.5px] border-gray'>
                            <div className='flex flex-row items-center justify-between py-3 px-24 w-full gap-3 mb-5'>
                                <MdAccountCircle className='text-blue w-6 h-6'/>
                                <p>{user.username}</p>
                            </div>
                            <button
                                className='w-full px-7 py-3 bg-blue text-white font-medium rounded-lg hover:bg-blue/90 ease-out duration-300'>
                                Contacter
                            </button>
                        </div>
                    </div>
                    <div>
                        <h2 className="mt-10 mb-3 text-xl font-bold text-black">Faire une réservation</h2>

                        {userState.isLogged ? (
                            <form onSubmit={handleSubmit}>
                                <div className="w-full">
                                    <CustomDatePickerWrapper>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(update) => {
                                                const [start, end] = update;
                                                setStartDate(start);
                                                setEndDate(end);
                                            }}
                                            startDate={startDate}
                                            endDate={endDate}
                                            selectsRange
                                            inline
                                            locale="fr"
                                            className="w-full p-5 rounded-lg shadow flex justify-center items-center flex-col border-[.5px] border-gray"
                                            required
                                        />
                                        <div>
                                            <div className="flex flex-col my-3">
                                                <label htmlFor="startHour">Heure de début</label>
                                                <div
                                                    className="flex w-full px-2 py-3 bg-blue text-white font-medium rounded-lg hover:bg-blue/90 ease-out duration-300">
                                                    <select
                                                        id="startHour"
                                                        value={startHour}
                                                        onChange={(e) => setStartHour(e.target.value)}
                                                        className="custom-select border-0 bg-transparent focus:ring-0 pr0"
                                                        required
                                                    >
                                                        {generateOptions(0, 23)}
                                                    </select>
                                                    <select
                                                        className="custom-select border-0 bg-transparent focus:ring-0 pr0">
                                                        <option disabled selected>:</option>
                                                    </select>
                                                    <select
                                                        id="startMinute"
                                                        value={startMinute}
                                                        onChange={(e) => setStartMinute(e.target.value)}
                                                        className="custom-select border-0 bg-transparent focus:ring-0"
                                                        required
                                                    >
                                                        {generateOptions(0, 59)}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <label htmlFor="startHour">Heure de fin</label>
                                                <div
                                                    className="w-full px-2 py-3 bg-blue text-white font-medium rounded-lg hover:bg-blue/90 ease-out duration-300">
                                                    <select
                                                        id="endHour"
                                                        value={endHour}
                                                        onChange={(e) => setEndHour(e.target.value)}
                                                        className="custom-select border-0 bg-transparent focus:ring-0 pr0"
                                                        required
                                                    >
                                                        {generateOptions(0, 23)}
                                                    </select>
                                                    <select
                                                        className="custom-select border-0 bg-transparent focus:ring-0 pr0">
                                                        <option disabled selected>:</option>
                                                    </select>
                                                    <select
                                                        id="endMinute"
                                                        value={endMinute}
                                                        onChange={(e) => setEndMinute(e.target.value)}
                                                        className="custom-select border-0 bg-transparent focus:ring-0"
                                                        required
                                                    >
                                                        {generateOptions(0, 59)}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </CustomDatePickerWrapper>
                                </div>
                                <div>
                                    <input type="hidden" name="tenant_id" value={userState.userid}
                                           className="form-control"/>
                                </div>
                                <div className="flex justify-center my-2">
                                    <button
                                        className='w-full px-7 py-3 bg-blue text-white font-medium rounded-lg hover:bg-blue/90 ease-out duration-300'
                                        type="submit">
                                        Réserver
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="flex justify-center my-2">
                                <a href="/profile"
                                   className='w-full px-7 py-3 bg-blue text-white font-medium rounded-lg hover:bg-blue/90 ease-out duration-300'>
                                    Se connecter
                                </a>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
};

export default ProductPage;
