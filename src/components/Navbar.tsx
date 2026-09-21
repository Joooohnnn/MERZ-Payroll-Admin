import React from 'react';
import { 
  Shield, 
  Play, 
  Download, 
  UserPlus, 
  Calendar,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { PayPeriod } from '../types/payroll';
import { MerzAgencyLogo } from './MerzOfficialLogo';

interface NavbarProps {
  currentPeriod: PayPeriod;
  onOpenRunPayroll: () => void;
  onOpenAddEmployee: () => void;
  onExportCSV: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPeriod,
  onOpenRunPayroll,
  onOpenAddEmployee,
  onExportCSV,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <MerzAgencyLogo size="w-11 h-11" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-extrabold tracking-tight font-serif text-white">
                  MERZ Security Solutions Agency Inc.
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Payroll Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                NCR & Provincial Agency Operations • DOLE & Statutory Compliance
              </p>
            </div>
          </div>

          {/* Current Period & Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Pay Period Pill */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <div className="text-left">
                <span className="text-[10px] text-slate-400 block leading-tight">Pay Cycle</span>
                <span className="font-bold text-slate-200">{currentPeriod.periodName}</span>
              </div>
            </div>

            {/* Export CSV */}
            <button
              onClick={onExportCSV}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Export CSV audit sheet"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            {/* Add Employee */}
            <button
              onClick={onOpenAddEmployee}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              <UserPlus className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Enroll Personnel</span>
            </button>

            {/* Primary Run Payroll Action */}
            <button
              id="btn-run-payroll"
              onClick={onOpenRunPayroll}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/30 transition active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Process Payroll</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
