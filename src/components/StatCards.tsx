import React from 'react';
import { DollarSign, Shield, Users, Clock, AlertCircle } from 'lucide-react';
import { Employee, PayrollRecord } from '../types/payroll';
import { formatCurrency, formatPayslipAmount } from '../utils/payrollCalculator';

interface StatCardsProps {
  records: Record<string, PayrollRecord>;
  employees: Employee[];
}

export const StatCards: React.FC<StatCardsProps> = ({ records, employees }) => {
  const recordList = Object.values(records);

  const totalGross = recordList.reduce((sum, r) => sum + r.grossPay, 0);
  const totalNet = recordList.reduce((sum, r) => sum + r.netPay, 0);
  const totalDeductions = recordList.reduce((sum, r) => sum + r.totalDeductions, 0);
  const totalOvertimeHours = recordList.reduce((sum, r) => sum + r.regOvertimeHrs, 0);
  const totalRegularDays = recordList.reduce((sum, r) => sum + r.regularDays, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Gross Payroll */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Gross Payroll
          </span>
          <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
            <DollarSign className="w-4 h-4" />
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">
            ₱{formatPayslipAmount(totalGross)}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <span>Includes regular shifts, OT & allowances</span>
          </div>
        </div>
      </div>

      {/* Net Pay Direct Deposit */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Net Take-Home Pay
          </span>
          <span className="p-2 rounded-xl bg-blue-50 text-blue-700">
            <Shield className="w-4 h-4" />
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">
            ₱{formatPayslipAmount(totalNet)}
          </div>
          <div className="text-xs text-emerald-700 font-medium mt-1">
            Total ATM / Cash release for {employees.length} personnel
          </div>
        </div>
      </div>

      {/* Total Deductions */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Deductions
          </span>
          <span className="p-2 rounded-xl bg-rose-50 text-rose-700">
            <AlertCircle className="w-4 h-4" />
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">
            ₱{formatPayslipAmount(totalDeductions)}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Cashbond, SSS, PhilHealth, Pag-IBIG
          </div>
        </div>
      </div>

      {/* Roster & Hours */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Duty Shifts & OT Logged
          </span>
          <span className="p-2 rounded-xl bg-amber-50 text-amber-700">
            <Clock className="w-4 h-4" />
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">
            {totalRegularDays} <span className="text-sm font-normal text-slate-500">days</span> / {totalOvertimeHours} <span className="text-sm font-normal text-slate-500">OT hrs</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Across active client deployments
          </div>
        </div>
      </div>
    </div>
  );
};
