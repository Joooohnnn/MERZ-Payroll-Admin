import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  UserPlus, 
  Building2, 
  Mail, 
  Calendar, 
  CreditCard, 
  Edit, 
  ShieldCheck, 
  FileText,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Employee } from '../types/payroll';
import { formatCurrency } from '../utils/payrollCalculator';

interface EmployeeDirectoryViewProps {
  employees: Employee[];
  onAddEmployee: () => void;
  onEditEmployee: (employee: Employee) => void;
  onViewPayslip: (employee: Employee) => void;
}

export const EmployeeDirectoryView: React.FC<EmployeeDirectoryViewProps> = ({
  employees,
  onAddEmployee,
  onEditEmployee,
  onViewPayslip,
}) => {
  const [search, setSearch] = useState('');
  const [clientFilter, setClientFilter] = useState<string>('All');

  const filtered = employees.filter(emp => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.role.toLowerCase().includes(search.toLowerCase()) ||
      emp.employeeCode.toLowerCase().includes(search.toLowerCase());
    const matchesClient = clientFilter === 'All' || emp.clientCode === clientFilter;
    return matchesSearch && matchesClient;
  });

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Security Personnel & Post Deployments</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage guard agency rosters, client site post assignments, daily minimum wage rates, and ATM disbursement accounts.
          </p>
        </div>

        <button
          onClick={onAddEmployee}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition shrink-0"
        >
          <UserPlus className="w-4 h-4 text-emerald-400" />
          Enroll New Personnel
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          <div className="relative min-w-[220px] max-w-sm flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by guard name, agency ID, role..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <select
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          >
            <option value="All">All Client Posts</option>
            {employees.map(e => (
              <option key={e.id} value={e.clientCode}>{e.clientCode} - {e.clientName}</option>
            ))}
          </select>
        </div>

        <span className="text-xs text-slate-400 font-medium">
          {filtered.length} active guards
        </span>
      </div>

      {/* Grid of Guard Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((emp) => (
          <div
            key={emp.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={emp.avatar}
                    alt={emp.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm leading-snug">{emp.name}</h4>
                    <span className="text-xs text-slate-500 block leading-tight">{emp.role}</span>
                    <span className="text-[11px] font-mono text-red-600 font-bold bg-red-50 px-1 py-0.2 rounded inline-block mt-1">
                      {emp.employeeCode}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onViewPayslip(emp)}
                    className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded-lg transition"
                    title="View Official Payslip"
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEditEmployee(emp)}
                    className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                    title="Edit Guard Profile"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Client Post & Compensation Details */}
              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Client Deployment:</span>
                  <span className="font-bold text-slate-800">{emp.clientName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Client Post Code:</span>
                  <span className="font-mono text-slate-800 font-semibold">{emp.clientCode}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Daily Minimum Rate:</span>
                  <span className="font-bold text-slate-900 font-mono">₱{emp.dailyRate.toFixed(2)}/day</span>
                </div>
              </div>
            </div>

            {/* Direct Deposit / ATM Footer */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-600">
                <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate max-w-[150px]">{emp.bankName}</span>
                <span className="font-mono text-slate-400 text-[10px]">{emp.accountNumberMask}</span>
              </div>

              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                <CheckCircle2 className="w-3 h-3" />
                Active Post
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
