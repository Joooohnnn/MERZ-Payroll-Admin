import React, { useState } from 'react';
import { X, Clock, DollarSign, Shield, Check, Calculator } from 'lucide-react';
import { Employee, PayrollRecord } from '../types/payroll';
import { formatCurrency, formatPayslipAmount, calculatePayrollRecord } from '../utils/payrollCalculator';

interface AdjustPayModalProps {
  employee: Employee | null;
  currentRecord: PayrollRecord | null;
  onSave: (employeeId: string, updates: Partial<PayrollRecord>) => void;
  onClose: () => void;
}

export const AdjustPayModal: React.FC<AdjustPayModalProps> = ({
  employee,
  currentRecord,
  onSave,
  onClose,
}) => {
  if (!employee || !currentRecord) return null;

  // Earnings Quantities
  const [regularDays, setRegularDays] = useState(currentRecord.regularDays);
  const [regOvertimeHrs, setRegOvertimeHrs] = useState(currentRecord.regOvertimeHrs);
  const [regNightDiffDays, setRegNightDiffDays] = useState(currentRecord.regNightDiffDays);
  const [restDays, setRestDays] = useState(currentRecord.restDays);
  const [restdayOtHrs, setRestdayOtHrs] = useState(currentRecord.restdayOtHrs);
  const [legalHolidays, setLegalHolidays] = useState(currentRecord.legalHolidays);
  const [legalHolidayOtHrs, setLegalHolidayOtHrs] = useState(currentRecord.legalHolidayOtHrs);
  const [silDays, setSilDays] = useState(currentRecord.silDays);
  const [allowance, setAllowance] = useState(currentRecord.allowance);
  const [adjustment, setAdjustment] = useState(currentRecord.adjustment);

  // Deductions
  const [sssContribution, setSssContribution] = useState(currentRecord.sssContribution);
  const [philhealthContribution, setPhilhealthContribution] = useState(currentRecord.philhealthContribution);
  const [pagibigContribution, setPagibigContribution] = useState(currentRecord.pagibigContribution);
  const [cashbond, setCashbond] = useState(currentRecord.cashbond);
  const [sssLoanSal, setSssLoanSal] = useState(currentRecord.sssLoanSal);
  const [pagibigLoanMpl, setPagibigLoanMpl] = useState(currentRecord.pagibigLoanMpl);
  const [pagibigLoanCal, setPagibigLoanCal] = useState(currentRecord.pagibigLoanCal);
  const [withholdingTax, setWithholdingTax] = useState(currentRecord.withholdingTax);
  const [cashAdvances, setCashAdvances] = useState(currentRecord.cashAdvances);
  const [notes, setNotes] = useState(currentRecord.notes || '');

  // Live preview record
  const previewRecord = calculatePayrollRecord(employee, {
    regularDays,
    regOvertimeHrs,
    regNightDiffDays,
    restDays,
    restdayOtHrs,
    legalHolidays,
    legalHolidayOtHrs,
    silDays,
    allowance,
    adjustment,
    sssContribution,
    philhealthContribution,
    pagibigContribution,
    cashbond,
    sssLoanSal,
    pagibigLoanMpl,
    pagibigLoanCal,
    withholdingTax,
    cashAdvances,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(employee.id, {
      regularDays,
      regOvertimeHrs,
      regNightDiffDays,
      restDays,
      restdayOtHrs,
      legalHolidays,
      legalHolidayOtHrs,
      silDays,
      allowance,
      adjustment,
      sssContribution,
      philhealthContribution,
      pagibigContribution,
      cashbond,
      sssLoanSal,
      pagibigLoanMpl,
      pagibigLoanCal,
      withholdingTax,
      cashAdvances,
      notes,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
          <div>
            <h3 className="text-base font-bold">Adjust Payslip Items: {employee.name}</h3>
            <p className="text-xs text-slate-400">
              {employee.employeeCode} • {employee.role} • Client: {employee.clientCode} ({employee.clientName})
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Earnings Items */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Earnings Duties & Hours (Daily Rate: ₱{employee.dailyRate.toFixed(2)})</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-slate-600 font-medium block mb-1">Regular Days (Duty Shifts)</label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  max="15"
                  value={regularDays}
                  onChange={(e) => setRegularDays(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-bold"
                />
                <span className="text-[10px] text-slate-500 font-mono">Amount: ₱{(regularDays * employee.dailyRate).toFixed(2)}</span>
              </div>

              <div>
                <label className="text-slate-600 font-medium block mb-1">Reg Overtime (Hours)</label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  max="120"
                  value={regOvertimeHrs}
                  onChange={(e) => setRegOvertimeHrs(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-bold"
                />
                <span className="text-[10px] text-slate-500 font-mono">Rate: 1.25x</span>
              </div>

              <div>
                <label className="text-slate-600 font-medium block mb-1">Reg Night Diff (Days)</label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  max="15"
                  value={regNightDiffDays}
                  onChange={(e) => setRegNightDiffDays(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-bold"
                />
                <span className="text-[10px] text-slate-500 font-mono">Rate: 10% premium</span>
              </div>

              <div>
                <label className="text-slate-600 font-medium block mb-1">Rest Day Duty (Days)</label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  max="5"
                  value={restDays}
                  onChange={(e) => setRestDays(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg"
                />
                <span className="text-[10px] text-slate-500 font-mono">Rate: 130%</span>
              </div>

              <div>
                <label className="text-slate-600 font-medium block mb-1">Allowance (₱)</label>
                <input
                  type="number"
                  step="100"
                  min="0"
                  value={allowance}
                  onChange={(e) => setAllowance(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-bold"
                />
                <span className="text-[10px] text-slate-500 font-mono">Duty / Post stipend</span>
              </div>

              <div>
                <label className="text-slate-600 font-medium block mb-1">Adjustment / Pay Back (₱)</label>
                <input
                  type="number"
                  step="50"
                  value={adjustment}
                  onChange={(e) => setAdjustment(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Deductions Items */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Agency & Statutory Deductions</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="text-slate-600 font-medium block mb-1">Cashbond (₱)</label>
                <input
                  type="number"
                  step="10"
                  min="0"
                  value={cashbond}
                  onChange={(e) => setCashbond(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-semibold"
                />
              </div>

              <div>
                <label className="text-slate-600 font-medium block mb-1">SSS Contribution</label>
                <input
                  type="number"
                  step="50"
                  min="0"
                  value={sssContribution}
                  onChange={(e) => setSssContribution(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="text-slate-600 font-medium block mb-1">Philhealth Contrib.</label>
                <input
                  type="number"
                  step="25"
                  min="0"
                  value={philhealthContribution}
                  onChange={(e) => setPhilhealthContribution(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="text-slate-600 font-medium block mb-1">Pagibig Contrib.</label>
                <input
                  type="number"
                  step="50"
                  min="0"
                  value={pagibigContribution}
                  onChange={(e) => setPagibigContribution(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="text-slate-600 font-medium block mb-1">SSS Loan-SAL</label>
                <input
                  type="number"
                  step="50"
                  min="0"
                  value={sssLoanSal}
                  onChange={(e) => setSssLoanSal(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="text-slate-600 font-medium block mb-1">Pagibig Loan MPL</label>
                <input
                  type="number"
                  step="50"
                  min="0"
                  value={pagibigLoanMpl}
                  onChange={(e) => setPagibigLoanMpl(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="text-slate-600 font-medium block mb-1">Withholding Tax</label>
                <input
                  type="number"
                  step="50"
                  min="0"
                  value={withholdingTax}
                  onChange={(e) => setWithholdingTax(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="text-slate-600 font-medium block mb-1">Cash Advances</label>
                <input
                  type="number"
                  step="50"
                  min="0"
                  value={cashAdvances}
                  onChange={(e) => setCashAdvances(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Real-time Recalculated Summary Box */}
          <div className="p-4 bg-emerald-50 border-2 border-emerald-500/40 rounded-xl space-y-2">
            <div className="flex items-center justify-between font-bold text-xs text-emerald-950">
              <span className="flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-emerald-700" />
                Live Payslip Calculation Preview
              </span>
              <span className="text-[11px] text-emerald-800">Matches agency official format</span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs pt-1">
              <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
                <span className="text-slate-500 text-[11px] block">Gross Pay</span>
                <span className="font-extrabold font-mono text-slate-900 text-sm">
                  ₱{formatPayslipAmount(previewRecord.grossPay)}
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
                <span className="text-slate-500 text-[11px] block">Total Deductions</span>
                <span className="font-bold font-mono text-rose-700 text-sm">
                  ₱{formatPayslipAmount(previewRecord.totalDeductions)}
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
                <span className="text-emerald-900 font-semibold text-[11px] block">NET TAKE-HOME</span>
                <span className="font-black font-mono text-emerald-900 text-base">
                  ₱{formatPayslipAmount(previewRecord.netPay)}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition"
            >
              <Check className="w-4 h-4 text-emerald-400" />
              Save & Recalculate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
