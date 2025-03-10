import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import TextIcon from '../components/TextIcon';
import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import AuthContext from '../components/context/AuthContext';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import { fr } from 'date-fns/locale';
import { addDays, format } from 'date-fns';
import NotFoundPage from "./NotFoundPage.tsx";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { Button } from '@/components/ui/button.tsx';
import { cn } from '@/lib/utils.ts';
import { DateRange } from 'react-day-picker';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar.tsx';
import axios from 'axios';


registerLocale("fr", fr);

const ProductPage = () => {
    const { id } = useParams();
    // get local storage token
    const BEARER_TOKEN = localStorage.getItem('token');
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

    const [responseStatus, setResponseStatus] = useState<number | null>(null);

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

    if (responseStatus && responseStatus !== 200) {
        return <NotFoundPage />;
    }

    return (
        <>
            <div className="flex flex-col lg:flex-row justify-between px-4">
                <section className="lg:w-3/4 lg:pr-8">
                    <div>
                        <SectionTitle>{product.title}</SectionTitle>
                        <p className='mb-5 text-xl font-semibold text-blue'>{product.price}€ par jour</p>
                        <p className='text-lg font-medium text-black'>{product.body}</p>
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
                            <BookingForm tenant_id={id} BEARER_TOKEN={BEARER_TOKEN} item_id={product.id} />
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

type BookingForm = {
    date: DateRange | undefined,
}

function BookingForm({ tenant_id, BEARER_TOKEN, item_id }: { tenant_id: string | undefined, BEARER_TOKEN: string | null, item_id: number | undefined }) {

    const [bookingForm, setBookingForm] = useState<BookingForm>({
        date: {
            from: new Date(2024, 1, 1),
            to: addDays(new Date(2024, 1, 1), 1)
        },
    });

    const onValueChange = (e: any, value: string) => {
        setBookingForm({...bookingForm, [e.target.name]: value});
        console.log(bookingForm);
        
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        let startDate: string;
        let endDate: string;
        
        if (bookingForm.date === undefined || bookingForm.date.from === undefined) {
            return;
        }
        if (bookingForm.date.to === undefined) {
            startDate = format(bookingForm.date?.from, "yyyy-MM-dd");
            endDate = "";
        } else {
            // format date and time from bookingForm startHour and startMinute -> 2024-12-30 10:30
            startDate = format(bookingForm.date?.from, "yyyy-MM-dd");
            endDate = format(bookingForm.date?.to, "yyyy-MM-dd");
        }

        const bookingData = {
            item: item_id,
            start_at: startDate,
            end_at: endDate,
            tenant_id: Number(tenant_id)
        }

        console.log(bookingData);
        

        axios.post(`${import.meta.env.VITE_API_URL}/reservations`, JSON.stringify(bookingData), {
            headers: {
                Authorization: `Bearer ${BEARER_TOKEN}`, // Replace `yourToken` with the actual token
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            console.log('Request completed');
        })

        
    }

    return (
            <div className='w-full'>
                <div className="grid gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={'outline'}
                                className={cn(
                                    "w-[280px] justify-start text-left font-normal",
                                    !bookingForm.date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon />
                                {bookingForm.date?.from ? (
                                    bookingForm.date.to ? (
                                        <>
                                        {format(bookingForm.date.from, "LLL dd, y")} -{" "}
                                        {format(bookingForm.date.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(bookingForm.date.from, "LLL dd, y")
                                    )
                                    ) : (
                                    <span>Choisissez une date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start" side="left">
                            <form onSubmit={handleSubmit}>
                                {/* Date Range Picker */}
                                <Calendar
                                    initialFocus
                                    mode='range'
                                    defaultMonth={bookingForm.date?.from || new Date()}
                                    selected={bookingForm.date}
                                    onSelect={(date) => setBookingForm({...bookingForm, date})}
                                    numberOfMonths={2}
                                />
                                <div className='w-full flex'>
                                    <Button variant={'default'} className='bg-blue hover:bg-blue-dark mx-auto my-3 w-3/4' type='submit'>
                                        Réserver
                                    </Button>
                                </div>
                            </form>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
    )
}
