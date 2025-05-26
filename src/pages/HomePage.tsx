import { useEffect, useState } from "react"
import MainBanner from "@/components/HomeComponents/Banner"
import Card from "@/components/HomeComponents/Card"
import ServicesBanner from "@/components/HomeComponents/BannerService"
import About from "@/components/HomeComponents/About"
import TestimonialsCarousel from "@/components/HomeComponents/Testimonial"
import { CircularProgress } from "@mui/material"
import apiClient from "@/service/api/apiClient"

const HomePage = () => {
  const [items, setItems] = useState([])
  const [loader, setLoader] = useState(true);

  const itemsHome = async () => {
    try {
      const response = await apiClient.get("/items");
      setItems(response.data.items);
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