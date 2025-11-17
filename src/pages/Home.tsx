import { Link } from 'react-router-dom';
import { QrCode, Zap, BarChart3, Users, ArrowRight, Sparkles, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30">
              <Sparkles size={16} className="text-blue-400" />
              <span className="text-sm font-medium text-gray-300">La nueva era de las encuestas</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white">
              Encuestas con QR
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              La forma moderna y profesional de recopilar datos. Crea encuestas, comparte códigos QR y obtén resultados en tiempo real.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <span>Empezar Gratis</span>
              <ArrowRight size={20} />
            </Link>

            <Link
              to="/login"
              className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold transition-colors flex items-center justify-center"
            >
              Iniciar Sesión
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-blue-400" />
              <span>1000+ usuarios</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-blue-400" />
              <span>Sin configuración</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-blue-400" />
              <span>100% seguro</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '1000+', label: 'Usuarios Activos', icon: Users },
              { value: '5000+', label: 'Encuestas Creadas', icon: QrCode },
              { value: '50K+', label: 'Respuestas', icon: BarChart3 },
              { value: '99.9%', label: 'Uptime', icon: Zap }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-blue-500/30 transition-colors text-center space-y-2">
                <stat.icon className="w-8 h-8 mx-auto text-blue-400" />
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Características Principales
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Todo lo que necesitas para crear encuestas profesionales
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: QrCode,
                title: 'Códigos QR Dinámicos',
                description: 'Genera códigos QR únicos para cada encuesta. Los usuarios pueden escanear y responder al instante.'
              },
              {
                icon: Zap,
                title: 'Respuestas en Tiempo Real',
                description: 'Visualiza las respuestas mientras se recopilan. Análisis instantáneo de datos con actualizaciones en vivo.'
              },
              {
                icon: Shield,
                title: 'Autenticación Segura',
                description: 'Controla quién puede crear y responder encuestas con un sistema de autenticación robusto y seguro.'
              },
              {
                icon: BarChart3,
                title: 'Análisis Avanzado',
                description: 'Gráficos interactivos y estadísticas detalladas de tus encuestas. Exporta datos en múltiples formatos.'
              },
              {
                icon: Users,
                title: 'Fácil de Usar',
                description: 'Interfaz intuitiva y moderna. Crea encuestas en minutos sin necesidad de conocimientos técnicos.'
              },
              {
                icon: Sparkles,
                title: 'Sin Configuración',
                description: 'Comienza ahora mismo. No necesitas códigos ni configuraciones complicadas. Listo para usar en segundos.'
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-blue-500/30 transition-colors space-y-4"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <feature.icon className="text-blue-400" size={24} />
                </div>

                <h3 className="text-xl font-bold text-white">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              ¿Listo para comenzar?
            </h2>

            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              Únete a miles de usuarios que ya están creando encuestas profesionales con QR
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                to="/register"
                className="px-10 py-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <span>Crear Cuenta Gratis</span>
                <ArrowRight size={20} />
              </Link>

              <Link
                to="/login"
                className="px-10 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold transition-colors flex items-center justify-center"
              >
                Ya tengo cuenta
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-green-400" />
                <span>Totalmente seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-yellow-400" />
                <span>Configuración rápida</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-blue-400" />
                <span>Sin tarjeta de crédito</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="pb-16"></div>
    </div>
  );
}
