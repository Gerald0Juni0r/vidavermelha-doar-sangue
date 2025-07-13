
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Heart, Clock, Scale, Droplet, Users, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ComoDoor = () => {
  const requirements = [
    "Ter entre 16 e 69 anos",
    "Pesar no mínimo 50kg",
    "Estar em boas condições de saúde",
    "Ter dormido pelo menos 6 horas nas últimas 24 horas",
    "Estar alimentado (evitar jejum)",
    "Apresentar documento oficial com foto"
  ];

  const process = [
    {
      icon: Users,
      title: "Cadastro e Triagem",
      description: "Preenchimento de questionário e verificação dos dados pessoais"
    },
    {
      icon: Scale,
      title: "Avaliação Clínica",
      description: "Verificação de peso, pressão arterial e teste de anemia"
    },
    {
      icon: Droplet,
      title: "Coleta",
      description: "Coleta de aproximadamente 450ml de sangue (processo dura 10-15 min)"
    },
    {
      icon: Heart,
      title: "Recuperação",
      description: "Lanche e hidratação para garantir seu bem-estar"
    }
  ];

  const bloodCompatibility = {
    "O-": { canDonate: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"], canReceive: ["O-"] },
    "O+": { canDonate: ["O+", "A+", "B+", "AB+"], canReceive: ["O-", "O+"] },
    "A-": { canDonate: ["A-", "A+", "AB-", "AB+"], canReceive: ["O-", "A-"] },
    "A+": { canDonate: ["A+", "AB+"], canReceive: ["O-", "O+", "A-", "A+"] },
    "B-": { canDonate: ["B-", "B+", "AB-", "AB+"], canReceive: ["O-", "B-"] },
    "B+": { canDonate: ["B+", "AB+"], canReceive: ["O-", "O+", "B-", "B+"] },
    "AB-": { canDonate: ["AB-", "AB+"], canReceive: ["O-", "A-", "B-", "AB-"] },
    "AB+": { canDonate: ["AB+"], canReceive: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"] }
  };

  const faqs = [
    {
      question: "A doação de sangue dói?",
      answer: "A doação causa apenas um pequeno desconforto no momento da picada da agulha, similar a um exame de sangue comum. O processo é rápido e seguro."
    },
    {
      question: "Quanto tempo leva todo o processo?",
      answer: "Todo o processo, incluindo cadastro, triagem, coleta e recuperação, leva aproximadamente 40 a 60 minutos."
    },
    {
      question: "Com que frequência posso doar?",
      answer: "Homens podem doar a cada 2 meses (máximo 4 vezes por ano) e mulheres a cada 3 meses (máximo 3 vezes por ano)."
    },
    {
      question: "Existe algum risco na doação?",
      answer: "A doação de sangue é muito segura. Utilizamos materiais estéreis e descartáveis, seguindo rigorosos protocolos de segurança."
    },
    {
      question: "Preciso estar em jejum?",
      answer: "Não! É importante estar alimentado. Faça uma refeição leve até 3 horas antes da doação e mantenha-se hidratado."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-red-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Como <span className="text-red-600">Doar Sangue?</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Descubra como é simples, rápido e seguro ser um doador de sangue
          </p>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Requisitos para Doação
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requirements.map((requirement, index) => (
              <Card key={index} className="border-l-4 border-l-red-600">
                <CardContent className="flex items-center p-6">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0" />
                  <span className="text-gray-700">{requirement}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Como Funciona o Processo
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <Card key={index} className="text-center hover-scale">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <step.icon className="h-8 w-8 text-red-600" />
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blood Compatibility Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Compatibilidade Sanguínea
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(bloodCompatibility).map(([type, compatibility]) => (
              <Card key={type} className="hover-scale">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-red-600">{type}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Pode doar para:</h4>
                    <div className="flex flex-wrap gap-1">
                      {compatibility.canDonate.map((bloodType) => (
                        <span key={bloodType} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          {bloodType}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Pode receber de:</h4>
                    <div className="flex flex-wrap gap-1">
                      {compatibility.canReceive.map((bloodType) => (
                        <span key={bloodType} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {bloodType}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Perguntas Frequentes
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg shadow-sm">
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-red-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <AlertCircle className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para Fazer a Diferença?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Cada doação pode salvar até 4 vidas. Seu gesto de amor pode ser o milagre que alguém está esperando.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-white text-red-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
          >
            <Link to="/agendamento">
              <Heart className="mr-2 h-5 w-5" />
              Agende sua Doação Agora
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ComoDoor;
