import React, { useState } from 'react';
import { 
  Clock, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  Check, 
  FileCheck2,
  ShieldAlert
} from 'lucide-react';
import { Employee, Timecard } from '../types/payroll';

interface TimecardsViewProps {
  employees: Employee[];
  timecards: Timecard[];
  onApproveTimecard: (timecardId: string) => void;
  onApproveAllTimecards: () => void;
}

export const TimecardsView: React.FC<TimecardsViewProps> = ({
  employees,
  timecards,
  onApproveTimecard,
  onApproveAllTimecards,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const employeeMap = new Map(employees.map(e => [e.id, e]));

  const filtered = timecards.filter(tc => {
    const emp = employeeMap.get(tc.employeeId);
    if (!emp) return false;

    const matchesSearch = 
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.employeeCode.toLowerCase().includes(search.toLowerCase()) ||
      emp.role.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' || tc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = timecards.filter(t => t.status === 'Submitted').length;

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Duty Log & Timesheet Verification</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit daily duty shifts, overtime hours, night differential shifts (10:00 PM – 6:00 AM), and rest day assignments.
          </p>
        </div>

        {pendingCount > 0 && (
          <button
            onClick={onApproveAllTimecards}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-sm transition shrink-0"
          >
            <CheckCircle2 className="w-4 h-4" />
            Approve All ({pendingCount} Pending)
          </button>
        )}
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
              placeholder="Search guard or agency ID..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-hidden"
          >
            <option value="All">All Statuses</option>
            <option value="Submitted">Submitted (Pending Review)</option>
            <option value="Approved">Approved</option>
          </select>
        </div>

        <span className="text-xs text-slate-400 font-medium">
          {filtered.length} duty logs
        </span>
      </div>

      {/* Timecard Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200 uppercase text-[11px] tracking-wider">
                <th className="py-3 px-4">Guard Personnel</th>
                <th className="py-3 px-4">Client Post</th>
                <th className="py-3 px-4 text-center">Regular Shifts</th>
                <th className="py-3 px-4 text-center">Reg Overtime</th>
                <th className="py-3 px-4 text-center">Night Diff</th>
                <th className="py-3 px-4 text-center">Rest Day / Holiday</th>
                <th className="py-3 px-4 text-center">Duty Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
              {filtered.map((tc) => {
                const emp = employeeMap.get(tc.employeeId);
                if (!emp) return null;

                return (
                  <tr key={tc.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <div className="font-bold text-slate-900 text-xs">{emp.name}</div>
                          <span className="text-[10px] font-mono text-red-600 font-bold bg-red-50 px-1 py-0.2 rounded">
                            {emp.employeeCode}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-800 block text-xs">{emp.clientName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Post: {emp.clientCode}</span>
                    </td>

                    <td className="py-3 px-4 text-center font-bold text-slate-900 font-mono">
                      {tc.regularDays} days
                    </td>

                    <td className="py-3 px-4 text-center font-bold font-mono">
                      {tc.regOvertimeHrs > 0 ? (
                        <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          {tc.regOvertimeHrs} hrs OT
                        </span>
                      ) : (
                        <span className="text-slate-400">0 hrs</span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-center font-mono">
                      {tc.regNightDiffDays > 0 ? (
                        <span className="text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                          {tc.regNightDiffDays} nights
                        </span>
                      ) : (
                        <span className="text-slate-400">0</span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-center font-mono text-slate-600">
                      {tc.restDays > 0 ? `${tc.restDays} rest day ` : ''}
                      {tc.legalHolidays > 0 ? `${tc.legalHolidays} holiday` : (tc.restDays === 0 ? '—' : '')}
                    </td>

                    <td className="py-3 px-4 text-center">
                      {tc.status === 'Approved' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          <Check className="w-3 h-3" />
                          Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                          <AlertTriangle className="w-3 h-3" />
                          Pending Review
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-center">
                      {tc.status !== 'Approved' ? (
                        <button
                          onClick={() => onApproveTimecard(tc.id)}
                          className="px-2.5 py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
                        >
                          Approve
                        </button>
                      ) : (
                        <span className="text-slate-400 text-[11px] italic">Verified</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
