import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Printer, 
  Mail, 
  ChevronLeft, 
  ChevronRight, 
  Sliders, 
  FileText, 
  User, 
  Building, 
  ShieldCheck, 
  CreditCard, 
  Clock, 
  DollarSign, 
  Edit3, 
  Check, 
  RotateCcw,
  Sparkles,
  Download
} from 'lucide-react';
import { Employee, PayrollRecord, PayPeriod } from '../types/payroll';
import { formatPayslipAmount, calculatePayrollRecord } from '../utils/payrollCalculator';
import { OfficialPayslipSheet } from './OfficialPayslipSheet';
import { MerzAgencyLogo } from './MerzAgencyLogoDynamic';

interface PaystubModalProps {
  employee: Employee | null;
  record: PayrollRecord | null;
  period: PayPeriod;
  allEmployees?: Employee[];
  allRecords?: Record<string, PayrollRecord>;
  onSelectEmployee?: (employee: Employee) => void;
  onUpdateRecord?: (updates: Partial<PayrollRecord>) => void;
  onClose: () => void;
  onOpenEmail?: (employee: Employee) => void;
  onEditGuard?: (employee: Employee) => void;
  onOpenAdjustModal?: (employee: Employee) => void;
}

export const PaystubModal: React.FC<PaystubModalProps> = ({
  employee,
  record,
  period,
  allEmployees = [],
  allRecords = {},
  onSelectEmployee,
  onUpdateRecord,
  onClose,
  onOpenEmail,
  onEditGuard,
  onOpenAdjustModal,
}) => {
  const [activeTab, setActiveTab] = useState<'payslip' | 'adjust' | 'profile'>('payslip');
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Quick adjust form state inside modal
  const [regularDays, setRegularDays] = useState<number>(record?.regularDays ?? 12);
  const [regOvertimeHrs, setRegOvertimeHrs] = useState<number>(record?.regOvertimeHrs ?? 0);
  const [regNightDiffDays, setRegNightDiffDays] = useState<number>(record?.regNightDiffDays ?? 0);
  const [restDays, setRestDays] = useState<number>(record?.restDays ?? 0);
  const [restdayOtHrs, setRestdayOtHrs] = useState<number>(record?.restdayOtHrs ?? 0);
  const [legalHolidays, setLegalHolidays] = useState<number>(record?.legalHolidays ?? 0);
  const [allowance, setAllowance] = useState<number>(record?.allowance ?? 2000);
  const [cashbond, setCashbond] = useState<number>(record?.cashbond ?? 50);
  const [cashAdvances, setCashAdvances] = useState<number>(record?.cashAdvances ?? 0);
  const [adjustment, setAdjustment] = useState<number>(record?.adjustment ?? 0);

  // Sync state whenever employee or record changes
  useEffect(() => {
    if (record) {
      setRegularDays(record.regularDays);
      setRegOvertimeHrs(record.regOvertimeHrs);
      setRegNightDiffDays(record.regNightDiffDays);
      setRestDays(record.restDays);
      setRestdayOtHrs(record.restdayOtHrs);
      setLegalHolidays(record.legalHolidays);
      setAllowance(record.allowance);
      setCashbond(record.cashbond);
      setCashAdvances(record.cashAdvances);
      setAdjustment(record.adjustment);
    }
  }, [record, employee?.id]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!employee || !record) return null;

  // Carousel navigation index
  const currentIndex = allEmployees.findIndex(e => e.id === employee.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < allEmployees.length - 1;

  const handlePrev = () => {
    if (hasPrev && onSelectEmployee) {
      onSelectEmployee(allEmployees[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (hasNext && onSelectEmployee) {
      onSelectEmployee(allEmployees[currentIndex + 1]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleApplyQuickAdjust = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateRecord) {
      onUpdateRecord({
        regularDays,
        regOvertimeHrs,
        regNightDiffDays,
        restDays,
        restdayOtHrs,
        legalHolidays,
        allowance,
        cashbond,
        cashAdvances,
        adjustment,
      });
      setActiveTab('payslip');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-sm p-2 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200 print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col max-h-[96vh] my-auto print:max-h-none print:shadow-none print:border-none print:w-full print:max-w-none">
        
        {/* Top Executive Popup Window Titlebar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 bg-slate-900 text-white border-b border-slate-800 shrink-0 print:hidden">
          
          {/* Left: Guard identification & Navigation */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-slate-800/90 rounded-lg p-1 border border-slate-700">
              <button
                type="button"
                onClick={handlePrev}
                disabled={!hasPrev}
                className={`p-1.5 rounded-md transition ${hasPrev ? 'hover:bg-slate-700 text-white cursor-pointer' : 'text-slate-600 cursor-not-allowed'}`}
                title="Previous Guard (keyboard left arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono text-slate-300 px-1 font-semibold">
                {currentIndex >= 0 ? `${currentIndex + 1}/${allEmployees.length}` : 'Guard'}
              </span>
              <button
                type="button"
                onClick={handleNext}
                disabled={!hasNext}
                className={`p-1.5 rounded-md transition ${hasNext ? 'hover:bg-slate-700 text-white cursor-pointer' : 'text-slate-600 cursor-not-allowed'}`}
                title="Next Guard (keyboard right arrow)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  <span>{employee.name}</span>
                  <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {employee.employeeCode}
                  </span>
                </h2>
                <span className="hidden md:inline-flex text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {employee.role}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                <span>Post: <strong>[{employee.clientCode}] {employee.clientName}</strong></span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-mono font-bold">
                  Net Pay: ₱{formatPayslipAmount(record.netPay)}
                </span>
              </p>
            </div>
          </div>

          {/* Center/Right: Popup Mode Tabs & Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 justify-end">
            {/* View Mode Tabs */}
            <div className="bg-slate-800 p-1 rounded-xl flex items-center border border-slate-700 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('payslip')}
                className={`flex items-center gap-1.5 px-3 py-1 font-bold rounded-lg transition cursor-pointer ${
                  activeTab === 'payslip'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Payslip Sheet</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('adjust')}
                className={`flex items-center gap-1.5 px-3 py-1 font-bold rounded-lg transition cursor-pointer ${
                  activeTab === 'adjust'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Duty Adjuster</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-1.5 px-3 py-1 font-bold rounded-lg transition cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Officer Info</span>
              </button>
            </div>

            {/* Email Button */}
            {onOpenEmail && (
              <button
                type="button"
                onClick={() => onOpenEmail(employee)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-sky-700 hover:bg-sky-600 text-white rounded-xl shadow-xs transition cursor-pointer"
                title={`Send electronic payslip to ${employee.name} (${employee.email})`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Email Slip</span>
              </button>
            )}

            {/* Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-xs transition cursor-pointer"
              title="Print official dual-copy payslip sheet or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Slip</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer ml-1"
              title="Close window (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Tabs */}
        <div className="flex-1 overflow-y-auto bg-slate-100/60 p-3 sm:p-5">
          
          {/* TAB 1: OFFICIAL DUAL-COPY PAYSLIP SHEET */}
          {activeTab === 'payslip' && (
            <div className="space-y-3">
              {/* Document Subheader Bar */}
              <div className="flex items-center justify-between px-2 text-xs text-slate-600 print:hidden">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                    Official DOLE D.O. 150-16 Document Preview
                  </span>
                  <span className="text-slate-400">•</span>
                  <span>Employee Copy + Agency Copy (Landscape A4)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('adjust')}
                    className="text-emerald-700 hover:text-emerald-800 font-semibold underline flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    <Sliders className="w-3 h-3" />
                    <span>Adjust Duty Hours &amp; Pay</span>
                  </button>
                </div>
              </div>

              {/* Printable Payslip Component */}
              <div className="flex justify-center p-3 sm:p-5 bg-slate-200/60 rounded-2xl border border-slate-300/80 shadow-inner overflow-x-auto print:bg-white print:border-none print:p-0 print:shadow-none">
                <OfficialPayslipSheet
                  employee={employee}
                  record={record}
                  period={period}
                />
              </div>
            </div>
          )}

          {/* TAB 2: DUTY HOURS & TIME CARD QUICK ADJUSTER */}
          {activeTab === 'adjust' && (
            <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>Duty Shifts &amp; Deduction Adjuster</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Modifying hours recalculates DOLE D.O. 150-16 overtime, night differential, and net pay in real time.
                  </p>
                </div>
                <div className="text-right font-mono">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Base Daily Wage</div>
                  <div className="text-sm font-extrabold text-emerald-700">₱{employee.dailyRate.toFixed(2)}/day</div>
                </div>
              </div>

              <form onSubmit={handleApplyQuickAdjust} className="space-y-5">
                {/* 12-Hour Duty Shift Quantities */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <span>1. Duty Shifts &amp; Overtime (15-Day Cycle)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
                    <div>
                      <label className="text-slate-700 font-semibold block mb-1">
                        Regular Days (8 hrs standard)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="15"
                        step="1"
                        value={regularDays}
                        onChange={(e) => setRegularDays(parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-emerald-600"
                      />
                      <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
                        = ₱{(regularDays * employee.dailyRate).toFixed(2)}
                      </span>
                    </div>

                    <div>
                      <label className="text-slate-700 font-semibold block mb-1">
                        Reg Overtime (125% rate)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={regOvertimeHrs}
                        onChange={(e) => setRegOvertimeHrs(parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-emerald-600"
                      />
                      <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
                        4.0 hrs/day standard 12-hr shift
                      </span>
                    </div>

                    <div>
                      <label className="text-slate-700 font-semibold block mb-1">
                        Night Diff Days (10% rate)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="15"
                        step="1"
                        value={regNightDiffDays}
                        onChange={(e) => setRegNightDiffDays(parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-emerald-600"
                      />
                      <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
                        10:00 PM – 6:00 AM shift
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rest Days & Holidays */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <span>2. Rest Day Duty &amp; Legal Holidays</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
                    <div>
                      <label className="text-slate-700 font-semibold block mb-1">
                        Rest Days Worked (130%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={restDays}
                        onChange={(e) => setRestDays(parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="text-slate-700 font-semibold block mb-1">
                        Rest Day OT (169%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={restdayOtHrs}
                        onChange={(e) => setRestdayOtHrs(parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="text-slate-700 font-semibold block mb-1">
                        Legal Holidays (200%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={legalHolidays}
                        onChange={(e) => setLegalHolidays(parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Allowances & Deductions */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <span>3. Allowances &amp; Custom Deductions</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5 text-xs">
                    <div>
                      <label className="text-slate-700 font-semibold block mb-1">Allowance (₱)</label>
                      <input
                        type="number"
                        step="50"
                        value={allowance}
                        onChange={(e) => setAllowance(parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="text-slate-700 font-semibold block mb-1">Cash Bond (₱)</label>
                      <input
                        type="number"
                        step="10"
                        value={cashbond}
                        onChange={(e) => setCashbond(parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="text-slate-700 font-semibold block mb-1">Cash Advances / Vale (₱)</label>
                      <input
                        type="number"
                        step="50"
                        value={cashAdvances}
                        onChange={(e) => setCashAdvances(parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono font-bold text-slate-900 text-rose-600"
                      />
                    </div>

                    <div>
                      <label className="text-slate-700 font-semibold block mb-1">Adjustments (₱)</label>
                      <input
                        type="number"
                        step="10"
                        value={adjustment}
                        onChange={(e) => setAdjustment(parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Live Projected Pay Calculation Box */}
                {(() => {
                  const projected = calculatePayrollRecord(employee, {
                    ...record,
                    regularDays,
                    regOvertimeHrs,
                    regNightDiffDays,
                    restDays,
                    restdayOtHrs,
                    legalHolidays,
                    allowance,
                    cashbond,
                    cashAdvances,
                    adjustment,
                  });

                  return (
                    <div className="bg-slate-900 text-white rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm border border-slate-800">
                      <div>
                        <div className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                          Live Projected Payout
                        </div>
                        <div className="text-xs text-slate-300 mt-1 flex items-center gap-2">
                          <span>Gross: <strong className="font-mono text-white">₱{formatPayslipAmount(projected.grossPay)}</strong></span>
                          <span className="text-slate-600">•</span>
                          <span>Deductions: <strong className="font-mono text-rose-400">-₱{formatPayslipAmount(projected.totalDeductions)}</strong></span>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-[10.5px] font-bold uppercase tracking-wider text-emerald-400">
                          Projected Net Take-Home
                        </div>
                        <div className="text-xl font-mono font-black text-emerald-300">
                          ₱{formatPayslipAmount(projected.netPay)}
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Submit / Save Bar */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('payslip')}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Apply Adjustments &amp; Save</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: OFFICER PROFILE & STATUTORY DETAILS */}
          {activeTab === 'profile' && (
            <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base border-2 border-emerald-300">
                    {employee.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{employee.name}</h3>
                    <p className="text-xs text-slate-500">
                      Badge: <span className="font-mono font-bold text-red-600">{employee.employeeCode}</span> • Rank: <strong>{employee.role}</strong>
                    </p>
                  </div>
                </div>

                {onEditGuard && (
                  <button
                    type="button"
                    onClick={() => onEditGuard(employee)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl transition cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>

              {/* Detachment Post Assignment */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Building className="w-4 h-4 text-slate-500" />
                  <span>Detachment Post Assignment</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Client Code:</span>
                    <span className="font-mono font-bold text-slate-900">{employee.clientCode}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Client Post Name:</span>
                    <span className="font-bold text-slate-900">{employee.clientName}</span>
                  </div>
                </div>
              </div>

              {/* Statutory Numbers */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Government Statutory Identification Numbers</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">SSS Number:</span>
                    <span className="font-mono font-bold text-slate-900">{employee.sssNumber || 'Not filed'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">PhilHealth No:</span>
                    <span className="font-mono font-bold text-slate-900">{employee.philhealthNumber || 'Not filed'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">TIN Tax ID:</span>
                    <span className="font-mono font-bold text-slate-900">{employee.tinNumber || 'Not filed'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Pag-IBIG No:</span>
                    <span className="font-mono font-bold text-slate-900">{employee.pagibigNumber || 'Not filed'}</span>
                  </div>
                </div>
              </div>

              {/* Banking & ATM Disbursement Details */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span>ATM Payroll Disbursement &amp; Direct Deposit</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Bank Institution:</span>
                    <span className="font-bold text-slate-900">{employee.bankName || 'BDO Unibank'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Account Number:</span>
                    <span className="font-mono font-bold text-slate-900">{employee.accountNumberMask || '•••• 1234'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Disbursement Status:</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                      <Check className="w-3 h-3" /> Verified Direct Deposit
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Employee Email:</span>
                    <span className="font-mono text-slate-800">{employee.email}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-5 py-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0 print:hidden">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span>MERZ Security Solutions Agency Inc.</span>
            <span>•</span>
            <span>DOLE D.O. 150-16 Certified</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
            >
              Close Window
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
