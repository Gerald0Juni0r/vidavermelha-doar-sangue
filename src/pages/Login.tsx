
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Mail, Lock, User, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn, user } = useAuth();
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  // Redirecionar se já estiver logado
  if (isLoggedIn) {
    navigate(user?.role === 'admin' ? '/admin' : '/area-doador');
    return null;
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    const success = await login(loginData.email, loginData.password);
    if (success) {
      toast.success("Login realizado com sucesso!");
      navigate(user?.role === 'admin' ? '/admin' : '/area-doador');
    } else {
      toast.error("Email ou senha incorretos.");
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerData.name || !registerData.email || !registerData.phone || !registerData.password) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }
    toast.success("Cadastro realizado com sucesso!");
    console.log("Register:", registerData);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-red-50 to-background dark:from-red-950/20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Heart className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Bem-vindo ao <span className="text-red-600">VidaVermelha</span>
            </h1>
            <p className="text-muted-foreground">
              Entre em sua conta ou cadastre-se para começar a salvar vidas
            </p>
            <div className="mt-4 p-4 bg-muted rounded-lg text-sm">
              <p className="font-semibold mb-2">Contas de teste:</p>
              <p><strong>Admin:</strong> admin@vidavermelha.com / admin123</p>
              <p><strong>Doador:</strong> maria@email.com / 123456</p>
            </div>
          </div>

          <Card className="shadow-xl">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="register">Cadastrar</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <CardHeader>
                  <CardTitle className="text-center">Entre em sua conta</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-red-600" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="seu@email.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-red-600" />
                        Senha
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="Digite sua senha"
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-red-600 hover:bg-red-700"
                    >
                      Entrar
                    </Button>

                    <div className="text-center">
                      <Link to="/esqueci-senha" className="text-sm text-red-600 hover:underline">
                        Esqueceu sua senha?
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register">
                <CardHeader>
                  <CardTitle className="text-center">Criar nova conta</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="h-4 w-4 text-red-600" />
                        Nome Completo
                      </Label>
                      <Input
                        id="name"
                        value={registerData.name}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Digite seu nome completo"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-red-600" />
                        Email
                      </Label>
                      <Input
                        id="register-email"
                        type="email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="seu@email.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-red-600" />
                        Telefone
                      </Label>
                      <Input
                        id="phone"
                        value={registerData.phone}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="(11) 99999-9999"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password" className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-red-600" />
                        Senha
                      </Label>
                      <Input
                        id="register-password"
                        type="password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="Digite sua senha"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-red-600" />
                        Confirmar Senha
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        placeholder="Confirme sua senha"
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-red-600 hover:bg-red-700"
                    >
                      Criar Conta
                    </Button>

                    <div className="text-center text-sm text-gray-600">
                      Ao se cadastrar, você concorda com nossos{" "}
                      <Link to="/termos" className="text-red-600 hover:underline">
                        Termos de Uso
                      </Link>{" "}
                      e{" "}
                      <Link to="/privacidade" className="text-red-600 hover:underline">
                        Política de Privacidade
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;
