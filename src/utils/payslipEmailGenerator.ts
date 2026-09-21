import { Employee, PayrollRecord, PayPeriod } from '../types/payroll';
import { formatPayslipAmount } from './payrollCalculator';

/**
 * Generates an official subject line for payslip emails
 */
export function generatePayslipEmailSubject(employee: Employee, period: PayPeriod): string {
  return `[Official Payslip] MERZ Security Solutions - ${employee.name} (${employee.employeeCode}) - ${period.periodName}`;
}

/**
 * Generates a clean, professional plain-text payslip message
 */
export function generatePayslipEmailTextBody(
  employee: Employee,
  record: PayrollRecord,
  period: PayPeriod,
  customNote?: string
): string {
  const divider = '============================================================';
  const subDivider = '------------------------------------------------------------';

  return `
${divider}
MERZ SECURITY SOLUTIONS AGENCY INC.
DOLE D.O. 150-16 REGISTERED PRIVATE SECURITY AGENCY
PNP-SOSIA License: PSA-NCR-2024-0812 | SEC Reg: CS2022-84910
Unit 402 Emerald Bldg., F. Ortigas Jr. Ave., Pasig City
Contact: (02) 8632-9100 | Email: merzagency.2025@gmail.com
${divider}

OFFICIAL CONFIDENTIAL EMPLOYEE PAYSLIP

SECURITY PERSONNEL DETAILS:
• Full Name:       ${employee.name}
• Agency Code:     ${employee.employeeCode}
• Designation:     ${employee.role}
• Client Post:     [${employee.clientCode}] ${employee.clientName}
• Daily Base Rate: PHP ${employee.dailyRate.toFixed(2)}
• Disbursement:    ${employee.bankName} (${employee.accountNumberMask})

PAYROLL PERIOD & CUTOFF:
• Period:          ${period.periodName}
• Cutoff Dates:    ${period.startDate} to ${period.endDate}
• Release Date:    ${period.payDate}

${subDivider}
EARNINGS BREAKDOWN:
• Regular Duty (${record.regularDays} days):                 PHP ${formatPayslipAmount(record.regularPay)}
• Regular Overtime (${record.regOvertimeHrs} hrs):              PHP ${formatPayslipAmount(record.regOvertimePay)}
• Night Shift Diff (${record.regNightDiffDays} days):             PHP ${formatPayslipAmount(record.regNightDiffPay)}
• Rest Day Duty (${record.restDays} days):                  PHP ${formatPayslipAmount(record.restDayPay)}
• Rest Day Overtime (${record.restdayOtHrs} hrs):             PHP ${formatPayslipAmount(record.restdayOtPay)}
• Holiday Duty & OT:                          PHP ${formatPayslipAmount(record.legalHolidayPay + record.legalHolidayOtPay)}
• Allowances & Other Earnings:                PHP ${formatPayslipAmount(record.allowance + record.adjustment)}
------------------------------------------------------------
TOTAL GROSS EARNINGS:                         PHP ${formatPayslipAmount(record.grossPay)}

${subDivider}
STATUTORY & AGENCY DEDUCTIONS:
• SSS Contribution:                           PHP ${formatPayslipAmount(record.sssContribution)}
• PhilHealth Premium:                         PHP ${formatPayslipAmount(record.philhealthContribution)}
• Pag-IBIG Fund:                              PHP ${formatPayslipAmount(record.pagibigContribution)}
• Agency Cash Bond:                           PHP ${formatPayslipAmount(record.cashbond)}
• Loans & Cash Advances:                      PHP ${formatPayslipAmount(record.sssLoanSal + record.pagibigLoanMpl + record.cashAdvances)}
• Withholding Tax:                            PHP ${formatPayslipAmount(record.withholdingTax)}
------------------------------------------------------------
TOTAL DEDUCTIONS:                             PHP ${formatPayslipAmount(record.totalDeductions)}

${divider}
>>> NET TAKE-HOME PAY: PHP ${formatPayslipAmount(record.netPay)} <<<
${divider}

${customNote ? `SPECIAL HR / PAYROLL NOTE:\n${customNote}\n\n` : ''}DOLE D.O. 150-16 COMPLIANCE & VERIFICATION NOTICE:
This is an official electronic pay stub issued by MERZ Security Solutions Agency Inc.
All calculations, overtime premiums, and statutory deductions comply strictly with Republic Act No. 5487
(Private Security Agency Law) and DOLE Department Order No. 150-16.

For payroll concerns, discrepancies, or official verification, please contact the Payroll & Finance
Department at merzagency.2025@gmail.com or visit the Agency Central Office.

(c) ${new Date().getFullYear()} MERZ Security Solutions Agency Inc. All rights reserved.
`.trim();
}

/**
 * Generates an HTML formatted email body
 */
export function generatePayslipEmailHtmlBody(
  employee: Employee,
  record: PayrollRecord,
  period: PayPeriod,
  customNote?: string
): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Official Payslip - ${employee.name}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 20px; background-color: #f1f5f9; color: #0f172a; }
    .container { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #cbd5e1; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background: #0f172a; color: #ffffff; padding: 24px; text-align: left; border-bottom: 3px solid #10b981; }
    .agency-name { font-size: 18px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; margin: 0; color: #ffffff; }
    .sub-head { font-size: 11px; color: #94a3b8; margin-top: 4px; line-height: 1.4; }
    .badge { display: inline-block; background: #10b981; color: #ffffff; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 9999px; text-transform: uppercase; margin-top: 8px; }
    .body { padding: 24px; }
    .emp-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-bottom: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 12px; }
    .emp-card div span.label { display: block; font-size: 10px; text-transform: uppercase; font-weight: 700; color: #64748b; }
    .emp-card div span.val { font-weight: 600; color: #0f172a; }
    .section-title { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #334155; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin-top: 18px; margin-bottom: 10px; }
    table.data-table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 12px; }
    table.data-table td { padding: 6px 8px; border-bottom: 1px solid #f1f5f9; }
    table.data-table td.amount { text-align: right; font-family: monospace; font-weight: 600; }
    table.data-table tr.total-row td { font-weight: 700; background: #f8fafc; border-top: 1px solid #cbd5e1; border-bottom: 1px solid #cbd5e1; }
    .net-box { background: #ecfdf5; border: 2px solid #10b981; border-radius: 8px; padding: 16px; text-align: center; margin: 20px 0; }
    .net-title { font-size: 11px; text-transform: uppercase; font-weight: 800; letter-spacing: 1px; color: #065f46; margin: 0; }
    .net-amount { font-size: 26px; font-weight: 900; font-family: monospace; color: #047857; margin: 6px 0 0 0; }
    .note-box { background: #fffbeb; border-left: 4px solid #f59e0b; padding: 12px; font-size: 12px; color: #92400e; margin-bottom: 20px; border-radius: 0 6px 6px 0; }
    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 24px; font-size: 11px; color: #64748b; line-height: 1.5; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="agency-name">MERZ Security Solutions Agency Inc.</h1>
      <div class="sub-head">
        DOLE D.O. 150-16 Registered Private Security Agency &bull; PNP-SOSIA PSA-NCR-2024-0812<br>
        Unit 402 Emerald Bldg., F. Ortigas Jr. Ave., Pasig City &bull; (02) 8632-9100
      </div>
      <div class="badge">Official Electronic Payslip</div>
    </div>
    <div class="body">
      <div class="emp-card">
        <div>
          <span class="label">Security Personnel</span>
          <span class="val">${employee.name}</span>
        </div>
        <div>
          <span class="label">Agency ID / Badge</span>
          <span class="val">${employee.employeeCode}</span>
        </div>
        <div>
          <span class="label">Client Detachment</span>
          <span class="val">[${employee.clientCode}] ${employee.clientName}</span>
        </div>
        <div>
          <span class="label">Payroll Period</span>
          <span class="val">${period.periodName}</span>
        </div>
        <div>
          <span class="label">Disbursement Channel</span>
          <span class="val">${employee.bankName} (${employee.accountNumberMask})</span>
        </div>
        <div>
          <span class="label">Daily Base Rate</span>
          <span class="val">PHP ${employee.dailyRate.toFixed(2)}</span>
        </div>
      </div>

      ${customNote ? `<div class="note-box"><strong>HR Note:</strong> ${customNote}</div>` : ''}

      <div class="section-title">Earnings Breakdown</div>
      <table class="data-table">
        <tr><td>Regular Duty (${record.regularDays} days)</td><td class="amount">PHP ${formatPayslipAmount(record.regularPay)}</td></tr>
        <tr><td>Regular Overtime (${record.regOvertimeHrs} hrs)</td><td class="amount">PHP ${formatPayslipAmount(record.regOvertimePay)}</td></tr>
        <tr><td>Night Shift Differential (${record.regNightDiffDays} days)</td><td class="amount">PHP ${formatPayslipAmount(record.regNightDiffPay)}</td></tr>
        ${record.restDayPay > 0 ? `<tr><td>Rest Day Duty (${record.restDays} days)</td><td class="amount">PHP ${formatPayslipAmount(record.restDayPay)}</td></tr>` : ''}
        ${record.restdayOtPay > 0 ? `<tr><td>Rest Day Overtime (${record.restdayOtHrs} hrs)</td><td class="amount">PHP ${formatPayslipAmount(record.restdayOtPay)}</td></tr>` : ''}
        ${record.legalHolidayPay + record.legalHolidayOtPay > 0 ? `<tr><td>Holiday Duty & OT</td><td class="amount">PHP ${formatPayslipAmount(record.legalHolidayPay + record.legalHolidayOtPay)}</td></tr>` : ''}
        ${record.allowance + record.adjustment > 0 ? `<tr><td>Allowances & Adjustments</td><td class="amount">PHP ${formatPayslipAmount(record.allowance + record.adjustment)}</td></tr>` : ''}
        <tr class="total-row"><td>TOTAL GROSS EARNINGS</td><td class="amount">PHP ${formatPayslipAmount(record.grossPay)}</td></tr>
      </table>

      <div class="section-title">Statutory & Agency Deductions</div>
      <table class="data-table">
        <tr><td>SSS Employee Contribution</td><td class="amount">PHP ${formatPayslipAmount(record.sssContribution)}</td></tr>
        <tr><td>PhilHealth Premium</td><td class="amount">PHP ${formatPayslipAmount(record.philhealthContribution)}</td></tr>
        <tr><td>Pag-IBIG Fund (HDMF)</td><td class="amount">PHP ${formatPayslipAmount(record.pagibigContribution)}</td></tr>
        ${record.cashbond > 0 ? `<tr><td>Agency Cash Bond</td><td class="amount">PHP ${formatPayslipAmount(record.cashbond)}</td></tr>` : ''}
        ${record.sssLoanSal + record.pagibigLoanMpl + record.cashAdvances > 0 ? `<tr><td>Loans / Cash Advances</td><td class="amount">PHP ${formatPayslipAmount(record.sssLoanSal + record.pagibigLoanMpl + record.cashAdvances)}</td></tr>` : ''}
        ${record.withholdingTax > 0 ? `<tr><td>Withholding Tax</td><td class="amount">PHP ${formatPayslipAmount(record.withholdingTax)}</td></tr>` : ''}
        <tr class="total-row"><td>TOTAL DEDUCTIONS</td><td class="amount">PHP ${formatPayslipAmount(record.totalDeductions)}</td></tr>
      </table>

      <div class="net-box">
        <div class="net-title">Total Net Take-Home Pay</div>
        <div class="net-amount">PHP ${formatPayslipAmount(record.netPay)}</div>
        <div style="font-size: 11px; color: #047857; margin-top: 4px;">Direct credited to ${employee.bankName} ${employee.accountNumberMask}</div>
      </div>
    </div>
    <div class="footer">
      <strong>DOLE D.O. 150-16 Compliance Notice:</strong> This official electronic payslip was generated for ${employee.name}.
      For any questions or payroll discrepancies, please contact <a href="mailto:merzagency.2025@gmail.com" style="color: #047857;">merzagency.2025@gmail.com</a>.<br>
      &copy; ${new Date().getFullYear()} MERZ Security Solutions Agency Inc. All rights reserved.
    </div>
  </div>
</body>
</html>`;
}

/**
 * Creates a mailto link with encoded subject and body
 */
export function generateMailtoUrl(to: string, cc: string, subject: string, body: string): string {
  const params: string[] = [];
  if (cc && cc.trim()) params.push(`cc=${encodeURIComponent(cc.trim())}`);
  if (subject && subject.trim()) params.push(`subject=${encodeURIComponent(subject.trim())}`);
  if (body && body.trim()) params.push(`body=${encodeURIComponent(body.trim())}`);

  const queryString = params.length > 0 ? `?${params.join('&')}` : '';
  return `mailto:${encodeURIComponent(to.trim())}${queryString}`;
}

/**
 * Generates and downloads a standard RFC-822 .eml file
 */
export function downloadEmailAsEml(
  filename: string,
  to: string,
  cc: string,
  subject: string,
  htmlBody: string,
  textBody: string
): void {
  const boundary = `----=_Part_${Date.now()}`;
  const dateStr = new Date().toUTCString();

  const emlContent = [
    `From: "MERZ Security Solutions Agency Payroll" <merzagency.2025@gmail.com>`,
    `To: ${to}`,
    cc ? `Cc: ${cc}` : '',
    `Date: ${dateStr}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    `Content-Type: text/plain; charset=UTF-8`,
    `Content-Transfer-Encoding: 8bit`,
    '',
    textBody,
    '',
    `--${boundary}`,
    `Content-Type: text/html; charset=UTF-8`,
    `Content-Transfer-Encoding: 8bit`,
    '',
    htmlBody,
    '',
    `--${boundary}--`,
  ]
    .filter((line) => line !== undefined)
    .join('\r\n');

  const blob = new Blob([emlContent], { type: 'message/rfc822' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.eml') ? filename : `${filename}.eml`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
