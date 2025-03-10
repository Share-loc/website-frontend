import { useEffect, useState } from "react"
import MainBanner from "@/components/HomeComponents/Banner"
import Card from "@/components/HomeComponents/Card"
import ServicesBanner from "@/components/HomeComponents/BannerService"
import About from "@/components/HomeComponents/About"
import TestimonialsCarousel from "@/components/HomeComponents/Testimonial"
import { CircularProgress } from "@mui/material"

const HomePage = () => {
  const [items, setItems] = useState([])
  const token = localStorage.getItem("token");
  const [loader, setLoader] = useState(true);
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const itemsHome = async () => {
    try {
      const responseItems = await fetch(
        `${import.meta.env.VITE_API_URL}/items`,
        {
          method: "GET",
          headers,
        }
      );

      if (responseItems.status === 401) {
        localStorage.removeItem("token");
        setLoader(false);
        return;
      }
      
      const response = await responseItems.json();
      setItems(response.items);

    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    itemsHome();
  }, []);
  return (
    <>  
      <MainBanner />
      {loader ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress />
        </div>
      ) : (
        <Card items={items} />
      )}
      <ServicesBanner />
      <About />
      <TestimonialsCarousel />
    </>
  )
}

export default HomePage