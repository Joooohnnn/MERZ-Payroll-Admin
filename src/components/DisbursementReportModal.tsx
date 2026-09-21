import React, { useState, useMemo } from 'react';
import {
  X,
  FileCheck,
  Calendar,
  Building,
  DollarSign,
  Download,
  Printer,
  Save,
  CheckCircle2,
  AlertTriangle,
  Search,
  Users,
  Shield,
  CreditCard,
  Trash2,
  ExternalLink,
  History,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  RotateCcw
} from 'lucide-react';
import { Employee, PayrollRecord, PayPeriod, DisbursementSubmissionReport, DisbursementReportGuardItem } from '../types/payroll';
import { formatPayslipAmount } from '../utils/payrollCalculator';
import { saveDisbursementReport, loadSavedDisbursementReports, deleteSavedDisbursementReport } from '../utils/storage';
import { MerzAgencyLogo } from './MerzAgencyLogoDynamic';

interface DisbursementReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  employees: Employee[];
  records: Record<string, PayrollRecord>;
  period: PayPeriod;
  initialClientFilter?: string;
  onShowToast?: (msg: string) => void;
}

export const DisbursementReportModal: React.FC<DisbursementReportModalProps> = ({
  isOpen,
  onClose,
  employees,
  records,
  period,
  initialClientFilter = 'ALL',
  onShowToast
}) => {
  if (!isOpen) return null;

  // Active view tab: 'create' or 'archive'
  const [activeTab, setActiveTab] = useState<'create' | 'archive'>('create');

  // Form states for creating report
  const [disbursedDate, setDisbursedDate] = useState<string>(
    period.payDate || new Date().toISOString().split('T')[0]
  );
  const [clientScope, setClientScope] = useState<string>(initialClientFilter);
  const [channel, setChannel] = useState<string>('BDO Corporate ATM Direct Credit');
  const [reportTitle, setReportTitle] = useState<string>(
    `Official Payroll Disbursement & Bank Remittance Report`
  );
  const [preparedBy, setPreparedBy] = useState<string>(
    'Capt. Arthur Pendelton (Payroll & HR Officer)'
  );
  const [certifiedBy, setCertifiedBy] = useState<string>(
    'Col. Eduardo R. Zobel (VP Security Operations)'
  );
  const [verifiedBy, setVerifiedBy] = useState<string>(
    'Internal Audit & Compliance Division'
  );
  const [remarks, setRemarks] = useState<string>(
    'Certified compliant with DOLE D.O. 150-16 for security guard service contractor payroll disbursement.'
  );

  // Auto-generate reference number
  const initialRef = useMemo(() => {
    const cleanDate = disbursedDate.replace(/-/g, '');
    return `MERZ-DISB-${cleanDate}-001`;
  }, [disbursedDate]);
  const [referenceNumber, setReferenceNumber] = useState<string>(initialRef);

  // Search filter inside the guard breakdown table
  const [tableSearch, setTableSearch] = useState<string>('');

  // Confirmation dialog state for saving
  const [isConfirmSaveOpen, setIsConfirmSaveOpen] = useState<boolean>(false);
  const [savedSuccessMessage, setSavedSuccessMessage] = useState<string | null>(null);

  // Saved reports list state
  const [savedReports, setSavedReports] = useState<DisbursementSubmissionReport[]>(() =>
    loadSavedDisbursementReports()
  );
  const [selectedArchivedReport, setSelectedArchivedReport] = useState<DisbursementSubmissionReport | null>(null);

  // Unique client posts for scope selection
  const clientPosts = useMemo(() => {
    const map = new Map<string, string>();
    employees.forEach((emp) => {
      if (emp.clientCode && !map.has(emp.clientCode)) {
        map.set(emp.clientCode, emp.clientName);
      }
    });
    return Array.from(map.entries()).map(([code, name]) => ({ code, name }));
  }, [employees]);

  // Compute guard items based on client scope
  const targetEmployees = useMemo(() => {
    if (clientScope === 'ALL') return employees;
    return employees.filter((e) => e.clientCode === clientScope);
  }, [employees, clientScope]);

  const reportGuardItems: DisbursementReportGuardItem[] = useMemo(() => {
    return targetEmployees.map((emp) => {
      const rec = records[emp.id];
      const gross = rec ? rec.grossPay : emp.dailyRate * 12;
      const statutory = rec
        ? rec.sssContribution + rec.philhealthContribution + rec.pagibigContribution + rec.withholdingTax
        : 0;
      const agency = rec
        ? rec.cashbond + rec.cashAdvances + rec.sssLoanSal + rec.pagibigLoanMpl + rec.pagibigLoanCal
        : 50.0;
      const totalDed = rec ? rec.totalDeductions : statutory + agency;
      const net = rec ? rec.netPay : gross - totalDed;

      return {
        employeeId: emp.id,
        employeeCode: emp.employeeCode,
        name: emp.name,
        role: emp.role,
        clientCode: emp.clientCode,
        clientName: emp.clientName,
        bankName: emp.bankName,
        accountNumberMask: emp.accountNumberMask,
        dailyRate: emp.dailyRate,
        regularDays: rec?.regularDays ?? 12,
        overtimeHours: rec?.regOvertimeHrs ?? 0,
        grossPay: gross,
        statutoryDeductions: statutory,
        agencyDeductions: agency,
        totalDeductions: totalDed,
        netPay: net,
        disbursementStatus: 'Ready',
      };
    });
  }, [targetEmployees, records]);

  // Filtered by table search
  const displayedGuards = useMemo(() => {
    if (!tableSearch.trim()) return reportGuardItems;
    const q = tableSearch.toLowerCase().trim();
    return reportGuardItems.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.employeeCode.toLowerCase().includes(q) ||
        g.clientCode.toLowerCase().includes(q) ||
        g.role.toLowerCase().includes(q)
    );
  }, [reportGuardItems, tableSearch]);

  // Aggregate totals
  const totalGross = useMemo(() => reportGuardItems.reduce((sum, g) => sum + g.grossPay, 0), [reportGuardItems]);
  const totalStatutory = useMemo(() => reportGuardItems.reduce((sum, g) => sum + g.statutoryDeductions, 0), [reportGuardItems]);
  const totalAgency = useMemo(() => reportGuardItems.reduce((sum, g) => sum + g.agencyDeductions, 0), [reportGuardItems]);
  const totalDeductions = useMemo(() => reportGuardItems.reduce((sum, g) => sum + g.totalDeductions, 0), [reportGuardItems]);
  const totalNet = useMemo(() => reportGuardItems.reduce((sum, g) => sum + g.netPay, 0), [reportGuardItems]);

  const clientScopeLabel = useMemo(() => {
    if (clientScope === 'ALL') return 'All Active Client Detachments';
    const found = clientPosts.find((p) => p.code === clientScope);
    return found ? `[${found.code}] ${found.name}` : `Post ${clientScope}`;
  }, [clientScope, clientPosts]);

  // Format date display
  const formattedDisbursedDate = useMemo(() => {
    try {
      const [y, m, d] = disbursedDate.split('-');
      const dateObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
      return dateObj.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return disbursedDate;
    }
  }, [disbursedDate]);

  // Handle save initiation (triggers confirmation dialog)
  const handleInitiateSave = () => {
    setIsConfirmSaveOpen(true);
  };

  // Handle actual confirmed save
  const handleConfirmSave = () => {
    const reportData: DisbursementSubmissionReport = {
      id: `rep-${Date.now()}`,
      referenceNumber: referenceNumber.trim() || initialRef,
      reportTitle: reportTitle.trim() || 'Official Payroll Disbursement & Bank Remittance Report',
      disbursedDate,
      createdAt: new Date().toISOString(),
      periodName: period.periodName,
      clientFilter: clientScope,
      clientNameScope: clientScopeLabel,
      totalGuards: reportGuardItems.length,
      totalGrossPay: totalGross,
      totalStatutoryDeductions: totalStatutory,
      totalAgencyDeductions: totalAgency,
      totalDeductions: totalDeductions,
      totalNetPay: totalNet,
      disbursementChannel: channel,
      preparedBy,
      certifiedBy,
      verifiedBy,
      remarks,
      guards: reportGuardItems,
    };

    saveDisbursementReport(reportData);
    const updatedList = loadSavedDisbursementReports();
    setSavedReports(updatedList);
    setIsConfirmSaveOpen(false);
    setSavedSuccessMessage(`Disbursement Report "${reportData.referenceNumber}" saved successfully!`);
    onShowToast?.(`Disbursement Report saved for ${formattedDisbursedDate}`);

    setTimeout(() => {
      setSavedSuccessMessage(null);
    }, 4000);
  };

  // Handle print
  const handlePrintReport = (reportToPrint?: DisbursementSubmissionReport) => {
    window.print();
  };

  // Handle export CSV
  const handleExportCSV = (reportData?: DisbursementSubmissionReport) => {
    const activeReport = reportData || {
      referenceNumber,
      disbursedDate,
      periodName: period.periodName,
      clientNameScope: clientScopeLabel,
      disbursementChannel: channel,
      guards: reportGuardItems,
    };

    const headers = [
      'Line #',
      'Agency Code',
      'Guard Legal Name',
      'Designation / Role',
      'Client Post Code',
      'Client Post Detachment',
      'Bank / Channel',
      'Account Number',
      'Daily Rate (PHP)',
      'Regular Days',
      'Overtime Hrs',
      'Gross Pay (PHP)',
      'Statutory Deductions (PHP)',
      'Agency Deductions (PHP)',
      'Total Deductions (PHP)',
      'Net Pay Disbursed (PHP)',
      'Disbursed Date',
      'Disbursement Status',
    ];

    const rows = activeReport.guards.map((g, idx) => [
      idx + 1,
      `"${g.employeeCode}"`,
      `"${g.name}"`,
      `"${g.role}"`,
      `"${g.clientCode}"`,
      `"${g.clientName}"`,
      `"${g.bankName}"`,
      `"${g.accountNumberMask}"`,
      g.dailyRate.toFixed(2),
      g.regularDays,
      g.overtimeHours,
      g.grossPay.toFixed(2),
      g.statutoryDeductions.toFixed(2),
      g.agencyDeductions.toFixed(2),
      g.totalDeductions.toFixed(2),
      g.netPay.toFixed(2),
      `"${activeReport.disbursedDate}"`,
      `"${g.disbursementStatus}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `MERZ_disbursement_report_${activeReport.disbursedDate}_${activeReport.referenceNumber}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle delete saved report
  const handleDeleteReport = (id: string, ref: string) => {
    if (window.confirm(`Are you sure you want to delete saved report "${ref}"?`)) {
      deleteSavedDisbursementReport(id);
      setSavedReports(loadSavedDisbursementReports());
      if (selectedArchivedReport?.id === id) {
        setSelectedArchivedReport(null);
      }
      onShowToast?.(`Deleted report ${ref}`);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto animate-fade-in print:hidden">
        <div className="bg-white rounded-2xl max-w-5xl w-full border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold tracking-tight text-white">
                  Disbursement Submission Report
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/30 uppercase tracking-wider">
                  DOLE D.O. 150-16 Audit
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Generate, verify, and finalize disbursement submission for a specific release date
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Tab Switcher */}
            <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('create');
                  setSelectedArchivedReport(null);
                }}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'create'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Create Report</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('archive')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'archive'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Saved Reports ({savedReports.length})</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition cursor-pointer ml-2"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Alert Banner if saved */}
        {savedSuccessMessage && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-5 py-2.5 flex items-center justify-between text-xs text-emerald-900 font-semibold shrink-0">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{savedSuccessMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('archive')}
              className="text-emerald-700 hover:text-emerald-950 underline text-[11px] cursor-pointer"
            >
              View in Saved Archive &rarr;
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {activeTab === 'create' ? (
            <>
              {/* Configuration Section */}
              <div className="bg-slate-50/80 rounded-xl border border-slate-200/80 p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    1. Specific Disbursed Date & Submission Scope
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Pay Cut-off: <strong className="text-slate-800">{period.periodName}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Disbursed Date Input */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Specific Disbursed Date *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={disbursedDate}
                        onChange={(e) => setDisbursedDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium text-slate-900 shadow-2xs"
                      />
                    </div>
                    {/* Quick Date Presets */}
                    <div className="flex items-center gap-1 mt-1.5">
                      <button
                        type="button"
                        onClick={() => setDisbursedDate(new Date().toISOString().split('T')[0])}
                        className="text-[10px] text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-200 font-semibold cursor-pointer"
                      >
                        Today
                      </button>
                      <button
                        type="button"
                        onClick={() => setDisbursedDate(period.payDate)}
                        className="text-[10px] text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 font-semibold cursor-pointer"
                      >
                        Pay Date ({period.payDate.slice(5)})
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const now = new Date();
                          const y = now.getFullYear();
                          const m = String(now.getMonth() + 1).padStart(2, '0');
                          setDisbursedDate(`${y}-${m}-15`);
                        }}
                        className="text-[10px] text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 font-semibold cursor-pointer"
                      >
                        15th
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const now = new Date();
                          const y = now.getFullYear();
                          const m = String(now.getMonth() + 1).padStart(2, '0');
                          setDisbursedDate(`${y}-${m}-30`);
                        }}
                        className="text-[10px] text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 font-semibold cursor-pointer"
                      >
                        30th
                      </button>
                    </div>
                  </div>

                  {/* Client Post Filter / Scope */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Client Detachment Scope *
                    </label>
                    <select
                      value={clientScope}
                      onChange={(e) => setClientScope(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium text-slate-900 shadow-2xs"
                    >
                      <option value="ALL">All Client Detachments ({employees.length} Guards)</option>
                      {clientPosts.map((p) => {
                        const count = employees.filter((e) => e.clientCode === p.code).length;
                        return (
                          <option key={p.code} value={p.code}>
                            [{p.code}] {p.name} ({count} Guards)
                          </option>
                        );
                      })}
                    </select>
                    <p className="text-[10px] text-slate-500 mt-1 truncate">
                      {clientScope === 'ALL'
                        ? 'Includes all deployed guards'
                        : `Filtered to Post ${clientScope}`}
                    </p>
                  </div>

                  {/* Disbursement Channel */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Disbursement Channel / Method
                    </label>
                    <select
                      value={channel}
                      onChange={(e) => setChannel(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium text-slate-900 shadow-2xs"
                    >
                      <option value="BDO Corporate ATM Direct Credit">BDO Corporate ATM Direct Credit</option>
                      <option value="Security Bank Corporate Batch Transfer">Security Bank Corporate Batch Transfer</option>
                      <option value="Metrobank Corporate Direct Pay">Metrobank Corporate Direct Pay</option>
                      <option value="On-Site Sealed Pay Envelopes (Cash)">On-Site Sealed Pay Envelopes (Cash)</option>
                      <option value="All Disbursement Channels (Consolidated)">All Channels (Consolidated)</option>
                    </select>
                    <p className="text-[10px] text-slate-500 mt-1">Batch remittance channel</p>
                  </div>

                  {/* Reference Number */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Report Reference Code
                    </label>
                    <input
                      type="text"
                      value={referenceNumber}
                      onChange={(e) => setReferenceNumber(e.target.value)}
                      placeholder={initialRef}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono font-bold text-slate-800 shadow-2xs"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">Submission tracking identifier</p>
                  </div>
                </div>

                {/* Additional Signatories & Remarks (Collapsible/compact) */}
                <div className="pt-2 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-slate-600 block mb-0.5">Prepared By:</label>
                    <input
                      type="text"
                      value={preparedBy}
                      onChange={(e) => setPreparedBy(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-600 block mb-0.5">Certified By:</label>
                    <input
                      type="text"
                      value={certifiedBy}
                      onChange={(e) => setCertifiedBy(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-600 block mb-0.5">Verified / Audit:</label>
                    <input
                      type="text"
                      value={verifiedBy}
                      onChange={(e) => setVerifiedBy(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Financial Metrics Summary Banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-slate-900 text-white rounded-xl shadow-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                    Total Net Disbursed
                  </span>
                  <div className="text-xl font-mono font-bold text-white mt-1">
                    ₱{formatPayslipAmount(totalNet)}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    For {reportGuardItems.length} guards on {disbursedDate}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block">
                    Gross Earnings
                  </span>
                  <div className="text-base font-mono font-bold text-slate-900 mt-1">
                    ₱{formatPayslipAmount(totalGross)}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Regular + Overtime pay
                  </span>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-rose-700 block">
                    Total Deductions
                  </span>
                  <div className="text-base font-mono font-bold text-rose-700 mt-1">
                    ₱{formatPayslipAmount(totalDeductions)}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    SSS, PhilHealth, Pag-IBIG, Cashbond
                  </span>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 block">
                    Personnel Count
                  </span>
                  <div className="text-base font-mono font-bold text-slate-900 mt-1 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span>{reportGuardItems.length} Security Guards</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-medium mt-0.5 block">
                    Scope: {clientScope === 'ALL' ? 'All Posts' : `Post ${clientScope}`}
                  </span>
                </div>
              </div>

              {/* Guard Breakdown Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs bg-white">
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Guard Roster Disbursed on {formattedDisbursedDate}
                    </span>
                    <p className="text-[11px] text-slate-500">
                      Showing {displayedGuards.length} of {reportGuardItems.length} guards scheduled for release
                    </p>
                  </div>

                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={tableSearch}
                      onChange={(e) => setTableSearch(e.target.value)}
                      placeholder="Search guard or employee code..."
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="max-h-72 overflow-y-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead className="bg-slate-100/80 text-slate-600 font-semibold sticky top-0 border-b border-slate-200 text-[11px]">
                      <tr>
                        <th className="py-2.5 px-3 w-10 text-center">#</th>
                        <th className="py-2.5 px-3">Employee Number</th>
                        <th className="py-2.5 px-3">Security Guard</th>
                        <th className="py-2.5 px-3">Client Detachment</th>
                        <th className="py-2.5 px-3">Bank / ATM</th>
                        <th className="py-2.5 px-3 text-right">Gross (₱)</th>
                        <th className="py-2.5 px-3 text-right">Deductions (₱)</th>
                        <th className="py-2.5 px-3 text-right">Net Disbursed (₱)</th>
                        <th className="py-2.5 px-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {displayedGuards.map((g, idx) => (
                        <tr key={g.employeeId} className="hover:bg-slate-50/80 transition">
                          <td className="py-2 px-3 text-center font-mono text-slate-400 text-[11px]">
                            {idx + 1}
                          </td>
                          <td className="py-2 px-3 font-mono font-bold text-red-600 whitespace-nowrap">
                            {g.employeeCode}
                          </td>
                          <td className="py-2 px-3">
                            <div className="font-bold text-slate-900">{g.name}</div>
                            <div className="text-[10px] text-slate-500">{g.role}</div>
                          </td>
                          <td className="py-2 px-3 text-slate-700">
                            <div className="font-medium truncate max-w-[150px]" title={g.clientName}>
                              [{g.clientCode}] {g.clientName}
                            </div>
                          </td>
                          <td className="py-2 px-3 text-slate-600 font-mono text-[11px] whitespace-nowrap">
                            {g.bankName} {g.accountNumberMask}
                          </td>
                          <td className="py-2 px-3 text-right font-mono text-slate-900">
                            {g.grossPay.toFixed(2)}
                          </td>
                          <td className="py-2 px-3 text-right font-mono text-rose-600">
                            {g.totalDeductions.toFixed(2)}
                          </td>
                          <td className="py-2 px-3 text-right font-mono font-bold text-emerald-700">
                            ₱{g.netPay.toFixed(2)}
                          </td>
                          <td className="py-2 px-3 text-center whitespace-nowrap">
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                              Disbursed
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            /* Saved Reports Archive View */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Archived Disbursement Submission Reports ({savedReports.length})
                  </h4>
                  <p className="text-xs text-slate-500">
                    History of official saved reports finalized for client and bank submission
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('create')}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition cursor-pointer flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Create New Report</span>
                </button>
              </div>

              {savedReports.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-200 text-slate-500 flex items-center justify-center mx-auto">
                    <History className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">No Saved Reports Yet</p>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                      Generate a report for a specific disbursed date and click &quot;Save Report&quot; to permanently archive submission records here.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('create')}
                    className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition cursor-pointer"
                  >
                    Go to Report Creator
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedReports.map((report) => (
                    <div
                      key={report.id}
                      className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-2xs transition space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                            <FileCheck className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-xs text-slate-900">
                                {report.referenceNumber}
                              </span>
                              <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                                {report.periodName}
                              </span>
                            </div>
                            <div className="text-xs text-slate-600 font-medium">
                              Disbursed on: <strong className="text-emerald-800">{report.disbursedDate}</strong> • Scope: {report.clientNameScope}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-mono font-bold text-slate-950">
                            ₱{formatPayslipAmount(report.totalNetPay)}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {report.totalGuards} Guards • {report.disbursementChannel.split(' ')[0]}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                        <span className="text-[11px] text-slate-400">
                          Saved on {new Date(report.createdAt).toLocaleString()}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleExportCSV(report)}
                            className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-lg transition cursor-pointer flex items-center gap-1"
                            title="Download CSV export"
                          >
                            <Download className="w-3 h-3 text-slate-500" />
                            <span>CSV</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handlePrintReport(report)}
                            className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-lg transition cursor-pointer flex items-center gap-1"
                            title="Print official submission report"
                          >
                            <Printer className="w-3 h-3 text-slate-500" />
                            <span>Print</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteReport(report.id, report.referenceNumber)}
                            className="p-1 text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                            title="Delete archived report"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>
              Disbursed Date: <strong className="text-slate-800">{formattedDisbursedDate}</strong> • Reference: <span className="font-mono text-slate-700">{referenceNumber}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => handleExportCSV()}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={() => handlePrintReport()}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Print Form</span>
            </button>

            {/* SAVE OPTION WITH ALWAYS CONFIRMATION (USER MANDATE) */}
            <button
              type="button"
              onClick={handleInitiateSave}
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-sm"
              title="Save report (will ask for confirmation first)"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MANDATORY CONFIRMATION MODAL BEFORE SAVING (USER INSTRUCTION)             */}
      {/* ========================================================================= */}
      {isConfirmSaveOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-5 space-y-4">
            {/* Header with warning badge */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-950">
                  Confirm Report Submission & Save?
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Always required verification before archiving official disbursement records.
                </p>
              </div>
            </div>

            {/* Submission Detail Card */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Disbursed Date:</span>
                <span className="font-bold text-emerald-800 text-sm">
                  {formattedDisbursedDate}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Reference Code:</span>
                <span className="font-mono font-bold text-slate-800">{referenceNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Personnel Count:</span>
                <span className="font-bold text-slate-800">{reportGuardItems.length} Security Guards</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Post Detachment Scope:</span>
                <span className="font-bold text-slate-800 truncate max-w-[200px]" title={clientScopeLabel}>
                  {clientScopeLabel}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <span className="text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  Total Net Release:
                </span>
                <span className="text-base font-mono font-bold text-slate-950">
                  ₱{formatPayslipAmount(totalNet)}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to finalize and save this disbursement report for submission? Once confirmed, this report record will be archived in the system reports registry.
            </p>

            {/* Confirmation Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsConfirmSaveOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-300 rounded-xl transition cursor-pointer"
              >
                Cancel / Review
              </button>
              <button
                type="button"
                onClick={handleConfirmSave}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Yes, Confirm & Save Report</span>
              </button>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Official Print Layout (Visible ONLY when browser prints) */}
      <div id="printable-disbursement-report" className="hidden print:block font-sans text-black p-4 bg-white text-xs">
        {/* Header */}
        <div className="border-b-2 border-black pb-3 mb-3 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center border border-black p-1">
              <MerzAgencyLogo />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight uppercase">
                MERZ SECURITY SOLUTIONS AGENCY INC.
              </h1>
              <p className="text-[9px] text-gray-800">
                PADPAO / DOLE D.O. 150-16 Registered Private Security Agency • PNP-SOSIA License: PSA-NCR-2024-0812
              </p>
              <p className="text-[9px] text-gray-600">
                Unit 402, Emerald Bldg., F. Ortigas Jr. Ave., Ortigas Center, Pasig City • Tel: (02) 8632-9100
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono font-bold text-xs">{referenceNumber}</div>
            <div className="text-[9px] uppercase font-bold text-gray-800">
              OFFICIAL DISBURSEMENT REPORT
            </div>
            <div className="text-[9px] text-gray-600">Disbursed Date: {formattedDisbursedDate}</div>
          </div>
        </div>

        {/* Report Metadata Box */}
        <div className="grid grid-cols-4 gap-2 p-2 border border-black bg-gray-50 mb-3 text-[10px]">
          <div>
            <span className="text-gray-600 block text-[8px] uppercase font-bold">Payroll Period</span>
            <span className="font-bold">{period.periodName}</span>
          </div>
          <div>
            <span className="text-gray-600 block text-[8px] uppercase font-bold">Disbursed Date</span>
            <span className="font-bold text-black">{formattedDisbursedDate}</span>
          </div>
          <div>
            <span className="text-gray-600 block text-[8px] uppercase font-bold">Client Detachment</span>
            <span className="font-bold truncate block">{clientScopeLabel}</span>
          </div>
          <div>
            <span className="text-gray-600 block text-[8px] uppercase font-bold">Disbursement Channel</span>
            <span className="font-bold truncate block">{channel}</span>
          </div>
        </div>

        {/* Guard Table */}
        <table className="w-full border-collapse border border-black mb-3 text-[9px]">
          <thead>
            <tr className="bg-gray-100 border-b border-black">
              <th className="border border-black p-1 text-center w-6">#</th>
              <th className="border border-black p-1 text-left">Agency Code</th>
              <th className="border border-black p-1 text-left">Security Guard Name</th>
              <th className="border border-black p-1 text-left">Designation</th>
              <th className="border border-black p-1 text-left">Client Post Detachment</th>
              <th className="border border-black p-1 text-left">Bank / Channel</th>
              <th className="border border-black p-1 text-right">Gross (PHP)</th>
              <th className="border border-black p-1 text-right">Deductions</th>
              <th className="border border-black p-1 text-right font-bold">Net Disbursed</th>
              <th className="border border-black p-1 text-center w-24">Guard Signature</th>
            </tr>
          </thead>
          <tbody>
            {reportGuardItems.map((g, idx) => (
              <tr key={g.employeeId} className="border-b border-gray-300">
                <td className="border border-black p-1 text-center font-mono">{idx + 1}</td>
                <td className="border border-black p-1 font-mono font-bold">{g.employeeCode}</td>
                <td className="border border-black p-1 font-bold">{g.name}</td>
                <td className="border border-black p-1">{g.role}</td>
                <td className="border border-black p-1">[{g.clientCode}] {g.clientName}</td>
                <td className="border border-black p-1 font-mono">{g.bankName} {g.accountNumberMask}</td>
                <td className="border border-black p-1 text-right font-mono">{g.grossPay.toFixed(2)}</td>
                <td className="border border-black p-1 text-right font-mono">{g.totalDeductions.toFixed(2)}</td>
                <td className="border border-black p-1 text-right font-mono font-bold">PHP {g.netPay.toFixed(2)}</td>
                <td className="border border-black p-1 text-center"></td>
              </tr>
            ))}
            {/* Totals */}
            <tr className="border-t-2 border-black font-bold bg-gray-100">
              <td colSpan={6} className="border border-black p-1 text-right uppercase">
                TOTAL DISBURSEMENT ({reportGuardItems.length} GUARDS):
              </td>
              <td className="border border-black p-1 text-right font-mono">PHP {totalGross.toFixed(2)}</td>
              <td className="border border-black p-1 text-right font-mono">PHP {totalDeductions.toFixed(2)}</td>
              <td className="border border-black p-1 text-right font-mono text-black font-bold">
                PHP {totalNet.toFixed(2)}
              </td>
              <td className="border border-black p-1 text-center text-[8px]">Release Verified</td>
            </tr>
          </tbody>
        </table>

        {/* Compliance Note */}
        <div className="border border-black p-1.5 mb-3 bg-gray-50 text-[9px]">
          <p className="font-semibold">
            DOLE D.O. 150-16 COMPLIANCE & VERIFICATION CERTIFICATION:
          </p>
          <p className="text-gray-700 mt-0.5">
            This certifies that the payroll disbursements listed above comply with DOLE D.O. 150-16 security guard wage regulations and have been released to the guards on {formattedDisbursedDate}.
          </p>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-3 gap-4 pt-1">
          <div className="border-t border-black pt-1 text-center">
            <div className="font-bold text-[9px]">{preparedBy}</div>
            <div className="text-[8px] text-gray-600">Prepared By (Payroll Officer)</div>
          </div>
          <div className="border-t border-black pt-1 text-center">
            <div className="font-bold text-[9px]">{certifiedBy}</div>
            <div className="text-[8px] text-gray-600">Certified Correct (Operations VP)</div>
          </div>
          <div className="border-t border-black pt-1 text-center">
            <div className="font-bold text-[9px]">{verifiedBy}</div>
            <div className="text-[8px] text-gray-600">Verified & Audited (Finance / Audit)</div>
          </div>
        </div>
      </div>
    </>
  );
};
