
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, MapPin, User, Mail, Phone, Droplet } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Agendamento = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bloodType: "",
    location: "",
    date: "",
    time: "",
    observations: ""
  });

  const locations = [
    "Recife - Centro (Hemope Central)",
    "Recife - Boa Viagem (Shopping RioMar)",
    "Recife - Casa Amarela (UPA Casa Amarela)",
    "Olinda - Centro Histórico",
    "Jaboatão dos Guararapes - Piedade",
    "Paulista - Centro",
    "Caruaru - Centro",
    "Petrolina - Centro"
  ];

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  
  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    const requiredFields = ['name', 'email', 'phone', 'bloodType', 'location', 'date', 'time'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    toast.success("Agendamento realizado com sucesso! Você receberá uma confirmação por email.");
    console.log("Agendamento:", formData);
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      bloodType: "",
      location: "",
      date: "",
      time: "",
      observations: ""
    });
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Data mínima é hoje
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-red-50 to-background dark:from-red-950/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Calendar className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Agende sua <span className="text-red-600">Doação</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Escolha o local, data e horário mais convenientes para você
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Formulário de Agendamento</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Dados Pessoais */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <User className="h-5 w-5 text-red-600" />
                    Dados Pessoais
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                        placeholder="Digite seu nome completo"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Tipo Sanguíneo *</Label>
                      <Select value={formData.bloodType} onValueChange={(value) => updateFormData('bloodType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione seu tipo sanguíneo" />
                        </SelectTrigger>
                        <SelectContent>
                          {bloodTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              <div className="flex items-center gap-2">
                                <Droplet className="h-4 w-4 text-red-600" />
                                {type}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        placeholder="seu@email.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        placeholder="(81) 99999-9999"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Local e Horário */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-red-600" />
                    Local e Horário
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="location">Local de Doação *</Label>
                    <Select value={formData.location} onValueChange={(value) => updateFormData('location', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o local" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Data *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => updateFormData('date', e.target.value)}
                        min={today}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Horário *</Label>
                      <Select value={formData.time} onValueChange={(value) => updateFormData('time', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o horário" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-red-600" />
                                {time}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Observações */}
                <div className="space-y-2">
                  <Label htmlFor="observations">Observações (Opcional)</Label>
                  <Textarea
                    id="observations"
                    value={formData.observations}
                    onChange={(e) => updateFormData('observations', e.target.value)}
                    placeholder="Alguma observação especial ou dúvida?"
                    rows={3}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700 text-lg py-6"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Confirmar Agendamento
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  * Campos obrigatórios. Você receberá uma confirmação por email após o agendamento.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Agendamento;
