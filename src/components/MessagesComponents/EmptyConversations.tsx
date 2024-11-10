import { Button } from "../ui/button";
import PaperAirplane from "../../../public/paper_airplane_blue.jpg";
import { RiMapPinAddFill } from "react-icons/ri";

function EmptyConversations() {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-6">
      <img
        src={PaperAirplane}
        alt="Illustration envoi de message"
        className="w-[500px]"
      />
      <h1 className="text-xl font-semibold">
        Bienvenue sur votre messagerie !
      </h1>
      <p className="text-sm font-light text-slate-600 max-w-[700px] text-center">
        Simple et rapide, elle vous permet d'échanger avec d'autres membres de
        Share'Loc. Pour commencer une conversation, rendez vous sur l'annonce de
        votre choix puis cliquez sur "Envoyer un message".
      </p>
      <Button>
        <RiMapPinAddFill size={20} />
        Déposer une annonce
      </Button>
    </div>
  );
}

export default EmptyConversations;
