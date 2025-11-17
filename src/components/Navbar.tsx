import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, LayoutDashboard, Plus } from 'lucide-react';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export default function Navbar({ isLoggedIn, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/');
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className={`
        sticky top-0 z-50
        transition-all duration-500 ease-out
        ${scrolled
          ? 'bg-[rgba(26,26,46,0.85)] backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5'
          : 'bg-[rgba(26,26,46,0.4)] backdrop-blur-md border-b border-white/5'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group relative"
            onClick={closeMenu}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z" clipRule="evenodd" />
                  <path d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z" />
                </svg>
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              QR Survey
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="
                    flex items-center gap-2.5 px-5 py-2.5 rounded-xl
                    text-[#e4e4e7] font-medium
                    hover:bg-[rgba(59,130,246,0.1)] hover:text-[#60a5fa]
                    transition-all duration-300 ease-out
                    group relative overflow-hidden
                  "
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/0 via-[#3b82f6]/5 to-[#3b82f6]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <LayoutDashboard size={18} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative z-10">Dashboard</span>
                </Link>

                <Link
                  to="/create"
                  className="
                    flex items-center gap-2.5 px-5 py-2.5 rounded-xl
                    text-[#e4e4e7] font-medium
                    hover:bg-[rgba(139,92,246,0.1)] hover:text-[#a78bfa]
                    transition-all duration-300 ease-out
                    group relative overflow-hidden
                  "
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6]/0 via-[#8b5cf6]/5 to-[#8b5cf6]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <Plus size={18} className="relative z-10 group-hover:rotate-90 transition-transform duration-300" />
                  <span className="relative z-10">Crear Encuesta</span>
                </Link>

                <div className="h-6 w-px bg-white/10 mx-2"></div>

                <button
                  onClick={handleLogout}
                  className="
                    flex items-center gap-2.5 px-5 py-2.5 rounded-xl
                    bg-[rgba(239,68,68,0.1)] text-[#ef4444] font-medium
                    hover:bg-[rgba(239,68,68,0.2)] hover:text-[#fca5a5]
                    transition-all duration-300 ease-out
                    group relative overflow-hidden
                  "
                >
                  <LogOut size={18} className="group-hover:translate-x-[-2px] transition-transform duration-300" />
                  <span>Salir</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="
                    px-6 py-2.5 rounded-xl font-semibold
                    text-[#e4e4e7]
                    hover:bg-[rgba(59,130,246,0.1)] hover:text-[#60a5fa]
                    transition-all duration-300 ease-out
                  "
                >
                  Iniciar Sesión
                </Link>

                <Link
                  to="/register"
                  className="
                    relative px-6 py-2.5 rounded-xl font-semibold
                    bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]
                    text-white
                    shadow-lg shadow-[#3b82f6]/30
                    hover:shadow-xl hover:shadow-[#3b82f6]/40
                    hover:scale-105
                    transition-all duration-300 ease-out
                    overflow-hidden group
                  "
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2563eb] to-[#7c3aed] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">Registrarse</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="
              md:hidden p-2 rounded-xl
              text-[#60a5fa] hover:text-[#a78bfa]
              hover:bg-[rgba(59,130,246,0.1)]
              transition-all duration-300 ease-out
              group
            "
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu
                size={24}
                className={`
                  absolute inset-0 transition-all duration-300
                  ${isOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}
                `}
              />
              <X
                size={24}
                className={`
                  absolute inset-0 transition-all duration-300
                  ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'}
                `}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            md:hidden overflow-hidden
            transition-all duration-500 ease-out
            ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="py-4 space-y-2 border-t border-white/5">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="
                    flex items-center gap-3 px-4 py-3 rounded-xl
                    text-[#e4e4e7] font-medium
                    hover:bg-[rgba(59,130,246,0.1)] hover:text-[#60a5fa]
                    transition-all duration-300 ease-out
                    transform hover:translate-x-1
                  "
                >
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>

                <Link
                  to="/create"
                  onClick={closeMenu}
                  className="
                    flex items-center gap-3 px-4 py-3 rounded-xl
                    text-[#e4e4e7] font-medium
                    hover:bg-[rgba(139,92,246,0.1)] hover:text-[#a78bfa]
                    transition-all duration-300 ease-out
                    transform hover:translate-x-1
                  "
                >
                  <Plus size={20} />
                  <span>Crear Encuesta</span>
                </Link>

                <div className="h-px bg-white/5 my-2"></div>

                <button
                  onClick={handleLogout}
                  className="
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl
                    bg-[rgba(239,68,68,0.1)] text-[#ef4444] font-medium
                    hover:bg-[rgba(239,68,68,0.2)] hover:text-[#fca5a5]
                    transition-all duration-300 ease-out
                  "
                >
                  <LogOut size={20} />
                  <span>Salir</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="
                    block px-4 py-3 rounded-xl font-medium
                    text-[#e4e4e7]
                    hover:bg-[rgba(59,130,246,0.1)] hover:text-[#60a5fa]
                    transition-all duration-300 ease-out
                    transform hover:translate-x-1
                  "
                >
                  Iniciar Sesión
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="
                    block px-4 py-3 rounded-xl font-semibold text-center
                    bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]
                    text-white
                    shadow-lg shadow-[#3b82f6]/30
                    hover:shadow-xl hover:shadow-[#3b82f6]/40
                    hover:scale-[1.02]
                    transition-all duration-300 ease-out
                  "
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
