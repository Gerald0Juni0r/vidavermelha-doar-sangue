
import { Heart, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-red-600" />
              <span className="text-2xl font-bold">VidaVermelha</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Conectando doadores e salvando vidas. Juntos construímos uma comunidade 
              de heróis que fazem a diferença no mundo.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-gray-400 hover:text-red-600 cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 text-gray-400 hover:text-red-600 cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-gray-400 hover:text-red-600 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/como-doar" className="text-gray-300 hover:text-white transition-colors">Como Doar</Link></li>
              <li><Link to="/agendamento" className="text-gray-300 hover:text-white transition-colors">Agendamento</Link></li>
              <li><Link to="/area-doador" className="text-gray-300 hover:text-white transition-colors">Área do Doador</Link></li>
              <li><Link to="/admin" className="text-gray-300 hover:text-white transition-colors">Admin</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-600" />
                <span className="text-gray-300">(81) 9876-5432</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-600" />
                <span className="text-gray-300">contato@vidavermelha.com.br</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-red-600" />
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

export default Footer;
