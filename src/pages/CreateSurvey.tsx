import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Share2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../hooks/useAuth';
import { surveysService } from '../services/surveys.service';
import { Question } from '../types/database.types';

export default function CreateSurvey() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { id: '1', type: 'text', question: '', options: [] }
  ]);
  const [showQR, setShowQR] = useState(false);
  const [surveyId, setSurveyId] = useState('');

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now().toString(),
        type: 'text',
        question: '',
        options: []
      }
    ]);
  };

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const updateQuestion = (id: string, field: string, value: any) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const addOption = (questionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          options: [...(q.options || []), '']
        };
      }
      return q;
    }));
  };

  const updateOption = (questionId: string, optionIdx: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newOptions = [...(q.options || [])];
        newOptions[optionIdx] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const handleCreate = async () => {
    if (!title || questions.some(q => !q.question)) {
      alert('Por favor completa todos los campos');
      return;
    }

    if (!user) {
      alert('Debes iniciar sesión para crear una encuesta');
      return;
    }

    try {
      const newSurvey = await surveysService.createSurvey(
        user.id,
        title,
        description || null,
        questions
      );

      setSurveyId(newSurvey.id);
      setShowQR(true);
    } catch (error) {
      console.error('Error creating survey:', error);
      alert('Error al crear la encuesta. Por favor intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20 relative z-content">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {showQR ? (
          <div className="glass card-hover p-8 sm:p-12 rounded-2xl border border-primary/20 text-center animate-fadeIn">
            <div className="inline-block p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl mb-6">
              <div className="w-12 h-12 flex items-center justify-center">
                <svg className="w-10 h-10 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              <span className="text-gradient">
                Encuesta Creada Exitosamente
              </span>
            </h2>

            <p className="text-muted text-lg mb-10">
              Tu encuesta está lista para recibir respuestas
            </p>

            {/* QR Code Display with decorative elements */}
            <div className="relative inline-block mb-10">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-3xl blur-xl"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-2xl">
                <QRCodeSVG
                  value={`${window.location.origin}/survey/${surveyId}`}
                  size={280}
                  level="H"
                  includeMargin={true}
                />
              </div>
              {/* Corner decorations */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-primary rounded-tl-lg"></div>
              <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-secondary rounded-tr-lg"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-secondary rounded-bl-lg"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-primary rounded-br-lg"></div>
            </div>

            <div className="bg-surface/50 border border-foreground/10 rounded-xl p-4 mb-8 max-w-md mx-auto">
              <p className="text-sm text-muted mb-2">Enlace de la encuesta:</p>
              <p className="text-sm font-mono text-foreground/80 break-all">
                {`${window.location.origin}/survey/${surveyId}`}
              </p>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => {
                  const svg = document.querySelector('svg');
                  if (svg) {
                    const svgData = new XMLSerializer().serializeToString(svg);
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const img = new Image();

                    canvas.width = 280;
                    canvas.height = 280;

                    img.onload = () => {
                      if (ctx) {
                        ctx.fillStyle = 'white';
                        ctx.fillRect(0, 0, 280, 280);
                        ctx.drawImage(img, 0, 0);
                      }
                      const link = document.createElement('a');
                      link.href = canvas.toDataURL('image/png');
                      link.download = `survey-${surveyId}.png`;
                      link.click();
                    };

                    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
                  }
                }}
                className="btn-primary flex items-center gap-2"
              >
                <Share2 size={18} />
                Descargar QR
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 rounded-xl glass border border-foreground/10 font-semibold transition-all hover:border-primary/50 hover:bg-primary/5"
              >
                Ir al Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-fadeIn">
            <div className="mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                <span className="text-gradient">
                  Crear Nueva Encuesta
                </span>
              </h1>
              <p className="text-muted text-lg">
                Diseña tu encuesta personalizada en minutos
              </p>
            </div>

            <div className="space-y-6">
              {/* Survey Info Card */}
              <div className="glass card-hover p-6 sm:p-8 rounded-2xl border border-primary/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold">Información de la Encuesta</h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-foreground/90">
                      Título de la Encuesta
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="input-modern w-full"
                      placeholder="Ej: Encuesta de Satisfacción del Cliente"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-foreground/90">
                      Descripción (Opcional)
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="input-modern w-full resize-none h-28"
                      placeholder="Agrega una descripción para dar contexto a tu encuesta..."
                    />
                  </div>
                </div>
              </div>

              {/* Questions Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold">Preguntas</h2>
                </div>

                {questions.map((question, idx) => (
                  <div
                    key={question.id}
                    className="glass card-hover p-6 sm:p-8 rounded-2xl border border-secondary/10"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary/30 to-accent/30 flex items-center justify-center font-bold text-sm">
                          {idx + 1}
                        </div>
                        <h3 className="text-lg font-bold">Pregunta {idx + 1}</h3>
                      </div>
                      {questions.length > 1 && (
                        <button
                          onClick={() => removeQuestion(question.id)}
                          className="p-2 rounded-lg hover:bg-error/10 text-error transition-all group"
                          title="Eliminar pregunta"
                        >
                          <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                        </button>
                      )}
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground/90">
                          Texto de la Pregunta
                        </label>
                        <input
                          type="text"
                          value={question.question}
                          onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                          className="input-modern w-full"
                          placeholder="¿Cuál es tu pregunta?"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground/90">
                          Tipo de Pregunta
                        </label>
                        <select
                          value={question.type}
                          onChange={(e) => updateQuestion(question.id, 'type', e.target.value)}
                          className="input-modern w-full cursor-pointer"
                        >
                          <option value="text">Texto Corto</option>
                          <option value="multiple">Opción Múltiple</option>
                          <option value="rating">Calificación (1-5)</option>
                        </select>
                      </div>

                      {question.type === 'multiple' && (
                        <div className="space-y-3 pt-2">
                          <label className="block text-sm font-semibold text-foreground/90">
                            Opciones de Respuesta
                          </label>
                          <div className="space-y-2">
                            {(question.options || []).map((option, optIdx) => (
                              <div key={optIdx} className="flex gap-2 items-center group">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-xs font-semibold text-secondary">
                                  {optIdx + 1}
                                </div>
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) => updateOption(question.id, optIdx, e.target.value)}
                                  className="input-modern flex-1"
                                  placeholder={`Opción ${optIdx + 1}`}
                                />
                                <button
                                  onClick={() => {
                                    updateQuestion(question.id, 'options', (question.options || []).filter((_, i) => i !== optIdx));
                                  }}
                                  className="p-2 rounded-lg hover:bg-error/10 text-error/70 hover:text-error transition-all opacity-0 group-hover:opacity-100"
                                  title="Eliminar opción"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => addOption(question.id)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg glass-secondary border border-secondary/20 hover:border-secondary/40 text-secondary hover:bg-secondary/5 transition-all font-medium"
                          >
                            <Plus size={18} />
                            Agregar Opción
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Question Button */}
              <button
                onClick={addQuestion}
                className="w-full flex items-center justify-center gap-3 py-5 rounded-xl glass border-2 border-dashed border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all text-primary font-semibold text-lg group"
              >
                <Plus size={22} className="group-hover:scale-110 transition-transform" />
                Agregar Nueva Pregunta
              </button>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  onClick={handleCreate}
                  className="btn-primary w-full py-5 text-lg font-bold rounded-xl shadow-lg"
                >
                  Crear Encuesta
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
