import React, { useState, useEffect, createContext, useContext } from 'react';
import './App.css';

// Context de Autenticação
const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
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

  const login = (email, password) => {
    if (email === 'admin@vidavermelha.com' && password === 'admin123') {
      const adminUser = {
        id: '1',
        name: 'Dr. Carlos Henrique',
        email: 'admin@vidavermelha.com',
        role: 'admin',
        bloodType: 'AB+'
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
        bloodType: 'O-'
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

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

// Componente de Navegação
const Navbar = () => {
  const { user, logout, isLoggedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-red-600">❤️ VidaVermelha</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-gray-700 hover:text-red-600">Início</a>
            <a href="#como-doar" className="text-gray-700 hover:text-red-600">Como Doar</a>
            <a href="#agendamento" className="text-gray-700 hover:text-red-600">Agendamento</a>
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <a href="#area-doador" className="text-gray-700 hover:text-red-600">Área do Doador</a>
                <span className="text-gray-600">Olá, {user.name.split(' ')[0]}</span>
                <button onClick={handleLogout} className="btn-secondary">Sair</button>
              </div>
            ) : (
              <a href="#login" className="btn-primary">Entrar</a>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-red-600"
            >
              ☰
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
              <a href="#inicio" className="block px-3 py-2 text-gray-700">Início</a>
              <a href="#como-doar" className="block px-3 py-2 text-gray-700">Como Doar</a>
              <a href="#agendamento" className="block px-3 py-2 text-gray-700">Agendamento</a>
              {isLoggedIn ? (
                <>
                  <a href="#area-doador" className="block px-3 py-2 text-gray-700">Área do Doador</a>
                  <button onClick={handleLogout} className="block px-3 py-2 text-gray-700">Sair</button>
                </>
              ) : (
                <a href="#login" className="block px-3 py-2 text-gray-700">Entrar</a>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Componente de Footer
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">❤️</span>
              <span className="text-2xl font-bold">VidaVermelha</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Conectando doadores e salvando vidas. Juntos construímos uma comunidade 
              de heróis que fazem a diferença no mundo.
            </p>
            <div className="flex space-x-4">
              <span className="text-gray-400 hover:text-red-600 cursor-pointer">📘</span>
              <span className="text-gray-400 hover:text-red-600 cursor-pointer">📷</span>
              <span className="text-gray-400 hover:text-red-600 cursor-pointer">🐦</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#como-doar" className="text-gray-300 hover:text-white">Como Doar</a></li>
              <li><a href="#agendamento" className="text-gray-300 hover:text-white">Agendamento</a></li>
              <li><a href="#area-doador" className="text-gray-300 hover:text-white">Área do Doador</a></li>
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
                <span className="text-red-600">✉️</span>
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
};

// Componente de Login
const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      onClose();
      window.location.reload();
    } else {
      setError('Email ou senha incorretos');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Entrar na Sua Conta</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="seu@email.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="••••••••"
              required
            />
          </div>
          
          {error && <div className="text-red-600 text-sm">{error}</div>}
          
          <button type="submit" className="btn-primary w-full">
            Entrar
          </button>
        </form>
        
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Contas de teste:</p>
          <p className="text-xs text-gray-500">
            <strong>Doador:</strong> maria@email.com / 123456<br/>
            <strong>Admin:</strong> admin@vidavermelha.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
};

// Componente da Área do Doador
const AreaDoador = () => {
  const { user } = useAuth();
  
  // Dados diferentes para admin e doador
  const userData = user.role === 'admin' ? {
    name: user.name,
    bloodType: user.bloodType,
    totalDonations: 15,
    lastDonation: "2024-03-10",
    nextEligibleDate: "2024-05-09", // 60 dias para admin
    status: "active",
    role: "Administrador do Sistema"
  } : {
    name: user.name,
    bloodType: user.bloodType,
    totalDonations: 8,
    lastDonation: "2024-02-15",
    nextEligibleDate: "2024-05-15", // 90 dias para doador
    status: "active",
    role: "Doador Voluntário"
  };

  const donationHistory = user.role === 'admin' ? [
    { date: "2024-03-10", location: "Hospital do Coração - Recife", status: "completed" },
    { date: "2024-01-08", location: "Hospital Osvaldo Cruz - Recife", status: "completed" },
    { date: "2023-11-05", location: "HEMOPE - Recife", status: "completed" },
    { date: "2023-09-02", location: "Hospital Agamenon Magalhães", status: "completed" },
    { date: "2023-06-30", location: "HEMOPE - Recife", status: "completed" }
  ] : [
    { date: "2024-02-15", location: "HEMOPE - Recife", status: "completed" },
    { date: "2023-11-20", location: "Hospital da Restauração", status: "completed" },
    { date: "2023-08-18", location: "HEMOPE - Recife", status: "completed" },
    { date: "2023-05-22", location: "Hospital Osvaldo Cruz", status: "completed" },
    { date: "2023-02-10", location: "HEMOPE - Recife", status: "completed" }
  ];

  const achievements = user.role === 'admin' ? [
    { title: "Primeira Doação", earned: true, description: "Fez sua primeira doação" },
    { title: "Doador Regular", earned: true, description: "5 doações realizadas" },
    { title: "Herói de Vidas", earned: true, description: "10 doações realizadas" },
    { title: "Doador Ouro", earned: false, description: "20 doações realizadas" }
  ] : [
    { title: "Primeira Doação", earned: true, description: "Fez sua primeira doação" },
    { title: "Doador Regular", earned: true, description: "5 doações realizadas" },
    { title: "Herói de Vidas", earned: false, description: "10 doações realizadas" },
    { title: "Doador Ouro", earned: false, description: "20 doações realizadas" }
  ];

  const calculateDaysUntilNext = () => {
    const nextDate = new Date(userData.nextEligibleDate);
    const today = new Date();
    const diffTime = nextDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const daysUntilNext = calculateDaysUntilNext();
  const maxDays = user.role === 'admin' ? 60 : 90;
  const progressPercentage = Math.max(0, 100 - (daysUntilNext / maxDays) * 100);

  return (
    <div className="area-doador">
      <div className="container">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Área do <span className="text-red-600">{user.role === 'admin' ? 'Administrador' : 'Doador'}</span>
          </h1>
          <p className="text-xl text-gray-600">
            {user.role === 'admin' ? 
              'Painel administrativo e histórico pessoal de doações' : 
              'Acompanhe seu histórico de doações e impacto na comunidade'
            }
          </p>
        </div>

        <div className="welcome-card">
          <div className="welcome-header">
            <div>
              <h2>Bem-vindo, {userData.name}!</h2>
              <p>Tipo Sanguíneo: {userData.bloodType} • {userData.role}</p>
            </div>
            <div className="donation-count">
              <div className="count">{userData.totalDonations}</div>
              <div className="label">Doações</div>
            </div>
          </div>
          
          <div className="stats-grid">
            <div className="stat-item">
              <span className="icon">🕒</span>
              <div className="stat-content">
                <div className="stat-title">Última Doação</div>
                <div className="stat-value">{new Date(userData.lastDonation).toLocaleDateString('pt-BR')}</div>
              </div>
            </div>
            
            <div className="stat-item">
              <span className="icon">📅</span>
              <div className="stat-content">
                <div className="stat-title">Próxima Doação</div>
                <div className="stat-value">
                  {daysUntilNext === 0 ? "Disponível agora!" : `Em ${daysUntilNext} dias`}
                </div>
              </div>
            </div>
            
            <div className="stat-item">
              <span className="icon">💧</span>
              <div className="stat-content">
                <div className="stat-title">Vidas Impactadas</div>
                <div className="stat-value">{userData.totalDonations * 4} pessoas</div>
              </div>
            </div>
          </div>
          
          <div className="progress-section">
            <div className="progress-header">
              <span>Progresso até próxima doação</span>
              <span>{progressPercentage.toFixed(0)}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: `${progressPercentage}%`}}></div>
            </div>
          </div>
          
          <div className="action-section">
            {daysUntilNext === 0 ? (
              <button className="btn-primary">
                ❤️ Agendar Nova Doação
              </button>
            ) : (
              <button className="btn-disabled" disabled>
                Próxima doação disponível em {daysUntilNext} dias
              </button>
            )}
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="card">
            <div className="card-header">
              <h3>📅 Histórico de Doações</h3>
            </div>
            <div className="card-content">
              {donationHistory.map((donation, index) => (
                <div key={index} className="history-item">
                  <div>
                    <div className="history-date">{new Date(donation.date).toLocaleDateString('pt-BR')}</div>
                    <div className="history-location">{donation.location}</div>
                  </div>
                  <span className="status-badge">Concluída</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>🏆 Conquistas</h3>
            </div>
            <div className="card-content">
              {achievements.map((achievement, index) => (
                <div key={index} className={`achievement ${achievement.earned ? 'earned' : 'locked'}`}>
                  <span className={`achievement-icon ${achievement.earned ? 'earned' : 'locked'}`}>
                    {achievement.earned ? '🏆' : '🔒'}
                  </span>
                  <div>
                    <div className="achievement-title">{achievement.title}</div>
                    <div className="achievement-desc">{achievement.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="stats-cards">
          <div className="stat-card">
            <span className="stat-icon">❤️</span>
            <div className="stat-number">{userData.totalDonations * 4}</div>
            <div className="stat-label">Vidas que você ajudou</div>
          </div>
          
          <div className="stat-card">
            <span className="stat-icon">💧</span>
            <div className="stat-number">{userData.totalDonations * 450}ml</div>
            <div className="stat-label">Total de sangue doado</div>
          </div>
          
          <div className="stat-card">
            <span className="stat-icon">📈</span>
            <div className="stat-number">{user.role === 'admin' ? '24' : '12'}</div>
            <div className="stat-label">Meses como {user.role === 'admin' ? 'administrador' : 'doador'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente Principal da Aplicação
const AppContent = () => {
  const [currentSection, setCurrentSection] = useState('inicio');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'inicio';
      setCurrentSection(hash);
      
      if (hash === 'login' && !isLoggedIn) {
        setShowLoginModal(true);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isLoggedIn]);

  const renderContent = () => {
    if (currentSection === 'area-doador' && isLoggedIn) {
      return <AreaDoador />;
    }

    return (
      <div>
        {/* Hero Section */}
        <section id="inicio" className="hero">
          <div className="container text-center">
            <h1 className="hero-title">
              Doe Sangue, <span className="text-red-600">Salve Vidas</span>
            </h1>
            <p className="hero-subtitle">
              Cada doação pode salvar até 4 vidas. Seja um herói para quem precisa.
            </p>
            <div className="hero-buttons">
              <a href="#agendamento" className="btn-primary">Agendar Doação</a>
              <a href="#como-doar" className="btn-secondary">Como Doar</a>
            </div>
          </div>
        </section>

        {/* Como Doar */}
        <section id="como-doar" className="section">
          <div className="container">
            <h2 className="section-title">Como Doar Sangue</h2>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <h3>Requisitos</h3>
                <p>Tenha entre 16 e 69 anos, pese mais de 50kg e esteja em bom estado de saúde.</p>
              </div>
              <div className="step-card">
                <div className="step-number">2</div>
                <h3>Agendamento</h3>
                <p>Agende sua doação online ou por telefone. É rápido e fácil!</p>
              </div>
              <div className="step-card">
                <div className="step-number">3</div>
                <h3>Doação</h3>
                <p>Compareça no local e horário marcado. O processo leva cerca de 30 minutos.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Agendamento */}
        <section id="agendamento" className="section bg-gray-50">
          <div className="container">
            <h2 className="section-title">Agende sua Doação</h2>
            <div className="form-card">
              <form className="appointment-form">
                <div className="form-grid">
                  <div>
                    <label>Nome Completo</label>
                    <input type="text" className="form-input" placeholder="Seu nome completo" />
                  </div>
                  <div>
                    <label>Telefone</label>
                    <input type="tel" className="form-input" placeholder="(00) 00000-0000" />
                  </div>
                  <div>
                    <label>Email</label>
                    <input type="email" className="form-input" placeholder="seu@email.com" />
                  </div>
                  <div>
                    <label>Tipo Sanguíneo</label>
                    <select className="form-input">
                      <option>Selecione</option>
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                      <option>O+</option>
                      <option>O-</option>
                    </select>
                  </div>
                  <div>
                    <label>Data Preferida</label>
                    <input type="date" className="form-input" />
                  </div>
                  <div>
                    <label>Horário Preferido</label>
                    <select className="form-input">
                      <option>Manhã (8h-12h)</option>
                      <option>Tarde (13h-17h)</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full mt-6">
                  Agendar Doação
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        {renderContent()}
      </main>
      <Footer />
      
      {showLoginModal && (
        <LoginForm onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;