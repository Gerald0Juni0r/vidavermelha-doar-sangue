
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Calendar, Award, ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  const stats = [
    { icon: Heart, value: "2,500+", label: "Vidas Salvas" },
    { icon: Users, value: "1,200+", label: "Doadores Ativos" },
    { icon: Calendar, value: "150+", label: "Doações/Mês" },
    { icon: Award, value: "5", label: "Anos de Serviço" }
  ];

  const bloodTypes = [
    { type: "O-", compatibility: "Doador Universal", urgent: true },
    { type: "AB+", compatibility: "Receptor Universal", urgent: false },
    { type: "A+", compatibility: "Pode doar para A+ e AB+", urgent: true },
    { type: "B-", compatibility: "Pode doar para B- e B+", urgent: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-red-50 pt-20 pb-16">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23dc2626\" fill-opacity=\"0.03\"%3E%3Cpath d=\"M30 0c0 16.569-13.431 30-30 30C16.569 30 30 16.569 30 0z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Seja um
                <span className="text-red-600 block">Herói Vermelho</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Sua doação de sangue pode salvar até 4 vidas. Junte-se à nossa comunidade 
                de heróis e faça a diferença na vida de quem mais precisa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg hover-scale"
                >
                  <Link to="/agendamento">
                    <Heart className="mr-2 h-5 w-5" />
                    Agende sua Doação
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="border-red-200 text-red-700 hover:bg-red-50 px-8 py-6 text-lg"
                >
                  <Link to="/como-doar">
                    Como Doar
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop" 
                  alt="Pessoas doando sangue" 
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <div className="absolute -bottom-4 -left-4 bg-red-600 text-white p-4 rounded-2xl shadow-lg">
                  <Heart className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover-scale">
                <CardContent className="pt-6">
                  <stat.icon className="h-12 w-12 text-red-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blood Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tipos Sanguíneos Necessários</h2>
            <p className="text-xl text-gray-600">Veja quais tipos estão em maior necessidade</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bloodTypes.map((blood, index) => (
              <Card key={index} className={`relative overflow-hidden ${blood.urgent ? 'ring-2 ring-red-200' : ''}`}>
                {blood.urgent && (
                  <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 text-sm font-medium">
                    URGENTE
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-3xl font-bold text-red-600">{blood.type}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{blood.compatibility}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para Salvar Vidas?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            O processo é rápido, seguro e pode fazer toda a diferença
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-white text-red-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
          >
            <Link to="/area-doador">
              Comece Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
