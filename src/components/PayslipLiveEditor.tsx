import React, { useState, useMemo } from 'react';
import { 
  RotateCcw, 
  PlusCircle, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft,
  ChevronRight,
  Clock, 
  Calendar, 
  ShieldAlert, 
  DollarSign, 
  Percent, 
  UserCheck,
  Check,
  Sparkles,
  HelpCircle,
  Search,
  X,
  Building,
  Shield,
  MapPin,
  ArrowRight,
  Mail,
  Edit3,
  Compass,
  Maximize2
} from 'lucide-react';
import { Employee, PayrollRecord } from '../types/payroll';
import { formatPayslipAmount } from '../utils/payrollCalculator';

interface PayslipLiveEditorProps {
  selectedEmployee: Employee;
  allEmployees: Employee[];
  record: PayrollRecord;
  onSelectEmployee: (emp: Employee) => void;
  onUpdateRecord: (updates: Partial<PayrollRecord>) => void;
  onResetToPhotoSample: () => void;
  onOpenAddGuard: () => void;
  onOpenPayslipModal?: () => void;
  onOpenEmailPayslip?: () => void;
  onEditGuard?: (employee: Employee) => void;
  onOpenFeatureGuide?: () => void;
}

export const PayslipLiveEditor: React.FC<PayslipLiveEditorProps> = ({
  selectedEmployee,
  allEmployees,
  record,
  onSelectEmployee,
  onUpdateRecord,
  onResetToPhotoSample,
  onOpenAddGuard,
  onOpenPayslipModal,
  onOpenEmailPayslip,
  onEditGuard,
  onOpenFeatureGuide,
}) => {
  const [showAdvancedDeductions, setShowAdvancedDeductions] = useState(false);
  const [showAdvancedEarnings, setShowAdvancedEarnings] = useState(false);
  const [isGuardListOpen, setIsGuardListOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPostFilter, setSelectedPostFilter] = useState<string>('ALL');

  const currentGuardIndex = allEmployees.findIndex((e) => e.id === selectedEmployee.id);
  const hasPrevGuard = currentGuardIndex > 0;
  const hasNextGuard = currentGuardIndex >= 0 && currentGuardIndex < allEmployees.length - 1;

  const handlePrevGuard = () => {
    if (hasPrevGuard) {
      onSelectEmployee(allEmployees[currentGuardIndex - 1]);
    }
  };

  const handleNextGuard = () => {
    if (hasNextGuard) {
      onSelectEmployee(allEmployees[currentGuardIndex + 1]);
    }
  };

  // Compute unique client posts present in allEmployees for quick filter pills
  const uniquePosts = useMemo(() => {
    const map = new Map<string, { code: string; name: string }>();
    allEmployees.forEach((emp) => {
      if (emp.clientCode && !map.has(emp.clientCode)) {
        map.set(emp.clientCode, {
          code: emp.clientCode,
          name: emp.clientName || `Post ${emp.clientCode}`,
        });
      }
    });
    return Array.from(map.values()).sort((a, b) => a.code.localeCompare(b.code));
  }, [allEmployees]);

  // Filter employees based on search query (name or employee code or post) and post filter
  const filteredEmployees = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return allEmployees.filter((emp) => {
      if (selectedPostFilter !== 'ALL' && emp.clientCode !== selectedPostFilter) {
        return false;
      }
      if (!q) return true;
      const nameMatch = emp.name.toLowerCase().includes(q);
      const codeMatch = emp.employeeCode.toLowerCase().includes(q);
      const clientCodeMatch = emp.clientCode.toLowerCase().includes(q);
      const clientNameMatch = (emp.clientName || '').toLowerCase().includes(q);
      const roleMatch = (emp.role || '').toLowerCase().includes(q);
      return nameMatch || codeMatch || clientCodeMatch || clientNameMatch || roleMatch;
    });
  }, [allEmployees, searchTerm, selectedPostFilter]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4 print:hidden">
      {/* Top Header & Guard Switcher Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></span>
            <h3 className="font-bold text-slate-950 text-sm tracking-tight">
              Interactive Duty Hours & Payslip Controls
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Select an assigned guard or fine-tune duty hours to recalculate the official dual-copy payslip in real time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onOpenPayslipModal && (
            <button
              type="button"
              onClick={onOpenPayslipModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition cursor-pointer shadow-xs"
              title="Open official dual-copy payslip in an executive popup window modal"
            >
              <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Open Popup Window</span>
            </button>
          )}

          {onOpenEmailPayslip && (
            <button
              onClick={onOpenEmailPayslip}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-300 rounded-xl transition cursor-pointer shadow-2xs"
              title={`Send electronic payslip to ${selectedEmployee.name} via email`}
            >
              <Mail className="w-3.5 h-3.5 text-sky-600" />
              <span>Email Payslip</span>
            </button>
          )}

          <button
            onClick={onResetToPhotoSample}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300/80 rounded-xl transition cursor-pointer"
            title="Reload Alvarez, Juan Paolo's exact values from photo"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
            <span>Load Sample from Photo</span>
          </button>

          <button
            onClick={onOpenAddGuard}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5 text-slate-600" />
            <span>Add Guard</span>
          </button>
        </div>
      </div>

      {/* Sleek Guard Navigator with Expandable Roster */}
      <div className="bg-slate-50/80 rounded-xl border border-slate-200/80 overflow-hidden shadow-2xs">
        {/* Compact Guard Bar */}
        <div className="p-3 sm:px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            {/* Prev / Next controls */}
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs">
              <button
                type="button"
                onClick={handlePrevGuard}
                disabled={!hasPrevGuard}
                className={`p-1 rounded transition ${hasPrevGuard ? 'text-slate-700 hover:bg-slate-100 cursor-pointer' : 'text-slate-300 cursor-not-allowed'}`}
                title="Previous Guard"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono font-bold text-slate-600 px-1">
                {currentGuardIndex >= 0 ? `${currentGuardIndex + 1}/${allEmployees.length}` : 'Guard'}
              </span>
              <button
                type="button"
                onClick={handleNextGuard}
                disabled={!hasNextGuard}
                className={`p-1 rounded transition ${hasNextGuard ? 'text-slate-700 hover:bg-slate-100 cursor-pointer' : 'text-slate-300 cursor-not-allowed'}`}
                title="Next Guard"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Officer Identification */}
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-200 shrink-0">
                {selectedEmployee.employeeCode}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {selectedEmployee.name}
                  </span>
                  <span className="text-[10px] text-slate-500 hidden md:inline">
                    ({selectedEmployee.role})
                  </span>
                </div>
                <div className="text-[10.5px] text-slate-500 truncate flex items-center gap-1.5">
                  <span className="font-mono font-semibold text-slate-700">[{selectedEmployee.clientCode}]</span>
                  <span className="truncate">{selectedEmployee.clientName}</span>
                  <span className="text-slate-300">•</span>
                  <span className="font-mono font-bold text-emerald-800">₱{selectedEmployee.dailyRate.toFixed(2)}/day</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            {onEditGuard && (
              <button
                type="button"
                onClick={() => onEditGuard(selectedEmployee)}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition cursor-pointer shadow-2xs"
                title={`Edit profile and statutory numbers for ${selectedEmployee.name}`}
              >
                <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                <span>Profile</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsGuardListOpen(!isGuardListOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition cursor-pointer shadow-2xs"
            >
              <span>Roster ({allEmployees.length})</span>
              {isGuardListOpen ? (
                <ChevronUp className="w-3.5 h-3.5 text-emerald-700" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-emerald-700" />
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Search Bar, Post Filters, and Roster */}
        {isGuardListOpen && (
          <div className="border-t border-slate-200/80 p-3.5 sm:p-4 bg-white space-y-3 animate-in fade-in duration-150">
            {/* Search Bar & Quick Filters */}
            <div className="flex flex-col sm:flex-row gap-2 items-center">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search guard by name, badge number (e.g. 0107), post, or role..."
                  className="w-full pl-9 pr-9 py-1.5 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition shadow-2xs font-medium placeholder:text-slate-400"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-100 transition cursor-pointer"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Quick Post Filter Pills */}
              {uniquePosts.length > 1 && (
                <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
                  <button
                    type="button"
                    onClick={() => setSelectedPostFilter('ALL')}
                    className={`text-[10px] font-semibold px-2 py-1 rounded-lg transition shrink-0 cursor-pointer ${
                      selectedPostFilter === 'ALL'
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    All ({allEmployees.length})
                  </button>
                  {uniquePosts.map((post) => {
                    const count = allEmployees.filter((e) => e.clientCode === post.code).length;
                    const isSelected = selectedPostFilter === post.code;
                    return (
                      <button
                        key={post.code}
                        type="button"
                        onClick={() => setSelectedPostFilter(post.code)}
                        className={`text-[10px] font-semibold px-2 py-1 rounded-lg transition shrink-0 cursor-pointer flex items-center gap-1 ${
                          isSelected
                            ? 'bg-emerald-700 text-white shadow-2xs'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                        title={post.name}
                      >
                        <span>[{post.code}]</span>
                        <span className="truncate max-w-[70px]">{post.name.split(' ')[0]}</span>
                        <span className="opacity-75 text-[9px]">({count})</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Scrollable Deployed Guard List */}
            <div className="border border-slate-200 rounded-xl bg-white overflow-hidden">
              {filteredEmployees.length === 0 ? (
                <div className="p-4 text-center text-slate-500 space-y-1">
                  <p className="text-xs">
                    No guards found matching &quot;<strong className="text-slate-800">{searchTerm}</strong>&quot;
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedPostFilter('ALL');
                    }}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
                  >
                    Clear search & filters
                  </button>
                </div>
              ) : (
                <div className="max-h-52 overflow-y-auto divide-y divide-slate-100">
                  {filteredEmployees.map((emp) => {
                    const isSelected = emp.id === selectedEmployee.id;
                    return (
                      <div
                        key={emp.id}
                        onClick={() => {
                          onSelectEmployee(emp);
                          setIsGuardListOpen(false);
                        }}
                        className={`flex items-center justify-between p-2 sm:px-3 sm:py-2 transition cursor-pointer text-left ${
                          isSelected
                            ? 'bg-slate-900 text-white shadow-inner'
                            : 'hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        {/* Left: Avatar & Identity Details */}
                        <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-2">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                              isSelected
                                ? 'bg-emerald-500 text-white'
                                : 'bg-slate-100 text-slate-700 border border-slate-200'
                            }`}
                          >
                            {emp.name.charAt(0)}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold truncate leading-tight">
                                {emp.name}
                              </span>
                              <span
                                className={`font-mono text-[10px] font-bold px-1.5 py-0.2 rounded border shrink-0 ${
                                  isSelected
                                    ? 'bg-red-500/20 text-red-300 border-red-400/30'
                                    : 'bg-red-50 text-red-600 border-red-200'
                                }`}
                              >
                                {emp.employeeCode}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-[10px] mt-0.5 truncate">
                              <span className={isSelected ? 'text-slate-300' : 'text-slate-500'}>
                                {emp.role}
                              </span>
                              <span className={isSelected ? 'text-slate-600' : 'text-slate-300'}>•</span>
                              <span
                                className={`flex items-center gap-0.5 truncate ${
                                  isSelected ? 'text-slate-300' : 'text-slate-600 font-medium'
                                }`}
                              >
                                <Building className="w-2.5 h-2.5 shrink-0 opacity-70" />
                                <strong className="font-mono">[{emp.clientCode}]</strong> {emp.clientName}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Daily Rate & Selection Indicator */}
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="text-right hidden sm:block">
                            <div
                              className={`text-xs font-mono font-bold ${
                                isSelected ? 'text-emerald-300' : 'text-slate-900'
                              }`}
                            >
                              ₱{emp.dailyRate.toFixed(2)}
                            </div>
                            <div className={`text-[9px] ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>
                              Daily Rate
                            </div>
                          </div>

                          {isSelected ? (
                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/40">
                              <Check className="w-3 h-3" />
                              <span>Active</span>
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded-md border border-slate-200 transition">
                              Select
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Primary Live Adjusters: Duty Days & Hours */}
      <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-900">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            Duty Days & Overtime Parameters
          </span>
          <span className="text-[11px] font-normal text-slate-600">
            Daily Base: <strong className="text-slate-900">₱{selectedEmployee.dailyRate.toFixed(2)}</strong> (Hourly: ₱{(selectedEmployee.dailyRate / 8).toFixed(2)})
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Regular Days */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Regular Days
            </label>
            <input
              type="number"
              min="0"
              max="31"
              step="1"
              value={record.regularDays}
              onChange={(e) => onUpdateRecord({ regularDays: parseFloat(e.target.value) || 0 })}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
            />
            <span className="text-[10px] text-slate-500 mt-0.5 block font-mono">
              = ₱{formatPayslipAmount(record.regularPay)}
            </span>
          </div>

          {/* Reg Overtime Hours */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Reg Overtime (Hrs)
            </label>
            <input
              type="number"
              min="0"
              max="200"
              step="1"
              value={record.regOvertimeHrs}
              onChange={(e) => onUpdateRecord({ regOvertimeHrs: parseFloat(e.target.value) || 0 })}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
            />
            <span className="text-[10px] text-slate-500 mt-0.5 block font-mono">
              = ₱{formatPayslipAmount(record.regOvertimePay)}
            </span>
          </div>

          {/* Reg Night Diff Days */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Reg Night Diff (Days)
            </label>
            <input
              type="number"
              min="0"
              max="31"
              step="1"
              value={record.regNightDiffDays}
              onChange={(e) => onUpdateRecord({ regNightDiffDays: parseFloat(e.target.value) || 0 })}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
            />
            <span className="text-[10px] text-slate-500 mt-0.5 block font-mono">
              = ₱{formatPayslipAmount(record.regNightDiffPay)}
            </span>
          </div>

          {/* Allowance */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Allowance (₱)
            </label>
            <input
              type="number"
              min="0"
              step="100"
              value={record.allowance}
              onChange={(e) => onUpdateRecord({ allowance: parseFloat(e.target.value) || 0 })}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-hidden"
            />
            <span className="text-[10px] text-slate-500 mt-0.5 block font-mono">
              Fixed semi-monthly
            </span>
          </div>
        </div>

        {/* Deductions: Cashbond */}
        <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <label className="text-[11px] font-semibold text-slate-700">
              Cashbond Escrow:
            </label>
            <div className="w-28">
              <input
                type="number"
                min="0"
                step="25"
                value={record.cashbond}
                onChange={(e) => onUpdateRecord({ cashbond: parseFloat(e.target.value) || 0 })}
                className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900"
              />
            </div>
            <span className="text-[10.5px] text-slate-500">Standard ₱50.00 / pay period</span>
          </div>

          {/* Expandable Toggles */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAdvancedEarnings(!showAdvancedEarnings)}
              className="text-[11px] text-slate-600 hover:text-slate-900 flex items-center gap-1 font-semibold"
            >
              <span>{showAdvancedEarnings ? 'Hide' : 'More'} Earnings (Rest Day, Holiday)</span>
              {showAdvancedEarnings ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setShowAdvancedDeductions(!showAdvancedDeductions)}
              className="text-[11px] text-slate-600 hover:text-slate-900 flex items-center gap-1 font-semibold"
            >
              <span>{showAdvancedDeductions ? 'Hide' : 'More'} Deductions (SSS, Loans)</span>
              {showAdvancedDeductions ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Advanced Earnings Panel */}
        {showAdvancedEarnings && (
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-[10px] font-semibold text-slate-600 mb-1">Rest Days (130%)</label>
              <input
                type="number"
                min="0"
                value={record.restDays}
                onChange={(e) => onUpdateRecord({ restDays: parseFloat(e.target.value) || 0 })}
                className="w-full px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-600 mb-1">Restday OT Hrs (169%)</label>
              <input
                type="number"
                min="0"
                value={record.restdayOtHrs}
                onChange={(e) => onUpdateRecord({ restdayOtHrs: parseFloat(e.target.value) || 0 })}
                className="w-full px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-600 mb-1">Legal Holidays (200%)</label>
              <input
                type="number"
                min="0"
                value={record.legalHolidays}
                onChange={(e) => onUpdateRecord({ legalHolidays: parseFloat(e.target.value) || 0 })}
                className="w-full px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-600 mb-1">SIL (Service Incentive)</label>
              <input
                type="number"
                min="0"
                value={record.silDays}
                onChange={(e) => onUpdateRecord({ silDays: parseFloat(e.target.value) || 0 })}
                className="w-full px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs font-mono"
              />
            </div>
          </div>
        )}

        {/* Advanced Deductions Panel */}
        {showAdvancedDeductions && (
          <div className="p-3.5 bg-white border border-slate-200 rounded-xl grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-[10px] font-semibold text-slate-600 mb-1">SSS Contribution</label>
              <input
                type="number"
                min="0"
                value={record.sssContribution}
                onChange={(e) => onUpdateRecord({ sssContribution: parseFloat(e.target.value) || 0 })}
                className="w-full px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-600 mb-1">PhilHealth</label>
              <input
                type="number"
                min="0"
                value={record.philhealthContribution}
                onChange={(e) => onUpdateRecord({ philhealthContribution: parseFloat(e.target.value) || 0 })}
                className="w-full px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-600 mb-1">Pag-IBIG Fund</label>
              <input
                type="number"
                min="0"
                value={record.pagibigContribution}
                onChange={(e) => onUpdateRecord({ pagibigContribution: parseFloat(e.target.value) || 0 })}
                className="w-full px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-600 mb-1">Cash Advances</label>
              <input
                type="number"
                min="0"
                value={record.cashAdvances}
                onChange={(e) => onUpdateRecord({ cashAdvances: parseFloat(e.target.value) || 0 })}
                className="w-full px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs font-mono"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
