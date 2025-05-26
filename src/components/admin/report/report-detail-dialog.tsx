import { useAdmin } from "@/components/context/AdminContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getToken } from "@/const/func";
import { toast } from "@/hooks/use-toast";
import apiClient from "@/service/api/apiClient";
import { Report } from "@/types/admin/report-types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  ExternalLink,
  Home,
  MessageSquare,
  ReceiptText,
  Star,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

interface ReportDetailDialogProps {
  report: Report;
  onStatusChanged: () => void;
}

function ReportDetailDialog({
  report,
  onStatusChanged,
}: ReportDetailDialogProps) {
  const [open, setOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [notes, setNotes] = useState("");

  const { refreshReportsCounter } = useAdmin();

  useEffect(() => {
    setIsConfirming(false);
    setNotes("");
  }, [open]);

  const getReportedContentIcon = (report: Report) => {
    switch (true) {
      case !!report.message:
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case !!report.review:
        return <Star className="h-5 w-5 text-yellow-500" />;
      case !!report.item:
        return <Home className="h-5 w-5 text-green-500" />;
      case !!report.user:
        return <User className="h-5 w-5 text-purple-500" />;
      default:
        return null;
    }
  };

  const getReportedContentDetails = () => {
    switch (true) {
      case !!report.message:
        return (
          <div className="mt-4 p-3 bg-slate-50 rounded-md">
            <div className="flex items-center mb-2">
              <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
              <h4 className="font-medium">Message signalé</h4>
            </div>
            <p className="text-sm text-slate-700 border-l-2 border-blue-300 pl-3 mt-2">
              {report.message.content}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              ID: {report.message.id}
            </p>
          </div>
        );

      case !!report.review:
        return (
          <div className="mt-4 p-3 bg-slate-50 rounded-md">
            <div className="flex items-center mb-2">
              <Star className="h-4 w-4 mr-2 text-yellow-500" />
              <h4 className="font-medium">Avis signalé</h4>
            </div>
            <p className="text-sm text-slate-700 border-l-2 border-yellow-300 pl-3 mt-2">
              {report.review.content}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              ID: {report.review.id}
            </p>
          </div>
        );

      case !!report.item:
        return (
          <div className="mt-4 p-3 bg-slate-50 rounded-md">
            <div className="flex items-center mb-2">
              <Home className="h-4 w-4 mr-2 text-green-500" />
              <h4 className="font-medium">Annonce signalée</h4>
            </div>
            <p className="text-sm font-medium text-slate-700 mt-2">
              {report.item.title}
            </p>
            <div className="mt-2">
              <a
                href={`/product/${report.item.id}`}
                target="_blank"
                className="text-xs inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                Voir l'annonce
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
            <p className="text-xs text-slate-500 mt-1">ID: {report.item.id}</p>
          </div>
        );

      case !!report.user:
        return (
          <div className="mt-4 p-3 bg-slate-50 rounded-md">
            <div className="flex items-center mb-2">
              <User className="h-4 w-4 mr-2 text-purple-500" />
              <h4 className="font-medium">Utilisateur signalé</h4>
            </div>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-slate-700">
                <span className="font-medium">Nom d'utilisateur:</span>{" "}
                {report.user.username}
              </p>
              <p className="text-sm text-slate-700">
                <span className="font-medium">Email:</span> {report.user.email}
              </p>
              <p className="text-xs text-slate-500">ID: {report.user.id}</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleStatusChange = async () => {
    try {
      await apiClient.put(`/report/validate/${report.id}`);
      setOpen(false);
      onStatusChanged();
      refreshReportsCounter();
      toast({
        title: "Signalement traité",
        description: "Le signalement a été traité avec succès.",
        variant: "success",
      });
    } catch (error) {
      console.error("Erreur lors de la validation du signalement : ", error);
    }
  };

  const detailContent = (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center">
          {getReportedContentIcon(report)}
          <span className="ml-2">Signalement {report.id}</span>
          {report.status != "waiting_to_be_reviewed" && (
            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              Traité
            </span>
          )}
        </DialogTitle>
        <DialogDescription>
          Créé le{" "}
          {format(report.created_at, "dd MMMM yyyy 'à' HH:mm", { locale: fr })}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div>
          <h3 className="text-sm font-medium mb-1">Signalé par</h3>
          <div className="bg-slate-50 p-3 rounded-md">
            <p className="text-sm">
              <span className="font-medium">{report.reporter.username}</span> (
              {report.reporter.email})
            </p>
            <p className="text-xs text-slate-500">ID: {report.reporter.id}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-1">Message du signalement</h3>
          <div className="bg-slate-50 p-3 rounded-md">
            <p className="text-sm">{report.reporter_message}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-1">Motif du signalement</h3>
          <div className="bg-slate-50 p-3 rounded-md">
            <p className="text-sm capitalize">{report.motif.replace("_", " ")}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-1">Contenu signalé</h3>
          {getReportedContentDetails()}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="notes">Notes (optionnel)</Label>
          <Textarea
            id="notes"
            placeholder="Ajoutez des notes sur les actions entreprises..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={report.status != "waiting_to_be_reviewed"}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => setOpen(false)}>
          Fermer
        </Button>
        <Button
          onClick={() => handleConfirm()}
          disabled={report.status != "waiting_to_be_reviewed"}
        >
          {report.status === "waiting_to_be_reviewed"
            ? "Marquer comme traité"
            : "Déja traité"}
        </Button>
      </DialogFooter>
    </>
  );

  const handleConfirm = () => {
    if (report.status === "waiting_to_be_reviewed") {
      setIsConfirming(true);
    }
  };

  const confirmContent = (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle>Marquer comme traité ?</DialogTitle>
        <DialogDescription>
          Êtes-vous sûr de vouloir marquer ce signalement comme traité ? Cette
          action l'archivera.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" onClick={() => setIsConfirming(false)}>
          Annuler
        </Button>
        <Button onClick={handleStatusChange}>Marquer comme traité</Button>
      </DialogFooter>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <ReceiptText />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        {isConfirming ? confirmContent : detailContent}
      </DialogContent>
    </Dialog>
  );
}

export default ReportDetailDialog;
