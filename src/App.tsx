import React, { useState, useMemo, useEffect } from 'react';
import { 
  FileText, 
  Users, 
  Printer, 
  Download, 
  CheckCircle2,
  Calendar,
  Laptop,
  Mail,
  Presentation,
  Compass,
  Maximize2,
  ChevronDown
} from 'lucide-react';
import { 
  INITIAL_EMPLOYEES, 
  INITIAL_TIMECARDS, 
  CURRENT_PAY_PERIOD,
  PAST_PAY_PERIODS
} from './data/initialData';
import { Employee, PayPeriod, PayrollRecord } from './types/payroll';
import { calculatePayrollRecord, exportPayrollToCSV, generateNextEmployeeCode } from './utils/payrollCalculator';
import { OfficialPayslipSheet, MerzAgencyLogo } from './components/OfficialPayslipSheet';
import { PayslipLiveEditor } from './components/PayslipLiveEditor';
import { GuardsPayrollMasterlist } from './components/GuardsPayrollMasterlist';
import { EmployeeModal } from './components/EmployeeModal';
import { DesktopAppModal } from './components/DesktopAppModal';
import { SendPayslipEmailModal } from './components/SendPayslipEmailModal';
import { PresentationModal } from './components/PresentationModal';
import { StepByStepFeatureGuideModal } from './components/StepByStepFeatureGuideModal';
import { PaystubModal } from './components/PaystubModal';
import { AdjustPayModal } from './components/AdjustPayModal';
import { 
  loadSavedEmployees, 
  saveEmployees, 
  loadSavedAdjustments, 
  saveAdjustments,
  loadSavedSelectedEmpId,
  saveSelectedEmpId,
  loadSavedSelectedPeriodId,
  saveSelectedPeriodId,
  loadSavedPeriods,
  savePeriods,
  clearAllSavedData,
  DEFAULT_ADJUSTMENTS
} from './utils/storage';

type ViewMode = 'payslip' | 'masterlist';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('masterlist');
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false);
  
  // Initialize state with data loaded from localStorage (autosave persistence)
  const [employees, setEmployees] = useState<Employee[]>(() => loadSavedEmployees());
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>(() => 
    loadSavedSelectedEmpId(INITIAL_EMPLOYEES[0].id)
  );
  const [availablePeriods, setAvailablePeriods] = useState<PayPeriod[]>(() => loadSavedPeriods());
  const [selectedPeriodId, setSelectedPeriodId] = useState<string>(() => loadSavedSelectedPeriodId());

  // Custom record adjustments per employee (persisted)
  const [customAdjustments, setCustomAdjustments] = useState<Record<string, Partial<PayrollRecord>>>(() => 
    loadSavedAdjustments()
  );

  const [addGuardModalOpen, setAddGuardModalOpen] = useState(false);
  const [editingGuard, setEditingGuard] = useState<Employee | null>(null);
  const [defaultClientCodeForAdd, setDefaultClientCodeForAdd] = useState<string | undefined>(undefined);
  const [desktopModalOpen, setDesktopModalOpen] = useState(false);
  const [presentationModalOpen, setPresentationModalOpen] = useState(false);
  const [featureGuideOpen, setFeatureGuideOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailModalTargetEmployee, setEmailModalTargetEmployee] = useState<Employee | null>(null);
  const [emailModalBatchEmployees, setEmailModalBatchEmployees] = useState<Employee[]>([]);
  const [paystubModalOpen, setPaystubModalOpen] = useState(false);
  const [paystubModalEmployee, setPaystubModalEmployee] = useState<Employee | null>(null);
  const [adjustPayModalOpen, setAdjustPayModalOpen] = useState(false);
  const [adjustPayModalEmployee, setAdjustPayModalEmployee] = useState<Employee | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Autosave employees to localStorage whenever updated
  useEffect(() => {
    setSaveStatus('saving');
    saveEmployees(employees);
    const timer = setTimeout(() => setSaveStatus('saved'), 300);
    return () => clearTimeout(timer);
  }, [employees]);

  // Autosave customAdjustments to localStorage whenever duty hours, rates, or deductions change
  useEffect(() => {
    setSaveStatus('saving');
    saveAdjustments(customAdjustments);
    const timer = setTimeout(() => setSaveStatus('saved'), 300);
    return () => clearTimeout(timer);
  }, [customAdjustments]);

  // Autosave selected guard ID and period ID
  useEffect(() => {
    saveSelectedEmpId(selectedEmployeeId);
  }, [selectedEmployeeId]);

  useEffect(() => {
    saveSelectedPeriodId(selectedPeriodId);
  }, [selectedPeriodId]);

  useEffect(() => {
    savePeriods(availablePeriods);
  }, [availablePeriods]);

  // Active pay period
  const payPeriod = useMemo(() => {
    return availablePeriods.find(p => p.id === selectedPeriodId) || availablePeriods[0];
  }, [availablePeriods, selectedPeriodId]);

  // Currently selected employee
  const currentEmployee = useMemo(() => {
    const found = employees.find(e => e.id === selectedEmployeeId);
    if (found) return found;
    return employees[0] || INITIAL_EMPLOYEES[0];
  }, [employees, selectedEmployeeId]);

  // Compute live payroll records for all employees
  const allRecords = useMemo(() => {
    const records: Record<string, PayrollRecord> = {};
    employees.forEach(emp => {
      const tc = INITIAL_TIMECARDS.find(t => t.employeeId === emp.id);
      const userAdj = customAdjustments[emp.id] || {};

      const baseDays = userAdj.regularDays !== undefined ? userAdj.regularDays : (tc ? tc.regularDays : 12);
      const baseOt = userAdj.regOvertimeHrs !== undefined ? userAdj.regOvertimeHrs : (tc ? tc.regOvertimeHrs : 0);
      const baseNd = userAdj.regNightDiffDays !== undefined ? userAdj.regNightDiffDays : (tc ? tc.regNightDiffDays : 0);

      records[emp.id] = calculatePayrollRecord(emp, {
        regularDays: baseDays,
        regOvertimeHrs: baseOt,
        regNightDiffDays: baseNd,
        allowance: userAdj.allowance !== undefined ? userAdj.allowance : 2000.0,
        cashbond: userAdj.cashbond !== undefined ? userAdj.cashbond : 50.0,
        ...userAdj,
      });
    });
    return records;
  }, [employees, customAdjustments]);

  const currentRecord = allRecords[currentEmployee.id] || calculatePayrollRecord(currentEmployee);

  // Quick reset to Alvarez, Juan Paolo photo sample
  const handleResetToPhotoSample = () => {
    setSelectedEmployeeId('emp-101');
    setCustomAdjustments(prev => ({
      ...prev,
      'emp-101': {
        regularDays: 12,
        regOvertimeHrs: 48,
        regNightDiffDays: 2,
        regNightDiffPay: 152.03,
        restDays: 0,
        restdayOtHrs: 0,
        legalHolidays: 0,
        legalHolidayOtHrs: 0,
        allowance: 2000.0,
        cashbond: 50.0,
        adjustment: 0,
        sssContribution: 0,
        philhealthContribution: 0,
        pagibigContribution: 0,
        sssLoanSal: 0,
        pagibigLoanMpl: 0,
        pagibigLoanCal: 0,
        withholdingTax: 0,
        cashAdvances: 0,
      }
    }));
    setViewMode('payslip');
    showToast('Loaded Alvarez, Juan Paolo official payslip sample');
  };

  // Reset entire agency data to factory defaults
  const handleFactoryReset = () => {
    if (window.confirm('Reset all logged records, added guards, and adjustments back to default factory settings?')) {
      clearAllSavedData();
      setEmployees(INITIAL_EMPLOYEES);
      setSelectedEmployeeId(INITIAL_EMPLOYEES[0].id);
      setCustomAdjustments(DEFAULT_ADJUSTMENTS);
      setAvailablePeriods([CURRENT_PAY_PERIOD, ...PAST_PAY_PERIODS]);
      setSelectedPeriodId(CURRENT_PAY_PERIOD.id);
      showToast('Autosave cleared — factory data restored');
    }
  };

  const handleUpdateRecord = (updates: Partial<PayrollRecord>) => {
    setCustomAdjustments(prev => ({
      ...prev,
      [currentEmployee.id]: {
        ...prev[currentEmployee.id],
        ...updates,
      }
    }));
  };

  const handleUpdateRecordForEmployee = (empId: string, updates: Partial<PayrollRecord>) => {
    setCustomAdjustments(prev => ({
      ...prev,
      [empId]: {
        ...prev[empId],
        ...updates,
      }
    }));
    showToast('Updated duty hours & recalculated payslip');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleUpdateEmployeeDailyRate = (employeeId: string, newRate: number) => {
    setEmployees(prev =>
      prev.map(emp => (emp.id === employeeId ? { 
        ...emp, 
        dailyRate: newRate
      } : emp))
    );
    showToast(`Updated base daily rate to ₱${newRate.toFixed(2)}`);
  };

  const handleBatchUpdateDailyRate = (employeeIds: string[], newRate: number) => {
    const idSet = new Set(employeeIds);
    setEmployees(prev =>
      prev.map(emp => (idSet.has(emp.id) ? { 
        ...emp, 
        dailyRate: newRate
      } : emp))
    );
    showToast(`Updated base daily rate to ₱${newRate.toFixed(2)} for ${employeeIds.length} guards`);
  };

  const handleSaveGuard = (data: Partial<Employee>) => {
    if (editingGuard) {
      setEmployees(prev =>
        prev.map(emp =>
          emp.id === editingGuard.id
            ? {
                ...emp,
                ...data,
                name: data.name?.trim() || emp.name,
                employeeCode: data.employeeCode?.trim() || emp.employeeCode,
                role: data.role || emp.role,
                department: data.department || emp.department,
                clientCode: data.clientCode || emp.clientCode,
                clientName: data.clientName || emp.clientName,
                dailyRate: data.dailyRate !== undefined ? Number(data.dailyRate) : emp.dailyRate,
                email: data.email?.trim() || emp.email,
                bankName: data.bankName || emp.bankName,
                accountNumberMask: data.accountNumberMask || emp.accountNumberMask,
                sssNumber: data.sssNumber !== undefined ? data.sssNumber.trim() : emp.sssNumber,
                philhealthNumber: data.philhealthNumber !== undefined ? data.philhealthNumber.trim() : emp.philhealthNumber,
                tinNumber: data.tinNumber !== undefined ? data.tinNumber.trim() : emp.tinNumber,
                pagibigNumber: data.pagibigNumber !== undefined ? data.pagibigNumber.trim() : emp.pagibigNumber,
              }
            : emp
        )
      );
      showToast(`Updated guard profile for ${data.name || editingGuard.name}`);
      setEditingGuard(null);
    } else {
      handleSaveNewGuard(data);
    }
  };

  const handleSaveNewGuard = (data: Partial<Employee>) => {
    const newId = `emp-${Date.now()}`;

    const newGuard: Employee = {
      id: newId,
      employeeCode: data.employeeCode?.trim() || generateNextEmployeeCode(employees),
      name: data.name || 'New Security Officer',
      email: data.email || 'guard@merzagency.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: data.role || 'Security Officer',
      department: 'Post Security & Access Control',
      clientCode: data.clientCode || '00001',
      clientName: data.clientName || 'FOPM - The Parkside Villas',
      dailyRate: data.dailyRate || 695.0,
      employmentType: 'Regular',
      directDepositStatus: 'Verified',
      bankName: data.bankName || 'BDO Unibank',
      accountNumberMask: '•••• 1234',
      status: 'Active',
      hireDate: new Date().toISOString().split('T')[0],
      sssNumber: data.sssNumber?.trim() || '',
      philhealthNumber: data.philhealthNumber?.trim() || '',
      tinNumber: data.tinNumber?.trim() || '',
      pagibigNumber: data.pagibigNumber?.trim() || '',
      ytdGross: 0,
      ytdTaxes: 0,
      ytdNet: 0,
    };

    setEmployees(prev => [...prev, newGuard]);
    setSelectedEmployeeId(newId);
    showToast(`Deployed ${newGuard.name} to Post [${newGuard.clientCode}] ${newGuard.clientName}`);
  };

  const handleOpenEmailModal = (targetEmployee?: Employee, batch?: Employee[]) => {
    if (batch && batch.length > 0) {
      setEmailModalTargetEmployee(null);
      setEmailModalBatchEmployees(batch);
    } else if (targetEmployee) {
      setEmailModalTargetEmployee(targetEmployee);
      setEmailModalBatchEmployees([]);
    } else {
      setEmailModalTargetEmployee(currentEmployee);
      setEmailModalBatchEmployees([]);
    }
    setEmailModalOpen(true);
  };

  const handleUpdateEmployeeEmail = (employeeId: string, newEmail: string) => {
    setEmployees(prev =>
      prev.map(emp => (emp.id === employeeId ? { ...emp, email: newEmail } : emp))
    );
    showToast(`Saved email ${newEmail} to guard profile`);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col font-sans text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 bg-slate-950 text-white rounded-xl shadow-2xl text-xs border border-slate-800 animate-in fade-in duration-200 print:hidden">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 shadow-2xs print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3.5">
          
          {/* Logo & Agency Identity */}
          <div className="flex items-center gap-3">
            <div className="shrink-0">
              <MerzAgencyLogo size="w-12 h-12" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-sm sm:text-base tracking-tight text-slate-950 font-serif leading-tight">
                  MERZ Security Solutions Agency Inc.
                </h1>
                <span className="hidden sm:inline-flex text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-900 border border-emerald-200">
                  D.O. 150-16
                </span>
                
                {/* Real-time Local Autosave Indicator Badge */}
                <div 
                  className="hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                  title="All duty logs, guard rates, and adjustments are saved locally to this device."
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${saveStatus === 'saved' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></span>
                  <span>{saveStatus === 'saved' ? 'Saved' : 'Saving...'}</span>
                </div>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                <span className="font-medium text-slate-700">DOLE Compliant Payroll System</span>
                <span className="text-slate-300">•</span>
                <span>NCR &amp; Batangas Regional Operations</span>
              </div>
            </div>
          </div>

          {/* Controls: Pay Period Selector & Mode Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            
            {/* Pay Period Switcher */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 rounded-xl px-2.5 py-1.5 text-xs">
              <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <select
                value={selectedPeriodId}
                onChange={(e) => {
                  setSelectedPeriodId(e.target.value);
                  showToast(`Switched cycle to ${availablePeriods.find(p => p.id === e.target.value)?.periodName}`);
                }}
                className="bg-transparent font-bold text-slate-900 focus:outline-hidden cursor-pointer"
              >
                {availablePeriods.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.periodName} ({p.status})
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Segmented Tabs */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200/80">
              <button
                onClick={() => setViewMode('masterlist')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                  viewMode === 'masterlist'
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-slate-600" />
                <span>Guards Masterlist</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-800 font-mono font-bold">
                  {employees.length}
                </span>
              </button>

              <button
                onClick={() => setViewMode('payslip')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                  viewMode === 'payslip'
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-emerald-600" />
                <span>Official Payslip</span>
              </button>
            </div>

            {/* Quick Action: Print */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-xs transition cursor-pointer"
              title="Print official dual-copy payslip sheet or save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Print Slip</span>
            </button>

            {/* Executive Tools & Utilities Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setToolsMenuOpen(prev => !prev)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-xl shadow-2xs transition cursor-pointer"
                title="System utilities, guides, presentations, and exports"
              >
                <Compass className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">Tools</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${toolsMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {toolsMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setToolsMenuOpen(false)} 
                  />
                  <div className="absolute right-0 mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 divide-y divide-slate-100">
                    <div className="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Payroll System Utilities
                    </div>
                    <div className="py-1">
                      <button
                        type="button"
                        onClick={() => {
                          setToolsMenuOpen(false);
                          setFeatureGuideOpen(true);
                        }}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 transition text-left cursor-pointer"
                      >
                        <Compass className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <div className="font-semibold leading-tight">Visual User Guide</div>
                          <div className="text-[10px] text-slate-400">Step-by-step visual documentation</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setToolsMenuOpen(false);
                          setPresentationModalOpen(true);
                        }}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:bg-amber-50 hover:text-amber-900 transition text-left cursor-pointer"
                      >
                        <Presentation className="w-4 h-4 text-amber-600 shrink-0" />
                        <div>
                          <div className="font-semibold leading-tight">Presentation Deck (.PPTX)</div>
                          <div className="text-[10px] text-slate-400">DOLE D.O. 150-16 briefing slides</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setToolsMenuOpen(false);
                          setDesktopModalOpen(true);
                        }}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-100 transition text-left cursor-pointer"
                      >
                        <Laptop className="w-4 h-4 text-slate-700 shrink-0" />
                        <div>
                          <div className="font-semibold leading-tight">Windows Desktop App (.exe)</div>
                          <div className="text-[10px] text-slate-400">Offline desktop runner setup</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setToolsMenuOpen(false);
                          exportPayrollToCSV(employees, allRecords, payPeriod.periodName);
                        }}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-100 transition text-left cursor-pointer"
                      >
                        <Download className="w-4 h-4 text-slate-500 shrink-0" />
                        <div>
                          <div className="font-semibold leading-tight">Export Payroll Ledger (CSV)</div>
                          <div className="text-[10px] text-slate-400">Spreadsheet table for reporting</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-5 space-y-5 print:p-0 print:m-0 print:max-w-none">
        {viewMode === 'payslip' && (
          <div className="space-y-5">
            {/* Interactive Live Adjusters */}
            <PayslipLiveEditor
              selectedEmployee={currentEmployee}
              allEmployees={employees}
              record={currentRecord}
              onSelectEmployee={(emp) => setSelectedEmployeeId(emp.id)}
              onUpdateRecord={handleUpdateRecord}
              onResetToPhotoSample={handleResetToPhotoSample}
              onOpenAddGuard={() => setAddGuardModalOpen(true)}
              onOpenPayslipModal={() => {
                setPaystubModalEmployee(currentEmployee);
                setPaystubModalOpen(true);
              }}
              onEditGuard={(emp) => setEditingGuard(emp)}
              onOpenEmailPayslip={() => handleOpenEmailModal(currentEmployee)}
              onOpenFeatureGuide={() => setFeatureGuideOpen(true)}
            />

            {/* Document Frame Header with Print Reminder & Autosave note */}
            <div className="flex items-center justify-between px-1 print:hidden">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Dual-Copy Document Canvas
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-600">
                  Official Copy for <strong>{currentEmployee.name}</strong> ({currentEmployee.employeeCode})
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setPaystubModalEmployee(currentEmployee);
                    setPaystubModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition cursor-pointer shadow-xs"
                  title="Open official dual-copy payslip sheet in an executive popup window modal"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Popup Window</span>
                </button>
                <button
                  onClick={() => handleOpenEmailModal(currentEmployee)}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-300 rounded-lg transition cursor-pointer shadow-2xs"
                  title={`Send electronic payslip to ${currentEmployee.name} (${currentEmployee.email}) via email`}
                >
                  <Mail className="w-3.5 h-3.5 text-sky-600" />
                  <span>Email Payslip</span>
                </button>
                <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                  Landscape A4 / Letter format
                </span>
                <button
                  onClick={handlePrint}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline flex items-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
              </div>
            </div>

            {/* Official Dual-Copy Payslip Sheet Document */}
            <div className="flex justify-center p-4 sm:p-6 bg-slate-200/60 rounded-2xl border border-slate-300/60 shadow-inner overflow-x-auto print:bg-white print:border-none print:p-0 print:shadow-none">
              <OfficialPayslipSheet
                employee={currentEmployee}
                record={currentRecord}
                period={payPeriod}
              />
            </div>
          </div>
        )}

        {viewMode === 'masterlist' && (
          <GuardsPayrollMasterlist
            employees={employees}
            records={allRecords}
            period={payPeriod}
            onSelectAndSwitchToPayslip={(emp) => {
              setSelectedEmployeeId(emp.id);
              setViewMode('payslip');
            }}
            onOpenPayslipModal={(emp) => {
              setPaystubModalEmployee(emp);
              setPaystubModalOpen(true);
            }}
            onOpenAdjustPayModal={(emp) => {
              setAdjustPayModalEmployee(emp);
              setAdjustPayModalOpen(true);
            }}
            onOpenAddGuard={(targetClientCode) => {
              setDefaultClientCodeForAdd(targetClientCode);
              setAddGuardModalOpen(true);
            }}
            onUpdateEmployeeDailyRate={handleUpdateEmployeeDailyRate}
            onBatchUpdateDailyRate={handleBatchUpdateDailyRate}
            onShowToast={showToast}
            onOpenEmailPayslip={(emp) => handleOpenEmailModal(emp)}
            onOpenEmailBatch={(batch) => handleOpenEmailModal(undefined, batch)}
            onEditGuard={(emp) => setEditingGuard(emp)}
            onOpenPresentation={() => setPresentationModalOpen(true)}
            onOpenFeatureGuide={() => setFeatureGuideOpen(true)}
          />
        )}
      </main>

      {/* Modern Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-3.5 text-xs text-slate-500 print:hidden mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span>MERZ Security Solutions Agency Inc. • DOLE D.O. 150-16 Security Guard Payroll Standards</span>
            <span className="text-slate-300">•</span>
            <button
              onClick={handleFactoryReset}
              className="text-slate-400 hover:text-rose-600 transition underline text-[11px] cursor-pointer"
              title="Reset all changes back to initial state"
            >
              Reset to Factory Defaults
            </button>
          </div>
          <span className="font-mono text-slate-400 text-[11px]">Republic of the Philippines • SEC Reg: CS2022-84910</span>
        </div>
      </footer>

      {/* Executive Official Payslip Popup Window Modal */}
      {paystubModalOpen && paystubModalEmployee && (
        <PaystubModal
          employee={paystubModalEmployee}
          record={allRecords[paystubModalEmployee.id] || calculatePayrollRecord(paystubModalEmployee)}
          period={payPeriod}
          allEmployees={employees}
          allRecords={allRecords}
          onSelectEmployee={(emp) => {
            setPaystubModalEmployee(emp);
            setSelectedEmployeeId(emp.id);
          }}
          onUpdateRecord={(updates) => {
            handleUpdateRecordForEmployee(paystubModalEmployee.id, updates);
          }}
          onClose={() => {
            setPaystubModalOpen(false);
            setPaystubModalEmployee(null);
          }}
          onOpenEmail={(emp) => handleOpenEmailModal(emp)}
          onEditGuard={(emp) => {
            setPaystubModalOpen(false);
            setEditingGuard(emp);
          }}
          onOpenAdjustModal={(emp) => {
            setPaystubModalOpen(false);
            setAdjustPayModalEmployee(emp);
            setAdjustPayModalOpen(true);
          }}
        />
      )}

      {/* Quick Adjust Pay & Duty Shifts Modal */}
      {adjustPayModalOpen && adjustPayModalEmployee && (
        <AdjustPayModal
          employee={adjustPayModalEmployee}
          currentRecord={allRecords[adjustPayModalEmployee.id] || calculatePayrollRecord(adjustPayModalEmployee)}
          onSave={(empId, updates) => {
            handleUpdateRecordForEmployee(empId, updates);
            setAdjustPayModalOpen(false);
            setAdjustPayModalEmployee(null);
          }}
          onClose={() => {
            setAdjustPayModalOpen(false);
            setAdjustPayModalEmployee(null);
          }}
        />
      )}

      {/* Add / Deploy Guard Modal */}
      {(addGuardModalOpen || editingGuard !== null) && (
        <EmployeeModal
          employeeToEdit={editingGuard}
          existingEmployees={employees}
          defaultClientCode={defaultClientCodeForAdd}
          onSave={handleSaveGuard}
          onClose={() => {
            setAddGuardModalOpen(false);
            setEditingGuard(null);
            setDefaultClientCodeForAdd(undefined);
          }}
        />
      )}

      {/* Desktop App (.exe) Modal */}
      {desktopModalOpen && (
        <DesktopAppModal
          onClose={() => setDesktopModalOpen(false)}
          deferredPrompt={deferredPrompt}
        />
      )}

      {/* Electronic Payslip Email Modal (Single & Batch Dispatch) */}
      {emailModalOpen && (
        <SendPayslipEmailModal
          isOpen={emailModalOpen}
          onClose={() => {
            setEmailModalOpen(false);
            setEmailModalTargetEmployee(null);
            setEmailModalBatchEmployees([]);
          }}
          employee={emailModalTargetEmployee}
          batchEmployees={emailModalBatchEmployees}
          records={allRecords}
          period={payPeriod}
          onUpdateEmployeeEmail={handleUpdateEmployeeEmail}
          onShowToast={showToast}
        />
      )}

      {/* Presentation Deck Modal (.pptx generator) */}
      {presentationModalOpen && (
        <PresentationModal
          isOpen={presentationModalOpen}
          onClose={() => setPresentationModalOpen(false)}
          onShowToast={showToast}
        />
      )}

      {/* Step-by-Step Feature Guide & Visual Map Modal */}
      {featureGuideOpen && (
        <StepByStepFeatureGuideModal
          isOpen={featureGuideOpen}
          onClose={() => setFeatureGuideOpen(false)}
          onNavigateToView={(view) => {
            setViewMode(view);
            setFeatureGuideOpen(false);
          }}
          onOpenAddGuard={() => {
            setFeatureGuideOpen(false);
            setAddGuardModalOpen(true);
          }}
          onOpenPresentationModal={() => {
            setFeatureGuideOpen(false);
            setPresentationModalOpen(true);
          }}
          onOpenDesktopModal={() => {
            setFeatureGuideOpen(false);
            setDesktopModalOpen(true);
          }}
          onPrintSlip={() => {
            handlePrint();
          }}
          onExportCSV={() => {
            exportPayrollToCSV(employees, allRecords, payPeriod.periodName);
          }}
        />
      )}
    </div>
  );
}
