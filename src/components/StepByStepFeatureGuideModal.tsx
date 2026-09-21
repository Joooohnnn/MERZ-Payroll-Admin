import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Compass, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Users, 
  Printer, 
  Mail, 
  Cloud, 
  Laptop, 
  Calendar, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  Download, 
  Sparkles, 
  Presentation, 
  Check, 
  FileText,
  ChevronRight,
  Sliders,
  Eye,
  LayoutGrid,
  Wifi,
  WifiOff,
  RefreshCw
} from 'lucide-react';

interface StepByStepFeatureGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToView: (view: 'payslip' | 'masterlist') => void;
  onOpenAddGuard: () => void;
  onOpenPresentationModal: () => void;
  onOpenDesktopModal: () => void;
  onPrintSlip: () => void;
  onExportCSV: () => void;
}

export const StepByStepFeatureGuideModal: React.FC<StepByStepFeatureGuideModalProps> = ({
  isOpen,
  onClose,
  onNavigateToView,
  onOpenAddGuard,
  onOpenPresentationModal,
  onOpenDesktopModal,
  onPrintSlip,
  onExportCSV,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [guideMode, setGuideMode] = useState<'step-by-step' | 'all-in-one'>('step-by-step');

  if (!isOpen) return null;

  const totalSteps = 6;

  const stepsData = [
    {
      id: 1,
      stepNumber: 'Step 1',
      title: 'Select Pay Period & Security Guard',
      shortTitle: '1. Select Period & Guard',
      location: 'Top Header Bar (top of screen)',
      badgeColor: 'emerald',
      actionText: 'Go to Payslip View',
      actionHandler: () => {
        onNavigateToView('payslip');
        onClose();
      },
      simpleInstructions: [
        'Select the Quincena (1st–15th or 16th–30th/31st) using the calendar dropdown at the top.',
        'Choose your security guard from the guard dropdown to automatically load their duty record.',
      ],
      // Visual rendered UI Mockup
      renderVisual: () => (
        <div className="w-full bg-slate-950 rounded-xl p-4 sm:p-5 border border-emerald-500/40 shadow-xl space-y-3 font-sans text-xs">
          {/* Header Bar Simulation */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white text-xs">
                M
              </div>
              <div>
                <span className="font-bold text-white text-xs">MERZ SECURITY SOLUTIONS</span>
                <span className="block text-[10px] text-emerald-400">Payroll Portal</span>
              </div>
            </div>
            
            {/* View tabs */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-700">
              <span className="px-2.5 py-1 bg-emerald-600 text-white rounded font-bold text-[10px]">
                Official Payslip
              </span>
              <span className="px-2 py-1 text-slate-400 text-[10px]">
                Guards Masterlist
              </span>
            </div>
          </div>

          {/* Action Spotlight Callout 1 */}
          <div className="relative p-3 bg-slate-900 rounded-lg border-2 border-dashed border-emerald-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <span className="text-[10px] text-emerald-300 font-mono font-bold uppercase tracking-wider block">
                  👉 Click Here First: Pay Period
                </span>
                <span className="text-white font-bold text-xs">
                  📅 2nd Quincena: May 16, 2026 – May 31, 2026
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700 text-emerald-300 text-[10px] font-bold">
              1st or 2nd Quincena
            </span>
          </div>

          {/* Action Spotlight Callout 2 */}
          <div className="relative p-3 bg-slate-900 rounded-lg border-2 border-dashed border-cyan-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <span className="text-[10px] text-cyan-300 font-mono font-bold uppercase tracking-wider block">
                  👉 Choose Guard to Calculate:
                </span>
                <span className="text-white font-bold text-xs">
                  👤 SG Alvarez, Juan Paolo • Badge MS-00101 (Rockwell Center)
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-700 text-cyan-300 text-[10px] font-mono">
              ₱695.00/day
            </span>
          </div>
        </div>
      ),
    },

    {
      id: 2,
      stepNumber: 'Step 2',
      title: 'Set Duty Days & 12-Hour Overtime',
      shortTitle: '2. Duty Days & Overtime',
      location: 'Official Payslip Tab → "Live Duty Controls" Box',
      badgeColor: 'amber',
      actionText: 'Go to Duty Controls',
      actionHandler: () => {
        onNavigateToView('payslip');
        onClose();
      },
      simpleInstructions: [
        'Set Regular Days Worked (standard 13 days for a 15-day quincena with 2 rest days).',
        'For 12-hour posts, set 4.0 hrs/day Overtime — automatically calculated at 125% of hourly rate.',
        'Toggle Night Shift Differential (10%) if the guard worked between 10:00 PM and 6:00 AM.',
      ],
      renderVisual: () => (
        <div className="w-full bg-slate-950 rounded-xl p-4 sm:p-5 border border-amber-500/40 shadow-xl space-y-3 font-sans text-xs">
          {/* Duty Controls Box Simulation */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="font-bold text-white text-xs flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              Live Duty &amp; Overtime Sliders (DOLE D.O. 150-16)
            </span>
            <span className="text-[10px] text-amber-400 font-mono font-bold">
              Automatic Recalculation
            </span>
          </div>

          {/* Slider 1: Duty Days */}
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">1</span>
                Regular Duty Days:
              </span>
              <span className="font-mono font-bold text-emerald-400 text-sm">13.0 Days (₱9,035.00)</span>
            </div>
            {/* Visual Slider Bar */}
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden relative">
              <div className="bg-linear-to-r from-emerald-500 to-teal-400 h-full w-[86%]"></div>
            </div>
            <span className="text-[10px] text-slate-400 block">
              Standard 15-day period with 2 scheduled rest days
            </span>
          </div>

          {/* Slider 2: 12-Hour Overtime */}
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">2</span>
                12-Hour Shift Overtime (125%):
              </span>
              <span className="font-mono font-bold text-amber-400 text-sm">4.0 hrs/day (52.0 hrs = ₱5,646.88)</span>
            </div>
            {/* Visual Slider Bar */}
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div className="bg-linear-to-r from-amber-500 to-orange-400 h-full w-[66%]"></div>
            </div>
          </div>

          {/* Toggle 3: Night Shift Diff */}
          <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
            <span className="text-slate-300 text-xs flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">3</span>
              10% Night Shift Differential (10PM – 6AM):
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-8 h-4 rounded-full bg-emerald-500 relative inline-flex items-center justify-end px-1">
                <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
              </span>
              <span className="text-emerald-400 font-bold text-xs font-mono">+₱540.35</span>
            </div>
          </div>
        </div>
      ),
    },

    {
      id: 3,
      stepNumber: 'Step 3',
      title: 'Add Allowances or Emergency Vale',
      shortTitle: '3. Allowances & Vale',
      location: 'Official Payslip Tab → "Allowances & Deductions" Section',
      badgeColor: 'teal',
      actionText: 'View Allowance Controls',
      actionHandler: () => {
        onNavigateToView('payslip');
        onClose();
      },
      simpleInstructions: [
        'Input statutory ECOLA (Cost of Living Allowance) or client-specific Hazard pay.',
        'Enter Emergency Vale (Cash Advances) or uniform deductions to automatically deduct from net pay.',
        'Statutory contributions (SSS, PhilHealth, Pag-IBIG) and Withholding Tax are auto-calculated.',
      ],
      renderVisual: () => (
        <div className="w-full bg-slate-950 rounded-xl p-4 sm:p-5 border border-teal-500/40 shadow-xl space-y-3 font-sans text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="font-bold text-white text-xs flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-teal-400" />
              Itemized Earnings &amp; Deductions Inputs
            </span>
            <span className="text-[10px] text-teal-300 font-mono">Net Pay Impact</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Earnings Additions */}
            <div className="p-3 bg-slate-900 rounded-lg border border-emerald-900/50 space-y-2">
              <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                ➕ Allowances &amp; Incentives
              </span>
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between bg-slate-950 p-1.5 rounded border border-slate-800">
                  <span className="text-slate-400">ECOLA (₱25/day):</span>
                  <span className="text-emerald-400 font-bold font-mono">+ ₱325.00</span>
                </div>
                <div className="flex justify-between bg-slate-950 p-1.5 rounded border border-slate-800">
                  <span className="text-slate-400">Hazard / Firearm:</span>
                  <span className="text-emerald-400 font-bold font-mono">+ ₱500.00</span>
                </div>
              </div>
            </div>

            {/* Deductions Subtractions */}
            <div className="p-3 bg-slate-900 rounded-lg border border-rose-900/50 space-y-2">
              <span className="text-rose-400 font-bold text-xs flex items-center gap-1">
                ➖ Vale &amp; Deductions
              </span>
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between bg-slate-950 p-1.5 rounded border border-slate-800">
                  <span className="text-slate-400">Emergency Vale:</span>
                  <span className="text-rose-400 font-bold font-mono">- ₱1,250.00</span>
                </div>
                <div className="flex justify-between bg-slate-950 p-1.5 rounded border border-slate-800">
                  <span className="text-slate-400">Cash Bond Holding:</span>
                  <span className="text-rose-400 font-bold font-mono">- ₱250.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Statutory summary */}
          <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Auto Statutory Deductions:</span>
            <span className="font-mono text-slate-200">
              SSS (₱630.00) • PhilHealth (₱225.00) • Pag-IBIG (₱100.00)
            </span>
          </div>
        </div>
      ),
    },

    {
      id: 4,
      stepNumber: 'Step 4',
      title: 'Print Dual-Copy Payslip or Send via Email',
      shortTitle: '4. Print or Email Slip',
      location: 'Top Header "Print Slip" or Bottom of Page',
      badgeColor: 'emerald',
      actionText: 'Preview Dual Payslip',
      actionHandler: () => {
        onNavigateToView('payslip');
        onClose();
        setTimeout(() => onPrintSlip(), 300);
      },
      simpleInstructions: [
        'Click the dark "Print Dual-Copy Payslip" button (or "Print Slip" in the top bar).',
        'Both Employee Copy and Agency Copy print side-by-side on 1 single A4 sheet with legal signature lines.',
        'Or click "Email Payslip" to send a digital copy directly to the guard\'s phone.',
      ],
      renderVisual: () => (
        <div className="w-full bg-slate-950 rounded-xl p-4 sm:p-5 border border-emerald-500/40 shadow-xl space-y-3 font-sans text-xs">
          {/* Dual Payslip Sheet Illustration */}
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs flex items-center gap-1.5">
                <Printer className="w-4 h-4 text-emerald-400" />
                A4 Landscape Dual-Copy Output
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700 text-emerald-300 text-[10px] font-bold">
                DOLE D.O. 150-16 Certified
              </span>
            </div>

            {/* Simulated Side-by-Side Paper */}
            <div className="grid grid-cols-2 gap-2 bg-white text-slate-900 p-3 rounded-lg border border-slate-300 shadow-md">
              {/* Left: Employee Copy */}
              <div className="border-r border-dashed border-slate-400 pr-2 space-y-1">
                <div className="font-extrabold text-[10px] text-emerald-900 uppercase">
                  MERZ SECURITY (EMPLOYEE COPY)
                </div>
                <div className="text-[9px] text-slate-600">Guard: SG Alvarez, Juan Paolo</div>
                <div className="text-[9px] text-slate-600">Gross Pay: ₱18,172.58</div>
                <div className="text-[9px] text-slate-600">Deductions: ₱2,441.72</div>
                <div className="text-[10px] font-black font-mono text-emerald-800 pt-1">
                  NET PAY: ₱15,730.86
                </div>
              </div>

              {/* Right: Agency Copy */}
              <div className="pl-2 space-y-1">
                <div className="font-extrabold text-[10px] text-emerald-900 uppercase">
                  MERZ SECURITY (AGENCY COPY)
                </div>
                <div className="text-[9px] text-slate-600">Guard: SG Alvarez, Juan Paolo</div>
                <div className="text-[9px] text-slate-600">ATM: BDO Unibank ****4892</div>
                <div className="text-[10px] font-black font-mono text-emerald-800 pt-1">
                  NET PAY: ₱15,730.86
                </div>
                <div className="border-t border-slate-400 pt-1 text-[8px] text-slate-700 font-bold">
                  ✍️ Signature of Security Officer
                </div>
              </div>
            </div>
          </div>

          {/* Action Button Highlight */}
          <div className="flex items-center justify-between p-2.5 bg-slate-900 rounded-lg border border-emerald-500/50">
            <span className="text-emerald-300 text-xs font-semibold">
              👉 Two 1-Click Output Options:
            </span>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 shadow-xs">
                <Printer className="w-3.5 h-3.5" />
                Print Dual-Copy (A4)
              </span>
              <span className="px-3 py-1 rounded-md bg-sky-600 text-white font-bold text-xs flex items-center gap-1 shadow-xs">
                <Mail className="w-3.5 h-3.5" />
                Email to Guard
              </span>
            </div>
          </div>
        </div>
      ),
    },

    {
      id: 5,
      stepNumber: 'Step 5',
      title: 'Manage Roster & Deploy New Guards',
      shortTitle: '5. Masterlist & Deploy',
      location: 'Navigation Tabs → "Guards Masterlist"',
      badgeColor: 'cyan',
      actionText: 'Open Guards Masterlist',
      actionHandler: () => {
        onNavigateToView('masterlist');
        onClose();
      },
      simpleInstructions: [
        'Click "Guards Masterlist" tab to view all security officers across all client detachments.',
        'Click "+ Deploy New Guard" (or press Ctrl+N) to onboard a new officer with an automatic badge ID.',
        'Use the Detachment Filter (Rockwell, BGC, Laguna) or edit daily wage rates in 1 click.',
      ],
      renderVisual: () => (
        <div className="w-full bg-slate-950 rounded-xl p-4 sm:p-5 border border-cyan-500/40 shadow-xl space-y-3 font-sans text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="font-bold text-white text-xs flex items-center gap-1.5">
              <Users className="w-4 h-4 text-cyan-400" />
              Guards Masterlist &amp; Detachment Registry
            </span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-600 text-white font-bold text-xs flex items-center gap-1">
              + Deploy New Guard (Ctrl+N)
            </span>
          </div>

          {/* Roster Table Simulation */}
          <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden text-[11px]">
            <div className="grid grid-cols-12 bg-slate-950 p-2 font-bold text-slate-400 border-b border-slate-800">
              <span className="col-span-3">Badge &amp; Name</span>
              <span className="col-span-3">Client Post</span>
              <span className="col-span-3">Daily Wage</span>
              <span className="col-span-3 text-right">Actions</span>
            </div>
            <div className="grid grid-cols-12 p-2 border-b border-slate-800/80 items-center text-slate-200">
              <span className="col-span-3 font-bold text-emerald-400">MS-00101 Alvarez, J.</span>
              <span className="col-span-3 text-slate-300">Rockwell Center</span>
              <span className="col-span-3 font-mono font-bold text-white">₱695.00</span>
              <span className="col-span-3 text-right text-cyan-400 font-bold">✏️ Edit • 📧 Email</span>
            </div>
            <div className="grid grid-cols-12 p-2 items-center text-slate-200">
              <span className="col-span-3 font-bold text-emerald-400">MS-00102 Santos, E.</span>
              <span className="col-span-3 text-slate-300">BGC Corporate</span>
              <span className="col-span-3 font-mono font-bold text-white">₱695.00</span>
              <span className="col-span-3 text-right text-cyan-400 font-bold">✏️ Edit • 📧 Email</span>
            </div>
          </div>

          {/* Bottom Tools */}
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Filter posts: 📍 Rockwell • 📍 BGC • 📍 Laguna</span>
            <span className="text-amber-400 font-mono font-bold">⚡ Mass-Update Post Wage</span>
          </div>
        </div>
      ),
    },

    {
      id: 6,
      stepNumber: 'Step 6',
      title: 'Local Autosave & Standalone Windows PC App (.EXE)',
      shortTitle: '6. Local Autosave & Desktop App',
      location: 'Top Bar → "Saved" Indicator & "PC App" Button',
      badgeColor: 'emerald',
      actionText: 'Open PC App (.exe) Installer',
      actionHandler: () => {
        onOpenDesktopModal();
        onClose();
      },
      simpleInstructions: [
        'Every keystroke, rate adjustment, and guard enrollment is immediately autosaved to your local device storage.',
        'Zero cloud dependency: your payroll data remains private, secure, and fully functional 100% offline without any external services.',
        'Install as a native standalone desktop application (.exe) on Windows PCs for rapid field outpost operation.',
      ],
      renderVisual: () => (
        <div className="w-full bg-slate-950 rounded-xl p-4 sm:p-5 border border-emerald-500/40 shadow-xl space-y-3 font-sans text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="font-bold text-white text-xs flex items-center gap-1.5">
              <Laptop className="w-4 h-4 text-emerald-400" />
              Local Storage Autosave &amp; Desktop App
            </span>
            <span className="px-2.5 py-0.5 rounded bg-emerald-950 border border-emerald-700 text-emerald-300 text-[10px] font-bold">
              100% Offline Capable
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-3 bg-slate-900 rounded-lg border border-emerald-500/30 space-y-1.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300 font-bold text-xs">
                  Instant Local Autosave
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                All changes to rates, timecards, and guard masterlists persist immediately on your local drive.
              </p>
              <div className="text-[10px] text-emerald-400/90 font-mono">
                ✓ Continuous background persistence
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-cyan-500/30 space-y-1.5">
              <div className="flex items-center gap-2">
                <Laptop className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-300 font-bold text-xs">
                  Native Windows PC (.exe)
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Install as a standalone desktop executable on Windows laptops and outpost workstations.
              </p>
              <div className="text-[10px] text-cyan-400/90 font-mono">
                ⚡ Works anywhere without internet
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-800">
            <span className="text-slate-300 text-xs">
              👉 Top Bar Status Badge:
            </span>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-emerald-900/60 border border-emerald-500/50 text-emerald-300 font-bold text-xs flex items-center gap-1.5 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Saved (Local)
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const activeStepData = stepsData.find((s) => s.id === currentStep) || stepsData[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto print:hidden">
      <div className="w-full max-w-4xl bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden my-auto flex flex-col max-h-[96vh]">
        
        {/* Top Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl ring-1 ring-emerald-500/40">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-white tracking-wide">
                Simple How-to-Use Guide with Visual Images
              </h3>
              <p className="text-xs text-slate-400">
                5 visual steps showing exactly what to do and where to find every feature.
              </p>
            </div>
          </div>

          {/* View Mode Toggle & Close Button */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-xs">
              <button
                onClick={() => setGuideMode('step-by-step')}
                className={`px-2.5 py-1 rounded-md transition font-semibold cursor-pointer ${
                  guideMode === 'step-by-step'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Step-by-Step
              </button>
              <button
                onClick={() => setGuideMode('all-in-one')}
                className={`px-2.5 py-1 rounded-md transition font-semibold cursor-pointer ${
                  guideMode === 'all-in-one'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All 5 Steps
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer ml-1"
              title="Close Guide"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Selector Pills (Step 1 to 5) */}
        {guideMode === 'step-by-step' && (
          <div className="bg-slate-950/60 px-4 sm:px-6 py-2.5 border-b border-slate-800 flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto">
            {stepsData.map((step) => {
              const isActive = step.id === currentStep;
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 shadow-md ring-2 ring-emerald-400/40'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                    isActive ? 'bg-slate-950 text-emerald-400' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {step.id}
                  </span>
                  <span>{step.shortTitle}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {guideMode === 'step-by-step' ? (
            /* Single Step Focus View */
            <div className="space-y-4">
              
              {/* Step Title & Location Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700 text-emerald-300 font-mono font-bold text-xs">
                      {activeStepData.stepNumber} of {totalSteps}
                    </span>
                    <span className="text-slate-400 font-mono text-xs">
                      📍 Where: <strong className="text-slate-200">{activeStepData.location}</strong>
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-white">
                    {activeStepData.title}
                  </h4>
                </div>

                <button
                  onClick={activeStepData.actionHandler}
                  className="self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition cursor-pointer shadow-xs"
                >
                  <span>{activeStepData.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Visual UI Image / Diagram Component */}
              <div className="relative">
                <div className="absolute -top-2.5 left-4 z-10 px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-xs">
                  Visual Interface Preview
                </div>
                {activeStepData.renderVisual()}
              </div>

              {/* Simple Step-by-Step Instructions */}
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  What To Do (Simple Instructions):
                </span>
                <div className="space-y-2">
                  {activeStepData.simpleInstructions.map((instruction, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 font-mono font-bold text-[11px] ring-1 ring-emerald-500/30 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{instruction}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            /* All 5 Steps in 1 Visual Board */
            <div className="space-y-4">
              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">All 5 Operational Steps at a Glance</h4>
                  <p className="text-xs text-slate-400">Complete workflow from guard selection to DOLE payslip disbursement.</p>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-xs font-bold">
                  Quick Cheat Sheet
                </span>
              </div>

              <div className="space-y-4">
                {stepsData.map((step) => (
                  <div key={step.id} className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center">
                          {step.id}
                        </span>
                        <h5 className="font-bold text-white text-sm">
                          {step.title}
                        </h5>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">
                        📍 {step.location}
                      </span>
                    </div>

                    {step.renderVisual()}

                    <div className="p-2.5 bg-slate-900 rounded-lg text-xs text-slate-300 space-y-1">
                      {step.simpleInstructions.map((inst, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{inst}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer with Navigation Buttons */}
        <div className="px-4 sm:px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2">
          {guideMode === 'step-by-step' ? (
            <>
              <button
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-200 transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Step</span>
              </button>

              <span className="text-xs font-mono text-slate-400">
                Step <strong className="text-white">{currentStep}</strong> of {totalSteps}
              </span>

              {currentStep < totalSteps ? (
                <button
                  onClick={() => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer shadow-xs"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer shadow-xs"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Got It, Let's Start!</span>
                </button>
              )}
            </>
          ) : (
            <div className="w-full flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer"
              >
                Close Guide
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
