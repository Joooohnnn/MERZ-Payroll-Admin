import React from 'react';
import { Employee, PayrollRecord, PayPeriod } from '../types/payroll';
import { formatPayslipAmount } from '../utils/payrollCalculator';

interface OfficialPayslipSheetProps {
  employee: Employee;
  record: PayrollRecord;
  period: PayPeriod;
}

import { MerzAgencyLogo } from './MerzAgencyLogoDynamic';
export { MerzAgencyLogo };

export const OfficialPayslipSheet: React.FC<OfficialPayslipSheetProps> = ({
  employee,
  record,
  period,
}) => {
  return (
    <div
      id="printable-payslip"
      className="bg-white text-slate-900 font-sans text-xs border border-black p-3.5 shadow-sm select-text w-full max-w-[1020px] mx-auto overflow-hidden print:border-black print:p-2 print:shadow-none print:max-w-none print:w-full"
    >
      {/* Main 2-column layout matching the photo: Left (Receiving Copy) & Right (Main Slip) */}
      <div className="grid grid-cols-12 gap-3.5 border border-black p-3 bg-white">
        
        {/* ============================================================ */}
        {/* LEFT COLUMN: RECEIVING COPY (cols 1 to 4)                      */}
        {/* ============================================================ */}
        <div className="col-span-4 flex flex-col justify-between border-r-2 border-black pr-3">
          <div>
            {/* Left Header with Agency Badge and Address */}
            <div className="flex items-center gap-2 pb-2 mb-2 border-b border-black">
              <MerzAgencyLogo size="w-12 h-12" />
              <div className="text-[8.5px] leading-tight text-slate-900">
                <h2 className="text-[11.5px] font-extrabold tracking-tight font-serif">
                  MERZ Security Solutions Agency Inc.
                </h2>
                <p className="text-[7.5px] text-slate-800 font-normal leading-[1.2] mt-0.5">
                  <strong>NCR Address:</strong> 11th Floor, Shuta Sky Tower, Nicolas Zamora St., Tondo, Manila, 1012 Metro Manila<br />
                  <strong>Provincial Address:</strong> Donyor Farm, Quipot San Juan, San Juan Batangas<br />
                  <strong>Email:</strong> merzagency.2025@gmail.com | <strong>Contact Num:</strong> 09948122481
                </p>
              </div>
            </div>

            {/* Receiving Copy Title Bar */}
            <div className="border border-black py-0.5 text-center font-bold text-[11px] bg-slate-100 mb-1 tracking-wide">
              Receiving Copy
            </div>

            {/* Receiving Copy Metadata Table */}
            <table className="w-full border-collapse border border-black text-[10.5px] mb-3">
              <tbody>
                <tr className="border-b border-black">
                  <td className="border-r border-black px-2 py-1 font-semibold w-[38%] bg-slate-50">Name:</td>
                  <td className="px-2 py-1 font-bold text-center">{employee.name}</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="border-r border-black px-2 py-1 font-semibold bg-slate-50">Employee number:</td>
                  <td className="px-2 py-1 font-bold text-center font-mono">{employee.employeeCode}</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="border-r border-black px-2 py-1 font-semibold bg-slate-50">Total Net Pay:</td>
                  <td className="px-2 py-1 font-extrabold text-center font-mono text-[11.5px]">
                    {formatPayslipAmount(record.netPay)}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Signature Box */}
            <div className="border border-black p-2 mt-4 text-center">
              <div className="h-28 flex items-end justify-center pb-1">
                <div className="w-full border-t border-black pt-1">
                  <span className="text-[10px] font-semibold text-slate-800 italic block">
                    Name Over Printed and Signature
                  </span>
                </div>
              </div>
            </div>

            {/* Client / Post Assignment */}
            <div className="mt-3 border border-black divide-y divide-black text-[10.5px]">
              <div className="px-2 py-1 font-bold">
                Client Code: <span className="font-mono">{employee.clientCode}</span>
              </div>
              <div className="px-2 py-1 font-bold text-slate-900">
                {employee.clientName}
              </div>
            </div>
          </div>

          {/* Page Indicator */}
          <div className="text-center text-[9px] text-slate-500 font-mono pt-3">
            Page 1
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: MAIN PAYSLIP (cols 5 to 12)                    */}
        {/* ============================================================ */}
        <div className="col-span-8 flex flex-col justify-between pl-1">
          <div>
            {/* Right Header with Agency Badge and Address */}
            <div className="flex items-center gap-2 pb-2 mb-2 border-b border-black">
              <MerzAgencyLogo size="w-12 h-12" />
              <div className="text-[9px] leading-tight text-slate-900">
                <h2 className="text-[13px] font-extrabold tracking-tight font-serif">
                  MERZ Security Solutions Agency Inc.
                </h2>
                <p className="text-[8px] text-slate-800 font-normal leading-[1.2] mt-0.5">
                  <strong>NCR Address:</strong> 11th Floor, Shuta Sky Tower, Nicolas Zamora St., Tondo, Manila, 1012 Metro Manila<br />
                  <strong>Provincial Address:</strong> Donyor Farm, Quipot San Juan, San Juan Batangas<br />
                  <strong>Email:</strong> merzagency.2025@gmail.com | <strong>Contact Num:</strong> 09948122481
                </p>
              </div>
            </div>

            {/* Employee Information Header Bar */}
            <div className="border border-black mb-1">
              <div className="grid grid-cols-12 border-b border-black text-[10.5px]">
                <div className="col-span-7 border-r border-black px-2 py-0.5 flex items-center">
                  <span className="font-semibold">Name:&nbsp;</span>
                  <span className="font-bold text-slate-950">{employee.name}</span>
                </div>
                <div className="col-span-5 px-2 py-0.5 flex items-center">
                  <span className="font-semibold">Payroll Period:&nbsp;</span>
                  <span className="font-bold">{period.periodName}</span>
                </div>
              </div>

              <div className="grid grid-cols-12 text-[10.5px] border-b border-black">
                <div className="col-span-7 border-r border-black px-2 py-0.5 flex items-center">
                  <span className="font-semibold">Employee No.:&nbsp;</span>
                  <span className="font-bold text-red-600 font-mono tracking-wide">
                    {employee.employeeCode}
                  </span>
                </div>
                <div className="col-span-5 px-2 py-0.5 flex items-center">
                  <span className="font-semibold">Position:&nbsp;</span>
                  <span className="font-bold">{employee.role}</span>
                </div>
              </div>

              {/* Statutory Numbers DOLE Sub-Bar */}
              <div className="grid grid-cols-4 text-[8.5px] bg-slate-50/70 font-mono divide-x divide-black">
                <div className="px-1.5 py-0.5 truncate">
                  <span className="font-sans font-bold text-slate-800">SSS:</span> {employee.sssNumber || '—'}
                </div>
                <div className="px-1.5 py-0.5 truncate">
                  <span className="font-sans font-bold text-slate-800">PhilHealth:</span> {employee.philhealthNumber || '—'}
                </div>
                <div className="px-1.5 py-0.5 truncate">
                  <span className="font-sans font-bold text-slate-800">TIN:</span> {employee.tinNumber || '—'}
                </div>
                <div className="px-1.5 py-0.5 truncate">
                  <span className="font-sans font-bold text-slate-800">Pag-IBIG:</span> {employee.pagibigNumber || '—'}
                </div>
              </div>
            </div>

            {/* Main Earnings & Deductions Table */}
            <table className="w-full border-collapse border border-black text-[10.5px]">
              <thead>
                <tr className="border-b border-black text-center font-bold bg-slate-100">
                  <th className="border-r border-black px-2 py-0.5 text-left w-[36%] font-extrabold">
                    EARNINGS
                  </th>
                  <th className="border-r border-black px-1 py-0.5 w-[10%] font-bold">
                    
                  </th>
                  <th className="border-r border-black px-2 py-0.5 text-right w-[18%] font-extrabold">
                    AMOUNT
                  </th>
                  <th className="border-r border-black px-2 py-0.5 text-left w-[22%] font-extrabold">
                    DEDUCTIONS
                  </th>
                  <th className="px-2 py-0.5 text-right w-[14%] font-extrabold">
                    AMOUNT
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/30">
                {/* 1. Regular Days & SSS */}
                <tr>
                  <td className="border-r border-black px-2 py-0.5">Regular Days</td>
                  <td className="border-r border-black px-1 py-0.5 text-center font-mono">
                    {record.regularDays > 0 ? record.regularDays : ''}
                  </td>
                  <td className="border-r border-black px-2 py-0.5 text-right font-mono font-medium">
                    {formatPayslipAmount(record.regularPay)}
                  </td>
                  <td className="border-r border-black px-2 py-0.5">SSS Contribution</td>
                  <td className="px-2 py-0.5 text-right font-mono">
                    {formatPayslipAmount(record.sssContribution)}
                  </td>
                </tr>

                {/* 2. Reg Overtime & Philhealth */}
                <tr>
                  <td className="border-r border-black px-2 py-0.5">Reg Overtime</td>
                  <td className="border-r border-black px-1 py-0.5 text-center font-mono">
                    {record.regOvertimeHrs > 0 ? record.regOvertimeHrs : ''}
                  </td>
                  <td className="border-r border-black px-2 py-0.5 text-right font-mono font-medium">
                    {formatPayslipAmount(record.regOvertimePay)}
                  </td>
                  <td className="border-r border-black px-2 py-0.5">Philhealth Contribution</td>
                  <td className="px-2 py-0.5 text-right font-mono">
                    {formatPayslipAmount(record.philhealthContribution)}
                  </td>
                </tr>

                {/* 3. Reg Night Diff & Pagibig */}
                <tr>
                  <td className="border-r border-black px-2 py-0.5">Reg Night Diff</td>
                  <td className="border-r border-black px-1 py-0.5 text-center font-mono">
                    {record.regNightDiffDays > 0 ? record.regNightDiffDays : ''}
                  </td>
                  <td className="border-r border-black px-2 py-0.5 text-right font-mono font-medium">
                    {formatPayslipAmount(record.regNightDiffPay)}
                  </td>
                  <td className="border-r border-black px-2 py-0.5">Pagibig Contribution</td>
                  <td className="px-2 py-0.5 text-right font-mono">
                    {formatPayslipAmount(record.pagibigContribution)}
                  </td>
                </tr>

                {/* 4. Rest Day & Cashbond */}
                <tr>
                  <td className="border-r border-black px-2 py-0.5">Rest Day</td>
                  <td className="border-r border-black px-1 py-0.5 text-center font-mono">
                    {record.restDays}
                  </td>
                  <td className="border-r border-black px-2 py-0.5 text-right font-mono">
                    {formatPayslipAmount(record.restDayPay)}
                  </td>
                  <td className="border-r border-black px-2 py-0.5 font-medium">Cashbond</td>
                  <td className="px-2 py-0.5 text-right font-mono font-medium">
                    {formatPayslipAmount(record.cashbond)}
                  </td>
                </tr>

                {/* 5. Restday OT Hrs. & SSS Loan-SAL */}
                <tr>
                  <td className="border-r border-black px-2 py-0.5">Restday OT Hrs.</td>
                  <td className="border-r border-black px-1 py-0.5 text-center font-mono">
                    {record.restdayOtHrs}
                  </td>
                  <td className="border-r border-black px-2 py-0.5 text-right font-mono">
                    {formatPayslipAmount(record.restdayOtPay)}
                  </td>
                  <td className="border-r border-black px-2 py-0.5">SSS Loan-SAL</td>
                  <td className="px-2 py-0.5 text-right font-mono">
                    {formatPayslipAmount(record.sssLoanSal)}
                  </td>
                </tr>

                {/* 6. Restday Night Diff Days & Pagibig Loan MPL */}
                <tr>
                  <td className="border-r border-black px-2 py-0.5">Restday Night Diff Days</td>
                  <td className="border-r border-black px-1 py-0.5 text-center font-mono">
                    {record.restdayNightDiffDays}
                  </td>
                  <td className="border-r border-black px-2 py-0.5 text-right font-mono">
                    {formatPayslipAmount(record.restdayNightDiffPay)}
                  </td>
                  <td className="border-r border-black px-2 py-0.5">Pagibig Loan MPL</td>
                  <td className="px-2 py-0.5 text-right font-mono">
                    {formatPayslipAmount(record.pagibigLoanMpl)}
                  </td>
                </tr>

                {/* 7. Legal Holiday & Pagibig Loan CAL */}
                <tr>
                  <td className="border-r border-black px-2 py-0.5">Legal Holiday</td>
                  <td className="border-r border-black px-1 py-0.5 text-center font-mono">
                    {record.legalHolidays}
                  </td>
                  <td className="border-r border-black px-2 py-0.5 text-right font-mono">
                    {formatPayslipAmount(record.legalHolidayPay)}
                  </td>
                  <td className="border-r border-black px-2 py-0.5">Pagibig Loan CAL</td>
                  <td className="px-2 py-0.5 text-right font-mono">
                    {formatPayslipAmount(record.pagibigLoanCal)}
                  </td>
                </tr>

                {/* 8. Legal Holiday Overtime Hrs. & Withholding Tax */}
                <tr>
                  <td className="border-r border-black px-2 py-0.5">Legal Holiday Overtime Hrs.</td>
                  <td className="border-r border-black px-1 py-0.5 text-center font-mono">
                    {record.legalHolidayOtHrs}
                  </td>
                  <td className="border-r border-black px-2 py-0.5 text-right font-mono">
                    {formatPayslipAmount(record.legalHolidayOtPay)}
                  </td>
                  <td className="border-r border-black px-2 py-0.5">Withholding Tax</td>
                  <td className="px-2 py-0.5 text-right font-mono">
                    {formatPayslipAmount(record.withholdingTax)}
                  </td>
                </tr>

                {/* 9. Legal Holiday Night Diff Days & Cash Advances */}
                <tr>
                  <td className="border-r border-black px-2 py-0.5">Legal Holiday Night Diff Days</td>
                  <td className="border-r border-black px-1 py-0.5 text-center font-mono">
                    {record.legalHolidayNightDiffDays}
                  </td>
                  <td className="border-r border-black px-2 py-0.5 text-right font-mono">
                    {formatPayslipAmount(record.legalHolidayNightDiffPay)}
                  </td>
                  <td className="border-r border-black px-2 py-0.5">Cash Advances</td>
                  <td className="px-2 py-0.5 text-right font-mono">
                    {formatPayslipAmount(record.cashAdvances)}
                  </td>
                </tr>

                {/* Blank line for visual spacing matching the original document */}
                <tr>
                  <td className="border-r border-black px-2 py-1 h-5"></td>
                  <td className="border-r border-black px-1 py-1"></td>
                  <td className="border-r border-black px-2 py-1"></td>
                  <td className="border-r border-black px-2 py-1"></td>
                  <td className="px-2 py-1"></td>
                </tr>

                {/* 10. SIL */}
                <tr>
                  <td className="border-r border-black px-2 py-0.5 font-medium">SIL</td>
                  <td className="border-r border-black px-1 py-0.5 text-center font-mono">
                    {record.silDays > 0 ? record.silDays : ''}
                  </td>
                  <td className="border-r border-black px-2 py-0.5 text-right font-mono">
                    {formatPayslipAmount(record.silPay)}
                  </td>
                  <td className="border-r border-black px-2 py-0.5"></td>
                  <td className="px-2 py-0.5 text-right font-mono"></td>
                </tr>

                {/* 11. Allowance */}
                <tr>
                  <td className="border-r border-black px-2 py-0.5 font-medium">Allowance</td>
                  <td className="border-r border-black px-1 py-0.5"></td>
                  <td className="border-r border-black px-2 py-0.5 text-right font-mono font-medium">
                    {formatPayslipAmount(record.allowance)}
                  </td>
                  <td className="border-r border-black px-2 py-0.5"></td>
                  <td className="px-2 py-0.5 text-right font-mono"></td>
                </tr>

                {/* 12. Adjustment */}
                <tr>
                  <td className="border-r border-black px-2 py-0.5 font-medium">Adjustment</td>
                  <td className="border-r border-black px-1 py-0.5"></td>
                  <td className="border-r border-black px-2 py-0.5 text-right font-mono">
                    {formatPayslipAmount(record.adjustment)}
                  </td>
                  <td className="border-r border-black px-2 py-0.5"></td>
                  <td className="px-2 py-0.5 text-right font-mono"></td>
                </tr>

                {/* Gross Pay & Total Deduction Row */}
                <tr className="border-t-2 border-black font-extrabold">
                  <td className="border-r border-black px-2 py-1 text-left font-black text-[11.5px]">
                    Gross Pay
                  </td>
                  <td className="border-r border-black px-1 py-1"></td>
                  <td className="border-r border-black px-2 py-1 text-right font-mono font-bold text-[11.5px]">
                    {formatPayslipAmount(record.grossPay)}
                  </td>
                  <td className="border-r border-black px-2 py-1 text-left font-black text-[11.5px]">
                    Total Deduction
                  </td>
                  <td className="px-2 py-1 text-right font-mono font-bold text-[11.5px]">
                    {formatPayslipAmount(record.totalDeductions)}
                  </td>
                </tr>

                {/* Total Earnings Summary Row */}
                <tr className="border-t border-black font-semibold">
                  <td colSpan={4} className="border-r border-black px-2 py-0.5 text-left">
                    Total Earnings
                  </td>
                  <td className="px-2 py-0.5 text-right font-mono font-bold">
                    {formatPayslipAmount(record.grossPay)}
                  </td>
                </tr>

                {/* Less: Total Deductions Row */}
                <tr className="border-t border-black text-slate-800">
                  <td colSpan={4} className="border-r border-black px-2 py-0.5 text-left">
                    Less: <span className="italic">Total Deductions</span>
                  </td>
                  <td className="px-2 py-0.5 text-right font-mono font-medium">
                    {formatPayslipAmount(record.totalDeductions)}
                  </td>
                </tr>

                {/* NET PAY Row */}
                <tr className="border-t-2 border-black font-black text-[12.5px] bg-slate-100">
                  <td colSpan={4} className="border-r border-black px-2 py-1 text-left">
                    NET PAY
                  </td>
                  <td className="px-2 py-1 text-right font-mono font-black text-[12.5px]">
                    {formatPayslipAmount(record.netPay)}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Bottom Full-Width Client Code Bar */}
            <div className="border border-black border-t-0 py-1 px-3 text-center font-extrabold text-[11.5px] bg-slate-100 tracking-wide">
              Client Code: {employee.clientCode} – {employee.clientName.replace('FOPM - ', '')}
            </div>
          </div>

          {/* Page Indicator */}
          <div className="text-center text-[9px] text-slate-500 font-mono pt-3">
            Page 1
          </div>
        </div>

      </div>
    </div>
  );
};
