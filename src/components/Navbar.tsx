
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X, User, Calendar, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isLoggedIn, isAdmin } = useAuth();

  const navItems = [
    { name: "Início", path: "/" },
    { name: "Como Doar", path: "/como-doar" },
    { name: "Agendamento", path: "/agendamento" },
    ...(isLoggedIn && !isAdmin ? [{ name: "Área do Doador", path: "/area-doador" }] : []),
    ...(isAdmin ? [{ name: "Painel Admin", path: "/admin" }] : []),
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-background shadow-sm fixed w-full top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold text-foreground">VidaVermelha</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-red-600 ${
                  isActive(item.path) ? "text-red-600" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  Olá, {user?.name.split(' ')[0]}
                </span>
                <Button variant="ghost" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">
                    <User className="h-4 w-4 mr-2" />
                    Entrar
                  </Link>
                </Button>
                <Button asChild className="bg-red-600 hover:bg-red-700">
                  <Link to="/agendamento">
                    <Calendar className="h-4 w-4 mr-2" />
                    Agendar
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile/Tablet menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium px-2 py-1 transition-colors hover:text-red-600 ${
                    isActive(item.path) ? "text-red-600" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                {isLoggedIn ? (
                  <>
                    <span className="text-sm text-muted-foreground px-2">
                      Olá, {user?.name.split(' ')[0]}
                    </span>
                    <Button variant="ghost" onClick={handleLogout} className="justify-start">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" asChild className="justify-start">
                      <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                        <User className="h-4 w-4 mr-2" />
                        Entrar
                      </Link>
                    </Button>
                    <Button asChild className="bg-red-600 hover:bg-red-700 justify-start">
                      <Link to="/agendamento" onClick={() => setIsMenuOpen(false)}>
                        <Calendar className="h-4 w-4 mr-2" />
                        Agendar
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
