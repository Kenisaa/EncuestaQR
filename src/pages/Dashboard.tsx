import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, BarChart3, QrCode, Trash2, Eye, TrendingUp, Activity, Calendar, ExternalLink, Copy } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { surveysService } from '../services/surveys.service';
import { Survey } from '../types/database.types';

export default function Dashboard() {
  const { user } = useAuth();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [responseCounts, setResponseCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetchSurveys();
  }, [user]);

  const fetchSurveys = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const data = await surveysService.getUserSurveys(user.id);
      setSurveys(data);

      // Fetch response counts for each survey
      const counts: Record<string, number> = {};
      await Promise.all(
        data.map(async (survey) => {
          try {
            const responses = await surveysService.getSurveyResponses(survey.id);
            counts[survey.id] = responses.length;
          } catch (err) {
            counts[survey.id] = 0;
          }
        })
      );
      setResponseCounts(counts);
    } catch (err) {
      console.error('Error fetching surveys:', err);
      setError('Error al cargar las encuestas. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const deleteSurvey = async (surveyId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta encuesta?')) return;

    try {
      setDeletingId(surveyId);
      await surveysService.deleteSurvey(surveyId);
      setSurveys(surveys.filter(s => s.id !== surveyId));
      const newCounts = { ...responseCounts };
      delete newCounts[surveyId];
      setResponseCounts(newCounts);
    } catch (err) {
      console.error('Error deleting survey:', err);
      setError('Error al eliminar la encuesta. Por favor, intenta de nuevo.');
    } finally {
      setDeletingId(null);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Loading State with Skeleton
  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Skeleton */}
          <div className="flex justify-between items-center mb-12 animate-fadeIn">
            <div className="flex-1">
              <div className="skeleton h-12 w-96 mb-3"></div>
              <div className="skeleton h-5 w-64"></div>
            </div>
            <div className="skeleton h-12 w-48 rounded-xl"></div>
          </div>

          {/* Stats Skeleton */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass p-6 rounded-xl animate-fadeIn" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="skeleton h-5 w-32 mb-4"></div>
                <div className="skeleton h-10 w-24"></div>
              </div>
            ))}
          </div>

          {/* Survey Cards Skeleton */}
          <div className="mb-6">
            <div className="skeleton h-8 w-48 mb-6"></div>
            <div className="grid gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass p-6 rounded-xl animate-fadeIn" style={{ animationDelay: `${i * 150}ms` }}>
                  <div className="skeleton h-7 w-3/4 mb-3"></div>
                  <div className="skeleton h-5 w-full mb-4"></div>
                  <div className="flex gap-4">
                    <div className="skeleton h-4 w-32"></div>
                    <div className="skeleton h-4 w-32"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-20 pb-20 flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <div className="glass p-12 rounded-2xl max-w-md mx-auto">
            <Activity className="mx-auto mb-4 text-primary opacity-40" size={64} />
            <h2 className="text-2xl font-bold mb-2 text-gradient">Sesión no iniciada</h2>
            <p className="text-foreground/60 mb-6">Inicia sesión para ver tus encuestas</p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-primary"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalResponses = Object.values(responseCounts).reduce((acc, count) => acc + count, 0);
  const avgResponsesPerSurvey = surveys.length > 0 ? Math.round(totalResponses / surveys.length) : 0;

  return (
    <div className="min-h-screen pt-20 pb-20 relative z-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-xl glass border border-error/30 text-error animate-fadeIn backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <Activity className="flex-shrink-0" size={20} />
              <p>{error}</p>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-error/60 hover:text-error transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-12 animate-fadeIn">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
              <span className="text-gradient">
                Hola, {user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}
              </span>
            </h1>
            <p className="text-foreground/60 text-lg">Gestiona tus encuestas y analiza resultados en tiempo real</p>
          </div>
          <Link
            to="/create"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-primary glow-hover group"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-semibold">Nueva Encuesta</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              label: 'Total Encuestas',
              value: surveys.length,
              icon: BarChart3,
              gradient: 'from-primary to-primary-light',
              iconBg: 'bg-primary/10',
              iconColor: 'text-primary',
              trend: surveys.length > 0 ? '+100%' : '0%'
            },
            {
              label: 'Total Respuestas',
              value: totalResponses,
              icon: Activity,
              gradient: 'from-secondary to-secondary-light',
              iconBg: 'bg-secondary/10',
              iconColor: 'text-secondary',
              trend: totalResponses > 0 ? `${avgResponsesPerSurvey}/encuesta` : '0/encuesta'
            },
            {
              label: 'Tasa Promedio',
              value: surveys.length > 0 ? '75%' : '0%',
              icon: TrendingUp,
              gradient: 'from-accent to-success',
              iconBg: 'bg-accent/10',
              iconColor: 'text-accent',
              trend: surveys.length > 0 ? '+12%' : '0%'
            }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="glass p-6 rounded-xl card-hover group animate-fadeIn relative overflow-hidden"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Background gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.iconBg} backdrop-blur-xl`}>
                      <Icon className={stat.iconColor} size={24} />
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-foreground/40 uppercase tracking-wider">{stat.trend}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-foreground/60 text-sm font-medium mb-2">{stat.label}</p>
                    <p className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Surveys Section */}
        <div className="animate-fadeIn" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              Mis Encuestas
              <span className="ml-3 text-sm font-normal text-foreground/40">({surveys.length})</span>
            </h2>
          </div>

          {/* Empty State */}
          {surveys.length === 0 ? (
            <div className="glass p-16 text-center rounded-2xl border border-primary/20 card-hover">
              <div className="max-w-md mx-auto">
                <div className="mb-6 inline-block">
                  <QrCode className="text-primary" size={80} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gradient">Comienza tu primera encuesta</h3>
                <p className="text-foreground/60 mb-8 leading-relaxed">
                  Crea encuestas profesionales con QR codes y obtén respuestas en tiempo real. Es rápido y fácil.
                </p>
                <Link
                  to="/create"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl btn-primary glow-hover group"
                >
                  <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                  <span className="font-semibold">Crear Primera Encuesta</span>
                </Link>
              </div>
            </div>
          ) : (
            /* Surveys Grid */
            <div className="grid gap-4">
              {surveys.map((survey, idx) => (
                <div
                  key={survey.id}
                  className="glass p-6 rounded-xl card-hover group relative overflow-hidden animate-fadeIn"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {/* Gradient border effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative flex flex-col md:flex-row md:items-center gap-6">
                    {/* Survey Icon */}
                    <div className="hidden md:flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <BarChart3 className="text-primary" size={24} />
                    </div>

                    {/* Survey Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition-all duration-300 truncate">
                        {survey.title}
                      </h3>
                      <p className="text-foreground/60 mb-4 line-clamp-2 leading-relaxed">
                        {survey.description || 'Sin descripción'}
                      </p>

                      {/* Stats Row */}
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 backdrop-blur-xl">
                          <Activity className="text-primary" size={14} />
                          <span className="text-primary font-medium">{responseCounts[survey.id] || 0} respuestas</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/10 backdrop-blur-xl">
                          <Calendar className="text-secondary" size={14} />
                          <span className="text-secondary font-medium">
                            {new Date(survey.created_at).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 flex-shrink-0">
                      <Link
                        to={`/survey/${survey.id}`}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg glass border border-accent/20 hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 text-accent group/btn"
                        title="Ver encuesta"
                      >
                        <ExternalLink size={18} className="group-hover/btn:rotate-12 transition-transform duration-300" />
                        <span className="hidden sm:inline font-medium">Abrir</span>
                      </Link>

                      <Link
                        to={`/results/${survey.id}`}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg glass border border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 text-primary group/btn"
                        title="Ver resultados"
                      >
                        <Eye size={18} className="group-hover/btn:scale-110 transition-transform duration-300" />
                        <span className="hidden sm:inline font-medium">Resultados</span>
                      </Link>

                      <button
                        onClick={() => copyToClipboard(`${window.location.origin}/survey/${survey.id}`)}
                        className="flex items-center justify-center p-2.5 rounded-lg glass border border-secondary/20 hover:border-secondary/50 hover:bg-secondary/10 transition-all duration-300 text-secondary group/btn"
                        title="Copiar enlace"
                      >
                        <Copy size={18} className="group-hover/btn:scale-110 transition-transform duration-300" />
                      </button>

                      <button
                        onClick={() => deleteSurvey(survey.id)}
                        disabled={deletingId === survey.id}
                        className="flex items-center justify-center p-2.5 rounded-lg glass border border-error/20 hover:border-error/50 hover:bg-error/10 transition-all duration-300 text-error disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                        title="Eliminar encuesta"
                      >
                        {deletingId === survey.id ? (
                          <div className="animate-spin rounded-full h-[18px] w-[18px] border-b-2 border-error"></div>
                        ) : (
                          <Trash2 size={18} className="group-hover/btn:scale-110 transition-transform duration-300" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions Footer */}
        {surveys.length > 0 && (
          <div className="mt-12 p-6 glass rounded-xl border border-primary/10 animate-fadeIn" style={{ animationDelay: '600ms' }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <TrendingUp className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-semibold">Panel de estadísticas completo</p>
                  <p className="text-sm text-foreground/60">Analiza el rendimiento de todas tus encuestas</p>
                </div>
              </div>
              <Link
                to="/create"
                className="px-6 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-all duration-300 border border-primary/20 hover:border-primary/40"
              >
                Crear otra encuesta
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
