import { Employee, PayPeriod, PayrollRecord, DisbursementSubmissionReport, SentPayslipEmailRecord } from '../types/payroll';
import { INITIAL_EMPLOYEES, CURRENT_PAY_PERIOD, PAST_PAY_PERIODS } from '../data/initialData';

const STORAGE_KEYS = {
  EMPLOYEES: 'merz_payroll_employees_v1',
  ADJUSTMENTS: 'merz_payroll_adjustments_v1',
  SELECTED_EMP: 'merz_payroll_selected_emp_v1',
  SELECTED_PERIOD: 'merz_payroll_selected_period_v1',
  VIEW_MODE: 'merz_payroll_view_mode_v1',
  PERIODS: 'merz_payroll_periods_v1',
  LAST_SAVED: 'merz_payroll_last_saved_v1',
  DISBURSEMENT_REPORTS: 'merz_payroll_disbursement_reports_v1',
  SENT_EMAILS: 'merz_payroll_sent_emails_v1',
};

export const DEFAULT_ADJUSTMENTS: Record<string, Partial<PayrollRecord>> = {
  'emp-101': {
    regularDays: 12,
    regOvertimeHrs: 48,
    regNightDiffDays: 2,
    allowance: 2000.0,
    cashbond: 50.0,
    regNightDiffPay: 152.03, // Exactly matching sample photo
  },
};

export function loadSavedEmployees(): Employee[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to load saved employees from localStorage:', err);
  }
  return INITIAL_EMPLOYEES;
}

export function saveEmployees(employees: Employee[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees));
    localStorage.setItem(STORAGE_KEYS.LAST_SAVED, new Date().toISOString());
  } catch (err) {
    console.warn('Failed to save employees to localStorage:', err);
  }
}

export function loadSavedAdjustments(): Record<string, Partial<PayrollRecord>> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ADJUSTMENTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to load saved adjustments from localStorage:', err);
  }
  return DEFAULT_ADJUSTMENTS;
}

export function saveAdjustments(adjustments: Record<string, Partial<PayrollRecord>>): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ADJUSTMENTS, JSON.stringify(adjustments));
    localStorage.setItem(STORAGE_KEYS.LAST_SAVED, new Date().toISOString());
  } catch (err) {
    console.warn('Failed to save adjustments to localStorage:', err);
  }
}

export function loadSavedSelectedEmpId(fallbackId: string): string {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SELECTED_EMP);
    if (raw) return raw;
  } catch {
    // fallback
  }
  return fallbackId;
}

export function saveSelectedEmpId(id: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SELECTED_EMP, id);
  } catch {}
}

export function loadSavedSelectedPeriodId(): string {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SELECTED_PERIOD);
    if (raw) return raw;
  } catch {}
  return CURRENT_PAY_PERIOD.id;
}

export function saveSelectedPeriodId(id: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SELECTED_PERIOD, id);
  } catch {}
}

export function loadSavedPeriods(): PayPeriod[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PERIODS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [CURRENT_PAY_PERIOD, ...PAST_PAY_PERIODS];
}

export function savePeriods(periods: PayPeriod[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PERIODS, JSON.stringify(periods));
  } catch {}
}

export function clearAllSavedData(): void {
  try {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
  } catch {}
}

export function loadSavedDisbursementReports(): DisbursementSubmissionReport[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DISBURSEMENT_REPORTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn('Failed to load saved disbursement reports:', err);
  }
  return [];
}

export function saveDisbursementReport(report: DisbursementSubmissionReport): void {
  try {
    const existing = loadSavedDisbursementReports();
    // Replace if existing id matches, otherwise prepend
    const index = existing.findIndex((r) => r.id === report.id);
    let updated: DisbursementSubmissionReport[];
    if (index >= 0) {
      updated = [...existing];
      updated[index] = report;
    } else {
      updated = [report, ...existing];
    }
    localStorage.setItem(STORAGE_KEYS.DISBURSEMENT_REPORTS, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to save disbursement report to localStorage:', err);
  }
}

export function deleteSavedDisbursementReport(reportId: string): void {
  try {
    const existing = loadSavedDisbursementReports();
    const filtered = existing.filter((r) => r.id !== reportId);
    localStorage.setItem(STORAGE_KEYS.DISBURSEMENT_REPORTS, JSON.stringify(filtered));
  } catch (err) {
    console.warn('Failed to delete disbursement report:', err);
  }
}

export function loadSavedSentEmails(): SentPayslipEmailRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SENT_EMAILS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn('Failed to load sent emails from localStorage:', err);
  }
  return [];
}

export function saveSentEmailRecord(record: SentPayslipEmailRecord): void {
  try {
    const existing = loadSavedSentEmails();
    // Prepend new record, keep up to 200 history entries
    const updated = [record, ...existing.filter((r) => r.id !== record.id)].slice(0, 200);
    localStorage.setItem(STORAGE_KEYS.SENT_EMAILS, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to save sent email record:', err);
  }
}

export function clearSentEmailHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.SENT_EMAILS);
  } catch {}
}

