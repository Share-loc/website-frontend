import { useEffect, useState } from "react"
import { FaComment, FaFacebook, FaInstagram, FaLinkedin, FaMessage, FaNewspaper } from "react-icons/fa6"
import CardItems from "../components/ItemsComponents/cardItems"

const HomePage = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/items`)
      .then(response => response.json())
      .then(data => setItems(data.slice(0, 9)))
  }, [])

  return (
    <>  
      <div className="card bg-cover bg-center rounded-xl h-[400px] p-4 flex flex-col justify-center items-end" style={{ backgroundImage: "url('public/pexel-hero.jpg')" }}>
        <h1 className='font-semibold text-[40px] text-blue text-center'>La location entre particuliers</h1>
        <p className='text-xl mb-4 text-center text-orange-400'>Donnez une seconde vie à vos appareils en les proposant à la location.</p>
        <form className='flex gap-4 items-center md:w-[500px] flex-col sm:flex-row'>
          <input type="text" placeholder='Rechercher un appareil' className='w-2/3 p-2 border border-gray-300 rounded-md' />
          <button className='bg-blue text-white p-2 rounded-md'>Rechercher</button>
        </form>
      </div>

      <h2 className='text-2xl font-semibold mt-[50px] mb-5'>Les dernières annonces</h2>
      <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-5 w-full">
        {Object.keys(items).length === 0 ? (
          <p>Vous n'avez pas encore d'annonces.</p>
        ) : (
          Object.keys(items).map((key) => {
            const item = items[key];
            return <CardItems item={item} key={item.id} />;
          })
        )}
      </div>
      <div className="flex justify-center my-5">
        <a href="/annonces" className="bg-blue text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-dark"><FaNewspaper/> Voir toutes les annonces</a>
      </div>

       <div className="p-5 flex flex-col justify-center items-center gap-4 bg-orange-100 rounded-md my-5">
          <p className="w-1/2 text-center text-xl font-semibold text-white">Déposez vos petites annonces de location objet et matériel entre particulier ou professionnel, équipement et biens en tous genres.</p>
          <div>
            <a href="#" className="bg-blue text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-dark"><FaNewspaper/> Déposer une annonce</a>
          </div>
       </div>


       <div className="my-5 flex flex-col gap-5">
          <div className="flex justify-center">
            <img src="public/logo.svg" alt="Share'Loc logo" />
          </div>
          <h3 className="text-lg font-semibold flex items-center gap-3">
            <FaComment className="text-blue"/> 
            Location d'objets, d'équipements, de biens et matériels !
          </h3>
          <p className="font-light">
            Avec Share'Loc, le meilleur site de location de matériel pour particuliers et professionnels, louez facilement un bien près de chez vous. Gagnez du temps et de l’argent grâce à la prise en main intuitive du site, la gestion de vos annonces en ligne, la messagerie intégrée, votre page profil personnel et le dépôt d’annonce gratuit. Pour louer tous vos biens facilement, dès maintenant. Publiez vos objets, équipements, outils, matériels, biens et louez-les sans plus attendre !
            Créez vos annonces facilement en moins de 5 minutes, top-chrono !
          </p>
          <div className="flex justify-center gap-5">
            <div className="p-3 bg-blue rounded-full">
              <FaLinkedin className="text-white text-2xl"/>
            </div>
            <div className="p-3 bg-blue rounded-full">
              <FaInstagram className="text-white text-2xl"/>
            </div>
            <div className="p-3 bg-blue rounded-full">
              <FaFacebook className="text-white text-2xl"/>
            </div>
          </div>
       </div>
    </>
  )
}

export default HomePage