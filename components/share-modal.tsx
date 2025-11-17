'use client';

import React, { useState } from 'react';
import { Copy, Check, Share2, X } from 'lucide-react';

interface ShareModalProps {
  surveyId: string;
  surveyTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareModal({
  surveyId,
  surveyTitle,
  isOpen,
  onClose
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const surveyUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/survey/${surveyId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(surveyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToWhatsApp = () => {
    const text = `Responde mi encuesta: ${surveyTitle}\n${surveyUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="glass p-8 rounded-2xl border border-cyan-500/30 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
              Compartir Encuesta
            </span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-foreground/10 rounded-lg transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Link */}
          <div>
            <label className="text-sm font-medium text-foreground/60 mb-2 block">
              Link directo
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={surveyUrl}
                readOnly
                className="flex-1 px-4 py-3 rounded-lg glass border border-cyan-500/30 text-foreground bg-background/50"
              />
              <button
                onClick={copyToClipboard}
                className="p-3 rounded-lg glass border border-cyan-500/30 hover:border-magenta-500/50 transition-all text-cyan-400 hover:text-magenta-400"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
            {copied && (
              <p className="text-sm text-cyan-400 mt-2">¡Copiado!</p>
            )}
          </div>

          {/* QR Download */}
          <div>
            <label className="text-sm font-medium text-foreground/60 mb-2 block">
              O comparte por
            </label>
            <div className="flex gap-2">
              <button
                onClick={shareToWhatsApp}
                className="flex-1 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-all"
              >
                WhatsApp
              </button>
              <button
                onClick={() => {
                  const qrCanvas = document.querySelector('canvas');
                  if (qrCanvas) {
                    const link = document.createElement('a');
                    link.href = qrCanvas.toDataURL();
                    link.download = `survey-${surveyId}.png`;
                    link.click();
                  }
                }}
                className="flex-1 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-magenta-500 text-white font-semibold hover:from-cyan-400 hover:to-magenta-400 transition-all"
              >
                Descargar QR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
