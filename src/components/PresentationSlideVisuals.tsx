import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Calculator, 
  FileText, 
  Users, 
  Sliders, 
  Lock, 
  Mail, 
  Cloud, 
  TrendingUp,
  CheckCircle2,
  Building2,
  Calendar,
  CreditCard,
  Printer,
  ChevronRight,
  Shield,
  Smartphone,
  Database,
  Sparkles,
  UserPlus,
  Edit3,
  RefreshCw,
  Download,
  Laptop,
  CheckSquare,
  AlertTriangle
} from 'lucide-react';

// Slide 1: System Manual Overview
export const SlideVisual1: React.FC = () => (
  <div className="h-full flex flex-col justify-between p-5 sm:p-7 bg-linear-to-br from-slate-900 via-slate-950 to-emerald-950 text-white rounded-xl border border-emerald-500/20 shadow-2xl relative overflow-hidden">
    <div className="relative z-10 flex items-center justify-between border-b border-emerald-500/20 pb-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg ring-2 ring-emerald-400/40">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 font-mono">
            User Operations Manual &amp; Feature Guide
          </span>
          <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
            MERZ Security Solutions HR &amp; Payroll Suite
          </h2>
        </div>
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold font-mono">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>DOLE D.O. 150-16 Certified</span>
      </div>
    </div>

    <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 my-auto py-2">
      <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
          <UserPlus className="w-4 h-4" />
        </div>
        <h4 className="text-xs font-black text-white">1. Guard Onboarding</h4>
        <p className="text-[10px] text-slate-400 mt-0.5">Sequential codes, client detachments &amp; statutory IDs</p>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-2">
          <Clock className="w-4 h-4" />
        </div>
        <h4 className="text-xs font-black text-white">2. 12-Hour Duty &amp; OT</h4>
        <p className="text-[10px] text-slate-400 mt-0.5">125% regular OT, 10% night diff &amp; holiday premiums</p>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
        <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2">
          <FileText className="w-4 h-4" />
        </div>
        <h4 className="text-xs font-black text-white">3. Dual-Copy Slip</h4>
        <p className="text-[10px] text-slate-400 mt-0.5">Side-by-side Guard &amp; Agency copies with signatures</p>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
        <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center mb-2">
          <Database className="w-4 h-4" />
        </div>
        <h4 className="text-xs font-black text-white">4. Local Autosave</h4>
        <p className="text-[10px] text-slate-400 mt-0.5">Secure local persistence with zero cloud dependency</p>
      </div>
    </div>

    <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2.5">
      <span>Follow each slide for step-by-step feature walkthroughs with UI highlights</span>
      <span className="font-mono text-emerald-400 font-bold">14 Feature Modules</span>
    </div>
  </div>
);

// Slide 2: Deploying a New Security Guard
export const SlideVisual2: React.FC = () => (
  <div className="h-full flex flex-col justify-between p-5 sm:p-7 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-xl border border-slate-800 shadow-2xl">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
      <div>
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
          FEATURE 1 WALKTHROUGH
        </span>
        <h3 className="text-lg font-black text-white">Deploying a New Security Guard</h3>
      </div>
      <div className="px-2.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-mono font-bold">
        📍 Guards Masterlist → "+ Deploy New Guard"
      </div>
    </div>

    {/* UI Form Mockup */}
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 my-auto py-2">
      <div className="sm:col-span-7 bg-slate-800/90 border border-slate-700 rounded-xl p-3.5 space-y-2.5">
        <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <UserPlus className="w-3.5 h-3.5 text-emerald-400" />
            <span>New Guard Profile Form</span>
          </span>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded">
            Auto Code: MS-00106
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div>
            <span className="text-slate-400 block text-[10px]">Full Legal Name</span>
            <div className="p-1.5 bg-slate-900 rounded border border-slate-600 text-white font-medium">
              Juan D. Dela Cruz
            </div>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Client Detachment</span>
            <div className="p-1.5 bg-slate-900 rounded border border-slate-600 text-white font-medium">
              Rockwell Center
            </div>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Rank &amp; Shift</span>
            <div className="p-1.5 bg-slate-900 rounded border border-slate-600 text-white font-medium">
              Senior Guard (12h Night)
            </div>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Daily Wage Rate</span>
            <div className="p-1.5 bg-slate-900 rounded border border-slate-600 text-emerald-400 font-mono font-bold">
              ₱695.00 / day
            </div>
          </div>
        </div>

        <div className="p-2 bg-slate-900/80 rounded border border-slate-700 text-[10px] font-mono space-y-1">
          <div className="text-slate-400 font-bold uppercase">Statutory IDs:</div>
          <div className="grid grid-cols-2 gap-1 text-slate-300">
            <span>SSS: 34-8891234-1</span>
            <span>PhilHealth: 12-409182391-2</span>
            <span>TIN: 234-567-890-000</span>
            <span>Pag-IBIG: 1234-5678-9012</span>
          </div>
        </div>
      </div>

      <div className="sm:col-span-5 space-y-2 flex flex-col justify-center">
        <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/60">
          <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sequential Guard Codes</span>
          </div>
          <p className="text-[10px] text-emerald-200/80 mt-0.5">
            Auto-suggests the next agency badge ID, preventing duplicate records.
          </p>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700">
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
            <span>Disbursement Bank &amp; Email</span>
          </div>
          <p className="text-[10px] text-slate-300 mt-0.5">
            Sets up BDO, BPI, or Landbank accounts and officer email for digital slips.
          </p>
        </div>
      </div>
    </div>

    <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2 flex justify-between">
      <span>Saving instantly creates the active quincena payroll profile</span>
      <span className="text-emerald-400 font-mono">Press Ctrl+N for quick deployment</span>
    </div>
  </div>
);

// Slide 3: Editing Guard Information & Detachment Transfers
export const SlideVisual3: React.FC = () => (
  <div className="h-full flex flex-col justify-between p-5 sm:p-7 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-xl border border-slate-800 shadow-2xl">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
      <div>
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">
          FEATURE 2 WALKTHROUGH
        </span>
        <h3 className="text-lg font-black text-white">Editing Guard Profile &amp; Post Transfers</h3>
      </div>
      <div className="px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono font-bold">
        📍 Masterlist → Action Column (✏️ Pencil)
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto py-2">
      <div className="p-3.5 bg-slate-800/90 border border-slate-700 rounded-xl space-y-2">
        <span className="text-xs font-bold text-white flex items-center gap-1.5">
          <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Real-Time Profile Editor</span>
        </span>
        <div className="space-y-1.5 text-[11px]">
          <div className="p-2 bg-slate-900 rounded border border-slate-700">
            <span className="text-[9px] text-slate-500 uppercase block">Current Detachment</span>
            <div className="text-white font-bold flex items-center justify-between">
              <span>BGC Corporate Tower</span>
              <span className="text-amber-400 text-[10px]">Transferring →</span>
            </div>
          </div>
          <div className="p-2 bg-slate-900 rounded border border-cyan-700/80">
            <span className="text-[9px] text-cyan-400 uppercase block">New Client Post</span>
            <div className="text-white font-bold">Rockwell Center Commercial Post</div>
          </div>
          <div className="p-2 bg-slate-900 rounded border border-slate-700 flex justify-between items-center">
            <div>
              <span className="text-[9px] text-slate-500 uppercase block">Rank Promotion</span>
              <span className="text-white font-bold">Security Guard → Senior Guard</span>
            </div>
            <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 text-[10px] font-bold rounded">
              Promoted
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2.5 flex flex-col justify-center">
        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
          <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Preserves Past Cycles</span>
          </h5>
          <p className="text-[11px] text-slate-300">
            Past quincenas retain their original post assignments for legal compliance; only active &amp; future runs apply the transfer.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
          <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Zero Calculation Lag</span>
          </h5>
          <p className="text-[11px] text-slate-300">
            The active payslip automatically adopts the new detachment and rank instantly without requiring any reloads.
          </p>
        </div>
      </div>
    </div>

    <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2 flex justify-between">
      <span>Use search bar in Masterlist to locate guards by SSS, TIN, or Name</span>
      <span className="text-cyan-400 font-mono">Changes saved securely to local device</span>
    </div>
  </div>
);

// Slide 4: Batch Rate Updating
export const SlideVisual4: React.FC = () => (
  <div className="h-full flex flex-col justify-between p-5 sm:p-7 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-xl border border-slate-800 shadow-2xl">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
      <div>
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
          FEATURE 3 WALKTHROUGH
        </span>
        <h3 className="text-lg font-black text-white">Batch Daily Wage Updates by Post</h3>
      </div>
      <div className="px-2.5 py-0.5 rounded bg-amber-950/80 border border-amber-800 text-amber-300 text-xs font-mono font-bold">
        📍 Masterlist → "Update All Rates in Post"
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-auto py-2">
      <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 text-center space-y-2">
        <span className="text-[10px] font-mono text-slate-400 uppercase">1. Select Detachment</span>
        <div className="p-2 bg-slate-900 rounded border border-slate-700 font-bold text-xs text-white">
          Laguna Technopark
        </div>
        <p className="text-[10px] text-slate-400">Filters all 18 security guards stationed at the industrial post</p>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-800/90 border border-amber-600/60 text-center space-y-2">
        <span className="text-[10px] font-mono text-amber-400 uppercase">2. Mass Rate Input</span>
        <div className="p-2 bg-amber-950/50 rounded border border-amber-500 font-mono font-black text-sm text-amber-300">
          ₱695.00 → ₱720.00
        </div>
        <p className="text-[10px] text-slate-300">Enter new RTWPB Regional Minimum Wage order</p>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-800/90 border border-emerald-600/60 text-center space-y-2">
        <span className="text-[10px] font-mono text-emerald-400 uppercase">3. Instant Recalculation</span>
        <div className="p-2 bg-emerald-950/50 rounded border border-emerald-500 font-mono font-black text-xs text-emerald-300">
          OT: ₱112.50/hr • NSD: 10%
        </div>
        <p className="text-[10px] text-slate-300">All 18 guards recalculate basic, overtime &amp; net pay in 1 second</p>
      </div>
    </div>

    <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 text-[11px] text-amber-200 flex items-center justify-between">
      <span>💡 Pro-Tip: You can also edit individual daily rates inline directly inside the masterlist table.</span>
      <span className="font-mono text-amber-400 font-bold">1-Click Automation</span>
    </div>
  </div>
);

// Slide 5: Adjusting Daily Duty, Overtime & Night Differentials
export const SlideVisual5: React.FC = () => (
  <div className="h-full flex flex-col justify-between p-5 sm:p-7 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-xl border border-slate-800 shadow-2xl">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
      <div>
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
          FEATURE 4 WALKTHROUGH
        </span>
        <h3 className="text-lg font-black text-white">Adjusting Duty Days, 12-Hr OT &amp; Night Shift</h3>
      </div>
      <div className="px-2.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-mono font-bold">
        📍 Official Payslip → "Live Duty &amp; Payslip Controls"
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 my-auto py-2">
      <div className="sm:col-span-6 space-y-2 bg-slate-800/90 border border-slate-700 rounded-xl p-3 text-[11px]">
        <div className="flex justify-between items-center pb-1 border-b border-slate-700">
          <span className="font-bold text-white">Duty Controls Panel</span>
          <span className="text-[10px] text-emerald-400 font-mono">DOLE Multipliers</span>
        </div>
        <div className="flex justify-between items-center p-1.5 bg-slate-900 rounded">
          <span className="text-slate-300">Regular Duty Days:</span>
          <span className="font-bold text-white font-mono">13 Days</span>
        </div>
        <div className="flex justify-between items-center p-1.5 bg-slate-900 rounded">
          <span className="text-slate-300">Daily Overtime (12-hr Post):</span>
          <span className="font-bold text-emerald-400 font-mono">4.0 hrs/day (125%)</span>
        </div>
        <div className="flex justify-between items-center p-1.5 bg-slate-900 rounded">
          <span className="text-slate-300">Night Differential (10PM-6AM):</span>
          <span className="font-bold text-cyan-400 font-mono">Active (10% Premium)</span>
        </div>
        <div className="flex justify-between items-center p-1.5 bg-slate-900 rounded">
          <span className="text-slate-300">Rest Day Duty (Scheduled Off):</span>
          <span className="font-bold text-amber-400 font-mono">1.0 Day (130%)</span>
        </div>
      </div>

      <div className="sm:col-span-6 space-y-2 flex flex-col justify-center">
        <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-[11px] space-y-1">
          <div className="font-bold text-emerald-300">Standard 12-Hour Security Shift Formula</div>
          <p className="text-emerald-100/80 leading-relaxed text-[10px]">
            Base Pay = Days × Daily Rate (₱695.00)<br />
            Regular OT = 52.0 hrs × ₱108.59 (125%)<br />
            Night Diff = 10% premium compounded across night window.
          </p>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-[10px] text-slate-300">
          ⚡ <strong>Live Real-Time Rendering:</strong> As you adjust duty sliders, the payslip document updates immediately on screen.
        </div>
      </div>
    </div>

    <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2 flex justify-between">
      <span>Centavo precision guarantee matching DOLE labor standards inspection sheets</span>
      <span className="text-emerald-400 font-mono">₱0.01 Rounding Compliance</span>
    </div>
  </div>
);

// Slide 6: Allowances, ECOLA & Cash Advances (Vale)
export const SlideVisual6: React.FC = () => (
  <div className="h-full flex flex-col justify-between p-5 sm:p-7 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-xl border border-slate-800 shadow-2xl">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
      <div>
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-teal-400">
          FEATURE 5 WALKTHROUGH
        </span>
        <h3 className="text-lg font-black text-white">Allowances, ECOLA &amp; Emergency Vale</h3>
      </div>
      <div className="px-2.5 py-0.5 rounded bg-teal-950/80 border border-teal-800 text-teal-300 text-xs font-mono font-bold">
        📍 Payslip Controls → "Allowances &amp; Other Deductions"
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-auto py-2">
      <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 space-y-2">
        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Additional Earnings &amp; Allowances
        </span>
        <div className="space-y-1.5 text-[11px]">
          <div className="p-2 bg-slate-900 rounded flex justify-between">
            <span className="text-slate-300">ECOLA (₱25/day):</span>
            <span className="font-bold text-white font-mono">+ ₱325.00</span>
          </div>
          <div className="p-2 bg-slate-900 rounded flex justify-between">
            <span className="text-slate-300">Client Hazard Post Allowance:</span>
            <span className="font-bold text-white font-mono">+ ₱500.00</span>
          </div>
          <div className="p-2 bg-slate-900 rounded flex justify-between">
            <span className="text-slate-300">Firearm Qualification Allowance:</span>
            <span className="font-bold text-white font-mono">+ ₱300.00</span>
          </div>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 space-y-2">
        <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5" /> Emergency Advances &amp; Equipment
        </span>
        <div className="space-y-1.5 text-[11px]">
          <div className="p-2 bg-slate-900 rounded flex justify-between">
            <span className="text-slate-300">Cash Advance (Vale Repayment):</span>
            <span className="font-bold text-rose-400 font-mono">- ₱1,000.00</span>
          </div>
          <div className="p-2 bg-slate-900 rounded flex justify-between">
            <span className="text-slate-300">Uniform &amp; Boot Amortization:</span>
            <span className="font-bold text-rose-400 font-mono">- ₱250.00</span>
          </div>
          <div className="p-2 bg-slate-900 rounded flex justify-between">
            <span className="text-slate-300">Agency Cash Bond:</span>
            <span className="font-bold text-amber-400 font-mono">- ₱150.00</span>
          </div>
        </div>
      </div>
    </div>

    <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700 text-[11px] text-slate-300">
      Every allowance and cash advance is printed with individual itemized labels on the payslip to prevent employee disputes.
    </div>
  </div>
);

// Slide 7: Statutory Deductions & Net Take-Home Pay
export const SlideVisual7: React.FC = () => (
  <div className="h-full flex flex-col justify-between p-5 sm:p-7 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-xl border border-slate-800 shadow-2xl">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
      <div>
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
          FEATURE 6 WALKTHROUGH
        </span>
        <h3 className="text-lg font-black text-white">DOLE Statutory Deductions &amp; Net Pay</h3>
      </div>
      <div className="px-2.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-mono font-bold">
        📍 Statutory Brackets &amp; Net Pay Engine
      </div>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-auto py-2">
      <div className="p-3 bg-slate-800/90 border border-slate-700 rounded-xl space-y-1">
        <span className="text-[10px] font-mono text-slate-400">SSS Contribution</span>
        <div className="text-base font-black text-white font-mono">₱950.00</div>
        <p className="text-[9px] text-slate-400">Official Social Security salary contribution bracket</p>
      </div>

      <div className="p-3 bg-slate-800/90 border border-slate-700 rounded-xl space-y-1">
        <span className="text-[10px] font-mono text-slate-400">PhilHealth (5%)</span>
        <div className="text-base font-black text-white font-mono">₱475.00</div>
        <p className="text-[9px] text-slate-400">50% Employee Share (Employer matches 50%)</p>
      </div>

      <div className="p-3 bg-slate-800/90 border border-slate-700 rounded-xl space-y-1">
        <span className="text-[10px] font-mono text-slate-400">Pag-IBIG Fund</span>
        <div className="text-base font-black text-white font-mono">₱100.00</div>
        <p className="text-[9px] text-slate-400">Standard HDMF statutory employee monthly share</p>
      </div>

      <div className="p-3 bg-slate-800/90 border border-emerald-600/50 rounded-xl space-y-1 bg-emerald-950/20">
        <span className="text-[10px] font-mono text-emerald-400">BIR Withholding</span>
        <div className="text-base font-black text-emerald-400 font-mono">₱0.00</div>
        <p className="text-[9px] text-emerald-300/80">MWE Tax-Exempt Status (RA 9504 Compliance)</p>
      </div>
    </div>

    <div className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between">
      <div>
        <span className="text-xs text-slate-400 font-bold block">NET TAKE-HOME PAY FORMULA</span>
        <span className="text-xs text-slate-300 font-mono">Net Pay = Gross Earnings - (Statutory + Cash Bond + Advances)</span>
      </div>
      <div className="text-right">
        <span className="text-xs text-emerald-400 font-mono font-bold block">NET PAYOUT</span>
        <span className="text-lg font-black text-white font-mono">₱15,730.86</span>
      </div>
    </div>
  </div>
);

// Slide 8: Generating & Printing Dual-Copy Payslips
export const SlideVisual8: React.FC = () => (
  <div className="h-full flex flex-col justify-between p-5 sm:p-7 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-xl border border-slate-800 shadow-2xl">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
      <div>
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">
          FEATURE 7 WALKTHROUGH
        </span>
        <h3 className="text-lg font-black text-white">Dual-Copy Payslips (Print A4 Landscape)</h3>
      </div>
      <div className="px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono font-bold">
        📍 Official Payslip → "Print Dual-Copy Payslip"
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-auto py-2">
      <div className="p-3 bg-white text-slate-900 rounded-xl shadow-lg border border-slate-300 space-y-1.5 font-sans">
        <div className="flex justify-between items-center border-b border-slate-200 pb-1">
          <div className="font-black text-xs text-emerald-900">MERZ SECURITY SOLUTIONS</div>
          <span className="px-1.5 py-0.5 bg-slate-100 text-[9px] font-bold rounded">EMPLOYEE COPY</span>
        </div>
        <div className="text-[9px] text-slate-600">Guard: SG J. Dela Cruz • Post: Rockwell Center</div>
        <div className="p-1.5 bg-slate-50 rounded border border-slate-200 text-[9px] space-y-0.5 font-mono">
          <div className="flex justify-between"><span>Gross Earnings:</span><b>₱17,455.86</b></div>
          <div className="flex justify-between"><span>Total Deductions:</span><b className="text-rose-700">- ₱1,725.00</b></div>
          <div className="flex justify-between border-t border-slate-200 pt-0.5 text-[10px] text-emerald-800 font-black">
            <span>Net Take-Home:</span><span>₱15,730.86</span>
          </div>
        </div>
        <div className="pt-2 text-[8px] text-slate-500 border-t border-slate-200 flex justify-between">
          <span>Kept by Officer</span>
          <span>Date: Sept 30, 2026</span>
        </div>
      </div>

      <div className="p-3 bg-white text-slate-900 rounded-xl shadow-lg border border-slate-300 space-y-1.5 font-sans">
        <div className="flex justify-between items-center border-b border-slate-200 pb-1">
          <div className="font-black text-xs text-emerald-900">MERZ SECURITY SOLUTIONS</div>
          <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-900 text-[9px] font-bold rounded">AGENCY COPY</span>
        </div>
        <div className="text-[9px] text-slate-600">Guard: SG J. Dela Cruz • Code: MS-00106</div>
        <div className="p-1.5 bg-slate-50 rounded border border-slate-200 text-[9px] space-y-0.5 font-mono">
          <div className="flex justify-between"><span>Gross Earnings:</span><b>₱17,455.86</b></div>
          <div className="flex justify-between"><span>Total Deductions:</span><b className="text-rose-700">- ₱1,725.00</b></div>
          <div className="flex justify-between border-t border-slate-200 pt-0.5 text-[10px] text-emerald-800 font-black">
            <span>Net Take-Home:</span><span>₱15,730.86</span>
          </div>
        </div>
        <div className="pt-2 text-[8px] text-slate-700 border-t border-slate-200 flex justify-between font-bold">
          <span>Sign: _____________________</span>
          <span>DOLE Audit Proof</span>
        </div>
      </div>
    </div>

    <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2 flex justify-between">
      <span>Side-by-side fit on a single A4/Letter sheet cuts paper and ink costs by 50%</span>
      <span className="text-cyan-400 font-mono">Clean Print Stylesheet Active</span>
    </div>
  </div>
);

// Slide 9: Electronic Email Payslips
export const SlideVisual9: React.FC = () => (
  <div className="h-full flex flex-col justify-between p-5 sm:p-7 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-xl border border-slate-800 shadow-2xl">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
      <div>
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
          FEATURE 8 WALKTHROUGH
        </span>
        <h3 className="text-lg font-black text-white">Sending Electronic Payslips via Email</h3>
      </div>
      <div className="px-2.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-mono font-bold">
        📍 Single: "Email Payslip" • Batch: "Email All"
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 my-auto py-2">
      <div className="sm:col-span-5 p-3 rounded-xl bg-slate-800/90 border border-slate-700">
        <div className="flex items-center gap-1.5 border-b border-slate-700 pb-1.5 mb-1.5">
          <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs font-bold text-white font-mono">Smartphone Email View</span>
        </div>
        <div className="p-2.5 bg-white text-slate-900 rounded-lg text-[9px] space-y-1 font-sans">
          <div className="font-black text-emerald-900">MERZ SECURITY SOLUTIONS</div>
          <div className="text-slate-500 text-[8px]">Subject: Payslip for Sept 16–30, 2026</div>
          <div className="p-1.5 bg-slate-50 rounded border border-slate-200 mt-1">
            <div>Dear SG Juan Dela Cruz,</div>
            <div className="mt-0.5 font-mono text-[10px]">Net Payout: <b className="text-emerald-700">₱15,730.86</b></div>
            <div className="text-[8px] text-slate-500">Credited to BDO: •••• 4921</div>
          </div>
        </div>
      </div>

      <div className="sm:col-span-7 space-y-2 flex flex-col justify-center text-[11px]">
        <div className="p-2.5 bg-slate-800/80 border border-slate-700 rounded-lg">
          <span className="font-bold text-white block">1-Click Batch Post Emailing</span>
          <p className="text-slate-300 text-[10px] mt-0.5">
            Filter by client detachment and email every guard at that location simultaneously.
          </p>
        </div>
        <div className="p-2.5 bg-slate-800/80 border border-slate-700 rounded-lg">
          <span className="font-bold text-white block">Zero Headquarters Travel Required</span>
          <p className="text-slate-300 text-[10px] mt-0.5">
            Remote security officers stationed at provincial facilities receive their payslips instantly on pay night.
          </p>
        </div>
      </div>
    </div>

    <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2 flex justify-between">
      <span>100% paperless distribution reduces overhead and provides digital proof of delivery</span>
      <span className="text-emerald-400 font-mono">Mobile Responsive Template</span>
    </div>
  </div>
);

// Slide 10: Quincenas & Period Management
export const SlideVisual10: React.FC = () => (
  <div className="h-full flex flex-col justify-between p-5 sm:p-7 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-xl border border-slate-800 shadow-2xl">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
      <div>
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
          FEATURE 9 WALKTHROUGH
        </span>
        <h3 className="text-lg font-black text-white">Managing Quincenas &amp; Historical Cycles</h3>
      </div>
      <div className="px-2.5 py-0.5 rounded bg-amber-950/80 border border-amber-800 text-amber-300 text-xs font-mono font-bold">
        📍 Top Header → Pay Period Dropdown Selector
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-auto py-2">
      <div className="p-3.5 bg-slate-800/90 border border-slate-700 rounded-xl space-y-2">
        <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" /> Quincena Selection
        </span>
        <div className="space-y-1.5 text-[11px]">
          <div className="p-2 bg-slate-900 rounded border border-amber-600/50 flex justify-between items-center">
            <div>
              <span className="font-bold text-white block">2nd Quincena (16th–30th)</span>
              <span className="text-[9px] text-amber-400">Active Calculation Cycle</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <div className="p-2 bg-slate-900/60 rounded border border-slate-700 flex justify-between items-center">
            <div>
              <span className="font-bold text-slate-400 block">1st Quincena (1st–15th)</span>
              <span className="text-[9px] text-slate-500">Archived Period (Auditable)</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Locked</span>
          </div>
        </div>
      </div>

      <div className="p-3.5 bg-slate-800/90 border border-slate-700 rounded-xl space-y-2">
        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5" /> Agency KPI Summary
        </span>
        <div className="space-y-1.5 text-[11px]">
          <div className="p-1.5 bg-slate-900 rounded flex justify-between font-mono">
            <span className="text-slate-400">Total Gross Pay:</span>
            <span className="text-white font-bold">₱349,117.20</span>
          </div>
          <div className="p-1.5 bg-slate-900 rounded flex justify-between font-mono">
            <span className="text-slate-400">Total Statutory Remittance:</span>
            <span className="text-rose-400 font-bold">₱34,500.00</span>
          </div>
          <div className="p-1.5 bg-slate-900 rounded flex justify-between font-mono border-t border-slate-700 pt-1">
            <span className="text-emerald-400 font-bold">Net Cash Required:</span>
            <span className="text-emerald-400 font-bold">₱314,617.20</span>
          </div>
        </div>
      </div>
    </div>

    <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2 flex justify-between">
      <span>Switching pay periods automatically loads historical timesheets and wage calculations</span>
      <span className="text-amber-400 font-mono">Permanent Cycle Retention</span>
    </div>
  </div>
);

// Slide 11: Exporting CSV / Excel
export const SlideVisual11: React.FC = () => (
  <div className="h-full flex flex-col justify-between p-5 sm:p-7 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-xl border border-slate-800 shadow-2xl">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
      <div>
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-teal-400">
          FEATURE 10 WALKTHROUGH
        </span>
        <h3 className="text-lg font-black text-white">Exporting Masterlist to CSV / Excel</h3>
      </div>
      <div className="px-2.5 py-0.5 rounded bg-teal-950/80 border border-teal-800 text-teal-300 text-xs font-mono font-bold">
        📍 Top Nav / Masterlist → "Export CSV"
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 my-auto py-2">
      <div className="sm:col-span-8 bg-slate-800/90 border border-slate-700 rounded-xl p-3 font-mono text-[10px] overflow-hidden">
        <div className="text-slate-400 pb-1 border-b border-slate-700 flex justify-between">
          <span>MERZ_Payroll_Masterlist.csv</span>
          <span className="text-emerald-400">25+ Columns</span>
        </div>
        <div className="mt-2 space-y-1 text-slate-300">
          <div className="text-slate-500 font-bold">ID,Name,Post,DailyRate,Gross,SSS,PhilH,PagIBIG,NetPay,Bank,Account</div>
          <div className="p-1 bg-slate-900/80 rounded">MS-00101,R. Bautista,Rockwell,695,17455,950,475,100,15730,BDO,••••4921</div>
          <div className="p-1 bg-slate-900/80 rounded">MS-00102,E. Santos,BGC,695,17455,950,475,100,15730,BPI,••••3812</div>
          <div className="p-1 bg-slate-900/80 rounded">MS-00103,M. Reyes,Laguna,695,17455,950,475,100,15730,Landbank,••••8819</div>
        </div>
      </div>

      <div className="sm:col-span-4 space-y-2 flex flex-col justify-center text-[11px]">
        <div className="p-2.5 bg-slate-800 border border-slate-700 rounded-lg">
          <span className="font-bold text-white block">Bank Portal Batch Upload</span>
          <p className="text-slate-400 text-[10px] mt-0.5">
            Directly upload to BDO Bizlink, BPI ExpressLink, or Landbank WeAccess.
          </p>
        </div>
        <div className="p-2.5 bg-slate-800 border border-slate-700 rounded-lg">
          <span className="font-bold text-white block">Client Detachment Invoices</span>
          <p className="text-slate-400 text-[10px] mt-0.5">
            Attach detachment CSV exports to monthly client security service billings.
          </p>
        </div>
      </div>
    </div>

    <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2 flex justify-between">
      <span>1-click local CSV generation works instantly even without an internet connection</span>
      <span className="text-teal-400 font-mono">100% Client-Side Engine</span>
    </div>
  </div>
);

// Slide 12: Local Device Storage Autosave & Data Privacy
export const SlideVisual12: React.FC = () => (
  <div className="h-full flex flex-col justify-between p-5 sm:p-7 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-xl border border-slate-800 shadow-2xl">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
      <div>
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
          FEATURE 11 WALKTHROUGH
        </span>
        <h3 className="text-lg font-black text-white">Local Device Storage &amp; Data Privacy</h3>
      </div>
      <div className="px-2.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-mono font-bold">
        📍 Top Nav → "Saved" Status Badge
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-auto py-2">
      <div className="p-3.5 bg-slate-800/90 border border-slate-700 rounded-xl space-y-1.5">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
          <Database className="w-4 h-4" />
        </div>
        <h5 className="text-xs font-bold text-white">Local Autosave</h5>
        <p className="text-[10px] text-slate-300">
          Timecard edits, rate adjustments, and guard enrollments persist immediately to local storage.
        </p>
      </div>

      <div className="p-3.5 bg-slate-800/90 border border-slate-700 rounded-xl space-y-1.5">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <h5 className="text-xs font-bold text-white">Zero Cloud Exposure</h5>
        <p className="text-[10px] text-slate-300">
          Guards' confidential wage records and statutory numbers remain strictly on the local workstation.
        </p>
      </div>

      <div className="p-3.5 bg-slate-800/90 border border-slate-700 rounded-xl space-y-1.5">
        <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
          <Lock className="w-4 h-4" />
        </div>
        <h5 className="text-xs font-bold text-white">100% Offline Capable</h5>
        <p className="text-[10px] text-slate-300">
          Functions independently of external internet connections, cloud outages, or remote server failures.
        </p>
      </div>
    </div>

    <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2 flex justify-between">
      <span>Guarantees immediate responsiveness and total employee data security</span>
      <span className="text-emerald-400 font-mono">Client-Side Persistence Architecture</span>
    </div>
  </div>
);

// Slide 13: Desktop PC Application (.exe) & Offline Operation
export const SlideVisual13: React.FC = () => (
  <div className="h-full flex flex-col justify-between p-5 sm:p-7 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-xl border border-slate-800 shadow-2xl">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
      <div>
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">
          FEATURE 12 WALKTHROUGH
        </span>
        <h3 className="text-lg font-black text-white">Desktop Windows App (.exe) &amp; Offline Mode</h3>
      </div>
      <div className="px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono font-bold">
        📍 Windows Desktop / Bundled "build-windows-exe.bat"
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto py-2">
      <div className="p-4 bg-slate-800/90 border border-slate-700 rounded-xl space-y-2">
        <span className="text-xs font-bold text-white flex items-center gap-1.5">
          <Laptop className="w-4 h-4 text-cyan-400" />
          <span>Standalone Desktop Window</span>
        </span>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          Runs in its own clean window without browser tabs or address bars. Simply install from Chrome/Edge or build the native `.exe` with the bundled batch script.
        </p>
        <div className="p-2 bg-slate-900 rounded font-mono text-[10px] text-cyan-300">
          C:\Program Files\MERZ Security\MERZ_Payroll.exe
        </div>
      </div>

      <div className="p-4 bg-slate-800/90 border border-slate-700 rounded-xl space-y-2">
        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" />
          <span>100% Offline Resilience</span>
        </span>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          Field outposts in basements or remote industrial zones can compute duty hours and print payslips with zero internet.
        </p>
        <div className="p-2 bg-slate-900 rounded font-mono text-[10px] text-emerald-300">
          Zero Internet Required • Native Offline Operation
        </div>
      </div>
    </div>

    <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2 flex justify-between">
      <span>Guarantees operational continuity during field outages and typhoons</span>
      <span className="text-cyan-400 font-mono">Windows 10 &amp; 11 Ready</span>
    </div>
  </div>
);

// Slide 14: Administrator Checklist & Best Practices
export const SlideVisual14: React.FC = () => (
  <div className="h-full flex flex-col justify-between p-5 sm:p-7 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-xl border border-slate-800 shadow-2xl">
    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
      <div>
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
          STANDARD OPERATING PROCEDURES
        </span>
        <h3 className="text-lg font-black text-white">Zero-Error Payroll SOP Checklist</h3>
      </div>
      <div className="px-2.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-mono font-bold">
        📍 Bi-Monthly Operational Timeline
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-auto py-2 text-[11px]">
      <div className="p-3 bg-slate-800/90 border border-slate-700 rounded-xl space-y-1.5">
        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
          <CheckSquare className="w-3.5 h-3.5" /> Days 1–3: Roster Audit
        </span>
        <ul className="space-y-1 text-slate-300 text-[10px]">
          <li>• Deploy new guards in Masterlist</li>
          <li>• Verify SSS, PhilHealth, TIN, Pag-IBIG IDs</li>
          <li>• Check RTWPB daily wage baselines</li>
        </ul>
      </div>

      <div className="p-3 bg-slate-800/90 border border-slate-700 rounded-xl space-y-1.5">
        <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" /> Days 13–14: Timecards
        </span>
        <ul className="space-y-1 text-slate-300 text-[10px]">
          <li>• Enter 13 regular duty days</li>
          <li>• Set 4.0 hrs OT for 12-hr posts</li>
          <li>• Toggle 10% Night Shift Differential</li>
        </ul>
      </div>

      <div className="p-3 bg-slate-800/90 border border-slate-700 rounded-xl space-y-1.5">
        <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
          <Printer className="w-3.5 h-3.5" /> Day 15: Payout &amp; Filing
        </span>
        <ul className="space-y-1 text-slate-300 text-[10px]">
          <li>• Export CSV to reconcile bank funds</li>
          <li>• Print Dual-Copy Slips / Email Slips</li>
          <li>• File signed Agency Copies for DOLE</li>
        </ul>
      </div>
    </div>

    <div className="p-2.5 rounded-lg bg-emerald-950/50 border border-emerald-800 text-[11px] text-emerald-200 flex items-center justify-between">
      <span>🏆 100% DOLE D.O. 150-16 inspection readiness guaranteed when following this SOP.</span>
      <span className="font-mono text-emerald-400 font-bold">Operational Excellence</span>
    </div>
  </div>
);

// Map of slide components
export const SLIDE_VISUAL_MAP: Record<number, React.FC> = {
  1: SlideVisual1,
  2: SlideVisual2,
  3: SlideVisual3,
  4: SlideVisual4,
  5: SlideVisual5,
  6: SlideVisual6,
  7: SlideVisual7,
  8: SlideVisual8,
  9: SlideVisual9,
  10: SlideVisual10,
  11: SlideVisual11,
  12: SlideVisual12,
  13: SlideVisual13,
  14: SlideVisual14,
};
