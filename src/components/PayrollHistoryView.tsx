import React from 'react';
import { History, Calendar, Download, CheckCircle2, FileSpreadsheet, Building } from 'lucide-react';
import { PayPeriod } from '../types/payroll';
import { formatCurrency, formatPayslipAmount } from '../utils/payrollCalculator';

interface PayrollHistoryViewProps {
  periods: PayPeriod[];
  currentPeriod: PayPeriod;
}

export const PayrollHistoryView: React.FC<PayrollHistoryViewProps> = ({
  periods,
  currentPeriod,
}) => {
  const allPeriods = [
    ...(currentPeriod.status === 'Disbursed' ? [currentPeriod] : []),
    ...periods,
  ];

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Historical Agency Pay Cycles</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Archived payroll disbursement records, bank ATM advice logs, and statutory audit packages for MERZ Security Solutions Agency Inc.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">
            {allPeriods.length} cycles on record
          </span>
        </div>
      </div>

      {/* History Grid / List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200 uppercase text-[11px] tracking-wider">
                <th className="py-3 px-4">Pay Period Name</th>
                <th className="py-3 px-4">Period Dates</th>
                <th className="py-3 px-4">Disbursement Date</th>
                <th className="py-3 px-4 text-center">Guards Paid</th>
                <th className="py-3 px-4 text-right">Total Gross</th>
                <th className="py-3 px-4 text-right">Total Deductions</th>
                <th className="py-3 px-4 text-right font-bold text-slate-900">Net Take-Home</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
              {allPeriods.map((period) => (
                <tr key={period.id} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span>{period.periodName}</span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-600 font-mono">
                    {period.startDate} to {period.endDate}
                  </td>

                  <td className="py-3.5 px-4 text-slate-800 font-medium">
                    {period.payDate}
                  </td>

                  <td className="py-3.5 px-4 text-center font-bold text-slate-800 font-mono">
                    {period.employeeCount} personnel
                  </td>

                  <td className="py-3.5 px-4 text-right font-mono text-slate-800">
                    ₱{formatPayslipAmount(period.totalGross)}
                  </td>

                  <td className="py-3.5 px-4 text-right font-mono text-rose-600">
                    ₱{formatPayslipAmount(period.totalDeductions)}
                  </td>

                  <td className="py-3.5 px-4 text-right font-mono font-black text-emerald-700">
                    ₱{formatPayslipAmount(period.totalNet)}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Disbursed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
