
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Calendar, 
  BarChart3, 
  Search, 
  Filter,
  Eye,
  Edit,
  UserPlus,
  CalendarDays,
  AlertCircle,
  TrendingUp,
  Droplet
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const stats = [
    { icon: Users, label: "Total de Doadores", value: "1,248", change: "+12%" },
    { icon: Calendar, label: "Agendamentos Hoje", value: "24", change: "+8%" },
    { icon: Droplet, label: "Doações Este Mês", value: "156", change: "+15%" },
    { icon: AlertCircle, label: "Tipos Urgentes", value: "3", change: "A-, O-, AB-" }
  ];

  const recentDonors = [
    { 
      id: 1, 
      name: "Maria Silva Santos", 
      email: "maria@email.com", 
      bloodType: "O-", 
      phone: "(11) 99999-9999",
      totalDonations: 8,
      lastDonation: "2024-02-15",
      status: "active"
    },
    { 
      id: 2, 
      name: "João Pedro Oliveira", 
      email: "joao@email.com", 
      bloodType: "A+", 
      phone: "(11) 88888-8888",
      totalDonations: 3,
      lastDonation: "2024-01-20",
      status: "active"
    },
    { 
      id: 3, 
      name: "Ana Carolina Costa", 
      email: "ana@email.com", 
      bloodType: "B-", 
      phone: "(11) 77777-7777",
      totalDonations: 12,
      lastDonation: "2024-03-01",
      status: "inactive"
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      donorName: "Carlos Eduardo",
      bloodType: "O+",
      date: "2024-03-20",
      time: "09:00",
      location: "São Paulo - Centro",
      status: "confirmed"
    },
    {
      id: 2,
      donorName: "Fernanda Lima",
      bloodType: "A-",
      date: "2024-03-20",
      time: "10:30",
      location: "São Paulo - Zona Sul",
      status: "pending"
    },
    {
      id: 3,
      donorName: "Roberto Santos",
      bloodType: "AB+",
      date: "2024-03-21",
      time: "14:00",
      location: "Rio de Janeiro - Copacabana",
      status: "confirmed"
    }
  ];

  const getStatusBadge = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      confirmed: "bg-blue-100 text-blue-800",
      pending: "bg-yellow-100 text-yellow-800"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="pt-20 pb-8 bg-gradient-to-br from-red-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Painel <span className="text-red-600">Administrativo</span>
          </h1>
          <p className="text-xl text-gray-600">
            Gerencie doadores, agendamentos e monitore estatísticas
          </p>
        </div>
      </section>

      {/* Statistics Cards */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="shadow-lg hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                    </div>
                    <stat.icon className="h-12 w-12 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <Tabs defaultValue="donors" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="donors" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Doadores
              </TabsTrigger>
              <TabsTrigger value="appointments" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Agendamentos
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Relatórios
              </TabsTrigger>
            </TabsList>

            {/* Donors Tab */}
            <TabsContent value="donors">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Gerenciar Doadores</CardTitle>
                    <Button className="bg-red-600 hover:bg-red-700">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Novo Doador
                    </Button>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <div className="relative flex-1">
                      <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                      <Input
                        placeholder="Buscar doadores..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtros
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentDonors.map((donor) => (
                      <div key={donor.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{donor.name}</h3>
                            <Badge className={getStatusBadge(donor.status)}>
                              {donor.status === 'active' ? 'Ativo' : 'Inativo'}
                            </Badge>
                            <Badge variant="outline" className="bg-red-50 text-red-700">
                              {donor.bloodType}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>{donor.email} • {donor.phone}</p>
                            <p>{donor.totalDonations} doações • Última: {new Date(donor.lastDonation).toLocaleDateString('pt-BR')}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appointments Tab */}
            <TabsContent value="appointments">
              <Card>
                <CardHeader>
                  <CardTitle>Agendamentos Próximos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{appointment.donorName}</h3>
                            <Badge variant="outline" className="bg-red-50 text-red-700">
                              {appointment.bloodType}
                            </Badge>
                            <Badge className={getStatusBadge(appointment.status)}>
                              {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>{new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}</p>
                            <p>{appointment.location}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <CalendarDays className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-red-600" />
                      Doações por Mês
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Janeiro</span>
                        <span className="font-semibold">142 doações</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Fevereiro</span>
                        <span className="font-semibold">156 doações</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Março</span>
                        <span className="font-semibold">98 doações</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Droplet className="h-5 w-5 text-red-600" />
                      Tipos Sanguíneos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['O+', 'A+', 'B+', 'AB+', 'O-', 'A-', 'B-', 'AB-'].map((type) => (
                        <div key={type} className="flex justify-between items-center">
                          <span className="font-medium">{type}</span>
                          <Badge variant="outline">
                            {Math.floor(Math.random() * 200) + 50} doadores
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Admin;
