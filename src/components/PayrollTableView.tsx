import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Edit3, 
  ChevronDown, 
  Building, 
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { Employee, PayrollRecord } from '../types/payroll';
import { formatCurrency, formatPayslipAmount } from '../utils/payrollCalculator';

interface PayrollTableViewProps {
  employees: Employee[];
  records: Record<string, PayrollRecord>;
  onAdjustPay: (employee: Employee) => void;
  onViewPaystub: (employee: Employee) => void;
  onToggleApproval: (employeeId: string) => void;
  onApproveAll: () => void;
}

export const PayrollTableView: React.FC<PayrollTableViewProps> = ({
  employees,
  records,
  onAdjustPay,
  onViewPaystub,
  onToggleApproval,
  onApproveAll,
}) => {
  const [search, setSearch] = useState('');
  const [clientFilter, setClientFilter] = useState('All');

  // Filter employees
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.employeeCode.toLowerCase().includes(search.toLowerCase()) ||
      emp.role.toLowerCase().includes(search.toLowerCase());

    const matchesClient = clientFilter === 'All' || emp.clientCode === clientFilter;
    return matchesSearch && matchesClient;
  });

  const uniqueClients = Array.from(new Set(employees.map(e => `${e.clientCode} - ${e.clientName}`)));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Table Toolbar */}
      <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/70">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {/* Search Input */}
          <div className="relative min-w-[240px] max-w-sm flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search guard name, agency ID, role..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Client Filter */}
          <select
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          >
            <option value="All">All Client Deployments</option>
            {employees.map(e => (
              <option key={e.id} value={e.clientCode}>
                {e.clientCode} - {e.clientName}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Bulk Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={onApproveAll}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg transition"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Approve All Records</span>
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100/90 text-slate-600 font-semibold border-b border-slate-200 uppercase text-[11px] tracking-wider">
              <th className="py-3 px-4 w-12 text-center">Appr</th>
              <th className="py-3 px-4">Security Personnel</th>
              <th className="py-3 px-4">Client Post Assignment</th>
              <th className="py-3 px-4 text-center">Shifts & OT</th>
              <th className="py-3 px-4 text-right">Gross Pay</th>
              <th className="py-3 px-4 text-right">Deductions</th>
              <th className="py-3 px-4 text-right font-bold text-slate-900">Net Take-Home</th>
              <th className="py-3 px-4 text-center">Disbursement</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
            {filteredEmployees.map((emp) => {
              const record = records[emp.id];
              if (!record) return null;

              return (
                <tr key={emp.id} className="hover:bg-slate-50/80 transition">
                  {/* Approval Checkbox */}
                  <td className="py-3 px-4 text-center">
                    <input
                      type="checkbox"
                      checked={record.isApproved}
                      onChange={() => onToggleApproval(emp.id)}
                      className="w-4 h-4 text-emerald-600 rounded-sm border-slate-300 focus:ring-emerald-500 cursor-pointer"
                    />
                  </td>

                  {/* Guard Profile */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={emp.avatar}
                        alt={emp.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="font-bold text-slate-900 text-xs hover:text-emerald-700 cursor-pointer" onClick={() => onViewPaystub(emp)}>
                          {emp.name}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-mono text-[10px] text-red-600 font-bold bg-red-50 px-1 py-0.5 rounded">
                            {emp.employeeCode}
                          </span>
                          <span className="text-[11px] text-slate-500">{emp.role}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Client Post */}
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-800 block text-xs">
                      {emp.clientName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Code: {emp.clientCode} • Rate: ₱{emp.dailyRate.toFixed(2)}/day
                    </span>
                  </td>

                  {/* Shifts & OT */}
                  <td className="py-3 px-4 text-center">
                    <span className="font-bold text-slate-800 font-mono">
                      {record.regularDays} days
                    </span>
                    <span className="text-slate-400 text-[10px] block font-mono">
                      {record.regOvertimeHrs > 0 ? `+${record.regOvertimeHrs}h OT` : 'No OT'} 
                      {record.regNightDiffDays > 0 ? ` • ${record.regNightDiffDays}d ND` : ''}
                    </span>
                  </td>

                  {/* Gross Pay */}
                  <td className="py-3 px-4 text-right font-mono font-semibold text-slate-800">
                    ₱{formatPayslipAmount(record.grossPay)}
                  </td>

                  {/* Deductions */}
                  <td className="py-3 px-4 text-right font-mono text-rose-600 font-medium">
                    ₱{formatPayslipAmount(record.totalDeductions)}
                    <span className="block text-[10px] text-slate-400">
                      {record.cashbond > 0 ? `Bond: ₱${record.cashbond.toFixed(0)}` : ''}
                    </span>
                  </td>

                  {/* Net Take-Home */}
                  <td className="py-3 px-4 text-right font-mono font-black text-emerald-700 text-xs">
                    ₱{formatPayslipAmount(record.netPay)}
                  </td>

                  {/* Disbursement / Bank */}
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                      <CreditCard className="w-3 h-3 text-slate-400" />
                      {emp.bankName.split(' ')[0]} {emp.accountNumberMask}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onViewPaystub(emp)}
                        className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg transition"
                        title="View & Print Official Agency Payslip"
                      >
                        <FileText className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Payslip</span>
                      </button>

                      <button
                        onClick={() => onAdjustPay(emp)}
                        className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                        title="Adjust shifts, overtime, allowances or deductions"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer summary bar */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <span>Showing {filteredEmployees.length} security personnel records for active cycle</span>
        <span className="font-semibold text-slate-700">All calculations reflect Philippine DOLE & Agency standards</span>
      </div>
    </div>
  );
};
