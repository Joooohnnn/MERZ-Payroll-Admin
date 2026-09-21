import React from 'react';
import { 
  ShieldCheck, 
  Building2, 
  Calendar, 
  FileCheck, 
  Download, 
  AlertCircle,
  HelpCircle,
  Landmark
} from 'lucide-react';
import { PayrollRecord } from '../types/payroll';
import { formatCurrency, formatPayslipAmount } from '../utils/payrollCalculator';

interface TaxesComplianceViewProps {
  records: Record<string, PayrollRecord>;
}

export const TaxesComplianceView: React.FC<TaxesComplianceViewProps> = ({ records }) => {
  const recordList = Object.values(records);

  const totalGross = recordList.reduce((sum, r) => sum + r.grossPay, 0);
  const totalSSS = recordList.reduce((sum, r) => sum + r.sssContribution, 0);
  const totalPhilHealth = recordList.reduce((sum, r) => sum + r.philhealthContribution, 0);
  const totalPagibig = recordList.reduce((sum, r) => sum + r.pagibigContribution, 0);
  const totalCashbond = recordList.reduce((sum, r) => sum + r.cashbond, 0);
  const totalWithholdingTax = recordList.reduce((sum, r) => sum + r.withholdingTax, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">
              Philippine Statutory & DOLE Agency Compliance
            </h3>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
              DOLE D.O. 150-16 Compliant
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Summary of SSS, PhilHealth, Pag-IBIG contributions, Cashbond escrow balances, and BIR Form 1601-C withholding.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-right">
            <span className="text-[10px] text-slate-400 block leading-tight">Total Statutory & Bond</span>
            <span className="font-bold text-slate-900 font-mono text-sm">
              ₱{formatPayslipAmount(totalSSS + totalPhilHealth + totalPagibig + totalCashbond + totalWithholdingTax)}
            </span>
          </div>
        </div>
      </div>

      {/* Statutory Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* SSS */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800 text-xs">SSS Contributions</span>
            <Landmark className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 text-xl font-bold font-mono text-slate-900">
            ₱{formatPayslipAmount(totalSSS)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Social Security System employee share remittance
          </p>
        </div>

        {/* PhilHealth */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800 text-xs">PhilHealth Fund</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-xl font-bold font-mono text-slate-900">
            ₱{formatPayslipAmount(totalPhilHealth)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Universal Healthcare statutory premiums
          </p>
        </div>

        {/* Pag-IBIG */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800 text-xs">Pag-IBIG / HDMF</span>
            <Building2 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 text-xl font-bold font-mono text-slate-900">
            ₱{formatPayslipAmount(totalPagibig)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Home Development Mutual Fund contributions & loans
          </p>
        </div>

        {/* Cashbond Escrow */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800 text-xs">Agency Cashbond Escrow</span>
            <FileCheck className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="mt-2 text-xl font-bold font-mono text-slate-900">
            ₱{formatPayslipAmount(totalCashbond)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            ₱50.00 standard bi-monthly agency uniform & bond trust
          </p>
        </div>
      </div>

      {/* Compliance Standard Notice */}
      <div className="bg-slate-900 text-slate-300 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs">
        <div className="flex items-center gap-2 text-white font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>DOLE Department Order No. 150-16 Security Guard Remittance Rules</span>
        </div>
        <p className="text-slate-400 leading-relaxed">
          Security Service Contractors (SSCs) are mandated by the Department of Labor and Employment (DOLE) to remit statutory deductions (SSS, PhilHealth, Pag-IBIG) directly to government agencies. Service Incentive Leaves (SIL) of 5 days with pay per year of service, overtime rates of 125% for regular duty and 130% for rest days, and 10% Night Differential (10:00 PM to 6:00 AM) are automatically verified by the MERZ Security Solutions payroll engine.
        </p>
      </div>
    </div>
  );
};
