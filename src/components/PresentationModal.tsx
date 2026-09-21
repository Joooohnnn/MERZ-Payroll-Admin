import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Presentation, 
  FileText, 
  Check, 
  Sparkles, 
  Volume2, 
  ShieldCheck, 
  Copy, 
  Printer, 
  Layers, 
  HelpCircle, 
  Loader2, 
  MapPin, 
  ListOrdered, 
  BookOpen, 
  Eye, 
  CheckCircle2, 
  Shield,
  Compass
} from 'lucide-react';
import { PRESENTATION_SLIDES, downloadPowerPointPresentation, SlideData } from '../services/presentationService';
import { SLIDE_VISUAL_MAP } from './PresentationSlideVisuals';
import { FeatureMapVisualDiagram } from './FeatureMapVisualDiagram';

interface PresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast?: (msg: string) => void;
}

export const PresentationModal: React.FC<PresentationModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);
  const [viewMode, setViewMode] = useState<'manual' | 'infographic' | 'feature-map'>('manual');
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState<string>('');
  const [hasCopied, setHasCopied] = useState(false);

  const currentSlide: SlideData = PRESENTATION_SLIDES[currentSlideIndex];
  const VisualComponent = SLIDE_VISUAL_MAP[currentSlide.id] || SLIDE_VISUAL_MAP[1];

  // Keyboard navigation: Left/Right arrow keys and Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setCurrentSlideIndex((prev) => Math.min(prev + 1, PRESENTATION_SLIDES.length - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNext = () => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, PRESENTATION_SLIDES.length - 1));
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleDownloadPPTX = async () => {
    try {
      setIsExporting(true);
      setExportProgress('Preparing presentation slides...');
      await downloadPowerPointPresentation((status) => {
        setExportProgress(status);
      });
      onShowToast?.('PowerPoint presentation manual (.pptx) downloaded successfully!');
    } catch (err: any) {
      console.error('Failed to export PPTX:', err);
      onShowToast?.(`Export failed: ${err.message || 'Unknown error'}`);
    } finally {
      setIsExporting(false);
      setExportProgress('');
    }
  };

  const handleCopySlideContent = () => {
    const textToCopy = `[${currentSlide.category}] ${currentSlide.title} - ${currentSlide.subtitle}\n` +
      (currentSlide.screenLocation ? `Location: ${currentSlide.screenLocation}\n\n` : '\n') +
      `Step-by-Step Operations:\n` +
      (currentSlide.steps || currentSlide.bullets).map((s, idx) => `${idx + 1}. ${s}`).join('\n') +
      (currentSlide.highlights ? `\n\nKey Highlights:\n` + currentSlide.highlights.map((h) => `• ${h}`).join('\n') : '') +
      (currentSlide.highlightBox ? `\n\n${currentSlide.highlightBox.title}:\n${currentSlide.highlightBox.text}` : '') +
      `\n\nSpeaker Notes:\n${currentSlide.speakerNotes}`;

    navigator.clipboard.writeText(textToCopy);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
    onShowToast?.('Copied slide manual details and notes to clipboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-5xl bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden my-auto flex flex-col max-h-[96vh]">
        
        {/* Modal Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3 bg-slate-950 border-b border-slate-800 gap-2.5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg ring-1 ring-emerald-500/30 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-white tracking-wide">
                  MERZ HR &amp; Payroll Suite — User Operations Manual
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  14 Feature Modules
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Step-by-Step Operations Manual &amp; Official PowerPoint (.PPTX) Presentation Deck
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs font-semibold">
              <button
                onClick={() => setViewMode('manual')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition cursor-pointer ${
                  viewMode === 'manual'
                    ? 'bg-emerald-600 text-white shadow-2xs font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="View detailed step-by-step instructions & highlights"
              >
                <ListOrdered className="w-3.5 h-3.5" />
                <span>Manual Guide</span>
              </button>
              <button
                onClick={() => setViewMode('infographic')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition cursor-pointer ${
                  viewMode === 'infographic'
                    ? 'bg-cyan-600 text-white shadow-2xs font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="View interactive visual infographic slide"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Visual Slide</span>
              </button>
              <button
                onClick={() => setViewMode('feature-map')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition cursor-pointer ${
                  viewMode === 'feature-map'
                    ? 'bg-amber-600 text-white shadow-2xs font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="View complete step-by-step feature location diagram and map"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Feature Map</span>
              </button>
            </div>

            {/* Download PPTX Button */}
            <button
              onClick={handleDownloadPPTX}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition shadow-xs cursor-pointer disabled:opacity-50"
              title="Generate and download genuine Microsoft PowerPoint (.pptx) manual"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-200" />
                  <span className="hidden sm:inline">{exportProgress || 'Generating...'}</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .PPTX</span>
                </>
              )}
            </button>

            {/* Toggle Speaker Notes */}
            <button
              onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer border ${
                showSpeakerNotes
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
              }`}
              title="Toggle presenter talking points and speaker notes"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Notes</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer ml-1"
              title="Close Manual (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feature Quick Jump Selector Bar */}
        <div className="px-4 sm:px-6 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-slate-400 font-bold shrink-0 text-[11px] uppercase tracking-wider">
              Jump to Feature:
            </span>
            <select
              value={currentSlideIndex}
              onChange={(e) => setCurrentSlideIndex(Number(e.target.value))}
              className="bg-slate-800 border border-slate-700 text-white rounded-lg px-2.5 py-1 text-xs truncate focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer max-w-md"
            >
              {PRESENTATION_SLIDES.map((slide, idx) => (
                <option key={slide.id} value={idx}>
                  Slide {idx + 1}: {slide.title}
                </option>
              ))}
            </select>
          </div>

          <div className="text-[11px] text-slate-400 font-mono shrink-0">
            Slide <strong className="text-emerald-400">{currentSlideIndex + 1}</strong> of {PRESENTATION_SLIDES.length}
          </div>
        </div>

        {/* Slide Stage Area (16:9 Aspect Ratio) */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 bg-slate-950 flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col min-h-[480px] relative">
            
            {/* Top Accent Strip */}
            <div className="h-1.5 w-full bg-linear-to-r from-emerald-500 via-teal-400 to-cyan-500" />

            {viewMode === 'feature-map' ? (
              /* Step-by-Step Feature Location Diagram & Map Mode */
              <div className="flex-1 min-h-[480px]">
                <FeatureMapVisualDiagram 
                  onSelectFeature={(featureId) => {
                    // Optional sync
                  }}
                />
              </div>
            ) : viewMode === 'infographic' ? (
              /* Infographic Mode */
              <div className="flex-1 min-h-[460px]">
                <VisualComponent />
              </div>
            ) : (
              /* Operations Manual Mode */
              <div className="flex-1 flex flex-col justify-between">
                {/* Slide Header */}
                <div className="p-5 sm:p-6 pb-3 border-b border-slate-800/80 bg-slate-900/60">
                  <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {currentSlide.category}
                    </span>
                    {currentSlide.screenLocation && (
                      <span className="text-[11px] font-semibold text-slate-300 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-md flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{currentSlide.screenLocation}</span>
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                    {currentSlide.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                    {currentSlide.subtitle}
                  </p>
                </div>

                {/* Slide Body: 2-Column Grid */}
                <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 flex-1 items-start bg-slate-900">
                  
                  {/* Left Column: Step-by-Step Instructions (7 cols) */}
                  <div className="md:col-span-7 space-y-3">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <ListOrdered className="w-3.5 h-3.5" />
                      Step-by-Step Operation Guide
                    </h4>

                    <div className="space-y-2">
                      {(currentSlide.steps || currentSlide.bullets).map((step, idx) => (
                        <div 
                          key={idx} 
                          className="p-2.5 bg-slate-800/60 border border-slate-700/70 rounded-xl flex items-start gap-2.5 text-xs text-slate-200 leading-relaxed hover:border-emerald-500/40 transition"
                        >
                          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold font-mono ring-1 ring-emerald-500/40">
                            {idx + 1}
                          </div>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Highlights & Pro-Tip (5 cols) */}
                  <div className="md:col-span-5 space-y-3">
                    {/* Feature Highlights Box */}
                    {currentSlide.highlights && currentSlide.highlights.length > 0 && (
                      <div className="p-3.5 bg-emerald-950/30 border border-emerald-800/60 rounded-xl space-y-2">
                        <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          Key Feature Highlights
                        </span>
                        <ul className="space-y-1.5">
                          {currentSlide.highlights.map((h, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-emerald-100/90 leading-snug">
                              <span className="text-emerald-400 font-bold shrink-0">★</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Pro-Tip Box */}
                    {currentSlide.highlightBox && (
                      <div className="p-3.5 bg-amber-950/30 border border-amber-800/60 rounded-xl space-y-1">
                        <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5 text-amber-400" />
                          {currentSlide.highlightBox.title}
                        </span>
                        <p className="text-[11px] text-amber-100/90 leading-relaxed">
                          {currentSlide.highlightBox.text}
                        </p>
                      </div>
                    )}

                    {/* Key Metrics */}
                    {currentSlide.metrics && currentSlide.metrics.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {currentSlide.metrics.slice(0, 2).map((m, idx) => (
                          <div 
                            key={idx} 
                            className="p-2.5 bg-slate-800/80 border border-slate-700 rounded-lg"
                          >
                            <span className="text-[10px] text-slate-400 block font-medium uppercase truncate">
                              {m.label}
                            </span>
                            <span className="text-xs font-bold text-emerald-400 font-mono block mt-0.5">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>

                {/* Slide Footer */}
                <div className="px-5 py-2.5 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="truncate">
                    MERZ Security Solutions Agency Inc. • Operations Manual • DOLE D.O. 150-16
                  </span>
                  <span className="shrink-0 font-mono text-emerald-400 font-bold">
                    Slide {currentSlideIndex + 1} / {PRESENTATION_SLIDES.length}
                  </span>
                </div>
              </div>
            )}

          </div>

          {/* Speaker Notes Drawer (Expandable) */}
          {showSpeakerNotes && (
            <div className="w-full max-w-4xl mt-3 p-4 bg-amber-950/30 border border-amber-800/50 rounded-xl text-amber-200 text-xs animate-fadeIn">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold flex items-center gap-1.5 text-amber-300 uppercase tracking-wider text-[11px]">
                  <Volume2 className="w-3.5 h-3.5" />
                  Speaker Notes &amp; Talking Points for Presenter
                </span>
                <button
                  onClick={handleCopySlideContent}
                  className="text-[10px] font-semibold text-amber-300 hover:text-white flex items-center gap-1 underline cursor-pointer"
                >
                  {hasCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{hasCopied ? 'Copied' : 'Copy All Text'}</span>
                </button>
              </div>
              <p className="leading-relaxed font-sans text-amber-100/90 italic">
                "{currentSlide.speakerNotes}"
              </p>
            </div>
          )}
        </div>

        {/* Modal Bottom Slide Navigation Bar */}
        <div className="px-4 sm:px-6 py-3 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentSlideIndex === 0}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <button
              onClick={handleNext}
              disabled={currentSlideIndex === PRESENTATION_SLIDES.length - 1}
              className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
            >
              <span>Next Feature</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <span className="text-xs text-slate-400 ml-2 font-mono hidden md:inline">
              Use ← / → keys to navigate
            </span>
          </div>

          {/* Slide Indicator Pills (14 slides) */}
          <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1 sm:pb-0 px-1">
            {PRESENTATION_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-7 min-w-[28px] px-1.5 rounded-md text-xs font-bold font-mono transition cursor-pointer shrink-0 ${
                  currentSlideIndex === idx
                    ? 'bg-emerald-600 text-white shadow-xs ring-1 ring-emerald-400'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                }`}
                title={`Slide ${idx + 1}: ${slide.title}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {/* Quick Copy / Action */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySlideContent}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition cursor-pointer"
              title="Copy slide summary and steps"
            >
              {hasCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{hasCopied ? 'Copied' : 'Copy Guide'}</span>
            </button>

            <button
              onClick={handleDownloadPPTX}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition cursor-pointer shadow-xs disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export .PPTX</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
