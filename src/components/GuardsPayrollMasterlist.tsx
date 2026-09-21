import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, 
  Users, 
  Printer, 
  Download, 
  UserPlus, 
  CheckSquare, 
  Square, 
  MinusSquare, 
  Coins, 
  Check, 
  X, 
  Edit3,
  Calendar,
  Building,
  ShieldCheck,
  Search,
  Filter,
  ArrowUpDown,
  ChevronDown,
  FileCheck,
  Mail,
  Presentation,
  Compass,
  Sliders,
  Maximize2
} from 'lucide-react';
import { Employee, PayrollRecord, PayPeriod } from '../types/payroll';
import { formatPayslipAmount, exportPayrollToCSV } from '../utils/payrollCalculator';
import { loadSavedDisbursementReports } from '../utils/storage';
import { MerzAgencyLogo } from './MerzAgencyLogoDynamic';
import { DisbursementReportModal } from './DisbursementReportModal';

interface GuardsPayrollMasterlistProps {
  employees: Employee[];
  records: Record<string, PayrollRecord>;
  period: PayPeriod;
  onSelectAndSwitchToPayslip: (employee: Employee) => void;
  onOpenPayslipModal?: (employee: Employee) => void;
  onOpenAdjustPayModal?: (employee: Employee) => void;
  onOpenAddGuard: (clientCode?: string) => void;
  onUpdateEmployeeDailyRate: (employeeId: string, newRate: number) => void;
  onBatchUpdateDailyRate: (employeeIds: string[], newRate: number) => void;
  onShowToast?: (msg: string) => void;
  onOpenEmailPayslip?: (employee: Employee) => void;
  onOpenEmailBatch?: (employees: Employee[]) => void;
  onEditGuard?: (employee: Employee) => void;
  onOpenPresentation?: () => void;
  onOpenFeatureGuide?: () => void;
}

export const GuardsPayrollMasterlist: React.FC<GuardsPayrollMasterlistProps> = ({
  employees,
  records,
  period,
  onSelectAndSwitchToPayslip,
  onOpenPayslipModal,
  onOpenAdjustPayModal,
  onOpenAddGuard,
  onUpdateEmployeeDailyRate,
  onBatchUpdateDailyRate,
  onShowToast,
  onOpenEmailPayslip,
  onOpenEmailBatch,
  onEditGuard,
  onOpenPresentation,
  onOpenFeatureGuide,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkRateInput, setBulkRateInput] = useState<string>('695');
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [tempRowRate, setTempRowRate] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [clientFilter, setClientFilter] = useState<string>('ALL');
  const [isHeaderFilterOpen, setIsHeaderFilterOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [savedReportsCount, setSavedReportsCount] = useState<number>(() => {
    return loadSavedDisbursementReports().length;
  });
  const headerFilterRef = useRef<HTMLTableCellElement>(null);

  // Sync saved reports counter
  useEffect(() => {
    if (!isReportModalOpen) {
      setSavedReportsCount(loadSavedDisbursementReports().length);
    }
  }, [isReportModalOpen]);

  // Close header filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerFilterRef.current && !headerFilterRef.current.contains(event.target as Node)) {
        setIsHeaderFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Distinct clients with guard count
  const clientOptions = Array.from(
    new Set(employees.map(e => `${e.clientCode}:::${e.clientName}`))
  ).map(str => {
    const [code, name] = str.split(':::');
    const count = employees.filter(e => e.clientCode === code).length;
    return { code, name, count };
  }).sort((a, b) => a.code.localeCompare(b.code));

  const selectedClientInfo = clientOptions.find(c => c.code === clientFilter);

  // Filtered employees
  const filteredEmployees = employees.filter(emp => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      emp.name.toLowerCase().includes(query) ||
      emp.employeeCode.toLowerCase().includes(query) ||
      emp.role.toLowerCase().includes(query) ||
      emp.clientName.toLowerCase().includes(query) ||
      emp.clientCode.toLowerCase().includes(query) ||
      (emp.sssNumber && emp.sssNumber.toLowerCase().includes(query)) ||
      (emp.philhealthNumber && emp.philhealthNumber.toLowerCase().includes(query)) ||
      (emp.tinNumber && emp.tinNumber.toLowerCase().includes(query)) ||
      (emp.pagibigNumber && emp.pagibigNumber.toLowerCase().includes(query));
    const matchesClient = clientFilter === 'ALL' || emp.clientCode === clientFilter;
    return matchesSearch && matchesClient;
  });

  // Calculate totals based on filtered records
  const filteredRecords = filteredEmployees.map(emp => records[emp.id]).filter(Boolean);
  const totalGross = filteredRecords.reduce((s, r) => s + r.grossPay, 0);
  const totalDeductions = filteredRecords.reduce((s, r) => s + r.totalDeductions, 0);
  const totalNet = filteredRecords.reduce((s, r) => s + r.netPay, 0);

  // Grand totals across all guards
  const allRecords = Object.values(records);
  const grandGross = allRecords.reduce((s, r) => s + r.grossPay, 0);
  const grandNet = allRecords.reduce((s, r) => s + r.netPay, 0);

  const isAllSelected = filteredEmployees.length > 0 && selectedIds.length === filteredEmployees.length;
  const isSomeSelected = selectedIds.length > 0 && selectedIds.length < filteredEmployees.length;

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredEmployees.map((e) => e.id));
    }
  };

  const handleToggleSelectRow = (empId: string) => {
    setSelectedIds((prev) =>
      prev.includes(empId) ? prev.filter((id) => id !== empId) : [...prev, empId]
    );
  };

  const handleApplyBulkRate = (rateValue?: number) => {
    const rateToApply = rateValue !== undefined ? rateValue : parseFloat(bulkRateInput);
    if (isNaN(rateToApply) || rateToApply <= 0) return;
    if (selectedIds.length === 0) return;

    onBatchUpdateDailyRate(selectedIds, Math.round(rateToApply * 100) / 100);
  };

  const handleStartInlineEdit = (emp: Employee) => {
    setEditingRowId(emp.id);
    setTempRowRate(emp.dailyRate.toString());
  };

  const handleSaveInlineEdit = (empId: string) => {
    const rate = parseFloat(tempRowRate);
    if (!isNaN(rate) && rate > 0) {
      onUpdateEmployeeDailyRate(empId, Math.round(rate * 100) / 100);
    }
    setEditingRowId(null);
  };

  const handleExport = () => {
    const exportList = filteredEmployees.length > 0 ? filteredEmployees : employees;
    const suffix = clientFilter !== 'ALL' ? `_Post_${clientFilter}` : '';
    exportPayrollToCSV(exportList, records, `${period.periodName}${suffix}`);
  };

  return (
    <div className="space-y-4">
      {/* Top Banner & Metric Summary Strip */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <MerzAgencyLogo size="w-14 h-14" />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                  Security Personnel Roster
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-semibold text-slate-600">
                  Period: <strong className="text-slate-900">{period.periodName}</strong>
                </span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-slate-950 mt-1">
                Guards Payroll Masterlist
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Active security personnel deployed across Metro Manila & regional client posts
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                if (selectedIds.length > 0) {
                  const selectedGuards = employees.filter((e) => selectedIds.includes(e.id));
                  onOpenEmailBatch?.(selectedGuards);
                } else if (filteredEmployees.length > 0) {
                  onOpenEmailBatch?.(filteredEmployees);
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-300 rounded-xl transition cursor-pointer shadow-2xs"
              title={selectedIds.length > 0 ? `Email payslips to ${selectedIds.length} selected guards` : `Email payslips to active guards (${filteredEmployees.length})`}
            >
              <Mail className="w-3.5 h-3.5 text-sky-600" />
              <span>{selectedIds.length > 0 ? `Email Payslips (${selectedIds.length})` : 'Email Payslips'}</span>
            </button>

            <button
              onClick={() => setIsReportModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition cursor-pointer shadow-2xs"
              title="Generate summary disbursement report"
            >
              <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Disbursement Report</span>
              {savedReportsCount > 0 && (
                <span className="text-[10px] bg-emerald-600 text-white font-extrabold px-1.5 py-0.2 rounded-full">
                  {savedReportsCount}
                </span>
              )}
            </button>

            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition cursor-pointer shadow-2xs"
              title={clientFilter !== 'ALL' ? `Export CSV for Post ${clientFilter} (${filteredEmployees.length} guards)` : 'Export all guards to CSV'}
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => onOpenAddGuard(clientFilter !== 'ALL' ? clientFilter : undefined)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition shadow-xs cursor-pointer"
              title={clientFilter !== 'ALL' ? `Deploy new guard directly to Post ${clientFilter}` : 'Deploy new guard to detachment'}
            >
              <UserPlus className="w-3.5 h-3.5 text-emerald-400" />
              <span>Deploy Guard</span>
            </button>
          </div>
        </div>

        {/* 4 Balanced Metric Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
          <div className="p-3 bg-slate-50/90 border border-slate-200/80 rounded-xl">
            <span className="text-[10.5px] font-bold text-slate-500 block uppercase tracking-wider">
              {clientFilter !== 'ALL' ? `Post ${clientFilter} Force` : 'Deployed Officers'}
            </span>
            <div className="text-lg font-extrabold font-mono text-slate-900 mt-0.5">
              {filteredEmployees.length} <span className="text-xs font-normal text-slate-500">Guards</span>
            </div>
            <span className="text-[10px] text-slate-500 truncate block">
              {clientFilter !== 'ALL' 
                ? (selectedClientInfo?.name.replace(/^FOPM\s*-\s*/i, '') || `Post ${clientFilter}`)
                : `${employees.length} Active Personnel`}
            </span>
          </div>

          <div className="p-3 bg-slate-50/90 border border-slate-200/80 rounded-xl">
            <span className="text-[10.5px] font-bold text-slate-500 block uppercase tracking-wider">
              Gross Earnings
            </span>
            <div className="text-lg font-extrabold font-mono text-slate-900 mt-0.5">
              ₱{formatPayslipAmount(totalGross)}
            </div>
            <span className="text-[10px] text-slate-500 block">
              Base + OT + Night Diff + Allowances
            </span>
          </div>

          <div className="p-3 bg-rose-50/60 border border-rose-200/70 rounded-xl">
            <span className="text-[10.5px] font-bold text-rose-700 block uppercase tracking-wider">
              Total Deductions
            </span>
            <div className="text-lg font-extrabold font-mono text-rose-700 mt-0.5">
              ₱{formatPayslipAmount(totalDeductions)}
            </div>
            <span className="text-[10px] text-rose-600/90 block">
              SSS, PhilHealth, Pag-IBIG, Cash Bond
            </span>
          </div>

          <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl">
            <span className="text-[10.5px] font-bold text-emerald-800 block uppercase tracking-wider">
              Net Disbursement
            </span>
            <div className="text-lg font-black font-mono text-emerald-900 mt-0.5">
              ₱{formatPayslipAmount(totalNet)}
            </div>
            <span className="text-[10px] text-emerald-700 font-medium block">
              D.O. 150-16 Compliant Payout
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Batch Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search and client filter dropdown */}
          <div className="flex flex-wrap items-center gap-2.5 flex-1 max-w-3xl">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guard name, badge #, position, post..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:bg-white transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Client Post Assignment Dropdown Selector */}
            <div className="relative min-w-[240px]">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <Building className="w-3.5 h-3.5" />
              </div>
              <select
                value={clientFilter}
                onChange={(e) => setClientFilter(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:bg-white transition cursor-pointer appearance-none"
              >
                <option value="ALL">All Client Posts ({employees.length} Guards)</option>
                {clientOptions.map((opt) => (
                  <option key={opt.code} value={opt.code}>
                    [{opt.code}] {opt.name.replace('FOPM - ', '')} ({opt.count} Guards)
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>

            {clientFilter !== 'ALL' && (
              <button
                type="button"
                onClick={() => setClientFilter('ALL')}
                className="px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition flex items-center gap-1"
                title="Reset post filter to All"
              >
                <X className="w-3 h-3" />
                <span>Reset Post</span>
              </button>
            )}
          </div>

          {/* Selection indicator & clear */}
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-200">
                {selectedIds.length} Selected
              </span>
              {selectedIds.length === 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      const single = employees.find((e) => e.id === selectedIds[0]);
                      if (single) {
                        if (onOpenPayslipModal) onOpenPayslipModal(single);
                        else onSelectAndSwitchToPayslip(single);
                      }
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition cursor-pointer shadow-2xs"
                    title="Open official dual-copy payslip in popup window"
                  >
                    <FileText className="w-3 h-3 text-emerald-400" />
                    <span>Open Slip Popup</span>
                  </button>

                  {onOpenAdjustPayModal && (
                    <button
                      type="button"
                      onClick={() => {
                        const single = employees.find((e) => e.id === selectedIds[0]);
                        if (single) onOpenAdjustPayModal(single);
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-amber-700 hover:bg-amber-800 text-white rounded-lg transition cursor-pointer shadow-2xs"
                      title="Adjust duty hours & pay in popup window"
                    >
                      <Sliders className="w-3 h-3 text-amber-200" />
                      <span>Adjust Pay</span>
                    </button>
                  )}

                  {onEditGuard && (
                    <button
                      type="button"
                      onClick={() => {
                        const single = employees.find((e) => e.id === selectedIds[0]);
                        if (single) onEditGuard(single);
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition cursor-pointer shadow-2xs"
                      title="Edit selected security personnel profile, detachment post, and statutory IDs"
                    >
                      <Edit3 className="w-3 h-3 text-emerald-200" />
                      <span>Edit Profile</span>
                    </button>
                  )}
                </>
              )}
              <button
                type="button"
                onClick={() => {
                  const selectedGuards = employees.filter((e) => selectedIds.includes(e.id));
                  onOpenEmailBatch?.(selectedGuards);
                }}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition cursor-pointer shadow-2xs"
                title={`Send payslips to ${selectedIds.length} checked security personnel via email`}
              >
                <Mail className="w-3 h-3" />
                <span>Email ({selectedIds.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedIds([])}
                className="text-xs font-medium text-slate-500 hover:text-slate-900 underline cursor-pointer"
              >
                Deselect All
              </button>
            </div>
          )}
        </div>

        {/* Quick Client Post Filter Pills (1-Click Filtering) */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
            <Building className="w-3.5 h-3.5 text-slate-400" />
            Client Post:
          </span>

          <button
            type="button"
            onClick={() => setClientFilter('ALL')}
            className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              clientFilter === 'ALL'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <span>All Posts</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              clientFilter === 'ALL' ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-700'
            }`}>
              {employees.length}
            </span>
          </button>

          {clientOptions.map((opt) => {
            const isSelected = clientFilter === opt.code;
            const shortName = opt.name.replace(/^FOPM\s*-\s*/i, '');
            return (
              <button
                key={opt.code}
                type="button"
                onClick={() => setClientFilter(isSelected ? 'ALL' : opt.code)}
                className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-xs ring-2 ring-emerald-500/30'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                title={`[${opt.code}] ${opt.name} (${opt.count} guards deployed)`}
              >
                <span className={`font-mono text-[10px] px-1 py-0.2 rounded ${
                  isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-200 text-slate-600'
                }`}>
                  {opt.code}
                </span>
                <span className="truncate max-w-[150px]">{shortName}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-200 text-slate-600'
                }`}>
                  {opt.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Filter Callout Banner (when a specific post is filtered) */}
        {clientFilter !== 'ALL' && selectedClientInfo && (
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-emerald-50/90 border border-emerald-200 rounded-xl text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-600 font-medium">Filtered Post: </span>
                <strong className="text-emerald-950 font-bold font-mono text-[13px]">
                  [{selectedClientInfo.code}]
                </strong>{' '}
                <span className="font-bold text-slate-900 text-[13px]">{selectedClientInfo.name}</span>
                <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {filteredEmployees.length} of {employees.length} Guards Deployed
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedIds(filteredEmployees.map(e => e.id));
                }}
                className="px-3 py-1 bg-white hover:bg-emerald-100 text-emerald-900 font-bold rounded-lg border border-emerald-300 transition text-xs shadow-2xs cursor-pointer"
              >
                Select All {filteredEmployees.length} in this Post
              </button>
              <button
                type="button"
                onClick={() => setClientFilter('ALL')}
                className="px-2.5 py-1 text-slate-600 hover:text-slate-900 font-bold hover:bg-emerald-100 rounded-lg transition text-xs flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Show All Posts</span>
              </button>
            </div>
          </div>
        )}

        {/* Batch Base Pay (Daily Rate) Control Banner */}
        <div
          className={`transition-all duration-200 rounded-xl border p-3.5 ${
            selectedIds.length > 0
              ? 'bg-emerald-50/80 border-emerald-300 shadow-2xs'
              : 'bg-slate-50/60 border-slate-200/70'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  selectedIds.length > 0
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                <Coins className="w-4 h-4" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-950">
                    Simultaneous Daily Rate Adjuster
                  </span>
                  {selectedIds.length > 0 ? (
                    <span className="text-[11px] font-semibold text-emerald-800">
                      (Applies to {selectedIds.length} checked guards)
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-500">
                      (Select rows below to batch-update base pay)
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Regular, overtime, and night differential earnings automatically re-evaluate upon changing base pay.
                </p>
              </div>
            </div>

            {/* Presets and custom input */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Preset buttons */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200/80 shadow-2xs text-[11px]">
                <button
                  type="button"
                  onClick={() => {
                    setBulkRateInput('645');
                    if (selectedIds.length > 0) handleApplyBulkRate(645);
                  }}
                  className="px-2.5 py-1 font-semibold rounded-lg hover:bg-slate-100 text-slate-700 transition"
                  title="₱645 NCR Standard Minimum Wage"
                >
                  ₱645 Min
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBulkRateInput('695');
                    if (selectedIds.length > 0) handleApplyBulkRate(695);
                  }}
                  className="px-2.5 py-1 font-bold rounded-lg bg-emerald-100/80 text-emerald-900 hover:bg-emerald-200/80 transition"
                  title="₱695 D.O. 150-16 Standard"
                >
                  ₱695 (DOLE)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBulkRateInput('750');
                    if (selectedIds.length > 0) handleApplyBulkRate(750);
                  }}
                  className="px-2.5 py-1 font-semibold rounded-lg hover:bg-slate-100 text-slate-700 transition"
                  title="₱750 Shift Lead / OIC Rate"
                >
                  ₱750 Lead
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBulkRateInput('850');
                    if (selectedIds.length > 0) handleApplyBulkRate(850);
                  }}
                  className="px-2.5 py-1 font-semibold rounded-lg hover:bg-slate-100 text-slate-700 transition"
                  title="₱850 Supervisor Rate"
                >
                  ₱850 Supv
                </button>
              </div>

              {/* Custom input & apply button */}
              <div className="flex items-center gap-1.5">
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    ₱
                  </span>
                  <input
                    type="number"
                    min="100"
                    step="5"
                    value={bulkRateInput}
                    onChange={(e) => setBulkRateInput(e.target.value)}
                    placeholder="Rate"
                    className="w-24 pl-6 pr-2 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <button
                  type="button"
                  disabled={selectedIds.length === 0}
                  onClick={() => handleApplyBulkRate()}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition shadow-xs ${
                    selectedIds.length > 0
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Apply ({selectedIds.length})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-slate-600 font-semibold border-b border-slate-200/80 uppercase text-[10px] tracking-wider">
                {/* Select All Checkbox Header */}
                <th className="py-3 px-3.5 w-10 text-center">
                  <button
                    type="button"
                    onClick={handleToggleSelectAll}
                    className="flex items-center justify-center text-slate-500 hover:text-slate-900"
                    title={isAllSelected ? "Deselect All" : "Select All Filtered Guards"}
                  >
                    {isAllSelected ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600" />
                    ) : isSomeSelected ? (
                      <MinusSquare className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </th>

                <th className="py-3 px-3">Personnel Badge</th>
                <th className="py-3 px-3">Guard Full Name</th>

                {/* Client Post Assignment Column Header with interactive dropdown filter */}
                <th className="py-3 px-3 relative" ref={headerFilterRef}>
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="font-semibold">Client Post Assignment</span>
                    <button
                      type="button"
                      onClick={() => setIsHeaderFilterOpen(!isHeaderFilterOpen)}
                      className={`px-1.5 py-0.5 rounded-md transition flex items-center gap-1 cursor-pointer ${
                        clientFilter !== 'ALL'
                          ? 'bg-emerald-700 text-white shadow-2xs ring-1 ring-emerald-500'
                          : 'text-slate-400 hover:text-slate-700 hover:bg-slate-200/70'
                      }`}
                      title={clientFilter !== 'ALL' ? `Filtered by Post ${clientFilter}. Click to change filter` : "Filter by Client Post"}
                    >
                      <Filter className="w-3 h-3" />
                      {clientFilter !== 'ALL' && (
                        <span className="text-[9px] font-mono font-bold leading-none">{clientFilter}</span>
                      )}
                    </button>
                  </div>

                  {/* Column Header Dropdown Popover */}
                  {isHeaderFilterOpen && (
                    <div className="absolute left-0 top-full mt-1.5 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 normal-case font-normal text-slate-800">
                      <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <span className="flex items-center gap-1">
                          <Building className="w-3 h-3 text-slate-400" /> Filter by Client Post
                        </span>
                        {clientFilter !== 'ALL' && (
                          <button
                            type="button"
                            onClick={() => {
                              setClientFilter('ALL');
                              setIsHeaderFilterOpen(false);
                            }}
                            className="text-emerald-700 hover:text-emerald-900 lowercase text-[10px] underline cursor-pointer"
                          >
                            clear filter
                          </button>
                        )}
                      </div>

                      <div className="max-h-60 overflow-y-auto p-1 space-y-0.5">
                        <button
                          type="button"
                          onClick={() => {
                            setClientFilter('ALL');
                            setIsHeaderFilterOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition cursor-pointer ${
                            clientFilter === 'ALL'
                              ? 'bg-emerald-50 text-emerald-900 font-bold'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <span>All Client Posts</span>
                          <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                            {employees.length} Guards
                          </span>
                        </button>

                        {clientOptions.map((opt) => {
                          const isSelected = clientFilter === opt.code;
                          return (
                            <button
                              key={opt.code}
                              type="button"
                              onClick={() => {
                                setClientFilter(opt.code);
                                setIsHeaderFilterOpen(false);
                              }}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition cursor-pointer ${
                                isSelected
                                  ? 'bg-emerald-50 text-emerald-900 font-bold'
                                  : 'hover:bg-slate-50 text-slate-700'
                              }`}
                            >
                              <div className="truncate pr-2">
                                <span className="font-mono font-bold text-[10px] text-slate-500 mr-1.5">
                                  [{opt.code}]
                                </span>
                                <span>{opt.name.replace(/^FOPM\s*-\s*/i, '')}</span>
                              </div>
                              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                                {opt.count}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </th>

                {/* Base Pay / Daily Rate (Editable Column) */}
                <th className="py-3 px-3 text-center bg-emerald-50/60 border-x border-emerald-200/50">
                  <div className="flex items-center justify-center gap-1 text-emerald-950 font-bold">
                    <span>Daily Rate (Base)</span>
                    <Edit3 className="w-3 h-3 text-emerald-600" />
                  </div>
                </th>

                <th className="py-3 px-2 text-center">Days</th>
                <th className="py-3 px-2 text-center">OT (hrs)</th>
                <th className="py-3 px-3 text-right">Gross Earnings</th>
                <th className="py-3 px-3 text-right">Deductions</th>
                <th className="py-3 px-3 text-right font-bold text-slate-950">Net Pay</th>
                <th className="py-3 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
              {filteredEmployees.map((emp) => {
                const rec = records[emp.id];
                if (!rec) return null;
                const isSelected = selectedIds.includes(emp.id);
                const isEditingThisRow = editingRowId === emp.id;

                return (
                  <tr
                    key={emp.id}
                    className={`transition ${
                      isSelected ? 'bg-emerald-50/40 hover:bg-emerald-50/60' : 'hover:bg-slate-50/60'
                    }`}
                  >
                    {/* Row Checkbox */}
                    <td className="py-3 px-3.5 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelectRow(emp.id)}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                      />
                    </td>

                    {/* Employee Badge Number */}
                    <td className="py-3 px-3 font-mono font-bold text-red-600 text-[11px]">
                      <button
                        type="button"
                        onClick={() => (onOpenPayslipModal ? onOpenPayslipModal(emp) : onSelectAndSwitchToPayslip(emp))}
                        className="hover:underline cursor-pointer"
                        title="Click to open official payslip in popup window"
                      >
                        {emp.employeeCode}
                      </button>
                    </td>

                    {/* Guard Name */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => (onOpenPayslipModal ? onOpenPayslipModal(emp) : onSelectAndSwitchToPayslip(emp))}
                          className="font-bold text-slate-950 hover:text-emerald-700 text-left flex items-center gap-1.5 group cursor-pointer transition"
                          title={`Click to open payslip popup for ${emp.name}`}
                        >
                          <span className="group-hover:underline underline-offset-2">{emp.name}</span>
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded bg-emerald-50 text-emerald-700 text-[9px] font-semibold flex items-center gap-0.5">
                            <Maximize2 className="w-2.5 h-2.5" />
                            <span>Popup</span>
                          </span>
                        </button>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-2">
                        <span>{emp.role}</span>
                        {onEditGuard && (
                          <>
                            <span className="text-slate-300">•</span>
                            <button
                              type="button"
                              onClick={() => onEditGuard(emp)}
                              className="text-emerald-700 hover:text-emerald-900 font-semibold hover:underline cursor-pointer"
                            >
                              Edit Profile
                            </button>
                          </>
                        )}
                        <span className="text-slate-300">•</span>
                        <button
                          type="button"
                          onClick={() => (onOpenPayslipModal ? onOpenPayslipModal(emp) : onSelectAndSwitchToPayslip(emp))}
                          className="text-slate-600 hover:text-slate-950 font-semibold hover:underline cursor-pointer"
                        >
                          View Slip
                        </button>
                      </div>
                      {(emp.sssNumber || emp.tinNumber || emp.philhealthNumber || emp.pagibigNumber) && (
                        <div className="text-[9.5px] text-slate-400 font-mono mt-0.5 flex flex-wrap gap-x-2">
                          {emp.sssNumber && <span>SSS: <span className="text-slate-600 font-medium">{emp.sssNumber}</span></span>}
                          {emp.tinNumber && <span>TIN: <span className="text-slate-600 font-medium">{emp.tinNumber}</span></span>}
                        </div>
                      )}
                      {emp.lastEditedBy && (
                        <div className="text-[9.5px] text-slate-400 font-mono mt-0.5 flex items-center gap-1">
                          <span className="text-slate-400">Maker:</span>
                          <span className="text-emerald-700 font-semibold truncate max-w-[170px]" title={`Last edited by ${emp.lastEditedBy}${emp.lastEditedAt ? ` on ${emp.lastEditedAt}` : ''}`}>
                            {emp.lastEditedBy}
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Client Post (Clickable to instantly filter by this post) */}
                    <td className="py-3 px-3">
                      <button
                        type="button"
                        onClick={() => setClientFilter(emp.clientCode)}
                        className="text-left group/post transition cursor-pointer"
                        title={`Click to filter list to Post [${emp.clientCode}] ${emp.clientName}`}
                      >
                        <div className="text-slate-800 font-medium truncate max-w-[200px] group-hover/post:text-emerald-700 group-hover/post:underline">
                          {emp.clientName}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5 flex items-center gap-1.5 group-hover/post:text-emerald-600">
                          <span>Post: {emp.clientCode}</span>
                          <span className="text-[9px] px-1 py-0.2 bg-slate-100 rounded text-slate-500 opacity-0 group-hover/post:opacity-100 transition">
                            Filter
                          </span>
                        </div>
                      </button>
                    </td>

                    {/* Inline Editable Daily Rate Cell */}
                    <td className="py-2.5 px-3 text-center bg-emerald-50/20 border-x border-emerald-100/60">
                      {isEditingThisRow ? (
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-xs font-bold text-slate-400">₱</span>
                          <input
                            type="number"
                            min="100"
                            step="5"
                            autoFocus
                            value={tempRowRate}
                            onChange={(e) => setTempRowRate(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveInlineEdit(emp.id);
                              if (e.key === 'Escape') setEditingRowId(null);
                            }}
                            className="w-20 px-2 py-0.5 bg-white border border-emerald-500 rounded-lg text-center font-mono font-bold text-xs focus:outline-hidden"
                          />
                          <button
                            type="button"
                            onClick={() => handleSaveInlineEdit(emp.id)}
                            className="p-1 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                            title="Save rate"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleStartInlineEdit(emp)}
                          className="group inline-flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white hover:border hover:border-emerald-300 transition text-slate-900"
                          title="Click to quickly modify daily rate"
                        >
                          <span className="font-mono font-bold text-xs">
                            ₱{emp.dailyRate.toFixed(2)}
                          </span>
                          <Edit3 className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 transition" />
                        </button>
                      )}
                    </td>

                    {/* Days */}
                    <td className="py-3 px-2 text-center font-mono font-semibold text-slate-800">
                      {rec.regularDays}
                    </td>

                    {/* OT Hours */}
                    <td className="py-3 px-2 text-center font-mono font-semibold text-slate-800">
                      {rec.regOvertimeHrs}
                    </td>

                    {/* Gross Pay */}
                    <td className="py-3 px-3 text-right font-mono text-slate-900 font-medium">
                      ₱{formatPayslipAmount(rec.grossPay)}
                    </td>

                    {/* Deductions */}
                    <td className="py-3 px-3 text-right font-mono text-rose-600 font-medium">
                      ₱{formatPayslipAmount(rec.totalDeductions)}
                    </td>

                    {/* Net Pay */}
                    <td className="py-3 px-3 text-right font-mono font-extrabold text-emerald-800 text-[12.5px]">
                      ₱{formatPayslipAmount(rec.netPay)}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            if (onOpenPayslipModal) {
                              onOpenPayslipModal(emp);
                            } else {
                              onSelectAndSwitchToPayslip(emp);
                            }
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition cursor-pointer shadow-2xs shrink-0"
                          title="Open official DOLE D.O. 150-16 dual-copy payslip sheet in popup window"
                        >
                          <Maximize2 className="w-3 h-3 text-emerald-400" />
                          <span>Payslip</span>
                        </button>

                        {onOpenAdjustPayModal && (
                          <button
                            type="button"
                            onClick={() => onOpenAdjustPayModal(emp)}
                            className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-amber-900 hover:text-amber-950 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition cursor-pointer shrink-0"
                            title={`Adjust duty hours, OT, or deductions in popup window for ${emp.name}`}
                          >
                            <Sliders className="w-3 h-3 text-amber-600" />
                            <span>Adjust</span>
                          </button>
                        )}

                        {onEditGuard && (
                          <button
                            type="button"
                            onClick={() => onEditGuard(emp)}
                            className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition cursor-pointer shrink-0"
                            title={`Edit guard profile, post detachment, and statutory IDs for ${emp.name}`}
                          >
                            <Edit3 className="w-3 h-3 text-emerald-700" />
                            <span>Edit</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => onOpenEmailPayslip?.(emp)}
                          className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-sky-800 hover:text-sky-950 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition cursor-pointer shrink-0"
                          title={`Email official payslip directly to ${emp.name} (${emp.email})`}
                        >
                          <Mail className="w-3 h-3 text-sky-600" />
                          <span>Email</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-slate-500 text-xs">
                    <div className="max-w-xs mx-auto space-y-2">
                      <Building className="w-8 h-8 text-slate-300 mx-auto" />
                      <p className="font-semibold text-slate-700">No guards match your search query or client post filter</p>
                      <p className="text-[11px] text-slate-400">
                        Try resetting your Client Post Assignment or clearing your search term.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setClientFilter('ALL');
                          setSearchQuery('');
                        }}
                        className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>

            {/* Totals Footer (Calculates for filtered subset or entire batch) */}
            <tfoot>
              <tr className="bg-slate-50/90 font-bold border-t-2 border-slate-200 text-slate-900">
                <td colSpan={7} className="py-3.5 px-3 text-right uppercase text-[10.5px] tracking-wider text-slate-600">
                  {clientFilter !== 'ALL'
                    ? `Post [${clientFilter}] Subtotal (${filteredEmployees.length} Guards):`
                    : `Batch Summary Totals (${employees.length} Guards):`}
                </td>
                <td className="py-3.5 px-3 text-right font-mono text-xs text-slate-900">
                  ₱{formatPayslipAmount(totalGross)}
                </td>
                <td className="py-3.5 px-3 text-right font-mono text-rose-700 text-xs">
                  ₱{formatPayslipAmount(totalDeductions)}
                </td>
                <td className="py-3.5 px-3 text-right font-mono text-emerald-900 text-sm font-black">
                  ₱{formatPayslipAmount(totalNet)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Disbursement Submission Report Modal */}
      <DisbursementReportModal
        isOpen={isReportModalOpen}
        onClose={() => {
          setIsReportModalOpen(false);
          setSavedReportsCount(loadSavedDisbursementReports().length);
        }}
        employees={employees}
        records={records}
        period={period}
        initialClientFilter={clientFilter}
        onShowToast={onShowToast}
      />
    </div>
  );
};
