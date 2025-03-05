import { useCallback, useEffect, useState } from "react";
import { getToken } from "../../const/func";
import { Report } from "@/types/admin/report-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Filter } from "lucide-react";
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
import ReportDetailDialog from "@/components/admin/report/report-detail-dialog";

const AdminReportsPage = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<string>("all");

  const fetchReports = useCallback(() => {
    const params = new URLSearchParams();

    if (filter !== "all") {
      params.append("status", filter);
    }

    fetch(`${import.meta.env.VITE_API_URL}/report?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((response) => response.json())
      .then((response) => setReports(response.data))
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération des signalements : ",
          error
        )
      );
  }, [filter]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtrer - {filter === "all" ? "Tous" : filter === "waiting_to_be_reviewed" ? "Signalements en attente" : "Signalements traités"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilter("all")}>
                Tous les signalements
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("waiting_to_be_reviewed")}>
                Signalements en attente
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("reviewed")}>
                Signalements traités
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
                        <ReportDetailDialog report={report} onStatusChanged={fetchReports} />
                      {/* category={category}
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
