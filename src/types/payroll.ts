export type EmploymentType = 'Regular' | 'Probationary' | 'Contractual' | 'Reliever';
export type EmployeeStatus = 'Active' | 'On Leave' | 'Suspended' | 'Terminated';
export type DirectDepositStatus = 'Verified' | 'Pending' | 'Cash / ATM';

export interface Employee {
  id: string;
  employeeCode: string; // e.g. MERZ - 2608 - 0101
  name: string; // Last, First Middle e.g. Trinidad, Jennise Cassandra
  email: string;
  avatar: string;
  role: string; // e.g. Security Officer, Lady Guard, Shift in Charge, Security Supervisor
  department: string; // e.g. Operations - Post Security, Escort & VIP, Surveillance
  clientCode: string; // e.g. 00001
  clientName: string; // e.g. FOPM - The Parkside Villas
  dailyRate: number; // e.g. 695.00
  employmentType: EmploymentType;
  directDepositStatus: DirectDepositStatus;
  bankName: string;
  accountNumberMask: string;
  status: EmployeeStatus;
  hireDate: string;
  sssNumber?: string; // e.g. 34-5678901-2
  philhealthNumber?: string; // e.g. 12-345678901-2
  tinNumber?: string; // e.g. 123-456-789-000
  pagibigNumber?: string; // e.g. 1212-3456-7890
  ytdGross: number;
  ytdTaxes: number;
  ytdNet: number;
  lastEditedBy?: string;
  lastEditedAt?: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  
  // Earnings Quantities
  regularDays: number;
  regOvertimeHrs: number;
  regNightDiffDays: number;
  restDays: number;
  restdayOtHrs: number;
  restdayNightDiffDays: number;
  legalHolidays: number;
  legalHolidayOtHrs: number;
  legalHolidayNightDiffDays: number;
  silDays: number; // Service Incentive Leave

  // Earnings Amounts
  regularPay: number;
  regOvertimePay: number;
  regNightDiffPay: number;
  restDayPay: number;
  restdayOtPay: number;
  restdayNightDiffPay: number;
  legalHolidayPay: number;
  legalHolidayOtPay: number;
  legalHolidayNightDiffPay: number;
  silPay: number;
  allowance: number;
  adjustment: number;
  grossPay: number;

  // Deductions
  sssContribution: number;
  philhealthContribution: number;
  pagibigContribution: number;
  cashbond: number;
  sssLoanSal: number;
  pagibigLoanMpl: number;
  pagibigLoanCal: number;
  withholdingTax: number;
  cashAdvances: number;
  totalDeductions: number;

  // Totals
  netPay: number;
  isApproved: boolean;
  notes?: string;
}

export interface PayPeriod {
  id: string;
  periodName: string;
  periodCode: string;
  startDate: string;
  endDate: string;
  payDate: string;
  status: 'Draft' | 'Under Review' | 'Approved' | 'Disbursed';
  totalGross: number;
  totalNet: number;
  totalDeductions: number;
  employeeCount: number;
}

export interface Timecard {
  id: string;
  employeeId: string;
  regularDays: number;
  regOvertimeHrs: number;
  regNightDiffDays: number;
  restDays: number;
  restdayOtHrs: number;
  legalHolidays: number;
  legalHolidayOtHrs: number;
  periodStartDate: string;
  periodEndDate: string;
  status: 'Submitted' | 'Approved' | 'Disputed';
  submissionDate: string;
  managerNotes?: string;
}

export interface DisbursementReportGuardItem {
  employeeId: string;
  employeeCode: string;
  name: string;
  role: string;
  clientCode: string;
  clientName: string;
  bankName: string;
  accountNumberMask: string;
  dailyRate: number;
  regularDays: number;
  overtimeHours: number;
  grossPay: number;
  statutoryDeductions: number;
  agencyDeductions: number;
  totalDeductions: number;
  netPay: number;
  disbursementStatus: 'Disbursed' | 'Ready' | 'On Hold';
}

export interface DisbursementSubmissionReport {
  id: string;
  referenceNumber: string; // e.g. MERZ-DISB-20260920-001
  reportTitle: string;
  disbursedDate: string; // YYYY-MM-DD
  createdAt: string; // ISO string
  periodName: string;
  clientFilter: string; // 'ALL' or specific client code
  clientNameScope: string;
  totalGuards: number;
  totalGrossPay: number;
  totalStatutoryDeductions: number;
  totalAgencyDeductions: number;
  totalDeductions: number;
  totalNetPay: number;
  disbursementChannel: string;
  preparedBy: string;
  certifiedBy: string;
  verifiedBy: string;
  remarks: string;
  guards: DisbursementReportGuardItem[];
}

export interface SentPayslipEmailRecord {
  id: string;
  employeeId: string;
  employeeCode: string;
  employeeName: string;
  recipientEmail: string;
  ccEmail?: string;
  periodCode: string;
  periodName: string;
  netPay: number;
  grossPay: number;
  totalDeductions: number;
  sentAt: string; // ISO string
  status: 'Delivered' | 'Sent' | 'Failed';
  subject: string;
  deliveryMethod: 'Direct In-App Dispatch' | 'Default Mail Client (mailto)' | 'Copied Clipboard' | 'Batch Dispatch';
  trackingNumber: string;
}

export interface PayrollAuditEntry {
  id: string;
  timestamp: string;
  editorEmail: string;
  editorName: string;
  action: string;
  guardId?: string;
  guardName?: string;
  details: string;
  periodName?: string;
}

