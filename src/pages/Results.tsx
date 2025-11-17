import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Users } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { surveysService } from '../services/surveys.service';
import { Survey, SurveyResponse } from '../types/database.types';

export default function Results() {
  const { surveyId } = useParams();
  const { user } = useAuth();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSurveyData() {
      if (!surveyId || !user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch survey and responses in parallel
        const [surveyData, responsesData] = await Promise.all([
          surveysService.getSurveyById(surveyId),
          surveysService.getSurveyResponses(surveyId)
        ]);

        // Verify the survey belongs to the current user
        if (surveyData.user_id !== user.id) {
          setError('No tienes permiso para ver esta encuesta');
          setSurvey(null);
          setResponses([]);
        } else {
          setSurvey(surveyData);
          setResponses(responsesData);
        }
      } catch (err) {
        console.error('Error fetching survey data:', err);
        setError('Error al cargar la encuesta');
        setSurvey(null);
        setResponses([]);
      } finally {
        setLoading(false);
      }
    }

    fetchSurveyData();
  }, [surveyId, user]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary mx-auto mb-4"></div>
          <p className="text-muted text-lg">Cargando resultados...</p>
        </div>
      </div>
    );
  }

  if (error || !survey) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4">
        <div className="glass card-hover p-12 rounded-2xl border border-error/20 text-center max-w-md animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p className="text-muted text-lg">{error || 'Encuesta no encontrada'}</p>
        </div>
      </div>
    );
  }

  const getQuestionStats = (question: any) => {

    if (question.type === 'multiple') {
      const stats: { [key: string]: number } = {};
      question.options.forEach((opt: string) => {
        stats[opt] = 0;
      });

      responses.forEach((r: any) => {
        const answer = r.answers[question.id];
        if (answer && stats.hasOwnProperty(answer)) {
          stats[answer]++;
        }
      });

      return stats;
    }

    return null;
  };

  const totalResponses = responses.length;
  const hasResponses = totalResponses > 0;

  // Calculate average rating for rating questions
  const getAverageRating = (question: any) => {
    if (question.type !== 'rating' || !hasResponses) return 0;
    const sum = responses.reduce((acc, r) => acc + (Number(r.answers[question.id]) || 0), 0);
    return sum / totalResponses;
  };

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="mb-12 animate-fadeIn">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold mb-3">
                <span className="text-gradient">
                  Resultados de la Encuesta
                </span>
              </h1>
              <p className="text-xl text-foreground/80 font-medium">{survey.title}</p>
              {survey.description && (
                <p className="text-muted mt-2">{survey.description}</p>
              )}
            </div>

            {/* Stats Card */}
            <div className="glass card-hover p-6 rounded-2xl border border-primary/20 min-w-[200px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Users className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-4xl font-bold text-gradient">{totalResponses}</p>
                  <p className="text-muted text-sm font-medium">
                    {totalResponses === 1 ? 'Respuesta' : 'Respuestas'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {!hasResponses && (
          <div className="glass card-hover p-16 rounded-2xl border border-primary/10 text-center animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-muted/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">Aún no hay respuestas</h3>
            <p className="text-muted text-lg max-w-md mx-auto">
              Comparte tu encuesta para empezar a recibir respuestas y ver los resultados aquí.
            </p>
          </div>
        )}

        {/* Results Section */}
        {hasResponses && (
          <div className="space-y-6">
            {survey.questions.map((question: any, idx: number) => {
              const stats = getQuestionStats(question);
              const avgRating = getAverageRating(question);

              return (
                <div
                  key={question.id}
                  className="glass card-hover p-6 sm:p-8 rounded-2xl border border-secondary/10 animate-fadeIn"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {/* Question Header */}
                  <div className="flex items-start gap-3 mb-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-secondary/30 to-accent/30 flex items-center justify-center font-bold text-lg">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl sm:text-2xl font-bold mb-1">{question.question}</h2>
                      <div className="flex items-center gap-3 text-sm text-muted">
                        <span className="px-3 py-1 rounded-full bg-surface border border-foreground/10">
                          {question.type === 'text' && 'Texto'}
                          {question.type === 'multiple' && 'Opción Múltiple'}
                          {question.type === 'rating' && 'Calificación'}
                        </span>
                        <span>{totalResponses} {totalResponses === 1 ? 'respuesta' : 'respuestas'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Multiple Choice Results */}
                  {question.type === 'multiple' && stats && (
                    <div className="space-y-4">
                      {Object.entries(stats).map(([option, count]: [string, number]) => {
                        const percentage = Math.round((count / totalResponses) * 100);
                        return (
                          <div key={option} className="group">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-semibold text-foreground/90">{option}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-primary font-bold">{count}</span>
                                <span className="text-muted text-sm">({percentage}%)</span>
                              </div>
                            </div>
                            <div className="h-4 rounded-full bg-surface border border-foreground/10 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Text Responses */}
                  {question.type === 'text' && (
                    <div className="space-y-3">
                      {responses.length === 0 ? (
                        <p className="text-muted text-center py-8">No hay respuestas aún</p>
                      ) : (
                        responses.map((r, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl bg-surface/50 border border-foreground/10 hover:border-primary/30 transition-all"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-semibold text-primary">{idx + 1}</span>
                              </div>
                              <p className="text-foreground/90 flex-1 leading-relaxed">
                                {r.answers[question.id] || <span className="text-muted italic">Sin respuesta</span>}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* Rating Results */}
                  {question.type === 'rating' && (
                    <div>
                      {/* Average Rating Display */}
                      <div className="glass-secondary p-6 rounded-xl mb-6 text-center">
                        <p className="text-sm text-muted mb-2 font-medium">Calificación Promedio</p>
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-5xl font-bold text-gradient">{avgRating.toFixed(1)}</span>
                          <div className="text-left">
                            <div className="flex gap-1 mb-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className={`w-5 h-5 ${star <= Math.round(avgRating) ? 'text-warning' : 'text-muted/30'}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-xs text-muted">de 5.0</span>
                          </div>
                        </div>
                      </div>

                      {/* Rating Distribution */}
                      <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const count = responses.filter((r) => Number(r.answers[question.id]) === rating).length;
                          const percentage = totalResponses > 0 ? Math.round((count / totalResponses) * 100) : 0;
                          return (
                            <div key={rating} className="group">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="flex items-center gap-1 min-w-[80px]">
                                  <span className="font-semibold text-sm">{rating}</span>
                                  <svg className="w-4 h-4 text-warning" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                </div>
                                <div className="flex-1 h-3 rounded-full bg-surface border border-foreground/10 overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-warning to-warning/60 transition-all duration-1000 ease-out"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <div className="flex items-center gap-2 min-w-[80px] justify-end">
                                  <span className="text-primary font-bold text-sm">{count}</span>
                                  <span className="text-muted text-xs">({percentage}%)</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
