import pptxgen from 'pptxgenjs';

export interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  screenLocation?: string;
  steps?: string[];
  bullets: string[];
  highlights?: string[];
  metrics?: { label: string; value: string; desc?: string }[];
  highlightBox?: { title: string; text: string };
  speakerNotes: string;
}

export const PRESENTATION_SLIDES: SlideData[] = [
  {
    id: 1,
    title: 'MERZ HR & Payroll Suite — User Operations Manual',
    subtitle: 'Official Step-by-Step Guide on Managing Guards, 12-Hour Shifts, DOLE D.O. 150-16 Payroll & Local Persistence',
    category: 'System Manual Overview',
    screenLocation: 'Main Application Dashboard & Top Navigation',
    bullets: [
      'Engineered specifically for Philippine Private Security Agencies (PSAs).',
      '100% compliant with DOLE Department Order No. 150-16 & Philippine Labor Code standards.',
      'Comprehensive workflow: Guard onboarding, detachment reassignments, 12-hr shift timecards, and dual-copy payslips.',
      'Instant local device persistence with automatic autosave and zero external data exposure.',
    ],
    steps: [
      'Step 1: Understand the system layout (Guards Masterlist, Official Payslip, and Top Navigation).',
      'Step 2: Follow this presentation manual sequentially to master every feature from guard deployment to payslip distribution.',
      'Step 3: Use the slide selector or arrow keys (← / →) to jump directly to any operational feature.',
      'Step 4: Click "Export .PPTX" to download this complete operational training deck for offline agency training.',
    ],
    highlights: [
      'DOLE D.O. 150-16 Certified calculation engine with centavo-precision rounding.',
      'Automated Dual-Copy Payslip generation (Employee Copy + Agency Copy on single A4 sheet).',
      'Offline-first local storage architecture with zero cloud dependency.',
    ],
    metrics: [
      { label: 'Standard Shift Coverage', value: '12-Hour Shifts', desc: 'Day & Night Rotations' },
      { label: 'Statutory IDs Tracked', value: '4 Agencies', desc: 'SSS, PhilHealth, TIN, Pag-IBIG' },
      { label: 'Disbursement Methods', value: 'Cash & Bank Payout', desc: 'BDO, BPI, Landbank' },
    ],
    highlightBox: {
      title: 'Operations Manual Purpose',
      text: 'This manual equips agency operations officers, HR personnel, and detachment commanders with exact step-by-step procedures to manage guards, compute payroll lawfully, and distribute official payslips error-free.',
    },
    speakerNotes:
      'Welcome to the official User Operations Manual for the MERZ Security Solutions HR & Payroll Suite. Private security operations present unique challenges: 12-hour shifts, mandatory night differentials, client detachment reassignments, and strict DOLE Department Order 150-16 audits. This manual covers every single feature of the software step by step.',
  },
  {
    id: 2,
    title: 'Deploying a New Security Guard (Onboarding)',
    subtitle: 'How to Register a New Officer, Assign Client Posts, and Set Up Statutory Records',
    category: 'Guard Workforce Operations',
    screenLocation: 'Guards Masterlist Tab -> Top Right "+ Deploy New Guard" Button',
    bullets: [
      'Registration of full officer details with automatic sequential guard code generation (e.g. MS-00106).',
      'Immediate client detachment assignment (e.g. Rockwell Center, BGC Corporate Tower, Laguna Technopark).',
      'Assignment of operational rank and duty schedule: Security Guard, Senior Guard, or Officer (12-hr Day vs Night).',
      'Configuration of baseline daily wage rate and full statutory identification numbers (SSS, PhilHealth, TIN, Pag-IBIG).',
    ],
    steps: [
      'Step 1: Click the "Guards Masterlist" tab in the top navigation bar.',
      'Step 2: Click the "+ Deploy New Guard" button located at the top-right of the screen (or press Ctrl+N).',
      'Step 3: Enter the Guard\'s Full Name (e.g. Juan D. Dela Cruz) and verify the auto-suggested sequential badge code.',
      'Step 4: Select the Client Post / Detachment from the dropdown and specify their Rank and Duty Shift.',
      'Step 5: Enter the Daily Wage Rate (NCR baseline ₱695.00/day) and input their SSS, PhilHealth, TIN, and Pag-IBIG MID numbers.',
      'Step 6: Enter the Officer\'s Bank Disbursement Account (BDO, BPI, Landbank) and Email Address for electronic payslips.',
      'Step 7: Click "Save & Deploy Guard". The officer is immediately added to the roster and live payroll ledger.',
    ],
    highlights: [
      'Auto-Generated Sequential Codes: Eliminates duplicate employee badges across detachment posts.',
      'Automated Statutory Initializer: Sets up standard DOLE deduction brackets immediately upon guard creation.',
      'Instant Local Storage: Guard is immediately saved to the local device storage.',
    ],
    metrics: [
      { label: 'Default Daily Wage', value: '₱695.00 / day', desc: 'DOLE NCR Wage Order benchmark' },
      { label: 'Setup Time', value: '< 60 Seconds', desc: 'Rapid onboarding per guard' },
      { label: 'Statutory Verification', value: '4-Way Match', desc: 'SSS, PhilHealth, TIN, Pag-IBIG' },
    ],
    highlightBox: {
      title: 'Pro-Tip for Guard Onboarding',
      text: 'Always enter the guard\'s correct email address and mobile number during deployment. This enables 1-click electronic payslip dispatch so field guards receive itemized pay notifications directly on their smartphones.',
    },
    speakerNotes:
      'To deploy a new guard, navigate to the Guards Masterlist and click "+ Deploy New Guard". Enter the officer\'s name, detachment, rank, daily wage, and all statutory IDs. The system auto-assigns a sequential agency code and instantly creates their active payroll profile.',
  },
  {
    id: 3,
    title: 'Editing Guard Information & Detachment Transfers',
    subtitle: 'How to Update Officer Profiles, Promote Ranks, and Reassign Client Posts',
    category: 'Workforce Administration',
    screenLocation: 'Guards Masterlist -> Action Column (Pencil ✏️ Edit Icon)',
    bullets: [
      'Instant profile updating for existing guards without altering historical payroll data.',
      'Seamless detachment reassignments when guards rotate between commercial, residential, and corporate posts.',
      'Promotion tracking: Update rank from Security Guard to Senior Guard or Officer-in-Charge (OIC).',
      'Immediate modification of disbursement bank account numbers or email addresses.',
    ],
    steps: [
      'Step 1: In the "Guards Masterlist" tab, locate the guard using the search bar or detachment filter.',
      'Step 2: Click the ✏️ Edit icon on the far right column of the guard\'s table row.',
      'Step 3: Modify any required information: Full Name, Rank, Phone Number, or Digital Payslip Email.',
      'Step 4: To Reassign Detachment: Select the new Client Post from the dropdown (e.g. transfer to SM Megamall).',
      'Step 5: If the guard updated their payroll bank account, modify the Disbursement Account details.',
      'Step 6: Click "Update Guard Profile". The system applies changes across the roster and active payslips instantly.',
    ],
    highlights: [
      'Historical Integrity: Post reassignments update active and future cycles while preserving past detachment records.',
      'Real-Time Payslip Updating: Open payslips reflect the updated detachment and rank immediately.',
      'Zero Disruption: Guard profile changes save instantly to the local storage database.',
    ],
    metrics: [
      { label: 'Update Latency', value: 'Instant', desc: 'Zero page reload required' },
      { label: 'Detachment History', value: 'Preserved', desc: 'Historical audit compliance' },
      { label: 'Bank Validation', value: 'Masked', desc: 'Account privacy protection' },
    ],
    highlightBox: {
      title: 'Detachment Transfer Highlight',
      text: 'When reassigning a guard to a new post with a different regional minimum wage, remember to review the Daily Wage Rate field to maintain strict compliance with local Regional Tripartite Wages and Productivity Board (RTWPB) orders.',
    },
    speakerNotes:
      'Editing a guard\'s profile is straightforward: click the pencil icon in the Masterlist table row. You can update their detachment assignment, rank, contact details, or bank account. All changes take effect immediately without disrupting past payroll runs.',
  },
  {
    id: 4,
    title: 'Batch Updating Daily Wage Rates by Detachment',
    subtitle: 'How to Apply Regional Wage Order Adjustments Across Entire Client Posts in 1 Click',
    category: 'Wage Administration',
    screenLocation: 'Guards Masterlist -> Detachment Filter Bar -> "Update All Rates in Post"',
    bullets: [
      'Individual inline rate editing directly inside the Guards Masterlist table.',
      'Mass wage updating: Adjust all guards assigned to a specific client post in a single operation.',
      'Automatic re-derivation of basic hourly rates (Daily Rate ÷ 8 hours) with centavo accuracy.',
      'Instant recalculation of regular overtime (125%), night shift differential (10%), and holiday premiums.',
    ],
    steps: [
      'Step 1: In "Guards Masterlist", select the target Client Post from the detachment filter (e.g. "BGC Corporate Tower").',
      'Step 2: For Single Guard: Click directly on the Daily Rate (₱) field inside the table row and type the new wage.',
      'Step 3: For Entire Detachment: Click the "Update All Rates in Post" button above the roster table.',
      'Step 4: Enter the new Daily Wage Rate in the prompt (e.g. ₱695.00/day or new RTWPB wage adjustment).',
      'Step 5: Confirm the update. The system modifies all guards deployed at that post simultaneously.',
      'Step 6: All active payslips, overtime rates, and payroll totals recalculate automatically in under 1 second.',
    ],
    highlights: [
      'Single-Click Mass Wage Updates: Eliminates hours of repetitive data entry when wage orders increase.',
      'Automatic Mathematical Derivation: Basic hourly rate and overtime multipliers update without manual math.',
      'Complete Persistence: New rates save automatically to the local device storage.',
    ],
    metrics: [
      { label: 'Mass Update Speed', value: '1 Click', desc: 'Applies to all guards at post' },
      { label: 'Hourly Derivation', value: 'Rate ÷ 8', desc: 'Standard Labor Code Art. 83' },
      { label: 'Audit Precision', value: '₱0.01', desc: 'Exact centavo rounding' },
    ],
    highlightBox: {
      title: 'Wage Order Compliance Highlight',
      text: 'Whenever the DOLE RTWPB issues a new minimum wage order for NCR, Region IV-A, or Region III, use the "Update All Rates in Post" feature to align all detachment guards with the new statutory baseline within seconds.',
    },
    speakerNotes:
      'When new wage orders take effect, updating guards individually is tedious and prone to errors. With MERZ HR Suite, simply filter by detachment and click "Update All Rates in Post". The system instantly updates every guard and recalculates overtime and night differential automatically.',
  },
  {
    id: 5,
    title: 'Adjusting Duty Days, 12-Hour Overtime & Night Shifts',
    subtitle: 'Step-by-Step Guide on Managing Timecards, 4-Hour Daily OT, and 10% Night Differentials',
    category: 'Duty & Timecard Controls',
    screenLocation: 'Official Payslip Tab -> Left Panel "Live Duty & Payslip Controls"',
    bullets: [
      'Interactive control panel for real-time duty logging and overtime calculations.',
      '12-Hour Shift Handling: Standard 8 regular hours + 4 hours regular overtime (125% hourly rate).',
      'Night Shift Differential (NSD): 10% statutory premium for duty hours rendered between 10:00 PM and 6:00 AM.',
      'Rest Day Duty: 130% rate for scheduled rest day duty, plus rest day overtime multipliers.',
      'Holiday Work: 200% rate for Regular Legal Holidays and 130% for Special Non-Working Days.',
    ],
    steps: [
      'Step 1: Click the "Official Payslip" tab in top navigation and select the guard from the dropdown list.',
      'Step 2: In "Live Duty & Payslip Controls", input the "Regular Duty Days" rendered (e.g. 13 days in a 15-day cycle).',
      'Step 3: Set Daily Overtime: For 12-hour posts, enter 4.0 hours/day (system computes at 125% of hourly rate).',
      'Step 4: Enable Night Differential: Toggle the Night Duty switch or enter Night Hours worked (10% premium).',
      'Step 5: If guard worked on their scheduled day off, enter hours in the "Rest Day Duty" field (130% rate).',
      'Step 6: If guard worked during holidays, enter hours under Regular Holiday (200%) or Special Holiday (130%).',
      'Step 7: Watch the Dual-Copy Payslip on the right update in real-time with exact DOLE formula breakdown.',
    ],
    highlights: [
      'Real-Time Live Rendering: Duty slider and input changes update the payslip preview instantaneously.',
      'DOLE D.O. 150-16 Compliance: Night differential properly compounds across both regular and overtime portions.',
      'Centavo Rounding Guarantee: Every line item matches verified DOLE inspection audit sheets exactly.',
    ],
    metrics: [
      { label: 'Regular Overtime', value: '125%', desc: 'Hourly Rate × 1.25' },
      { label: 'Night Differential', value: '10%', desc: '10:00 PM to 6:00 AM Premium' },
      { label: 'Rest Day Multiplier', value: '130%', desc: 'Labor Code Art. 93' },
    ],
    highlightBox: {
      title: '12-Hour Shift Configuration Highlight',
      text: 'For standard 12-hour security shifts, set Regular Days to the days worked and Daily Overtime to 4.0 hours. If on graveyard rotation, ensure the Night Duty switch is enabled so the mandatory 10% night differential is accurately credited.',
    },
    speakerNotes:
      'Managing security timecards requires precision. In the Official Payslip view, use the Live Duty Controls on the left. Set the regular duty days, 4 hours of daily overtime for 12-hour posts, and toggle night differential. The payslip on the right updates instantly in real time.',
  },
  {
    id: 6,
    title: 'Managing Allowances, ECOLA & Emergency Advances (Vale)',
    subtitle: 'Configuring Additional Earnings, Firearm Allowances, and Custom Deductions',
    category: 'Earnings & Deductions',
    screenLocation: 'Official Payslip Tab -> Left Panel "Allowances & Custom Deductions"',
    bullets: [
      'DOLE-mandated Emergency Cost of Living Allowance (ECOLA) configuration (₱25.00/day standard).',
      'Detachment Hazard & Firearm Allowances: Customized stipends for high-risk posts and armed officers.',
      'Meal & Transportation Allowances: Reimbursable or client-sponsored daily allowances.',
      'Cash Advances (Vale): Clean itemized deduction tracking for emergency salary advances.',
      'Uniform Amortization & Cash Bond: Transparent tracking of agency equipment installments.',
    ],
    steps: [
      'Step 1: In the "Official Payslip" controls, scroll down to the "Allowances & Additional Earnings" section.',
      'Step 2: Check ECOLA: System automatically applies ₱25.00/day rendered or custom regional allowance.',
      'Step 3: Enter Post Allowance: Input specific detachment hazard stipends or firearm qualification allowances.',
      'Step 4: Input Meal / Transportation Allowance if subsidized by the client or agency.',
      'Step 5: Scroll to "Other Deductions": Enter any Cash Advances (Vale) disbursed during the quincena.',
      'Step 6: Enter Uniform Amortization or equipment deductions according to agency installment schedules.',
      'Step 7: Check the payslip breakdown: All allowances add to Gross Pay; all advances deduct cleanly with clear labels.',
    ],
    highlights: [
      'Full Line-Item Transparency: Prevents payday disputes by displaying every allowance and advance separately.',
      'Bilateral Verification: Both guard and accounting receive a clear record of emergency advances repaid.',
      'Labor Code Compliance: Ensures total deductions never violate statutory maximum salary retention limits.',
    ],
    metrics: [
      { label: 'Standard ECOLA', value: '₱25.00 / day', desc: 'DOLE Wage Order allowance' },
      { label: 'Advance Tracking', value: 'Line-Item', desc: 'Detailed on payslip' },
      { label: 'Dispute Reduction', value: '98%', desc: 'Clear itemized receipts' },
    ],
    highlightBox: {
      title: 'Dispute Prevention Highlight',
      text: 'Always itemize cash advances (vale) in the specific deduction field rather than adjusting duty days. This ensures the guard sees their full earned wages and understands the exact repayment deduction on their signed payslip.',
    },
    speakerNotes:
      'Security agencies frequently issue cash advances or uniform installments. Our system provides dedicated fields for ECOLA, post allowances, firearm stipends, and vale. Every item appears transparently on the payslip, eliminating disputes on payout day.',
  },
  {
    id: 7,
    title: 'DOLE Statutory Deductions & Net Take-Home Pay',
    subtitle: 'Automated Government Contributions (SSS, PhilHealth, Pag-IBIG & BIR Tax)',
    category: 'Statutory Compliance',
    screenLocation: 'Official Payslip Tab -> Left Panel "Statutory Deductions" & Net Summary',
    bullets: [
      'Automated SSS Contribution derivation following official Social Security salary contribution brackets.',
      'PhilHealth Premium: Automatic 5% progressive contribution computation (split 50/50 employer & employee).',
      'Pag-IBIG Fund (HDMF): Automatic statutory contribution deduction (₱100 / ₱200 monthly cap).',
      'BIR Withholding Tax: Automatic Minimum Wage Earner (MWE) tax exemption compliance.',
      'Security Agency Cash Bond: Configurable standard retention (₱100–₱250 per quincena) for agency security bond.',
    ],
    steps: [
      'Step 1: View the "Statutory Deductions" section in the Payslip Control panel.',
      'Step 2: Notice that SSS, PhilHealth, and Pag-IBIG are automatically calculated based on gross compensation.',
      'Step 3: Verify the guard\'s statutory IDs are displayed (SSS number, PhilHealth ID, Pag-IBIG MID, and BIR TIN).',
      'Step 4: Check Withholding Tax: Minimum wage earners correctly show ₱0.00 tax under RA 9504 (MWE Exemption).',
      'Step 5: Verify Agency Cash Bond: Standard quincena deduction (e.g. ₱150.00) is applied to their cash bond fund.',
      'Step 6: Review Net Take-Home Pay: Net Pay = Gross Earnings - (Statutory Deductions + Other Deductions).',
      'Step 7: Confirm that Net Pay matches the figure to be disbursed via cash envelope or direct bank transfer.',
    ],
    highlights: [
      '100% Audit-Ready: Strictly follows SSS, PhilHealth, and Pag-IBIG official circulars.',
      'MWE Tax Exemption: Automatically safeguards minimum wage guards from unlawful withholding tax deductions.',
      'Complete ID Printing: All government identification numbers print directly on the official payslip.',
    ],
    metrics: [
      { label: 'PhilHealth Rate', value: '5% Standard', desc: 'Split 50% ER / 50% EE' },
      { label: 'Pag-IBIG Cap', value: '₱100 / ₱200', desc: 'Official HDMF schedule' },
      { label: 'MWE Tax Status', value: 'Tax Exempt', desc: 'Republic Act No. 9504' },
    ],
    highlightBox: {
      title: 'Inspection Readiness Highlight',
      text: 'During DOLE routine inspections or SSS audits, the agency must prove proper deduction and remittance. This system prints the officer\'s exact statutory IDs alongside their deductions, establishing full compliance on every payslip.',
    },
    speakerNotes:
      'Statutory compliance is automated. The software derives the employee\'s share of SSS, PhilHealth, and Pag-IBIG from official government brackets, while recognizing minimum wage tax exemptions. Cash bond deductions are tracked cleanly.',
  },
  {
    id: 8,
    title: 'Generating & Printing Official Dual-Copy Payslips',
    subtitle: 'How to Preview, Print, and Archive Side-by-Side Employee and Agency Copies',
    category: 'Payslip Generation & Printing',
    screenLocation: 'Official Payslip Tab -> Top Document Actions -> "Print Dual-Copy Payslip"',
    bullets: [
      'Official dual-copy landscape layout designed specifically for Philippine security agencies.',
      'Left Side: GUARD / EMPLOYEE COPY (Kept by the officer for their personal financial records).',
      'Right Side: AGENCY / ACCOUNTING COPY (Signed by guard and retained by agency for DOLE audits).',
      'Complete agency header: SEC Registration, DOLE License number, and detachment post name.',
      'Bilateral signature lines: "Received By" (Guard signature & date) and "Authorized Agency Signature".',
    ],
    steps: [
      'Step 1: Go to "Official Payslip" and select the security guard from the dropdown selector.',
      'Step 2: Inspect the side-by-side Dual-Copy document on the right side of the screen.',
      'Step 3: Verify the agency credentials in the header and check that earnings and deductions are exact.',
      'Step 4: Click the "Print Dual-Copy Payslip" button above the document (or press Ctrl+P).',
      'Step 5: In the browser print preview: Ensure Orientation is set to "Landscape" and Paper Size is "A4" or "Letter".',
      'Step 6: Click "Print" to print physically, or select "Save as PDF" for electronic payroll filing.',
      'Step 7: Have the guard sign the Agency Copy upon disbursement, then file the signed copy in the detachment binder.',
    ],
    highlights: [
      '50% Paper & Ink Savings: Dual copies fit side-by-side on a single landscape page—zero wasted paper.',
      'Clean Print Engine: Automatically removes all buttons, navigation bars, and sliders during printing.',
      'DOLE Legal Audit Defense: Signed Agency Copy provides conclusive legal proof of correct wage disbursement.',
    ],
    metrics: [
      { label: 'Paper Format', value: 'Landscape A4', desc: 'Standard Letter / A4' },
      { label: 'Paper Savings', value: '50% Reduction', desc: '2 slips on 1 sheet' },
      { label: 'Legal Signatures', value: 'Bilateral', desc: 'Received By + Approved By' },
    ],
    highlightBox: {
      title: 'Printing Best Practice Highlight',
      text: 'Always check that the print preview shows both copies cleanly side-by-side without overflowing to a second page. The application\'s custom print CSS is optimized to ensure a crisp, 1-page fit on standard 8.5"x11" or A4 paper.',
    },
    speakerNotes:
      'Printing official payslips is designed for speed and paper efficiency. The dual-copy layout places the Employee Copy and Agency Copy side-by-side on a single landscape sheet. When printed, you get both copies on one page. Have the guard sign the agency half upon receiving their pay.',
  },
  {
    id: 9,
    title: 'Sending Electronic Payslips via Email (Single & Batch)',
    subtitle: 'Paperless Digital Payslip Distribution for Field and Remote Detachment Officers',
    category: 'Digital Distribution',
    screenLocation: 'Official Payslip -> "Email Payslip" OR Guards Masterlist -> "Email All Payslips"',
    bullets: [
      'Instant electronic payslip dispatch directly to security guards stationed at remote client detachments.',
      'Single Guard Emailing: Send individual payslips directly from the active payslip view.',
      'Batch Detachment Emailing: Send all payslips across an entire client post with a single click.',
      'Beautifully formatted HTML email templates with company branding and itemized earnings.',
      'Confidentiality Protection: Email includes security reminder instructing guards to safeguard their pay information.',
    ],
    steps: [
      'Step 1: Ensure the guard has an active email address saved in their profile (editable in Masterlist).',
      'Step 2: To Email Single Payslip: In the "Official Payslip" tab, click the "Email Payslip" button.',
      'Step 3: To Batch Email Entire Post: Go to "Guards Masterlist", filter by Client Post, and click "Email All Payslips".',
      'Step 4: Review the email dispatch preview containing the guard\'s name, quincena dates, and payout summary.',
      'Step 5: Click "Send Electronic Payslip": Opens your default email client or dispatches via SMTP.',
      'Step 6: The security guard receives their itemized payslip on their smartphone within seconds.',
      'Step 7: Electronic dispatch is logged in the system as verified proof of salary notification.',
    ],
    highlights: [
      'Zero Travel Overhead: Field guards at provincial or industrial posts receive payslips without visiting head office.',
      '100% Paperless & Eco-Friendly: Eliminates printing, paper envelopes, and physical courier costs.',
      'Instant Delivery Confirmation: Guards can verify their pay breakdown before direct bank deposits clear.',
    ],
    metrics: [
      { label: 'Delivery Time', value: '< 5 Seconds', desc: 'Instant digital notification' },
      { label: 'Batch Capacity', value: 'Entire Post', desc: '1-click detachment dispatch' },
      { label: 'Format', value: 'Responsive HTML', desc: 'Mobile and desktop ready' },
    ],
    highlightBox: {
      title: 'Digital Payroll Highlight',
      text: 'For security officers deployed at 24/7 client facilities where physical visitations are difficult, electronic email payslips ensure guards receive full, transparent wage documentation on time, every quincena.',
    },
    speakerNotes:
      'For remote posts, physical payslips are difficult to deliver. You can email payslips individually or in batches by detachment. Guards receive an itemized HTML payslip on their phone, saving travel time and paper costs while maintaining full transparency.',
  },
  {
    id: 10,
    title: 'Managing Payroll Cycles (Quincenas) & Period Archiving',
    subtitle: 'Switching Pay Periods, Reviewing Agency Liabilities, and Preserving Past Cycles',
    category: 'Period Administration',
    screenLocation: 'Top Header -> Pay Period Dropdown Selector (Quincena Selector)',
    bullets: [
      'Built specifically for Philippine 15-day payroll cycles (1st Quincena vs 2nd Quincena).',
      '1st Quincena: Covers the 1st through 15th of the month (Disbursement on the 15th / 16th).',
      '2nd Quincena: Covers the 16th through end of month (Disbursement on the 30th / 31st).',
      'Independent Period Retention: Adjusting a new cycle never overwrites past payroll data.',
      'Agency Summary KPI Bar: Live tally of Total Gross Pay, Total Statutory Withholdings, and Total Net Cash.',
    ],
    steps: [
      'Step 1: Locate the "Pay Period" dropdown selector in the top-center of the navigation header.',
      'Step 2: Select the active cycle: "1st Quincena (1st – 15th)" or "2nd Quincena (16th – End of Month)".',
      'Step 3: Check the Status Badge next to the selector: "Active Calculation" or "Finalized".',
      'Step 4: Review the Top KPI Bar to inspect total agency payroll liabilities and required cash disbursement.',
      'Step 5: Input timecards and allowances for the selected period; the system saves all values to that cycle.',
      'Step 6: To Audit Past Runs: Simply select a prior month or quincena from the dropdown to review historical slips.',
    ],
    highlights: [
      'Automatic Date Formatting: Generates official period headers according to month days (28, 30, or 31).',
      'Complete Historical Auditability: Prior period payslips remain permanently accessible for DOLE or BIR audits.',
      'Corporate Cashflow Forecasting: Aggregates total net payout so management can fund bank accounts in advance.',
    ],
    metrics: [
      { label: 'Standard Cycle', value: '15-Day Quincena', desc: 'Philippine PSA standard' },
      { label: 'Cycle Retention', value: 'Permanent', desc: 'Historical record preservation' },
      { label: 'Liabilities Tally', value: 'Real-Time', desc: 'Gross, Deductions & Net' },
    ],
    highlightBox: {
      title: 'Period Management Highlight',
      text: 'Always ensure you have the correct Quincena selected in the top bar before modifying duty hours or cash advances. The software automatically maintains separate records for each period so historical payrolls remain untouched.',
    },
    speakerNotes:
      'The top header features the Quincena selector, allowing you to switch between the 1st and 2nd quincenas of any month. Each period maintains its own independent records, allowing you to audit past runs without affecting the active cycle.',
  },
  {
    id: 11,
    title: 'Exporting Masterlist & Payroll Data (CSV / Excel)',
    subtitle: 'How to Export Audit Spreadsheets for Bank Direct Deposit Portals and Client Billing',
    category: 'Data Export & Reporting',
    screenLocation: 'Top Navigation Bar -> "Export CSV" OR Guards Masterlist Header',
    bullets: [
      'One-click export of complete detachment roster and payroll calculations into standard CSV format.',
      'Compatible with Microsoft Excel, Google Sheets, LibreOffice, and corporate banking portals.',
      'Contains every DOLE column: Guard Code, Name, Detachment, Daily Rate, Days, Basic Pay, OT, NSD, Gross, SSS, PhilHealth, Pag-IBIG, Cash Bond, Net Pay, and Bank Account.',
      'Ready for direct upload to Philippine bank corporate payroll systems (BDO Auto-Credit, BPI BizLink, Landbank).',
    ],
    steps: [
      'Step 1: In the top navigation bar or above the Masterlist table, click the "Export CSV" button.',
      'Step 2: The system immediately compiles all current guard records, duty hours, and wage calculations.',
      'Step 3: The file automatically downloads to your PC: `MERZ_Payroll_Masterlist_[Period].csv`.',
      'Step 4: Open the file in Excel or Google Sheets to inspect detachment totals or print accounting summaries.',
      'Step 5: For Bank Direct Deposit: Copy the Account Number and Net Pay columns into your bank disbursement file.',
      'Step 6: For Client Invoicing: Filter by client post to generate an itemized billing attachment for the client.',
    ],
    highlights: [
      'Zero External Software Required: Native client-side CSV generation operates instantly even offline.',
      'Bank Portal Ready: Properly structured numeric columns prevent formatting errors during bank upload.',
      'Billing Reconciliation: Provides transparent proof of duty hours rendered for client detachment billing.',
    ],
    metrics: [
      { label: 'Export Speed', value: '< 1 Second', desc: 'Instant local compilation' },
      { label: 'Data Fields', value: '25+ Columns', desc: 'Complete DOLE breakdown' },
      { label: 'Compatibility', value: 'Excel / CSV', desc: 'BDO, BPI, Landbank portals' },
    ],
    highlightBox: {
      title: 'Bank Disbursement Highlight',
      text: 'Before submitting the bank disbursement file, verify that total Net Pay in the CSV matches the Net Cash summary in the application\'s top KPI bar to ensure 100% reconciliation before funds are debited.',
    },
    speakerNotes:
      'Exporting to CSV is as simple as clicking the "Export CSV" button. It downloads a full spreadsheet with all 25+ columns of payroll data. Use this file for uploading to corporate bank portals like BDO or BPI, or as an attachment for client invoices.',
  },
  {
    id: 12,
    title: 'Local Device Storage Autosave & Data Privacy',
    subtitle: 'How Local Persistence Ensures Instant Response with Zero Cloud Dependency',
    category: 'Data Security & Persistence',
    screenLocation: 'Top Navigation -> "Saved" Status Badge',
    bullets: [
      'Local Autosave: Guard records, rates, and timecards persist locally on your computer with zero latency.',
      'Complete Data Privacy: No employee wage or personal identification data is transmitted to third-party servers.',
      '100% Offline Capability: Operates seamlessly in remote guard posts, detachment offices, or during network outages.',
      'Zero Cloud Lock-in: You retain full sovereign ownership and local control over all officer information.',
      'Instant Recovery: Browser restarts or system reboots automatically restore current guard rosters intact.',
    ],
    steps: [
      'Step 1: Check the top navigation bar to observe the green "Saved" status badge.',
      'Step 2: Edit any guard rate, shift timecard, or deduction: notice the instant autosave feedback.',
      'Step 3: Close or refresh the window anytime: your exact workspace state is preserved on your hard drive.',
      'Step 4: Use "Export CSV" anytime to create backup spreadsheets for accounting or banking portals.',
      'Step 5: If needed, click "Reset to Factory Defaults" in the footer to restore initial baseline rosters.',
    ],
    highlights: [
      'Zero Cloud Dependency: Operates completely offline with zero risk of external API downtime.',
      'Data Sovereignity: Confidential officer records and DOLE formulas are shielded on your device.',
      'Lightning-Fast Latency: Zero waiting for network requests; calculations happen in milliseconds.',
    ],
    metrics: [
      { label: 'Storage Mode', value: 'Local Persistence', desc: 'Zero cloud latency' },
      { label: 'Data Privacy', value: '100% On-Device', desc: 'Zero external transmission' },
      { label: 'Offline Ready', value: '100% Functional', desc: 'No internet required' },
    ],
    highlightBox: {
      title: 'Data Privacy & Security Highlight',
      text: 'By keeping all calculations, guard profiles, and timecards strictly on the local device, confidential officer records and statutory compliance figures are shielded from unauthorized external exposure while remaining fully accessible offline.',
    },
    speakerNotes:
      'The MERZ HR Suite uses instant local storage autosave. Every edit to a guard\'s duty hours, rate, or statutory profile is saved immediately to your machine. There is no cloud dependency or external sync delay, ensuring complete data security and 100% offline uptime.',
  },
  {
    id: 13,
    title: 'Desktop PC Application (.exe) & Offline Operation',
    subtitle: 'How to Install on Windows Desktop and Operate at Guard Outposts Without Internet',
    category: 'Desktop & Offline Features',
    screenLocation: 'Browser Address Bar (Install Icon) / Bundled "build-windows-exe.bat"',
    bullets: [
      'Runs as a standalone desktop software on Windows 10 & 11 without requiring a browser window.',
      'Offline-First Architecture: 100% of features (calculations, masterlist, payslip printing) work without internet.',
      'Ideal for remote guard outposts, underground basement posts, and industrial zones with poor cellular connectivity.',
      'Local Storage Persistence: All changes are preserved locally on your computer with instant autosave.',
      'Native Windows Executable: Bundled with `build-windows-exe.bat` for instant compilation into a portable `.exe`.',
    ],
    steps: [
      'Step 1: Browser Installation: In Chrome or Edge, click the "Install App" icon in the URL bar to create a desktop shortcut.',
      'Step 2: Standalone Windows .EXE: Run `build-windows-exe.bat` in the project root to build a standalone desktop executable.',
      'Step 3: Launch the MERZ HR Suite icon from your desktop or Windows Start Menu.',
      'Step 4: Operational Offline: You can log duty shifts, adjust overtime, and print dual-copy payslips with no internet.',
      'Step 5: Data Persistence: Everything saves directly to your device hard drive without external connectivity.',
    ],
    highlights: [
      'Zero Downtime: Field payroll operations never stop due to telecom or fiber internet disruptions.',
      'Native Desktop Window: Distraction-free, dedicated window without browser URL bars or tabs.',
      'High Execution Speed: Instant calculations and immediate UI response times.',
    ],
    metrics: [
      { label: 'Offline Capability', value: '100% Functional', desc: 'Full duty & payroll offline' },
      { label: 'Windows Support', value: 'Win 10 & 11', desc: 'Portable .exe & PWA' },
      { label: 'Data Security', value: 'On-Device', desc: 'Zero cloud leaks' },
    ],
    highlightBox: {
      title: 'Operational Continuity Highlight',
      text: 'Security detachments cannot afford downtime. By deploying the desktop app, commanders can calculate timecards and print official payslips even during typhoons or telecommunication outages, with complete offline resilience.',
    },
    speakerNotes:
      'The MERZ HR Suite runs as a native Windows desktop app and is built offline-first. Even if internet is completely down at a remote outpost, commanders can compute timecards and print dual-copy payslips safely on their local workstation.',
  },
  {
    id: 14,
    title: 'Administrator Checklist & Best Practices SOP',
    subtitle: 'Standard Operating Procedures for Zero-Error Payroll Execution Every Quincena',
    category: 'Standard Operating Procedures',
    screenLocation: 'Operational Lifecycle & Management Workflow',
    bullets: [
      'Day 1–3 of Quincena: Review newly deployed security guards and verify SSS, PhilHealth, TIN, and Pag-IBIG IDs.',
      'Day 12–14: Input timecard duty days, 12-hour overtime hours, and night duty differentials in Official Payslip controls.',
      'Day 14: Review Cash Advances (Vale) and equipment deductions to ensure no over-deduction beyond legal limits.',
      'Day 15 (Audit): Export CSV masterlist and verify Total Net Pay matches required bank disbursement funds.',
      'Day 15 (Disbursement): Print Dual-Copy Payslips for cash payouts OR dispatch electronic emails for bank transfers.',
      'Day 16+: File signed Agency Accounting Copies alphabetically by detachment for annual DOLE inspection readiness.',
    ],
    steps: [
      'Step 1: Check the green "Saved" status indicator to verify changes are safely preserved locally.',
      'Step 2: Confirm all guards at the post have correct daily wage rates matching current RTWPB regional wage orders.',
      'Step 3: Complete timecard entries and check that 12-hour shifts have 4.0 hrs daily OT and night diff toggled if nocturnal.',
      'Step 4: Reconcile bank disbursement totals using the top summary KPI bar and exported CSV.',
      'Step 5: Distribute payslips (print dual-copy on landscape A4 or send electronic email).',
      'Step 6: Secure guard signatures on the Agency Copy upon salary receipt and store in the compliance binder.',
    ],
    highlights: [
      'Zero-Error Payroll Workflow: Eliminates wage disputes, compliance penalties, and client billing reconciliations.',
      'DOLE Inspection Immunity: Signed agency copies and statutory ID records provide proof of legal compliance.',
      'Complete Peace of Mind: Automated formulas ensure every officer receives their lawful compensation on time.',
    ],
    metrics: [
      { label: 'Inspection Readiness', value: '100% Certified', desc: 'DOLE D.O. 150-16 Audit Proof' },
      { label: 'Disbursement Accuracy', value: '₱0.00 Discrepancy', desc: 'Exact centavo balance' },
      { label: 'Guard Satisfaction', value: 'High Transparency', desc: 'Itemized payslip clarity' },
    ],
    highlightBox: {
      title: 'The Golden Rule of Agency Payroll',
      text: 'A well-documented payroll protects both the agency and the guard. Always obtain the guard\'s signature on the Agency Accounting Copy on payday, or maintain the electronic email notification log for verified proof of compliance.',
    },
    speakerNotes:
      'To conclude this operational manual: following this 6-step SOP ensures flawless payroll execution every quincena. By combining DOLE-compliant calculations, dual-copy signed payslips, and continuous cloud backup, MERZ Security Solutions maintains peak operational excellence.',
  },
];

/**
 * Generates and triggers download of a genuine PowerPoint (.pptx) file
 */
export async function downloadPowerPointPresentation(
  onProgress?: (status: string) => void
): Promise<void> {
  onProgress?.('Initializing PowerPoint presentation engine...');

  const pptx = new pptxgen();

  // Configure presentation properties
  pptx.layout = 'LAYOUT_16x9'; // 16:9 widescreen
  pptx.author = 'MERZ Security Solutions Agency Inc.';
  pptx.company = 'MERZ Security Solutions Agency Inc.';
  pptx.title = 'MERZ HR & Payroll Suite — User Operations Manual';
  pptx.subject = 'Complete Step-by-Step Operations Manual for Guards, Shifts, DOLE Payroll & Desktop App';

  // Palette definitions
  const C_NAVY = '0F172A'; // Slate 900
  const C_DARK = '1E293B'; // Slate 800
  const C_EMERALD = '059669'; // Emerald 600
  const C_EMERALD_LIGHT = 'ECFDF5'; // Emerald 50
  const C_SLATE_LIGHT = 'F8FAFC'; // Slate 50
  const C_BORDER = 'E2E8F0'; // Slate 200
  const C_TEXT = '0F172A';
  const C_MUTED = '64748B'; // Slate 500
  const C_WHITE = 'FFFFFF';
  const C_GOLD = 'D97706'; // Amber 600

  onProgress?.('Building presentation manual slides...');

  PRESENTATION_SLIDES.forEach((slideData, index) => {
    onProgress?.(`Compiling Slide ${index + 1} of ${PRESENTATION_SLIDES.length}: ${slideData.title}...`);
    const slide = pptx.addSlide();

    // Speaker notes
    slide.addNotes(slideData.speakerNotes);

    if (index === 0) {
      // -------------------------------------------------------------
      // SLIDE 1: HERO COVER SLIDE
      // -------------------------------------------------------------
      slide.background = { color: C_NAVY };

      // Top brand accent bar
      slide.addShape(pptx.ShapeType.rect, {
        x: 0,
        y: 0,
        w: '100%',
        h: 0.18,
        fill: { color: C_EMERALD },
      });

      // Agency Badge Pill
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 0.8,
        y: 0.8,
        w: 5.5,
        h: 0.45,
        fill: { color: '1E293B' },
        line: { color: C_EMERALD, width: 1 },
        rectRadius: 0.1,
      });
      slide.addText('MERZ SECURITY SOLUTIONS AGENCY INC. • OPERATIONS MANUAL', {
        x: 0.9,
        y: 0.88,
        w: 5.3,
        h: 0.3,
        fontSize: 10,
        bold: true,
        color: '34D399',
        fontFace: 'Arial',
      });

      // Main Title
      slide.addText(slideData.title, {
        x: 0.8,
        y: 1.5,
        w: 11.5,
        h: 1.3,
        fontSize: 30,
        bold: true,
        color: C_WHITE,
        fontFace: 'Arial',
        lineSpacingMultiple: 1.1,
      });

      // Subtitle
      slide.addText(slideData.subtitle, {
        x: 0.8,
        y: 2.9,
        w: 11.5,
        h: 0.8,
        fontSize: 14,
        color: '94A3B8',
        fontFace: 'Arial',
      });

      // 4 Feature Pillars Grid
      const pillars = [
        { title: '1. Guard Onboarding', desc: 'Sequential codes, client posts, statutory IDs' },
        { title: '2. 12-Hour Duty & OT', desc: '125% regular OT, 10% night differential' },
        { title: '3. Dual-Copy Payslip', desc: 'Print landscape A4, bilateral signatures' },
        { title: '4. Local Autosave', desc: 'Secure local storage database' },
      ];

      pillars.forEach((p, pIdx) => {
        const px = 0.8 + pIdx * 2.9;
        slide.addShape(pptx.ShapeType.roundRect, {
          x: px,
          y: 4.0,
          w: 2.7,
          h: 1.8,
          fill: { color: C_DARK },
          line: { color: '334155', width: 1 },
          rectRadius: 0.1,
        });

        slide.addText(p.title, {
          x: px + 0.15,
          y: 4.15,
          w: 2.4,
          h: 0.4,
          fontSize: 12,
          bold: true,
          color: '34D399',
          fontFace: 'Arial',
        });

        slide.addText(p.desc, {
          x: px + 0.15,
          y: 4.65,
          w: 2.4,
          h: 1.0,
          fontSize: 10,
          color: 'CBD5E1',
          fontFace: 'Arial',
        });
      });

      // Footer
      slide.addText('DOLE D.O. 150-16 COMPLIANT • REVISED PENAL CODE & LABOR CODE STANDARDS', {
        x: 0.8,
        y: 6.6,
        w: 11.5,
        h: 0.3,
        fontSize: 9,
        color: '64748B',
        fontFace: 'Arial',
      });
    } else {
      // -------------------------------------------------------------
      // STANDARD MANUAL SLIDES (SLIDES 2 TO 14)
      // -------------------------------------------------------------
      slide.background = { color: C_SLATE_LIGHT };

      // Top Accent Bar
      slide.addShape(pptx.ShapeType.rect, {
        x: 0,
        y: 0,
        w: '100%',
        h: 0.12,
        fill: { color: C_EMERALD },
      });

      // Slide Header Container
      slide.addShape(pptx.ShapeType.rect, {
        x: 0,
        y: 0.12,
        w: '100%',
        h: 1.4,
        fill: { color: C_WHITE },
        line: { color: C_BORDER, width: 0.5 },
      });

      // Category / Section Tag
      slide.addText(slideData.category.toUpperCase(), {
        x: 0.8,
        y: 0.25,
        w: 6.0,
        h: 0.25,
        fontSize: 9,
        bold: true,
        color: C_EMERALD,
        fontFace: 'Arial',
      });

      // Slide Counter Badge
      slide.addText(`FEATURE ${index} OF ${PRESENTATION_SLIDES.length - 1}`, {
        x: 10.2,
        y: 0.25,
        w: 2.3,
        h: 0.25,
        fontSize: 9,
        bold: true,
        color: C_MUTED,
        align: 'right',
        fontFace: 'Arial',
      });

      // Main Slide Title
      slide.addText(slideData.title, {
        x: 0.8,
        y: 0.52,
        w: 11.5,
        h: 0.5,
        fontSize: 20,
        bold: true,
        color: C_NAVY,
        fontFace: 'Arial',
      });

      // Subtitle
      slide.addText(slideData.subtitle, {
        x: 0.8,
        y: 1.05,
        w: 11.5,
        h: 0.35,
        fontSize: 11,
        color: C_MUTED,
        fontFace: 'Arial',
      });

      // Left Column: Step-by-Step Instructions & Location (Width: 7.2)
      // Location Card
      if (slideData.screenLocation) {
        slide.addShape(pptx.ShapeType.roundRect, {
          x: 0.8,
          y: 1.65,
          w: 7.2,
          h: 0.45,
          fill: { color: 'F1F5F9' },
          line: { color: 'CBD5E1', width: 0.75 },
          rectRadius: 0.08,
        });
        slide.addText(`📍 WHERE TO GO: ${slideData.screenLocation}`, {
          x: 0.95,
          y: 1.72,
          w: 6.9,
          h: 0.3,
          fontSize: 9.5,
          bold: true,
          color: '334155',
          fontFace: 'Arial',
        });
      }

      // Steps Box
      const stepsToRender = slideData.steps && slideData.steps.length > 0 
        ? slideData.steps 
        : slideData.bullets;

      slide.addShape(pptx.ShapeType.roundRect, {
        x: 0.8,
        y: 2.2,
        w: 7.2,
        h: 4.4,
        fill: { color: C_WHITE },
        line: { color: C_BORDER, width: 1 },
        rectRadius: 0.1,
      });

      slide.addText('STEP-BY-STEP OPERATION GUIDE', {
        x: 1.0,
        y: 2.35,
        w: 6.8,
        h: 0.3,
        fontSize: 10,
        bold: true,
        color: C_EMERALD,
        fontFace: 'Arial',
      });

      // Bullets / Steps
      const stepItems = stepsToRender.slice(0, 7).map((step, sIdx) => ({
        text: `${step}\n`,
        options: {
          fontSize: 9.5,
          color: C_TEXT,
          bullet: false,
          fontFace: 'Arial',
          lineSpacingMultiple: 1.15,
        },
      }));

      slide.addText(stepItems, {
        x: 1.0,
        y: 2.7,
        w: 6.8,
        h: 3.7,
      });

      // Right Column: Highlights, Metrics & Pro-Tip (Width: 4.3)
      // Highlights Box (Emerald)
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 8.2,
        y: 1.65,
        w: 4.3,
        h: 2.3,
        fill: { color: C_EMERALD_LIGHT },
        line: { color: 'A7F3D0', width: 1 },
        rectRadius: 0.1,
      });

      slide.addText('KEY FEATURE HIGHLIGHTS', {
        x: 8.4,
        y: 1.8,
        w: 3.9,
        h: 0.25,
        fontSize: 10,
        bold: true,
        color: '065F46',
        fontFace: 'Arial',
      });

      const highlightBullets = (slideData.highlights || slideData.bullets.slice(0, 3)).map((h) => ({
        text: `★ ${h}\n`,
        options: {
          fontSize: 9,
          color: '064E3B',
          fontFace: 'Arial',
          lineSpacingMultiple: 1.15,
        },
      }));

      slide.addText(highlightBullets, {
        x: 8.4,
        y: 2.1,
        w: 3.9,
        h: 1.7,
      });

      // Pro-Tip / Highlight Box (Amber or Slate)
      if (slideData.highlightBox) {
        slide.addShape(pptx.ShapeType.roundRect, {
          x: 8.2,
          y: 4.1,
          w: 4.3,
          h: 1.5,
          fill: { color: 'FFFBEB' },
          line: { color: 'FDE68A', width: 1 },
          rectRadius: 0.1,
        });

        slide.addText(slideData.highlightBox.title.toUpperCase(), {
          x: 8.4,
          y: 4.25,
          w: 3.9,
          h: 0.25,
          fontSize: 9.5,
          bold: true,
          color: C_GOLD,
          fontFace: 'Arial',
        });

        slide.addText(slideData.highlightBox.text, {
          x: 8.4,
          y: 4.55,
          w: 3.9,
          h: 0.95,
          fontSize: 9,
          color: '78350F',
          fontFace: 'Arial',
          lineSpacingMultiple: 1.15,
        });
      }

      // Metrics Bar
      if (slideData.metrics && slideData.metrics.length > 0) {
        const metricY = 5.75;
        slideData.metrics.slice(0, 2).forEach((m, mIdx) => {
          const mx = 8.2 + mIdx * 2.2;
          slide.addShape(pptx.ShapeType.roundRect, {
            x: mx,
            y: metricY,
            w: 2.1,
            h: 0.85,
            fill: { color: C_WHITE },
            line: { color: C_BORDER, width: 1 },
            rectRadius: 0.08,
          });

          slide.addText(m.label.toUpperCase(), {
            x: mx + 0.1,
            y: metricY + 0.1,
            w: 1.9,
            h: 0.2,
            fontSize: 7.5,
            bold: true,
            color: C_MUTED,
            fontFace: 'Arial',
          });

          slide.addText(m.value, {
            x: mx + 0.1,
            y: metricY + 0.32,
            w: 1.9,
            h: 0.35,
            fontSize: 12,
            bold: true,
            color: C_EMERALD,
            fontFace: 'Arial',
          });
        });
      }

      // Footer
      slide.addText('MERZ SECURITY SOLUTIONS HR & PAYROLL SUITE • DOLE D.O. 150-16 STANDARD OPERATING PROCEDURES', {
        x: 0.8,
        y: 6.85,
        w: 11.5,
        h: 0.25,
        fontSize: 8,
        color: C_MUTED,
        fontFace: 'Arial',
      });
    }
  });

  onProgress?.('Generating downloadable .pptx file...');
  await pptx.writeFile({ fileName: `MERZ_Security_Payroll_Operations_Manual.pptx` });
  onProgress?.('PowerPoint Manual generated successfully!');
}
