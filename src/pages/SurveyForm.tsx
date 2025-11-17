import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { surveysService } from '../services/surveys.service';
import { Survey } from '../types/database.types';

export default function SurveyForm() {
  const { surveyId } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchSurvey() {
      if (!surveyId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const surveyData = await surveysService.getSurveyById(surveyId);

        // Check if survey is active
        if (!surveyData.is_active) {
          setError('Esta encuesta ya no está activa');
          setSurvey(null);
        } else {
          setSurvey(surveyData);
        }
      } catch (err) {
        console.error('Error fetching survey:', err);
        setError('Error al cargar la encuesta');
        setSurvey(null);
      } finally {
        setLoading(false);
      }
    }

    fetchSurvey();
  }, [surveyId]);

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  const handleSubmit = async () => {
    if (!survey || !surveyId) return;

    if (Object.keys(answers).length !== survey.questions.length) {
      alert('Por favor responde todas las preguntas');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      await surveysService.submitResponse(surveyId, answers);
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting response:', err);
      setError('Error al enviar la respuesta. Por favor intenta de nuevo.');
      alert('Error al enviar la respuesta. Por favor intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  // Loading State with modern skeleton
  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-20 px-4 relative">
        <div className="max-w-2xl mx-auto relative z-content">
          {/* Header Skeleton */}
          <div className="glass p-8 rounded-2xl border border-primary/20 mb-8 animate-fadeIn">
            <div className="skeleton h-12 w-3/4 mb-4" />
            <div className="skeleton h-6 w-full" />
          </div>

          {/* Question Skeletons */}
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass p-6 rounded-2xl border border-secondary/20 animate-fadeIn" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="skeleton h-6 w-2/3 mb-4" />
                <div className="skeleton h-12 w-full" />
              </div>
            ))}
          </div>

          {/* Button Skeleton */}
          <div className="skeleton h-14 w-full mt-8 rounded-xl" />
        </div>
      </div>
    );
  }

  // Error State with modern design
  if (error || !survey) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative">
        <div className="glass p-12 rounded-2xl border border-error/30 text-center max-w-md animate-fadeIn relative z-content">
          <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-6 border border-error/30">
            <AlertCircle className="w-10 h-10 text-error" />
          </div>
          <h2 className="text-3xl font-bold mb-3 text-gradient">Oops!</h2>
          <p className="text-lg text-foreground/70 mb-8">{error || 'Encuesta no encontrada'}</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-base"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  // Success State with enhanced design
  if (submitted) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4 relative">
        <div className="glass p-12 rounded-2xl border border-success/30 text-center max-w-md animate-fadeIn relative z-content">
          {/* Success Icon */}
          <div className="relative mx-auto mb-8 w-24 h-24">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-success to-primary flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
          </div>

          <h2 className="text-4xl font-bold mb-3 text-gradient">¡Gracias!</h2>
          <p className="text-lg text-foreground/70 mb-2">Tu respuesta ha sido registrada</p>
          <p className="text-sm text-foreground/50 mb-10">Apreciamos mucho tu participación</p>

          <button
            onClick={() => navigate('/')}
            className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-base"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  // Main Survey Form with modern design
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = survey.questions.length;
  const progress = (answeredCount / totalQuestions) * 100;

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 relative">
      <div className="max-w-2xl mx-auto relative z-content">
        {/* Enhanced Survey Header */}
        <div className="glass p-10 rounded-2xl border border-primary/30 mb-8 animate-fadeIn relative overflow-hidden">
          {/* Decorative corner accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/20 to-transparent rounded-tr-full" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Encuesta</span>
            </div>

            <h1 className="text-5xl font-bold mb-4 leading-tight">
              <span className="text-gradient">
                {survey.title}
              </span>
            </h1>

            {survey.description && (
              <p className="text-lg text-foreground/70 leading-relaxed">{survey.description}</p>
            )}

            {/* Progress indicator */}
            <div className="mt-6 pt-6 border-t border-foreground/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground/60">Progreso</span>
                <span className="text-sm font-semibold text-primary">{answeredCount}/{totalQuestions} preguntas</span>
              </div>
              <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Question Cards */}
        <div className="space-y-6">
          {survey.questions.map((question: any, idx: number) => {
            const isAnswered = answers[question.id] !== undefined;

            return (
              <div
                key={question.id}
                className="glass card-hover p-8 rounded-2xl border border-secondary/30 animate-fadeIn relative overflow-hidden"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Answered indicator */}
                {isAnswered && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  </div>
                )}

                {/* Question number badge */}
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary text-white font-bold text-sm mb-4">
                  {idx + 1}
                </div>

                <h3 className="text-xl font-bold mb-6 text-foreground pr-10">
                  {question.question}
                </h3>

                {/* Text Input */}
                {question.type === 'text' && (
                  <input
                    type="text"
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    className="input-modern w-full text-base"
                    placeholder="Escribe tu respuesta aquí..."
                  />
                )}

                {/* Multiple Choice */}
                {question.type === 'multiple' && (
                  <div className="space-y-3">
                    {question.options.map((option: string, optIdx: number) => {
                      const isSelected = answers[question.id] === option;

                      return (
                        <label
                          key={optIdx}
                          className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                            isSelected
                              ? 'bg-primary/10 border-primary shadow-lg shadow-primary/20'
                              : 'bg-surface/30 border-transparent hover:bg-surface/50 hover:border-foreground/10'
                          }`}
                        >
                          <div className="relative flex items-center justify-center">
                            <input
                              type="radio"
                              name={question.id}
                              value={option}
                              checked={isSelected}
                              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                              className="w-5 h-5 appearance-none rounded-full border-2 border-foreground/30 checked:border-primary checked:bg-primary cursor-pointer transition-all"
                            />
                            {isSelected && (
                              <div className="absolute w-2.5 h-2.5 rounded-full bg-white pointer-events-none" />
                            )}
                          </div>
                          <span className={`flex-1 text-base ${isSelected ? 'text-foreground font-medium' : 'text-foreground/80'}`}>
                            {option}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}

                {/* Rating */}
                {question.type === 'rating' && (
                  <div className="flex gap-3 flex-wrap">
                    {[1, 2, 3, 4, 5].map((rating) => {
                      const isSelected = answers[question.id] === rating;

                      return (
                        <button
                          key={rating}
                          onClick={() => handleAnswerChange(question.id, rating)}
                          className={`w-14 h-14 rounded-xl font-bold text-lg transition-all duration-200 ${
                            isSelected
                              ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30 scale-110'
                              : 'glass border-2 border-foreground/20 hover:border-primary/50 hover:scale-105 text-foreground/70 hover:text-foreground'
                          }`}
                        >
                          {rating}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Enhanced Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={submitting || answeredCount < totalQuestions}
          className="btn-primary w-full mt-10 py-5 text-lg font-bold rounded-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group relative overflow-hidden"
        >
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />

          {submitting ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white" />
              Enviando respuestas...
            </>
          ) : (
            <>
              <Send size={22} />
              {answeredCount < totalQuestions
                ? `Responde todas las preguntas (${answeredCount}/${totalQuestions})`
                : 'Enviar Encuesta'
              }
            </>
          )}
        </button>

        {/* Helper text */}
        <p className="text-center text-sm text-foreground/50 mt-4">
          {answeredCount < totalQuestions
            ? `Faltan ${totalQuestions - answeredCount} preguntas por responder`
            : 'Todas las preguntas han sido respondidas'
          }
        </p>
      </div>
    </div>
  );
}
