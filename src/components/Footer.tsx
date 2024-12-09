import Logo from "/logo.svg";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 text-gray-600 bg-gray-100">
      <div className="container flex flex-col items-center px-4 mx-auto">
        <div className="grid w-full grid-cols-1 gap-8 text-center md:grid-cols-2 lg:grid-cols-4 md:text-left">
          {/* Logo and Company Info */}
          <div className="flex flex-col items-center md:items-start">
            <img src={Logo} alt="Share'loc Logo" width={250} height={100} />
            <p className="mt-4 text-sm">
              Postez vos annonces, louez des biens, partagez votre expérience,
              générer des revenus grâce à vos biens innutilisés.
            </p>
          </div>

          {/* General Information */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-4 text-lg font-semibold">
              Informations générales
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-gray-900">
                  Qui sommes-nous ?
                </Link>
              </li>
              <li>
                <Link to="/cgu" className="hover:text-gray-900">
                  Conditions générales d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/cgv" className="hover:text-gray-900">
                  Conditions générales de vente
                </Link>
              </li>
              <li>
                <Link to="/gdpr" className="hover:text-gray-900">
                  RGPD et gestion des cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-4 text-lg font-semibold">Des questions ?</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="hover:text-gray-900">
                  Aides
                </Link>
              </li>
              <li>
                <Link to="/stripe" className="hover:text-gray-900">
                  Le service de paiement
                </Link>
              </li>
              <li>
                <Link to="/security" className="hover:text-gray-900">
                  Connexion et sécurité
                </Link>
              </li>
              <li>
                <Link to="/reservation" className="hover:text-gray-900">
                  Le service de réservation
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-4 text-lg font-semibold">Suivez-nous</h3>
            <div className="flex justify-center space-x-4 md:justify-start">
              <a href="#" className="text-gray-400 hover:text-gray-900">
                <span className="sr-only">Facebook</span>
                <Facebook className="size-7" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-900">
                <span className="sr-only">Instagram</span>
                <Instagram className="size-7" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-900">
                <span className="sr-only">Twitter</span>
                <Linkedin className="size-7" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="w-full pt-8 mt-8 text-center border-t border-gray-200">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Share'Loc. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
