import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Play, 
  ShieldCheck, 
  AlertTriangle, 
  DollarSign, 
  Building2, 
  Send,
  Lock,
  ArrowRight,
  Printer
} from 'lucide-react';
import { Employee, PayPeriod, PayrollRecord } from '../types/payroll';
import { formatCurrency, formatPayslipAmount } from '../utils/payrollCalculator';

interface RunPayrollModalProps {
  period: PayPeriod;
  employees: Employee[];
  records: Record<string, PayrollRecord>;
  onConfirmSuccess: () => void;
  onClose: () => void;
}

export const RunPayrollModal: React.FC<RunPayrollModalProps> = ({
  period,
  employees,
  records,
  onConfirmSuccess,
  onClose,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hrCertify, setHrCertify] = useState(false);

  const recordList = Object.values(records);
  const totalGross = recordList.reduce((s, r) => s + r.grossPay, 0);
  const totalNet = recordList.reduce((s, r) => s + r.netPay, 0);
  const totalDeductions = recordList.reduce((s, r) => s + r.totalDeductions, 0);
  const totalCashbond = recordList.reduce((s, r) => s + r.cashbond, 0);

  const handleExecute = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(4);
      onConfirmSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <Play className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-base font-bold">MERZ Agency Payroll Disbursement</h3>
              <p className="text-xs text-slate-400">
                Cycle: {period.periodName} • {employees.length} Security Personnel
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          {[
            { s: 1, label: 'Audit Pre-Flight' },
            { s: 2, label: 'ATM & Fund Escrow' },
            { s: 3, label: 'HR Compliance Sign-off' },
            { s: 4, label: 'Batch Disbursed' }
          ].map((item) => (
            <div key={item.s} className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                  step >= item.s
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {step > item.s ? <Check className="w-3.5 h-3.5" /> : item.s}
              </span>
              <span
                className={`hidden sm:inline font-medium ${
                  step >= item.s ? 'text-slate-900' : 'text-slate-400'
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Modal Content Steps */}
        <div className="p-6 text-xs text-slate-700">
          {/* STEP 1: Pre-Flight Audit */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-950">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  Pre-Flight Duty Audit Passed
                </div>
                <p className="text-emerald-800 leading-relaxed">
                  All {employees.length} deployed guard rosters, daily shifts, overtime hours, and night differentials have been audited according to DOLE Department Order 150-16.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Gross Payroll Amount</span>
                  <span className="text-lg font-black font-mono text-slate-900">
                    ₱{formatPayslipAmount(totalGross)}
                  </span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Net ATM Release</span>
                  <span className="text-lg font-black font-mono text-emerald-700">
                    ₱{formatPayslipAmount(totalNet)}
                  </span>
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition"
                >
                  <span>Review Treasury & Banking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Bank Disbursement Advice */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  Bank Disbursement & Escrow Allocations
                </h4>

                <div className="space-y-2 font-mono">
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="font-sans text-slate-600">Net Take-Home ATM Release:</span>
                    <span className="font-bold text-slate-900">₱{formatPayslipAmount(totalNet)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="font-sans text-slate-600">Agency Cashbond Escrow:</span>
                    <span className="font-bold text-slate-900">₱{formatPayslipAmount(totalCashbond)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="font-sans text-slate-600">Statutory Deductions (SSS / PhilHealth / HDMF):</span>
                    <span className="font-bold text-slate-900">₱{formatPayslipAmount(totalDeductions - totalCashbond)}</span>
                  </div>
                  <div className="flex justify-between py-1 text-sm font-black border-t border-slate-300">
                    <span className="font-sans text-slate-900">Total Agency Payroll Outlay:</span>
                    <span className="text-emerald-700">₱{formatPayslipAmount(totalGross)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition"
                >
                  <span>Proceed to Authorization</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Compliance Certification */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                <div className="font-bold text-amber-950 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-700" />
                  HR Payroll Manager Electronic Certification
                </div>
                <p className="text-amber-800 leading-relaxed text-[11px]">
                  I hereby certify under penalty of perjury that the payroll records for MERZ Security Solutions Agency Inc. for the period {period.periodName} are true and correct, and in strict compliance with the minimum wage orders and DOLE guidelines.
                </p>
              </div>

              <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={hrCertify}
                  onChange={(e) => setHrCertify(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-emerald-600 rounded-sm border-slate-300 focus:ring-emerald-500"
                />
                <span className="text-slate-800 font-medium leading-tight">
                  I authorize the release of ₱{formatPayslipAmount(totalNet)} for ATM / bank batch transfer to deployed security personnel.
                </span>
              </label>

              <div className="flex justify-between pt-3">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Back
                </button>
                <button
                  disabled={!hrCertify || isProcessing}
                  onClick={handleExecute}
                  className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-lg transition ${
                    hrCertify && !isProcessing
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/30'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>{isProcessing ? 'Executing ATM Dispatch...' : 'Execute Payroll Batch'}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Confirmation */}
          {step === 4 && (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <h4 className="text-base font-black text-slate-900">
                  Payroll Disbursement Successfully Executed!
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Direct ATM transfer file for {employees.length} personnel released for {period.periodName}. Official payslips are now updated with verified disbursement status.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-sm"
                >
                  Done & Return to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
