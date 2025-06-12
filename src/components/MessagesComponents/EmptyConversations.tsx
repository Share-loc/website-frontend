import { Button } from "../ui/button";
import PaperAirplane from "/paper_airplane_blue.jpg";
import { RiMapPinAddFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function EmptyConversations() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 my-10">
      <img
        src={PaperAirplane}
        alt="Illustration envoi de message"
        className="w-[500px]"
      />
      <h1 className="text-xl font-semibold text-center">
        Bienvenue sur votre messagerie !
      </h1>
      <p className="text-sm font-light text-slate-600 max-w-[700px] text-center">
        Simple et rapide, elle vous permet d'échanger avec d'autres membres de
        Share'Loc. Pour commencer une conversation, rendez vous sur l'annonce de
        votre choix puis cliquez sur "Envoyer un message".
      </p>
      <Link to={"/create-item"}>
        <Button>
          <RiMapPinAddFill size={20} />
          Déposer une annonce
        </Button>
      </Link>
    </div>
  );
}

export default EmptyConversations;
