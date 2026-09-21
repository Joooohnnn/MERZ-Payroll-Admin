import React, { useState } from 'react';
import { 
  MapPin, 
  CheckCircle2, 
  Layers, 
  Calendar, 
  Users, 
  FileText, 
  Clock, 
  Printer, 
  Mail, 
  Cloud, 
  Laptop, 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  Eye, 
  ShieldCheck, 
  Download, 
  UserPlus, 
  DollarSign, 
  AlertTriangle 
} from 'lucide-react';

interface FeatureMapVisualDiagramProps {
  onSelectFeature?: (featureId: number) => void;
}

export const FeatureMapVisualDiagram: React.FC<FeatureMapVisualDiagramProps> = ({
  onSelectFeature,
}) => {
  const [selectedHotspot, setSelectedHotspot] = useState<number>(1);

  const hotspots = [
    {
      id: 1,
      title: 'Top Navigation & Pay Cycle Selector',
      zone: 'Top Header Bar',
      badge: 'Step 1: Select Pay Period',
      location: 'Top Header → Dropdown & Tabs',
      icon: Calendar,
      color: 'emerald',
      description: 'Switch between 1st Quincena (1st–15th) and 2nd Quincena (16th–30th/31st). Toggle between "Official Payslip" and "Guards Masterlist".',
      keyItems: ['Pay Period switcher', 'Payslip / Masterlist tabs', 'Autosave indicator'],
    },
    {
      id: 2,
      title: 'Guards Masterlist & Deployment',
      zone: 'Guards Masterlist Tab',
      badge: 'Step 2: Deploy & Manage',
      location: 'Masterlist Tab → Top Right "+ Deploy New Guard"',
      icon: Users,
      color: 'cyan',
      description: 'Onboard new officers with auto-sequential badge codes (MS-00106), transfer detachments, update daily wage rates, and inspect SSS/TIN/PhilHealth/Pag-IBIG.',
      keyItems: ['+ Deploy New Guard (Ctrl+N)', 'Inline daily rate editing', 'Batch wage updates by post'],
    },
    {
      id: 3,
      title: 'Live 12-Hr Shift Duty & Overtime Controls',
      zone: 'Official Payslip Panel',
      badge: 'Step 3: Adjust Duty Hours',
      location: 'Official Payslip Tab → Top Panel "Live Duty Controls"',
      icon: Clock,
      color: 'amber',
      description: 'Interactive sliders for regular duty days (13 days), daily overtime (4.0 hrs/day at 125%), and 10% Night Shift Differential (10PM–6AM).',
      keyItems: ['Duty days slider (1–15)', '4.0h regular OT (125%)', '10% Night shift differential toggle'],
    },
    {
      id: 4,
      title: 'Allowances, ECOLA & Emergency Vale',
      zone: 'Earnings & Deductions',
      badge: 'Step 4: Allowances & Vale',
      location: 'Live Controls → "Allowances & Other Deductions"',
      icon: DollarSign,
      color: 'teal',
      description: 'Input ECOLA, client hazard pay, firearm stipends, and deduct emergency cash advances (vale), cash bonds, or uniform amortizations.',
      keyItems: ['ECOLA (₱25/day baseline)', 'Client hazard post allowance', 'Emergency vale repayments'],
    },
    {
      id: 5,
      title: 'Dual-Copy Payslip & Signature Proof',
      zone: 'Printable Sheet',
      badge: 'Step 5: Review & Print A4',
      location: 'Official Payslip Tab → Document Preview & "Print Slip"',
      icon: Printer,
      color: 'emerald',
      description: 'Dual-copy layout generating Employee Copy and Agency Copy side-by-side on single A4 sheet with official DOLE signature lines.',
      keyItems: ['Side-by-side Employee + Agency copies', 'DOLE compliance signature line', '1-click A4 print / PDF export'],
    },
    {
      id: 6,
      title: 'Electronic Email Payslip Delivery',
      zone: 'Digital Distribution',
      badge: 'Step 6: Email to Remote Posts',
      location: 'Live Controls → "Email Payslip" / Masterlist "Email All"',
      icon: Mail,
      color: 'sky',
      description: 'Dispatches responsive electronic payslips directly to security guards at remote client detachments with ATM bank credit details.',
      keyItems: ['Single guard email dispatch', '1-click batch post emailing', 'Mobile-optimized receipt view'],
    },
    {
      id: 7,
      title: 'PowerPoint Presentation (.PPTX) & PC App (.EXE)',
      zone: 'Offline & Presentation Tools',
      badge: 'Step 7: Deck & PC App',
      location: 'Top Header → ".PPTX Deck" & "PC App"',
      icon: Laptop,
      color: 'purple',
      description: 'Downloadable 14-slide DOLE compliance PowerPoint presentation deck (.pptx) and standalone offline Windows desktop .exe installer.',
      keyItems: ['Downloadable .PPTX presentation', 'Offline standalone Windows .exe', 'Secure local device persistence'],
    },
  ];

  const activeHotspot = hotspots.find((h) => h.id === selectedHotspot) || hotspots[0];

  return (
    <div className="h-full flex flex-col justify-between p-4 sm:p-6 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-xl border border-slate-800 shadow-2xl relative overflow-hidden">
      
      {/* Visual Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg ring-2 ring-emerald-400/40">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 font-mono">
              SYSTEM FEATURE LOCATION MAP
            </span>
            <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
              Step-by-Step Guide on How to Use &amp; Where to See Features
            </h3>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>7 Visual Control Zones</span>
        </div>
      </div>

      {/* Main Diagram Canvas (Interactive UI Mockup with Glowing Hotspots) */}
      <div className="my-3 space-y-3">
        
        {/* Mock Software Window Frame */}
        <div className="bg-slate-900/90 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
          
          {/* Top Window Bar */}
          <div className="bg-slate-950 px-3 py-1.5 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
              <span className="ml-2 font-mono text-[10px] text-slate-300 font-bold">
                MERZ Security Solutions HR &amp; Payroll Portal
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">
              Interactive Hotspot Map (Click any numbered badge)
            </span>
          </div>

          {/* Diagram Body: Wireframe Grid with Hotspot Numbers */}
          <div className="p-3 bg-slate-950/70 space-y-2.5 font-sans">
            
            {/* Zone 1 & 7: Top App Header Wireframe */}
            <div 
              onClick={() => {
                setSelectedHotspot(1);
                onSelectFeature?.(1);
              }}
              className={`p-2 rounded-lg border transition cursor-pointer flex flex-wrap items-center justify-between gap-2 relative ${
                selectedHotspot === 1 || selectedHotspot === 7
                  ? 'bg-emerald-950/70 border-emerald-400 ring-2 ring-emerald-500/40 shadow-lg'
                  : 'bg-slate-900/90 border-slate-700/80 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 text-slate-950 font-black text-[10px] items-center justify-center">
                    1
                  </span>
                </span>
                <span className="text-[11px] font-bold text-white font-mono">
                  [1] Top Header: Pay Cycle Selector &amp; View Tabs
                </span>
              </div>

              <div className="flex items-center gap-1 text-[10px]">
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">
                  📅 2nd Quincena (16th–30th)
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-900/60 border border-emerald-700 text-emerald-300 font-bold">
                  📑 Official Payslip
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                  👥 Guards Masterlist
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedHotspot(7);
                    onSelectFeature?.(7);
                  }}
                  className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-600 text-purple-300 font-bold flex items-center gap-1"
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-purple-500 text-slate-950 font-black text-[8px] flex items-center justify-center">7</span>
                  <span>💻 Deck &amp; PC App</span>
                </button>
              </div>
            </div>

            {/* Middle Section: Masterlist (2), Live Duty (3, 4), and Slip Preview (5, 6) */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
              
              {/* Zone 2: Guards Masterlist Wireframe */}
              <div 
                onClick={() => {
                  setSelectedHotspot(2);
                  onSelectFeature?.(2);
                }}
                className={`sm:col-span-4 p-2.5 rounded-lg border transition cursor-pointer flex flex-col justify-between space-y-2 ${
                  selectedHotspot === 2
                    ? 'bg-cyan-950/70 border-cyan-400 ring-2 ring-cyan-500/40 shadow-lg'
                    : 'bg-slate-900/90 border-slate-700/80 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 font-black text-[10px] flex items-center justify-center shadow-xs">
                      2
                    </span>
                    <span className="text-[11px] font-bold text-white font-mono">
                      [2] Guards Masterlist
                    </span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                    + Deploy (Ctrl+N)
                  </span>
                </div>

                <div className="p-1.5 bg-slate-950 rounded border border-slate-800 text-[9px] font-mono space-y-1 text-slate-300">
                  <div className="text-slate-500 font-bold">Code | Guard | Post | Rate</div>
                  <div className="flex justify-between text-emerald-400">
                    <span>MS-00101 R. Bautista</span>
                    <span>₱695.00</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>MS-00102 E. Santos</span>
                    <span>₱695.00</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>MS-00103 M. Reyes</span>
                    <span>₱695.00</span>
                  </div>
                </div>

                <div className="text-[9px] text-cyan-300 font-medium">
                  • Click ✏️ to edit profile &amp; post<br />
                  • Click "Update All Rates in Post"
                </div>
              </div>

              {/* Zone 3 & 4: Live Duty Hours, Overtime & Vale Wireframe */}
              <div 
                onClick={() => {
                  setSelectedHotspot(3);
                  onSelectFeature?.(3);
                }}
                className={`sm:col-span-5 p-2.5 rounded-lg border transition cursor-pointer flex flex-col justify-between space-y-2 ${
                  selectedHotspot === 3 || selectedHotspot === 4
                    ? 'bg-amber-950/70 border-amber-400 ring-2 ring-amber-500/40 shadow-lg'
                    : 'bg-slate-900/90 border-slate-700/80 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] flex items-center justify-center shadow-xs">
                      3 &amp; 4
                    </span>
                    <span className="text-[11px] font-bold text-white font-mono">
                      [3,4] Live Duty &amp; Vale
                    </span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-950 border border-amber-800 text-amber-300">
                    DOLE Multipliers
                  </span>
                </div>

                <div className="p-1.5 bg-slate-950 rounded border border-slate-800 text-[9px] space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>Regular Days Slider:</span>
                    <b className="text-white font-mono">13.0 Days</b>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>12-hr Post Daily OT:</span>
                    <b className="font-mono">4.0 hrs (125%)</b>
                  </div>
                  <div className="flex justify-between text-cyan-400">
                    <span>Night Shift Diff (NSD):</span>
                    <b className="font-mono">10% Active</b>
                  </div>
                  <div className="flex justify-between text-rose-400 border-t border-slate-800 pt-0.5">
                    <span>Emergency Vale / Uniform:</span>
                    <b className="font-mono">- ₱1,250.00</b>
                  </div>
                </div>

                <div className="text-[9px] text-amber-300 font-medium">
                  • Real-time centavo-precise calculation<br />
                  • Itemized ECOLA, Hazard &amp; Cash bond
                </div>
              </div>

              {/* Zone 5 & 6: Dual-Copy Slip & Email Distribution Wireframe */}
              <div 
                onClick={() => {
                  setSelectedHotspot(5);
                  onSelectFeature?.(5);
                }}
                className={`sm:col-span-3 p-2.5 rounded-lg border transition cursor-pointer flex flex-col justify-between space-y-2 ${
                  selectedHotspot === 5 || selectedHotspot === 6
                    ? 'bg-emerald-950/70 border-emerald-400 ring-2 ring-emerald-500/40 shadow-lg'
                    : 'bg-slate-900/90 border-slate-700/80 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] flex items-center justify-center shadow-xs">
                      5 &amp; 6
                    </span>
                    <span className="text-[11px] font-bold text-white font-mono">
                      [5,6] Print &amp; Email
                    </span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950 border border-emerald-800 text-emerald-300">
                    A4 Dual Copy
                  </span>
                </div>

                <div className="p-1.5 bg-white text-slate-900 rounded border border-slate-300 text-[8px] space-y-0.5 font-sans">
                  <div className="font-black text-emerald-900 flex justify-between">
                    <span>MERZ SECURITY</span>
                    <span>A4 LANDSCAPE</span>
                  </div>
                  <div className="text-slate-500">Guard: SG J. Dela Cruz</div>
                  <div className="flex justify-between font-mono font-bold text-emerald-700 pt-0.5">
                    <span>Net Pay:</span>
                    <span>₱15,730.86</span>
                  </div>
                  <div className="border-t border-slate-200 text-[7px] text-slate-500 pt-0.5">
                    Agency Copy Signature Proof
                  </div>
                </div>

                <div className="text-[9px] text-emerald-300 font-medium">
                  • Click "Print Dual-Copy" for A4<br />
                  • Click "Email Payslip" to send PDF
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Selected Hotspot Explanation Card */}
        <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700 text-emerald-300 font-mono font-bold text-[10px]">
                {activeHotspot.badge}
              </span>
              <span className="text-slate-400 font-mono text-[10px]">
                📍 {activeHotspot.location}
              </span>
            </div>
            <h4 className="font-bold text-white text-sm">
              {activeHotspot.title}
            </h4>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {activeHotspot.description}
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {hotspots.map((h) => (
              <button
                key={h.id}
                onClick={() => {
                  setSelectedHotspot(h.id);
                  onSelectFeature?.(h.id);
                }}
                className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                  selectedHotspot === h.id
                    ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-400 shadow-md scale-105'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-700'
                }`}
                title={h.title}
              >
                {h.id}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Footer Instructions */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2.5">
        <span>Click any numbered hotspot [1–7] above or use the Quick Feature Guide modal to jump straight to the controls.</span>
        <span className="font-mono text-emerald-400 font-bold">DOLE D.O. 150-16 Certified</span>
      </div>

    </div>
  );
};
