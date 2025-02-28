import { useEffect, useState } from "react";
import { getToken } from "../../const/func";
import { Report } from "@/types/admin/report-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableCell } from "@mui/material";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

const AdminReportsPage = () => {
  // const style = {
  //     position: 'absolute' as 'absolute',
  //     top: '50%',
  //     left: '50%',
  //     transform: 'translate(-50%, -50%)',
  //     width: 400,
  //     bgcolor: 'background.paper',
  //     // border: '1px solid #000',
  //     boxShadow: 24,
  //     borderRadius: '10px',
  //     p: 4,
  //   };

  // const handleDelete = (id: number) => {

  //     const confirm = window.confirm('Voulez-vous vraiment supprimer ce signalement ?');
  //     if (!confirm) {
  //         return;
  //     }

  //     fetch(`${import.meta.env.VITE_API_URL}/report/delete/${id}`,
  //         {
  //             method: 'DELETE',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //                 'Authorization': `Bearer ${getToken()}`,
  //             }
  //         }
  //     )
  //         .then((response) => {
  //             if (!response.ok) {
  //                 console.error('Erreur lors de la suppression du signalement : ', response.status);
  //             } else {
  //                 setReports(reports.filter((report) => report.id !== id));
  //             }
  //             return response;
  //         })
  //         .catch((error) => console.error('Erreur lors de la suppression du signalement : ', error));
  // }

  // const handleReportValidation = (report: Report) => {

  //         const confirm = window.confirm('Voulez-vous vraiment valider ce signalement ?');
  //         if (!confirm) {
  //             return;
  //         }

  //         fetch(`${import.meta.env.VITE_API_URL}/report/validate/${report.id}`,
  //             {
  //                 method: 'PUT',
  //                 headers: {
  //                     'Content-Type': 'application/json',
  //                     'Authorization': `Bearer ${getToken()}`,
  //                 }
  //             }
  //         )
  //             .then((response) => {
  //                 if (!response.ok) {
  //                     console.error('Erreur lors de la validation du signalement : ', response.status);
  //                 } else {
  //                     setReports(reports.map((r) => {
  //                         if (r.id === report.id) {
  //                             r.status = 'reviewed';
  //                         }
  //                         return r;
  //                     }));
  //                 }
  //                 return response;
  //             })
  //             .catch((error) => console.error('Erreur lors de la validation du signalement : ', error));
  //     }

  // const [infoModalState, setInfoModalState] = useState(false);
  // const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // const handleClose = () => {
  //     setInfoModalState(false);
  //     setSelectedReport(null);
  // }

  // const openInfoModal = (report: Report) => {
  //     setInfoModalState(true);
  //     setSelectedReport(report);
  // }

  // return (
  //     <>
  //         <Modal
  //             open={infoModalState}
  //             onClose={handleClose}
  //             aria-labelledby="modal-modal-title"
  //             aria-describedby="modal-modal-description"
  //         >
  //             <Box sx={style}>
  //             <p className="text-2xl font-semibold text-gray-900 mb-4">Informations du signalement</p>
  //             <p className="text-lg text-gray-900 mb-4">ID: {selectedReport?.id}</p>
  //             <p className="text-lg text-gray-900 mb-4">Status: {selectedReport?.status === "waiting_to_be_reviewed" ? 'En attente' : 'Traité'}</p>
  //             <p className="text-lg text-gray-900 mb-4">Date de signalement: {selectedReport && new Date(selectedReport.created_at).toLocaleDateString('fr-FR')}</p>
  //             <p className="text-lg text-gray-900 mb-4">Signalé par: {selectedReport?.reporter.username} (id: {selectedReport?.reporter.id})</p>
  //             <p className="text-lg text-gray-900 mb-4">Message du signaleur: {selectedReport?.reporter_message}</p>
  //             {selectedReport?.user && (
  //                 <p className="text-lg text-gray-900 mb-4">Utilisateur signalé: {selectedReport.user.username} (id: {selectedReport.user.id})</p>
  //             )}
  //             {selectedReport?.item && (
  //                 <p className="text-lg text-gray-900 mb-4">Annonce signalée: {selectedReport.item.title} (id: {selectedReport.item.id})</p>
  //             )}
  //             {selectedReport?.review && (
  //                 <p className="text-lg text-gray-900 mb-4">Avis signalé: {selectedReport.review.content} (id: {selectedReport.review.id})</p>
  //             )}
  //             {selectedReport?.message && (
  //                 <p className="text-lg text-gray-900 mb-4">Message signalé: {selectedReport.message.content} (id: {selectedReport.message.id})</p>
  //             )}
  //             </Box>
  //         </Modal>

  //         <p className="text-2xl font-semibold text-gray-900 mb-4">Signalements</p>
  //         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
  //             <thead className="text-xs text-gray-700 uppercase bg-gray dark:bg-gray-700 dark:text-gray-400">
  //             <tr>
  //                 <th scope="col" className="px-6 py-3">
  //                 Id
  //                 </th>
  //                 <th scope="col" className="px-6 py-3">
  //                 Status
  //                 </th>
  //                 <th scope="col" className="px-6 py-3">
  //                 Date de signalement
  //                 </th>
  //                 <th scope="col" className="px-6 py-3">
  //                 Objet du signalement
  //                 </th>
  //                 <th scope="col" className="px-6 py-3">
  //                 Actions
  //                 </th>
  //             </tr>
  //             </thead>
  //             <tbody>
  //             {reports.map((report) => (
  //                 <tr className="hover:bg-white border-b " key={report.id}>
  //                     <th
  //                     scope="row"
  //                     className="px-6 py-4 font-medium whitespace-nowrap"
  //                     >
  //                     {report.id}
  //                     </th>
  //                     <td className="px-6 py-4">
  //                         <span className={`px-3 py-1 rounded ${report.status === "waiting_to_be_reviewed" ? ' bg-orange-200' : ''} ${report.status === "reviewed" ? ' bg-green-400' : ''} `}>
  //                             {report.status === "waiting_to_be_reviewed" ? 'En attente' : 'Traité'}
  //                         </span>
  //                     </td>
  //                     <td className="px-6 py-4">{new Date(report.created_at).toLocaleDateString('fr-FR')}</td>
  //                     <td className="px-6 py-4">
  //                         {report.item ? 'annonce' : report.user ? 'utilisateur' : report.review ? 'avis' : 'message'}
  //                     </td>
  //                     <td className="px-6 py-4">
  //                         <button className="bg-gray hover:bg-gray-dark font-bold py-3 px-3 me-2 rounded-lg" onClick={() => openInfoModal(report)}>
  //                             <FaEye />
  //                         </button>
  //                         {
  //                             report.status === "waiting_to_be_reviewed" && (
  //                                 <button className="bg-green-400 hover:bg-green-600 font-bold py-3 px-3 me-2 rounded-lg" onClick={() => handleReportValidation(report)}>
  //                                     <FaCheck />
  //                                 </button>
  //                             )
  //                         }
  //                         <button className="bg-red-500 hover:bg-red-800 duration-200 text-white font-bold py-3 px-3 rounded-lg" onClick={() => handleDelete(report.id)} >
  //                             <FaTrash />
  //                         </button>
  //                     </td>
  //                 </tr>
  //             ))}
  //             </tbody>
  //         </table>
  //     </>
  // )

  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<string>("all");

  const fetchReports = () => {
    fetch(`${import.meta.env.VITE_API_URL}/report`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((response) => response.json())
      .then((response) => setReports(response))
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des signalements : ",
          error
        )
      );
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const getReportedContentLabel = (report: Report) => {
    switch (true) {
      case !!report.message:
        return "Message";
      case !!report.review:
        return "Avis";
      case !!report.item:
        return "Annonce";
      case !!report.user:
        return "Utilisateur";
      default:
        return "Inconnu";
    }
  };

  console.table(reports);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des Signalements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Chercher un signalement..."
                //   value={searchTerm}
                //   onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline">Rechercher</Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtrer
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilter("all")}>
                Tous les signalements
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("processed")}>
                Signalements traités
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("unprocessed")}>
                Signalements non traités
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.id}</TableCell>
                  <TableCell>
                    {format(report.created_at, "dd MMM yyyy", { locale: fr })}
                  </TableCell>
                  <TableCell>{report.reporter.username}</TableCell>
                  <TableCell>{getReportedContentLabel(report)}</TableCell>
                  <TableCell>
                    {report.status === "waiting_to_be_reviewed" ? (
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-700 border-amber-200"
                      >
                        <AlertCircle className="mr-1 h-3 w-3" /> En attente
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        <CheckCircle className="mr-1 h-3 w-3" /> Traité
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {/* <CategoryEditDialog category={category} onCategoryEdited={fetchCategories}>
                      </CategoryEditDialog>
                      <CategoryDeleteDialog
                        category={category}
                        onCategoryDeleted={fetchCategories}
                      /> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminReportsPage;
