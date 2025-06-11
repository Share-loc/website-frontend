import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import apiClient from "@/service/api/apiClient";
import {
  AlertTriangle,
  Calendar,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white border border-gray-300 rounded shadow-lg">
        <p className="font-bold">{label}</p>
        {payload.map((entry: any, index: any) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value} (${(percent * 100).toFixed(2)}%)`}</text>
    </g>
  );
};

const AdminDashboardPage = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const onPieEnter = (_ : any, index : any) => {
    setActiveIndex(index)
  }

  interface DashboardData {
    mainStats: {
      users: {
        total: number;
        evolution: number;
      };
      activeItems: {
        total: number;
        evolution: number;
      };
      reservations: {
        total: number;
        evolution: number;
      };
      pendingReports: {
        total: number;
        evolution: number;
      };
    };
    categories: [
      {
        id: string;
        name: string;
        itemCount: number;
      }
    ];
    growingCategories: [
      {
        id: string;
        label: string;
        currentCount: number;
        growthPercentage: number;
        trend: "up" | "down";
      }
    ];
    recentReports: [
      {
        id: string;
        motif: string;
        created_at: string;
        status: "waiting_to_be_reviewed" | "reviewed";
        message: any | null;
        review: any | null;
        item: any | null;
        user: any | null;
      }
    ];
    topUsers: [
      {
        id: string;
        username: string;
        avatar: string;
        email: string;
        rentalsCount: number;
        itemsCount: number;
        averageRating: string;
      }
    ];
    rentalsTrend: [
      {
        date: string;
        count: number;
      }
    ];
    yearlyStats: [
      {
        name: string;
        utilisateur: number;
        annonces: number;
        reservations: number;
      }
    ];
  }

  const [data, setData] = useState<DashboardData | null>(null);

  const fetchData = async () => {
    try {
      const response = await apiClient.get("/admin/dashboard");
      setData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données : ", error);
    }
  };

  useEffect(() => {
    fetchData();
    
  }, []);

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">Tableau de bord</h1>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Utilisateurs totaux
            </CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.mainStats.users.total}
            </div>
            <p className="text-xs text-muted-foreground">
              +{data?.mainStats.users.evolution}% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Annonces actives
            </CardTitle>
            <ShoppingBag className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.mainStats.activeItems.total}
            </div>
            <p className="text-xs text-muted-foreground">
              +{data?.mainStats.activeItems.evolution}% par rapport au mois
              dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Réservations totales
            </CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.mainStats.reservations.total}
            </div>
            <p className="text-xs text-muted-foreground">
              +{data?.mainStats.reservations.evolution}% par rapport au mois
              dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Signalements en attente
            </CardTitle>
            <AlertTriangle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.mainStats.pendingReports.total}
            </div>
            <p className="text-xs text-muted-foreground">
              +{data?.mainStats.pendingReports.evolution}% par rapport au mois
              dernier
            </p>
          </CardContent>
        </Card>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 gap-8 mb-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              Évolution des annonces, utilisateurs et réservations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data?.yearlyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  dataKey="annonces"
                  fill="#8884d8"
                  name="Nouvelles annonces"
                />
                <Bar
                  dataKey="utilisateurs"
                  fill="#82ca9d"
                  name="Nouveaux utilisateurs"
                />
                <Bar
                  dataKey="reservations"
                  fill="#ffc658"
                  name="Réservations"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Catégories populaires</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={data?.categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="itemCount"
                  onMouseEnter={onPieEnter}
                >
                  {data?.categories.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Users and Reports */}
      <div className="grid grid-cols-1 gap-8 mb-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.topUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatar} alt={user.username} />
                      <AvatarFallback>
                        {user.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <p className="text-sm font-medium">{user.username}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {user.itemsCount} annonces
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {user.rentalsCount} réservations
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {user.averageRating ? parseFloat(user.averageRating).toFixed(1) : "-"}/5
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Signalements récents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data?.recentReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted"
                  >
                    <div>
                      <p className="text-sm font-medium">{report.motif}</p>
                      <p className="text-xs text-muted-foreground">
                        {report.message && "Message"} 
                        {report.item && "Annonce"}
                        {report.user && "Utilisateur"}
                        {report.review && "Avis"}
                        - Signalé le {new Date(report.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          report.status === "waiting_to_be_reviewed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {report.status === "waiting_to_be_reviewed"
                          ? "En attente"
                          : "Résolu"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Catégories en croissance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data?.growingCategories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium">
                      {category.label}
                    </span>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                      <span className="text-sm font-bold text-green-500">
                        {category.growthPercentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reservation Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Évolution des réservations (30 derniers jours)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data?.rentalsTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 'dataMax']}
              allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default AdminDashboardPage;
