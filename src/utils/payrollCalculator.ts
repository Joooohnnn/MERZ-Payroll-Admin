import { Employee, PayrollRecord } from '../types/payroll';

export function calculatePayrollRecord(
  employee: Employee,
  overrides?: Partial<PayrollRecord>
): PayrollRecord {
  const dailyRate = employee.dailyRate || 695.0;
  const hourlyRate = dailyRate / 8;

  const regularDays = overrides?.regularDays !== undefined ? overrides.regularDays : 12;
  const regOvertimeHrs = overrides?.regOvertimeHrs !== undefined ? overrides.regOvertimeHrs : 0;
  const regNightDiffDays = overrides?.regNightDiffDays !== undefined ? overrides.regNightDiffDays : 0;
  const restDays = overrides?.restDays !== undefined ? overrides.restDays : 0;
  const restdayOtHrs = overrides?.restdayOtHrs !== undefined ? overrides.restdayOtHrs : 0;
  const restdayNightDiffDays = overrides?.restdayNightDiffDays !== undefined ? overrides.restdayNightDiffDays : 0;
  const legalHolidays = overrides?.legalHolidays !== undefined ? overrides.legalHolidays : 0;
  const legalHolidayOtHrs = overrides?.legalHolidayOtHrs !== undefined ? overrides.legalHolidayOtHrs : 0;
  const legalHolidayNightDiffDays = overrides?.legalHolidayNightDiffDays !== undefined ? overrides.legalHolidayNightDiffDays : 0;
  const silDays = overrides?.silDays !== undefined ? overrides.silDays : 0;
  const allowance = overrides?.allowance !== undefined ? overrides.allowance : 2000.0;
  const adjustment = overrides?.adjustment !== undefined ? overrides.adjustment : 0;

  // Earnings calculations
  const regularPay = overrides?.regularPay !== undefined ? overrides.regularPay : Math.round(regularDays * dailyRate * 100) / 100;
  const regOvertimePay = overrides?.regOvertimePay !== undefined ? overrides.regOvertimePay : Math.round(regOvertimeHrs * (hourlyRate * 1.25) * 100) / 100;
  // Standard DOLE 12-hour security night duty (5 regular night hrs @ 10% + 3 OT night hrs @ 1.25*10% = 0.875 * hourlyRate per night)
  // For 695 daily rate (86.875/hr), 1 night = 76.015625; 2 nights = 152.03125 -> 152.03
  const regNightDiffPay = overrides?.regNightDiffPay !== undefined 
    ? overrides.regNightDiffPay 
    : Math.round(regNightDiffDays * (hourlyRate * 0.875) * 100) / 100;
  const restDayPay = overrides?.restDayPay !== undefined ? overrides.restDayPay : Math.round(restDays * (dailyRate * 1.30) * 100) / 100;
  const restdayOtPay = overrides?.restdayOtPay !== undefined ? overrides.restdayOtPay : Math.round(restdayOtHrs * (hourlyRate * 1.30 * 1.30) * 100) / 100;
  const restdayNightDiffPay = overrides?.restdayNightDiffPay !== undefined ? overrides.restdayNightDiffPay : Math.round(restdayNightDiffDays * (hourlyRate * 8 * 1.30 * 0.10) * 100) / 100;
  const legalHolidayPay = overrides?.legalHolidayPay !== undefined ? overrides.legalHolidayPay : Math.round(legalHolidays * (dailyRate * 2.0) * 100) / 100;
  const legalHolidayOtPay = overrides?.legalHolidayOtPay !== undefined ? overrides.legalHolidayOtPay : Math.round(legalHolidayOtHrs * (hourlyRate * 2.0 * 1.30) * 100) / 100;
  const legalHolidayNightDiffPay = overrides?.legalHolidayNightDiffPay !== undefined ? overrides.legalHolidayNightDiffPay : Math.round(legalHolidayNightDiffDays * (hourlyRate * 8 * 2.0 * 0.10) * 100) / 100;
  const silPay = overrides?.silPay !== undefined ? overrides.silPay : Math.round(silDays * dailyRate * 100) / 100;

  const grossPay = Math.round(
    (regularPay +
      regOvertimePay +
      regNightDiffPay +
      restDayPay +
      restdayOtPay +
      restdayNightDiffPay +
      legalHolidayPay +
      legalHolidayOtPay +
      legalHolidayNightDiffPay +
      silPay +
      allowance +
      adjustment) * 100
  ) / 100;

  // Deductions
  const sssContribution = overrides?.sssContribution !== undefined ? overrides.sssContribution : 0;
  const philhealthContribution = overrides?.philhealthContribution !== undefined ? overrides.philhealthContribution : 0;
  const pagibigContribution = overrides?.pagibigContribution !== undefined ? overrides.pagibigContribution : 0;
  const cashbond = overrides?.cashbond !== undefined ? overrides.cashbond : 50.0;
  const sssLoanSal = overrides?.sssLoanSal !== undefined ? overrides.sssLoanSal : 0;
  const pagibigLoanMpl = overrides?.pagibigLoanMpl !== undefined ? overrides.pagibigLoanMpl : 0;
  const pagibigLoanCal = overrides?.pagibigLoanCal !== undefined ? overrides.pagibigLoanCal : 0;
  const withholdingTax = overrides?.withholdingTax !== undefined ? overrides.withholdingTax : 0;
  const cashAdvances = overrides?.cashAdvances !== undefined ? overrides.cashAdvances : 0;

  const totalDeductions = Math.round(
    (sssContribution +
      philhealthContribution +
      pagibigContribution +
      cashbond +
      sssLoanSal +
      pagibigLoanMpl +
      pagibigLoanCal +
      withholdingTax +
      cashAdvances) * 100
  ) / 100;

  const netPay = Math.round((grossPay - totalDeductions) * 100) / 100;

  return {
    id: `pay-${employee.id}`,
    employeeId: employee.id,
    regularDays,
    regOvertimeHrs,
    regNightDiffDays,
    restDays,
    restdayOtHrs,
    restdayNightDiffDays,
    legalHolidays,
    legalHolidayOtHrs,
    legalHolidayNightDiffDays,
    silDays,
    regularPay,
    regOvertimePay,
    regNightDiffPay,
    restDayPay,
    restdayOtPay,
    restdayNightDiffPay,
    legalHolidayPay,
    legalHolidayOtPay,
    legalHolidayNightDiffPay,
    silPay,
    allowance,
    adjustment,
    grossPay,
    sssContribution,
    philhealthContribution,
    pagibigContribution,
    cashbond,
    sssLoanSal,
    pagibigLoanMpl,
    pagibigLoanCal,
    withholdingTax,
    cashAdvances,
    totalDeductions,
    netPay,
    isApproved: overrides?.isApproved !== undefined ? overrides.isApproved : true,
    notes: overrides?.notes,
  };
}

export function formatCurrency(amount: number, withSymbol = true): string {
  const formatted = new Intl.NumberFormat('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount || 0);

  return withSymbol ? `₱${formatted}` : formatted;
}

export function formatPayslipAmount(val: number | undefined): string {
  if (val === undefined || val === 0 || isNaN(val)) return '';
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
}

export function exportPayrollToCSV(
  employees: Employee[],
  records: Record<string, PayrollRecord>,
  periodName: string
): void {
  const headers = [
    'Employee ID',
    'Employee Name',
    'Position',
    'Client / Post Code',
    'Regular Days',
    'Regular Pay',
    'Overtime Hrs',
    'Overtime Pay',
    'Night Diff Days',
    'Night Diff Pay',
    'Allowance',
    'Gross Pay',
    'SSS',
    'PhilHealth',
    'Pag-IBIG',
    'Cashbond',
    'Loans / Advances',
    'Total Deductions',
    'Net Pay',
  ];

  const rows = employees.map((emp) => {
    const r = records[emp.id];
    if (!r) return [];
    return [
      emp.employeeCode,
      `"${emp.name}"`,
      `"${emp.role}"`,
      `"${emp.clientCode} - ${emp.clientName}"`,
      r.regularDays,
      r.regularPay.toFixed(2),
      r.regOvertimeHrs,
      r.regOvertimePay.toFixed(2),
      r.regNightDiffDays,
      r.regNightDiffPay.toFixed(2),
      r.allowance.toFixed(2),
      r.grossPay.toFixed(2),
      r.sssContribution.toFixed(2),
      r.philhealthContribution.toFixed(2),
      r.pagibigContribution.toFixed(2),
      r.cashbond.toFixed(2),
      (r.sssLoanSal + r.pagibigLoanMpl + r.pagibigLoanCal + r.cashAdvances).toFixed(2),
      r.totalDeductions.toFixed(2),
      r.netPay.toFixed(2),
    ];
  });

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `MERZ_payroll_summary_${periodName.toLowerCase().replace(/[^a-z0-9]/g, '_')}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Automatically calculates the next sequential agency employee number.
 * Format: MERZ - 2608 - XXXX (4 digits, starting from 0107 following the existing 0101-0106 roster)
 */
export function generateNextEmployeeCode(employees: { employeeCode?: string }[] = []): string {
  let maxSeq = 106; // Roster base ends at 0106, so the next default sequence starts at 0107

  for (const emp of employees) {
    if (!emp?.employeeCode) continue;
    // Extract trailing digits (e.g. from 'MERZ - 2608 - 0106' -> 106)
    const match = emp.employeeCode.match(/(\d{3,5})$/) || emp.employeeCode.match(/(\d+)$/);
    if (match) {
      const parsed = parseInt(match[1], 10);
      if (!isNaN(parsed) && parsed > maxSeq) {
        maxSeq = parsed;
      }
    }
  }

  const nextSeq = maxSeq + 1;
  const paddedSuffix = String(nextSeq).padStart(4, '0');
  return `MERZ - 2608 - ${paddedSuffix}`;
}

