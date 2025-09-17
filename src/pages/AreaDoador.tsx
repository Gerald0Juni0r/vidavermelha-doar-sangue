
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Calendar, Award, Clock, User, Droplet, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AreaDoador = () => {
  // Mock data - seria vindo da API
  const doadorData = {
    name: "Maria Silva Santos",
    bloodType: "O-",
    totalDonations: 8,
    lastDonation: "2024-02-15",
    nextEligibleDate: "2024-05-15",
    status: "active"
  };

  const donationHistory = [
    { date: "2024-02-15", location: "São Paulo - Centro", status: "completed" },
    { date: "2023-11-20", location: "São Paulo - Zona Sul", status: "completed" },
    { date: "2023-08-18", location: "São Paulo - Centro", status: "completed" },
    { date: "2023-05-22", location: "Rio de Janeiro - Copacabana", status: "completed" },
    { date: "2023-02-10", location: "São Paulo - Centro", status: "completed" }
  ];

  const achievements = [
    { title: "Primeira Doação", icon: Heart, earned: true, description: "Fez sua primeira doação" },
    { title: "Doador Regular", icon: Calendar, earned: true, description: "5 doações realizadas" },
    { title: "Herói de Vidas", icon: Award, earned: false, description: "10 doações realizadas" },
    { title: "Doador Ouro", icon: TrendingUp, earned: false, description: "20 doações realizadas" }
  ];

  const calculateDaysUntilNext = () => {
    const nextDate = new Date(doadorData.nextEligibleDate);
    const today = new Date();
    const diffTime = nextDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const daysUntilNext = calculateDaysUntilNext();
  const progressPercentage = Math.max(0, 100 - (daysUntilNext / 90) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-red-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Área do <span className="text-red-600">Doador</span>
            </h1>
            <p className="text-xl text-gray-600">
              Acompanhe seu histórico de doações e impacto na comunidade
            </p>
          </div>

          {/* Welcome Card */}
          <Card className="shadow-xl mb-8">
            <CardHeader className="bg-red-600 text-white rounded-t-lg">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl">Bem-vindo, {doadorData.name}!</CardTitle>
                  <p className="text-red-100">Tipo Sanguíneo: {doadorData.bloodType}</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{doadorData.totalDonations}</div>
                  <div className="text-red-100 text-sm">Doações</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Clock className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <div className="font-semibold">Última Doação</div>
                  <div className="text-gray-600">15 de Fevereiro, 2024</div>
                </div>
                
                <div className="text-center">
                  <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold">Próxima Doação</div>
                  <div className="text-gray-600">
                    {daysUntilNext === 0 ? "Disponível agora!" : `Em ${daysUntilNext} dias`}
                  </div>
                </div>
                
                <div className="text-center">
                  <Droplet className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold">Vidas Impactadas</div>
                  <div className="text-gray-600">{doadorData.totalDonations * 4} pessoas</div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Progresso até próxima doação</span>
                  <span className="text-sm text-gray-600">{progressPercentage.toFixed(0)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
              </div>
              
              <div className="mt-6 text-center">
                {daysUntilNext === 0 ? (
                  <Button asChild className="bg-red-600 hover:bg-red-700">
                    <Link to="/agendamento">
                      <Heart className="mr-2 h-4 w-4" />
                      Agendar Nova Doação
                    </Link>
                  </Button>
                ) : (
                  <Button disabled variant="outline">
                    Próxima doação disponível em {daysUntilNext} dias
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Donation History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-red-600" />
                Histórico de Doações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {donationHistory.map((donation, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold">{new Date(donation.date).toLocaleDateString('pt-BR')}</div>
                      <div className="text-gray-600 text-sm">{donation.location}</div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Concluída
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-6 w-6 text-red-600" />
                Conquistas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`p-4 rounded-lg border-2 ${
                    achievement.earned 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <achievement.icon className={`h-8 w-8 ${
                        achievement.earned ? 'text-green-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <div className={`font-semibold ${
                          achievement.earned ? 'text-green-900' : 'text-gray-600'
                        }`}>
                          {achievement.title}
                        </div>
                        <div className="text-sm text-gray-600">{achievement.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900">{doadorData.totalDonations * 4}</div>
                <div className="text-gray-600">Vidas que você ajudou</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Droplet className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900">{doadorData.totalDonations * 450}ml</div>
                <div className="text-gray-600">Total de sangue doado</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900">12</div>
                <div className="text-gray-600">Meses como doador</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AreaDoador;
