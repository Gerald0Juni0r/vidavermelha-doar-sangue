import React, { useState, useEffect, createContext, useContext } from 'react';
import './App.css';

// Context de Autenticação
const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    if (email === 'admin@vidavermelha.com' && password === 'admin123') {
      const adminUser = {
        id: '1',
        name: 'Dr. Carlos Alberto',
        email: 'admin@vidavermelha.com',
        role: 'admin',
        bloodType: 'AB+',
        totalDonations: 15,
        lastDonation: '2024-05-15'
      };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return true;
    } else if (email === 'maria@email.com' && password === '123456') {
      const donorUser = {
        id: '2',
        name: 'Maria Silva Santos',
        email: 'maria@email.com',
        role: 'donor',
        bloodType: 'O-',
        totalDonations: 8,
        lastDonation: '2024-06-20'
      };
      setUser(donorUser);
      localStorage.setItem('user', JSON.stringify(donorUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isLoggedIn = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

// Componente Principal
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, login, logout, isLoggedIn, isAdmin } = useAuth();
  const [loginForm, setLoginForm] = useState({ email: '', password: '', error: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(loginForm.email, loginForm.password);
    if (success) {
      setCurrentPage('area-doador');
      setLoginForm({ email: '', password: '', error: '' });
    } else {
      setLoginForm({ ...loginForm, error: 'Email ou senha incorretos' });
    }
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
  };

  // Componente Navbar
  const Navbar = () => (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">❤️</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">VidaVermelha</span>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <button onClick={() => setCurrentPage('home')} className="text-gray-600 hover:text-red-600">Início</button>
            <button onClick={() => setCurrentPage('como-doar')} className="text-gray-600 hover:text-red-600">Como Doar</button>
            <button onClick={() => setCurrentPage('agendamento')} className="text-gray-600 hover:text-red-600">Agendamento</button>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Olá, {user.name}</span>
                <button onClick={() => setCurrentPage('area-doador')} className="text-gray-600 hover:text-red-600">Área do Doador</button>
                {isAdmin && (
                  <button onClick={() => setCurrentPage('admin')} className="text-gray-600 hover:text-red-600">Admin</button>
                )}
                <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Sair</button>
              </div>
            ) : (
              <button onClick={() => setCurrentPage('login')} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Login</button>
            )}
          </div>

          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              <span className="text-2xl">{isMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            <button onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-gray-600">Início</button>
            <button onClick={() => { setCurrentPage('como-doar'); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-gray-600">Como Doar</button>
            <button onClick={() => { setCurrentPage('agendamento'); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-gray-600">Agendamento</button>
            {isLoggedIn ? (
              <>
                <button onClick={() => { setCurrentPage('area-doador'); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-gray-600">Área do Doador</button>
                {isAdmin && (
                  <button onClick={() => { setCurrentPage('admin'); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-gray-600">Admin</button>
                )}
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-red-600">Sair</button>
              </>
            ) : (
              <button onClick={() => { setCurrentPage('login'); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-red-600">Login</button>
            )}
          </div>
        )}
      </div>
    </nav>
  );

  // Componente Footer
  const Footer = () => (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">❤️</span>
              </div>
              <span className="text-2xl font-bold">VidaVermelha</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Conectando doadores e salvando vidas. Juntos construímos uma comunidade 
              de heróis que fazem a diferença no mundo.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><button onClick={() => setCurrentPage('como-doar')} className="text-gray-300 hover:text-white">Como Doar</button></li>
              <li><button onClick={() => setCurrentPage('agendamento')} className="text-gray-300 hover:text-white">Agendamento</button></li>
              <li><button onClick={() => setCurrentPage('area-doador')} className="text-gray-300 hover:text-white">Área do Doador</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-red-600">📞</span>
                <span className="text-gray-300">(81) 9876-5432</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-red-600">📧</span>
                <span className="text-gray-300">contato@vidavermelha.com.br</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-red-600">📍</span>
                <span className="text-gray-300">Av. Antônio Nunes, 10 - Recife</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400">
            © 2024 VidaVermelha. Todos os direitos reservados. Desenvolvido com ❤️ para salvar vidas.
          </p>
        </div>
      </div>
    </footer>
  );

  // Páginas
  const HomePage = () => (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Doe Sangue, <span className="text-red-200">Salve Vidas</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100">
              Sua doação pode ser a diferença entre a vida e a morte
            </p>
            <button 
              onClick={() => setCurrentPage('agendamento')}
              className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all"
            >
              Agendar Doação
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-red-600 mb-2">2.450</div>
              <div className="text-gray-600">Vidas Salvas</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-red-600 mb-2">815</div>
              <div className="text-gray-600">Doadores Ativos</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-red-600 mb-2">98%</div>
              <div className="text-gray-600">Taxa de Sucesso</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const LoginPage = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xl">❤️</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Entre na sua conta
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-red-500 focus:ring-red-500"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-red-500 focus:ring-red-500"
                placeholder="********"
              />
            </div>

            {loginForm.error && (
              <div className="text-red-600 text-sm">{loginForm.error}</div>
            )}

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600 mb-2">Contas de teste:</p>
            <p className="text-xs text-gray-500">Admin: admin@vidavermelha.com / admin123</p>
            <p className="text-xs text-gray-500">Doador: maria@email.com / 123456</p>
          </div>
        </div>
      </div>
    </div>
  );

  const AreaDoadorPage = () => {
    if (!isLoggedIn) {
      setCurrentPage('login');
      return null;
    }

    const calculateDaysUntilNext = () => {
      const lastDonationDate = new Date(user.lastDonation);
      const nextEligible = new Date(lastDonationDate);
      nextEligible.setDate(nextEligible.getDate() + (user.role === 'admin' ? 60 : 90));
      const today = new Date();
      const diffTime = nextEligible - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    };

    const daysUntilNext = calculateDaysUntilNext();
    const canDonate = daysUntilNext === 0;

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bem-vindo{isAdmin ? ' Dr.' : 'a'}, {user.name}!
            </h1>
            <p className="text-gray-600">
              {isAdmin ? 'Painel administrativo e área de doação' : 'Acompanhe seu histórico de doações'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tipo Sanguíneo</h3>
              <div className="text-3xl font-bold text-red-600">{user.bloodType}</div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Total de Doações</h3>
              <div className="text-3xl font-bold text-red-600">{user.totalDonations}</div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Próxima Doação</h3>
              <div className="text-lg font-semibold text-gray-900">
                {canDonate ? (
                  <span className="text-green-600">Liberado!</span>
                ) : (
                  <span>{daysUntilNext} dias</span>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Histórico de Doações</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-red-600 pl-4">
                <div className="font-semibold">{user.lastDonation}</div>
                <div className="text-gray-600">Hospital {isAdmin ? 'Sírio-Libanês' : 'dos Pearls'}</div>
                <div className="text-sm text-gray-500">450ml • {user.bloodType}</div>
              </div>
              
              {user.totalDonations > 1 && (
                <div className="border-l-4 border-gray-300 pl-4">
                  <div className="font-semibold">
                    {new Date(new Date(user.lastDonation).setMonth(new Date(user.lastDonation).getMonth() - 3)).toISOString().split('T')[0]}
                  </div>
                  <div className="text-gray-600">Hospital {isAdmin ? 'Albert Einstein' : 'da Restauração'}</div>
                  <div className="text-sm text-gray-500">450ml • {user.bloodType}</div>
                </div>
              )}
            </div>

            {canDonate && (
              <button 
                onClick={() => setCurrentPage('agendamento')}
                className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
              >
                Agendar Nova Doação
              </button>
            )}
          </div>

          {isAdmin && (
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Painel Administrativo</h2>
              <button 
                onClick={() => setCurrentPage('admin')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Acessar Admin
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const AdminPage = () => {
    if (!isAdmin) {
      setCurrentPage('home');
      return null;
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Painel Administrativo</h1>
          
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Doadores Ativos</h3>
              <div className="text-3xl font-bold text-blue-600">815</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Agendamentos Hoje</h3>
              <div className="text-3xl font-bold text-green-600">12</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Estoque Crítico</h3>
              <div className="text-3xl font-bold text-red-600">3</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Doações Mês</h3>
              <div className="text-3xl font-bold text-purple-600">147</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Funcionalidades Admin</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500">
                Gerenciar Doadores
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500">
                Ver Agendamentos
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500">
                Relatórios
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500">
                Configurações
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ComoDoarPage = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">Como Doar Sangue</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Requisitos para Doação</h2>
          <ul className="space-y-3 text-gray-700">
            <li>• Ter entre 16 e 69 anos</li>
            <li>• Pesar no mínimo 50kg</li>
            <li>• Estar bem de saúde</li>
            <li>• Apresentar documento oficial com foto</li>
            <li>• Não ter feito tatuagem nos últimos 12 meses</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Processo de Doação</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">1</span>
              </div>
              <h3 className="font-semibold mb-2">Cadastro</h3>
              <p className="text-gray-600">Apresente seus documentos e preencha o formulário</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">2</span>
              </div>
              <h3 className="font-semibold mb-2">Triagem</h3>
              <p className="text-gray-600">Avaliação médica e verificação dos requisitos</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">3</span>
              </div>
              <h3 className="font-semibold mb-2">Doação</h3>
              <p className="text-gray-600">Coleta do sangue em ambiente seguro e confortável</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AgendamentoPage = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">Agendar Doação</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CPF</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Data Preferida</label>
                <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Horário</label>
                <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>08:00</option>
                  <option>10:00</option>
                  <option>14:00</option>
                  <option>16:00</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Local</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
                <option>Hospital dos Pearls - Recife</option>
                <option>Hospital da Restauração - Recife</option>
                <option>Hemope - Recife</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 font-semibold"
            >
              Confirmar Agendamento
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  // Renderização da página atual
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'login': return <LoginPage />;
      case 'area-doador': return <AreaDoadorPage />;
      case 'admin': return <AdminPage />;
      case 'como-doar': return <ComoDoarPage />;
      case 'agendamento': return <AgendamentoPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="App">
      <Navbar />
      {renderCurrentPage()}
      <Footer />
    </div>
  );
};

// Componente raiz com provider
const AppWithProvider = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWithProvider;