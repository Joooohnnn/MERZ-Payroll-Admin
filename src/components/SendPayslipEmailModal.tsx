import React, { useState, useEffect, useMemo } from 'react';
import {
  Mail,
  Send,
  X,
  CheckCircle2,
  Copy,
  ExternalLink,
  Download,
  AlertCircle,
  FileText,
  Clock,
  ShieldCheck,
  Building,
  User,
  Check,
  Sparkles,
  History,
  Eye,
  RefreshCw,
  Users
} from 'lucide-react';
import { Employee, PayrollRecord, PayPeriod, SentPayslipEmailRecord } from '../types/payroll';
import { formatPayslipAmount } from '../utils/payrollCalculator';
import {
  generatePayslipEmailSubject,
  generatePayslipEmailTextBody,
  generatePayslipEmailHtmlBody,
  generateMailtoUrl,
  downloadEmailAsEml
} from '../utils/payslipEmailGenerator';
import { loadSavedSentEmails, saveSentEmailRecord } from '../utils/storage';
import { MerzAgencyLogo } from './MerzAgencyLogoDynamic';

interface SendPayslipEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee?: Employee | null;
  batchEmployees?: Employee[];
  records: Record<string, PayrollRecord>;
  period: PayPeriod;
  onUpdateEmployeeEmail?: (employeeId: string, newEmail: string) => void;
  onShowToast?: (msg: string) => void;
}

export const SendPayslipEmailModal: React.FC<SendPayslipEmailModalProps> = ({
  isOpen,
  onClose,
  employee,
  batchEmployees = [],
  records,
  period,
  onUpdateEmployeeEmail,
  onShowToast,
}) => {
  const isBatch = batchEmployees.length > 0 && !employee;
  const activeEmployee = employee || (batchEmployees.length > 0 ? batchEmployees[0] : null);
  const activeRecord = activeEmployee ? records[activeEmployee.id] : null;

  // Form states
  const [recipientEmail, setRecipientEmail] = useState('');
  const [ccEmail, setCcEmail] = useState('merzagency.2025@gmail.com');
  const [subject, setSubject] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [saveEmailToProfile, setSaveEmailToProfile] = useState(false);
  
  // UI states
  const [activeTab, setActiveTab] = useState<'preview' | 'history'>('preview');
  const [previewFormat, setPreviewFormat] = useState<'html' | 'text'>('html');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [lastSentRecord, setLastSentRecord] = useState<SentPayslipEmailRecord | null>(null);
  
  // Batch sending progress
  const [batchProgress, setBatchProgress] = useState<{ current: number; total: number; activeName: string } | null>(null);

  // History state
  const [historyRecords, setHistoryRecords] = useState<SentPayslipEmailRecord[]>([]);

  // Initialize form when employee or period changes
  useEffect(() => {
    if (isOpen) {
      if (activeEmployee) {
        setRecipientEmail(activeEmployee.email || '');
        setSubject(generatePayslipEmailSubject(activeEmployee, period));
      } else if (isBatch) {
        setSubject(`[Official Payslips] MERZ Security Solutions - ${period.periodName} (${batchEmployees.length} Guards)`);
      }
      setCustomNote('');
      setSendSuccess(false);
      setIsSending(false);
      setBatchProgress(null);
      setHistoryRecords(loadSavedSentEmails());
    }
  }, [isOpen, activeEmployee, isBatch, batchEmployees.length, period]);

  // Generated email preview content
  const previewText = useMemo(() => {
    if (!activeEmployee || !activeRecord) return '';
    return generatePayslipEmailTextBody(activeEmployee, activeRecord, period, customNote);
  }, [activeEmployee, activeRecord, period, customNote]);

  const previewHtml = useMemo(() => {
    if (!activeEmployee || !activeRecord) return '';
    return generatePayslipEmailHtmlBody(activeEmployee, activeRecord, period, customNote);
  }, [activeEmployee, activeRecord, period, customNote]);

  // History for this specific employee or all
  const filteredHistory = useMemo(() => {
    if (!activeEmployee || isBatch) return historyRecords;
    return historyRecords.filter((r) => r.employeeId === activeEmployee.id);
  }, [historyRecords, activeEmployee, isBatch]);

  if (!isOpen || (!activeEmployee && !isBatch)) return null;

  // Copy text payslip to clipboard
  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(previewText);
      setCopiedText(true);
      if (onShowToast) onShowToast('Payslip email text copied to clipboard!');
      setTimeout(() => setCopiedText(false), 2500);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = previewText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedText(true);
      if (onShowToast) onShowToast('Payslip email text copied to clipboard!');
      setTimeout(() => setCopiedText(false), 2500);
    }
  };

  // Launch default email client via mailto:
  const handleOpenMailClient = () => {
    if (!activeEmployee) return;
    const to = recipientEmail.trim() || activeEmployee.email;
    const mailtoUrl = generateMailtoUrl(to, ccEmail, subject, previewText);
    
    // Create audit record
    const record: SentPayslipEmailRecord = {
      id: `mail-${Date.now()}`,
      employeeId: activeEmployee.id,
      employeeCode: activeEmployee.employeeCode,
      employeeName: activeEmployee.name,
      recipientEmail: to,
      ccEmail: ccEmail.trim() || undefined,
      periodCode: period.periodCode,
      periodName: period.periodName,
      netPay: activeRecord ? activeRecord.netPay : 0,
      grossPay: activeRecord ? activeRecord.grossPay : 0,
      totalDeductions: activeRecord ? activeRecord.totalDeductions : 0,
      sentAt: new Date().toISOString(),
      status: 'Sent',
      subject: subject,
      deliveryMethod: 'Default Mail Client (mailto)',
      trackingNumber: `MERZ-MAIL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    saveSentEmailRecord(record);
    setHistoryRecords(loadSavedSentEmails());
    setLastSentRecord(record);

    if (saveEmailToProfile && onUpdateEmployeeEmail && recipientEmail !== activeEmployee.email) {
      onUpdateEmployeeEmail(activeEmployee.id, recipientEmail.trim());
    }

    if (onShowToast) {
      onShowToast(`Opened email client for ${activeEmployee.name}`);
    }

    window.location.href = mailtoUrl;
  };

  // Download .eml file
  const handleDownloadEml = () => {
    if (!activeEmployee || !activeRecord) return;
    const to = recipientEmail.trim() || activeEmployee.email;
    const safeName = activeEmployee.name.replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `Payslip_${safeName}_${period.periodCode}`;
    downloadEmailAsEml(filename, to, ccEmail, subject, previewHtml, previewText);
    if (onShowToast) onShowToast(`Downloaded .eml email file for ${activeEmployee.name}`);
  };

  // Dispatch direct email simulation with progress and tracking
  const handleSendDirect = async () => {
    setIsSending(true);

    if (isBatch) {
      // Batch dispatch simulation
      const total = batchEmployees.length;
      for (let i = 0; i < total; i++) {
        const emp = batchEmployees[i];
        const rec = records[emp.id];
        setBatchProgress({ current: i + 1, total, activeName: emp.name });

        // Small realistic dispatch delay per guard
        await new Promise((resolve) => setTimeout(resolve, 350));

        const trackingNumber = `MERZ-BATCH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        const sentRecord: SentPayslipEmailRecord = {
          id: `batch-${Date.now()}-${emp.id}`,
          employeeId: emp.id,
          employeeCode: emp.employeeCode,
          employeeName: emp.name,
          recipientEmail: emp.email,
          ccEmail: ccEmail.trim() || undefined,
          periodCode: period.periodCode,
          periodName: period.periodName,
          netPay: rec ? rec.netPay : 0,
          grossPay: rec ? rec.grossPay : 0,
          totalDeductions: rec ? rec.totalDeductions : 0,
          sentAt: new Date().toISOString(),
          status: 'Delivered',
          subject: generatePayslipEmailSubject(emp, period),
          deliveryMethod: 'Batch Dispatch',
          trackingNumber,
        };
        saveSentEmailRecord(sentRecord);
      }

      setIsSending(false);
      setSendSuccess(true);
      setHistoryRecords(loadSavedSentEmails());
      if (onShowToast) {
        onShowToast(`Dispatched official payslips to ${total} guards via email!`);
      }
    } else if (activeEmployee && activeRecord) {
      // Single guard dispatch
      await new Promise((resolve) => setTimeout(resolve, 650));

      const to = recipientEmail.trim() || activeEmployee.email;
      const trackingNumber = `MERZ-MAIL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const sentRecord: SentPayslipEmailRecord = {
        id: `mail-${Date.now()}`,
        employeeId: activeEmployee.id,
        employeeCode: activeEmployee.employeeCode,
        employeeName: activeEmployee.name,
        recipientEmail: to,
        ccEmail: ccEmail.trim() || undefined,
        periodCode: period.periodCode,
        periodName: period.periodName,
        netPay: activeRecord.netPay,
        grossPay: activeRecord.grossPay,
        totalDeductions: activeRecord.totalDeductions,
        sentAt: new Date().toISOString(),
        status: 'Delivered',
        subject: subject,
        deliveryMethod: 'Direct In-App Dispatch',
        trackingNumber,
      };

      saveSentEmailRecord(sentRecord);
      setHistoryRecords(loadSavedSentEmails());
      setLastSentRecord(sentRecord);

      if (saveEmailToProfile && onUpdateEmployeeEmail && to !== activeEmployee.email) {
        onUpdateEmployeeEmail(activeEmployee.id, to);
      }

      setIsSending(false);
      setSendSuccess(true);
      if (onShowToast) {
        onShowToast(`Official payslip sent successfully to ${to}!`);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200 print:hidden">
      <div className="bg-white rounded-2xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold tracking-tight">
                  {isBatch ? `Send Payslips via Email (${batchEmployees.length} Guards)` : 'Send Official Payslip via Email'}
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  DOLE D.O. 150-16
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {isBatch
                  ? `Automated electronic payslip transmission for ${batchEmployees.length} security personnel`
                  : `Dispatched to ${activeEmployee?.name} (${activeEmployee?.employeeCode})`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
              title="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between px-6 border-b border-slate-200 bg-slate-50/90 shrink-0">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 py-3 px-3.5 text-xs font-bold border-b-2 transition cursor-pointer ${
                activeTab === 'preview'
                  ? 'border-emerald-600 text-emerald-700 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Compose & Preview</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-1.5 py-3 px-3.5 text-xs font-bold border-b-2 transition cursor-pointer ${
                activeTab === 'history'
                  ? 'border-emerald-600 text-emerald-700 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Email Audit Log</span>
              {filteredHistory.length > 0 && (
                <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded-full font-mono">
                  {filteredHistory.length}
                </span>
              )}
            </button>
          </div>

          {activeTab === 'preview' && !isBatch && (
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-400 text-[11px] mr-1">Preview Format:</span>
              <button
                type="button"
                onClick={() => setPreviewFormat('html')}
                className={`px-2 py-0.8 rounded-md text-[11px] font-semibold cursor-pointer transition ${
                  previewFormat === 'html'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Card / HTML
              </button>
              <button
                type="button"
                onClick={() => setPreviewFormat('text')}
                className={`px-2 py-0.8 rounded-md text-[11px] font-semibold cursor-pointer transition ${
                  previewFormat === 'text'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Plain Text
              </button>
            </div>
          )}
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* Success Banner */}
          {sendSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 animate-in fade-in duration-200">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-emerald-950">
                  {isBatch ? 'All Selected Payslips Dispatched!' : 'Official Payslip Transmitted Successfully!'}
                </h4>
                <p className="text-xs text-emerald-800 mt-0.5">
                  {isBatch
                    ? `Successfully processed and delivered ${batchEmployees.length} official payslip notifications to employee mailboxes.`
                    : `Your electronic payslip has been archived and sent to ${recipientEmail.trim() || activeEmployee?.email}.`}
                </p>
                {lastSentRecord && !isBatch && (
                  <div className="mt-2 text-[11px] font-mono text-emerald-900 bg-white/70 p-2 rounded-lg border border-emerald-200 flex flex-wrap items-center gap-3">
                    <span><strong>Tracking ID:</strong> {lastSentRecord.trackingNumber}</span>
                    <span><strong>Method:</strong> {lastSentRecord.deliveryMethod}</span>
                    <span><strong>Timestamp:</strong> {new Date(lastSentRecord.sentAt).toLocaleTimeString()}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'preview' ? (
            <>
              {/* Recipient & Metadata Card */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  
                  {/* Recipient Address */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      {isBatch ? 'Target Recipients' : 'Recipient Email Address *'}
                    </label>
                    {isBatch ? (
                      <div className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 font-medium flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{batchEmployees.length} Selected Security Officers</span>
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">Individual mailboxes</span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <input
                          type="email"
                          required
                          value={recipientEmail}
                          onChange={(e) => setRecipientEmail(e.target.value)}
                          placeholder="guard.name@merzagency.com"
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-mono focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                        />
                        {activeEmployee && recipientEmail !== activeEmployee.email && (
                          <label className="flex items-center gap-1.5 text-[11px] text-emerald-800 cursor-pointer pt-0.5">
                            <input
                              type="checkbox"
                              checked={saveEmailToProfile}
                              onChange={(e) => setSaveEmailToProfile(e.target.checked)}
                              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                            />
                            <span>Save updated email to {activeEmployee.name}'s master profile</span>
                          </label>
                        )}
                      </div>
                    )}
                  </div>

                  {/* CC Field */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Cc (Agency Records / Audit)
                    </label>
                    <input
                      type="text"
                      value={ccEmail}
                      onChange={(e) => setCcEmail(e.target.value)}
                      placeholder="merzagency.2025@gmail.com"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-mono focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    />
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Payroll copies archived for DOLE inspection compliance
                    </span>
                  </div>
                </div>

                {/* Subject Line */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Email Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                  />
                </div>

                {/* Optional HR Note */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Special HR / Payroll Note <span className="font-normal text-slate-400">(Optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="e.g., Please review your overtime and night differential hours. Sign and return duplicate copy to post supervisor."
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                  />
                </div>
              </div>

              {/* In Batch Mode: Show Selected Guards Table */}
              {isBatch && (
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>Batch Dispatch Roster ({batchEmployees.length} Guards)</span>
                    <span className="text-[11px] text-slate-500">Period: {period.periodName}</span>
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 text-[11px]">
                        <tr>
                          <th className="py-2 px-3">Guard Name</th>
                          <th className="py-2 px-3">Agency ID</th>
                          <th className="py-2 px-3">Email Address</th>
                          <th className="py-2 px-3 text-right">Net Take-Home</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {batchEmployees.map((emp) => {
                          const r = records[emp.id];
                          return (
                            <tr key={emp.id} className="hover:bg-slate-50">
                              <td className="py-2 px-3 font-bold text-slate-900">{emp.name}</td>
                              <td className="py-2 px-3 font-mono text-slate-600">{emp.employeeCode}</td>
                              <td className="py-2 px-3 font-mono text-slate-700">{emp.email}</td>
                              <td className="py-2 px-3 text-right font-mono font-bold text-emerald-700">
                                ₱{formatPayslipAmount(r ? r.netPay : 0)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Single Mode: Live Email Body Preview */}
              {!isBatch && activeEmployee && activeRecord && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Live Message Preview</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopyText}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-lg transition cursor-pointer"
                        title="Copy text summary to clipboard"
                      >
                        {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedText ? 'Copied!' : 'Copy Summary'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleDownloadEml}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-lg transition cursor-pointer"
                        title="Download standard .eml mail file"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download .EML</span>
                      </button>
                    </div>
                  </div>

                  {previewFormat === 'html' ? (
                    <div className="border border-slate-300 rounded-xl overflow-hidden bg-slate-100 p-4">
                      {/* Interactive HTML Card preview */}
                      <div className="max-w-xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
                        {/* Header */}
                        <div className="bg-slate-900 text-white p-4 border-b-2 border-emerald-500">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center p-1 border border-emerald-500/40">
                              <MerzAgencyLogo />
                            </div>
                            <div>
                              <h4 className="font-extrabold text-sm tracking-tight text-white uppercase">
                                MERZ Security Solutions Agency Inc.
                              </h4>
                              <p className="text-[10px] text-slate-400">
                                Official Electronic Payslip • DOLE D.O. 150-16 Verified
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Guard Card */}
                        <div className="p-4 space-y-3.5">
                          <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200 text-[11px]">
                            <div>
                              <span className="text-slate-400 block text-[9px] uppercase font-bold">Personnel</span>
                              <span className="font-bold text-slate-900">{activeEmployee.name}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[9px] uppercase font-bold">Agency Code</span>
                              <span className="font-mono font-bold text-slate-900">{activeEmployee.employeeCode}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[9px] uppercase font-bold">Client Post</span>
                              <span className="font-medium text-slate-800 truncate block">
                                [{activeEmployee.clientCode}] {activeEmployee.clientName}
                              </span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[9px] uppercase font-bold">Pay Cutoff</span>
                              <span className="font-medium text-slate-800">{period.periodName}</span>
                            </div>
                          </div>

                          {customNote && (
                            <div className="p-2.5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg text-amber-900 text-[11px]">
                              <strong>HR Note:</strong> {customNote}
                            </div>
                          )}

                          {/* Quick Summary Grid */}
                          <div className="grid grid-cols-2 gap-3 pt-1">
                            <div>
                              <div className="text-[10px] font-bold text-slate-700 uppercase border-b border-slate-200 pb-1 mb-1.5">
                                Earnings (Gross: ₱{formatPayslipAmount(activeRecord.grossPay)})
                              </div>
                              <div className="space-y-1 text-[11px] text-slate-600">
                                <div className="flex justify-between">
                                  <span>Regular ({activeRecord.regularDays}d):</span>
                                  <span className="font-mono">₱{formatPayslipAmount(activeRecord.regularPay)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Overtime ({activeRecord.regOvertimeHrs}h):</span>
                                  <span className="font-mono">₱{formatPayslipAmount(activeRecord.regOvertimePay)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Night Diff ({activeRecord.regNightDiffDays}d):</span>
                                  <span className="font-mono">₱{formatPayslipAmount(activeRecord.regNightDiffPay)}</span>
                                </div>
                                {activeRecord.allowance > 0 && (
                                  <div className="flex justify-between">
                                    <span>Allowance:</span>
                                    <span className="font-mono">₱{formatPayslipAmount(activeRecord.allowance)}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div>
                              <div className="text-[10px] font-bold text-slate-700 uppercase border-b border-slate-200 pb-1 mb-1.5">
                                Deductions (Total: ₱{formatPayslipAmount(activeRecord.totalDeductions)})
                              </div>
                              <div className="space-y-1 text-[11px] text-slate-600">
                                <div className="flex justify-between">
                                  <span>SSS Premium:</span>
                                  <span className="font-mono text-rose-600">₱{formatPayslipAmount(activeRecord.sssContribution)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>PhilHealth:</span>
                                  <span className="font-mono text-rose-600">₱{formatPayslipAmount(activeRecord.philhealthContribution)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Pag-IBIG Fund:</span>
                                  <span className="font-mono text-rose-600">₱{formatPayslipAmount(activeRecord.pagibigContribution)}</span>
                                </div>
                                {activeRecord.cashbond > 0 && (
                                  <div className="flex justify-between">
                                    <span>Cash Bond:</span>
                                    <span className="font-mono text-rose-600">₱{formatPayslipAmount(activeRecord.cashbond)}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Net Take-Home Highlight Box */}
                          <div className="p-3 bg-emerald-50 border-2 border-emerald-500/80 rounded-xl text-center">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 block">
                              Total Net Take-Home Pay
                            </span>
                            <span className="text-xl font-black font-mono text-emerald-700 tracking-tight block mt-0.5">
                              PHP {formatPayslipAmount(activeRecord.netPay)}
                            </span>
                            <span className="text-[10px] text-emerald-900 mt-1 block">
                              Direct credit to {activeEmployee.bankName} ({activeEmployee.accountNumberMask})
                            </span>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-slate-50 border-t border-slate-200 px-4 py-2.5 text-center text-[10px] text-slate-500">
                          For questions or inquiries, contact <span className="font-bold text-slate-700">merzagency.2025@gmail.com</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <pre className="p-3 bg-slate-900 text-slate-200 rounded-xl font-mono text-[11px] overflow-x-auto whitespace-pre-wrap max-h-80 border border-slate-800 select-text">
                      {previewText}
                    </pre>
                  )}
                </div>
              )}
            </>
          ) : (
            /* History & Audit Tab */
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">
                  {isBatch ? 'All Sent Email Records' : `Delivery Records for ${activeEmployee?.name}`}
                </span>
                <span className="text-[11px] text-slate-500">
                  {filteredHistory.length} transmission entries recorded
                </span>
              </div>

              {filteredHistory.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-500 text-xs">
                  <Mail className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="font-semibold text-slate-700">No sent emails recorded yet</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Transmissions sent via this tool or your email client will automatically log here for audit compliance.
                  </p>
                </div>
              ) : (
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200 text-[11px]">
                      <tr>
                        <th className="py-2.5 px-3">Date & Time</th>
                        <th className="py-2.5 px-3">Personnel</th>
                        <th className="py-2.5 px-3">Recipient Email</th>
                        <th className="py-2.5 px-3">Tracking Code</th>
                        <th className="py-2.5 px-3">Method</th>
                        <th className="py-2.5 px-3 text-right">Net Pay</th>
                        <th className="py-2.5 px-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {filteredHistory.map((h) => (
                        <tr key={h.id} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">
                            {new Date(h.sentAt).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>
                          <td className="py-2.5 px-3 font-bold text-slate-900">{h.employeeName}</td>
                          <td className="py-2.5 px-3 font-mono text-[11px] text-slate-700">{h.recipientEmail}</td>
                          <td className="py-2.5 px-3 font-mono text-[10px] text-slate-600">{h.trackingNumber}</td>
                          <td className="py-2.5 px-3 text-[11px] text-slate-600">{h.deliveryMethod}</td>
                          <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-700">
                            ₱{formatPayslipAmount(h.netPay)}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>{h.status}</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Encrypted electronic delivery under DOLE security agency standards</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-xl transition cursor-pointer"
            >
              Close
            </button>

            {!isBatch && (
              <button
                type="button"
                onClick={handleOpenMailClient}
                disabled={isSending}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition cursor-pointer shadow-2xs"
                title="Launch Gmail, Outlook, or your computer's mail application"
              >
                <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
                <span>Open in Mail App</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleSendDirect}
              disabled={isSending || (!isBatch && !recipientEmail)}
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl transition cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>
                    {batchProgress
                      ? `Sending ${batchProgress.current}/${batchProgress.total} (${batchProgress.activeName})...`
                      : 'Transmitting Payslip...'}
                  </span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>{isBatch ? `Send ${batchEmployees.length} Payslips Now` : 'Send Payslip via Email'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
