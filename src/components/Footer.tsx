import Logo from "/logo.svg"
import Separator from "./Separator"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className="bg-gray p-5 flex flex-col gap-5">
        <div className="flex gap-10 w-full">
            <div className="w-1/3">
                <img src={Logo} alt="logo" className="lg:h-16 h-10 mb-5" />
                <p className="mb-3">
                    Share'Loc est une plateforme de location de biens entre particuliers.
                </p>
                <p>
                    Postez vos annonces, louez des biens, partagez votre expérience, générer des revenus grâce à vos biens innutilisés.
                </p>
            </div>
            <div className="w-2/3 flex gap-5">
                <div>
                    <h3 className="text-blue underline underline-offset-8 mb-3">Informations générales</h3>
                    <ul className="flex flex-col gap-2">
                        <li>
                            <Link to="/about">Qui sommes-nous ?</Link>
                        </li>
                        <li>
                            <Link to="/cgu">Conditions générales d'utilisation</Link>
                        </li>
                        <li>
                            <Link to="/cgv">Conditions générales de vente</Link>
                        </li>
                        <li>
                            <Link to="/gdpr">RGPD et gestion des cookies</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-blue underline underline-offset-8 mb-3">Des questions ?</h3>
                    <ul className="flex flex-col gap-2">
                        <li>
                            <Link to="/help">Aides</Link>
                        </li>
                        <li>
                            <Link to="/stripe">Le service de paiement</Link>
                        </li>
                        <li>
                            <Link to="/security">Connexion et sécurité</Link>
                        </li>
                        <li>
                            <Link to="/reservation">Le service de réservation</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Separator/>
        <div className="flex justify-between w-full px-5">
            <div>
                <p>shareloc.fr - 2023 - Tout droits réservés</p>
            </div>
            <div>
                <p>Retrouvez nous sur : LinkedIn, Instagram, Facebook</p>
            </div>
        </div>
    </div>
  )
}

export default Footer