import React, { useState } from 'react';
import { 
  Monitor, 
  Download, 
  Check, 
  Copy, 
  Terminal, 
  ExternalLink, 
  X, 
  Laptop, 
  ShieldCheck, 
  PlayCircle, 
  FolderArchive,
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { MerzAgencyLogo } from './MerzOfficialLogo';

interface DesktopAppModalProps {
  onClose: () => void;
  deferredPrompt?: any;
}

export const DesktopAppModal: React.FC<DesktopAppModalProps> = ({ onClose, deferredPrompt }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const currentAppUrl = typeof window !== 'undefined' 
    ? (window.location.origin !== 'null' ? window.location.href : 'https://ais-dev-ss6yzzzbadmzbvjqyrmm66-31475915272.asia-southeast1.run.app')
    : 'https://ais-dev-ss6yzzzbadmzbvjqyrmm66-31475915272.asia-southeast1.run.app';

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Download 1-click Windows Desktop Standalone Shortcut Creator (.bat)
  const handleDownloadDesktopShortcutBat = () => {
    const batContent = `@echo off\r
title MERZ Security Solutions - 1-Click Desktop App Creator\r
color 0A\r
\r
echo ========================================================\r
echo   MERZ SECURITY SOLUTIONS AGENCY INC. - DESKTOP CREATOR\r
echo   DOLE D.O. 150-16 Security Guard Payroll System\r
echo ========================================================\r
echo.\r
echo Creating native Windows Desktop App shortcut...\r
\r
set SCRIPT="%TEMP%\\merz_shortcut_%RANDOM%.vbs"\r
echo Set oWS = WScript.CreateObject("WScript.Shell") > %SCRIPT%\r
echo sLinkFile = oWS.SpecialFolders("Desktop") ^& "\\MERZ Security Payroll.lnk" >> %SCRIPT%\r
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> %SCRIPT%\r
\r
REM Check for Microsoft Edge or Google Chrome\r
if exist "%ProgramFiles(x86)%\\Microsoft\\Edge\\Application\\msedge.exe" (\r
    echo oLink.TargetPath = "%ProgramFiles(x86)%\\Microsoft\\Edge\\Application\\msedge.exe" >> %SCRIPT%\r
    echo oLink.Arguments = "--app=""${currentAppUrl}""" >> %SCRIPT%\r
) else if exist "%ProgramFiles%\\Microsoft\\Edge\\Application\\msedge.exe" (\r
    echo oLink.TargetPath = "%ProgramFiles%\\Microsoft\\Edge\\Application\\msedge.exe" >> %SCRIPT%\r
    echo oLink.Arguments = "--app=""${currentAppUrl}""" >> %SCRIPT%\r
) else if exist "%ProgramFiles%\\Google\\Chrome\\Application\\chrome.exe" (\r
    echo oLink.TargetPath = "%ProgramFiles%\\Google\\Chrome\\Application\\chrome.exe" >> %SCRIPT%\r
    echo oLink.Arguments = "--app=""${currentAppUrl}""" >> %SCRIPT%\r
) else if exist "%ProgramFiles(x86)%\\Google\\Chrome\\Application\\chrome.exe" (\r
    echo oLink.TargetPath = "%ProgramFiles(x86)%\\Google\\Chrome\\Application\\chrome.exe" >> %SCRIPT%\r
    echo oLink.Arguments = "--app=""${currentAppUrl}""" >> %SCRIPT%\r
) else (\r
    echo oLink.TargetPath = "${currentAppUrl}" >> %SCRIPT%\r
)\r
\r
echo oLink.Description = "MERZ Security Solutions Agency Inc. - Security Guard Payroll System" >> %SCRIPT%\r
echo oLink.Save >> %SCRIPT%\r
\r
cscript /nologo %SCRIPT%\r
del %SCRIPT%\r
\r
echo.\r
echo ========================================================\r
echo   SUCCESS! "MERZ Security Payroll" icon created!\r
echo   Location: Check your Windows Desktop!\r
echo   It launches in its own dedicated, frameless window!\r
echo ========================================================\r
echo.\r
pause\r
`;

    const blob = new Blob([batContent], { type: 'application/x-bat' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Create-Desktop-App-Icon.bat';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Download Portable .EXE Builder batch script
  const handleDownloadBatch = () => {
    const batContent = `@echo off\r
cd /d "%~dp0"\r
title MERZ Security Solutions - 1-Click Windows EXE Builder\r
color 0A\r
\r
echo ========================================================\r
echo   MERZ SECURITY SOLUTIONS AGENCY INC. - DESKTOP BUILDER\r
echo   DOLE D.O. 150-16 Security Guard Payroll System\r
echo ========================================================\r
echo.\r
\r
REM Verify we are inside the extracted project folder\r
if not exist "package.json" (\r
    echo [ERROR] "package.json" was not found in this folder!\r
    echo.\r
    echo You cannot run this builder script by itself in your Downloads folder.\r
    echo To compile the .EXE:\r
    echo   1. In Google AI Studio, click the top-right menu -^> "Download ZIP".\r
    echo   2. Right-click the downloaded ZIP and choose "Extract All...".\r
    echo   3. Open the extracted folder and run "build-windows-exe.bat" from there.\r
    echo.\r
    pause\r
    exit /b 1\r
)\r
\r
echo [1/3] Verifying Node.js environment...\r
where node >nul 2>nul\r
if %errorlevel% neq 0 (\r
    echo.\r
    echo [ERROR] Node.js is not installed on this computer!\r
    echo Electron requires Node.js to package the application into a .EXE.\r
    echo.\r
    echo Fix:\r
    echo   1. Download and install Node.js (LTS version) from: https://nodejs.org/\r
    echo   2. Restart your computer or terminal, then run this file again.\r
    echo.\r
    echo Alternatively: If you don't want to install Node.js, install the app\r
    echo directly via Chrome/Edge (3 dots -^> Install MERZ Payroll) for a native desktop app!\r
    echo.\r
    pause\r
    exit /b 1\r
)\r
\r
echo [2/3] Installing build dependencies (Electron & Builder)...\r
call npm install\r
call npm install --save-dev electron electron-builder electron-squirrel-startup\r
\r
echo.\r
echo [3/3] Building Windows Setup Installer (.exe) and Portable EXE...\r
call npx vite build\r
call npx electron-builder --win nsis portable\r
\r
echo.\r
echo ========================================================\r
echo   SUCCESS! Your Windows EXE files are generated!\r
echo   Location: Look in the 'dist' folder for:\r
echo.\r
echo   1. Windows Setup Installer:\r
echo      "MERZ Security Solutions Payroll System Setup 1.0.0.exe"\r
echo      (Installs the program, creates desktop and start menu icons)\r
echo.\r
echo   2. Portable Standalone Executable:\r
echo      "MERZ Security Solutions Payroll System.exe"\r
echo ========================================================\r
echo.\r
pause\r
`;

    const blob = new Blob([batContent], { type: 'application/x-bat' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'build-windows-exe.bat';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Download Python PyInstaller batch script
  const handleDownloadPythonBat = () => {
    const batContent = `@echo off\r
cd /d "%~dp0"\r
title MERZ Security Solutions - Python EXE Builder\r
color 0B\r
\r
echo ========================================================\r
echo   MERZ SECURITY SOLUTIONS AGENCY INC. - PYTHON BUILDER\r
echo   DOLE D.O. 150-16 Security Guard Payroll System\r
echo ========================================================\r
echo.\r
\r
echo Checking Python installation...\r
where python >nul 2>nul\r
if %errorlevel% neq 0 (\r
    echo.\r
    echo [ERROR] Python was not found in your Windows command line!\r
    echo.\r
    echo Please make sure:\r
    echo   1. Python is installed from: https://www.python.org/downloads/\r
    echo   2. During installation, CHECK the box: "Add python.exe to PATH"\r
    echo.\r
    pause\r
    exit /b 1\r
)\r
\r
echo Python found! Installing pywebview and pyinstaller...\r
call python -m pip install --upgrade pywebview pyinstaller\r
echo.\r
echo Compiling standalone Windows .EXE with PyInstaller...\r
call python -m PyInstaller --onefile --noconsole --clean --name "MERZ Security Solutions Payroll System" desktop_app.py\r
echo.\r
echo ========================================================\r
echo   SUCCESS! Your Windows EXE is generated!\r
echo   Location: Check the 'dist' folder for:\r
echo   "MERZ Security Solutions Payroll System.exe"\r
echo ========================================================\r
echo.\r
pause\r
`;
    const blob = new Blob([batContent], { type: 'application/x-bat' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'build-with-python.bat';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleOpenInNewTab = () => {
    window.open(currentAppUrl, '_blank');
  };

  const handleNativePwaPrompt = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        onClose();
      }
    } else {
      handleOpenInNewTab();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MerzAgencyLogo size="w-11 h-11" />
            <div>
              <h3 className="font-bold text-base tracking-tight text-white flex items-center gap-2">
                <span>Install MERZ Payroll on Your Computer</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/40">
                  Windows Ready
                </span>
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Choose between Instant Desktop App or Standalone Portable .exe file
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-slate-800 text-xs leading-relaxed">
          
          {/* Method 1: Instant Native Windows App Install (Fastest, 0 Compilation) */}
          <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Recommended • Fastest (No Coding Required)
              </span>
              <span className="text-[11px] font-bold text-emerald-800">100% Offline Capable</span>
            </div>
            
            <h4 className="font-bold text-sm text-slate-950 flex items-center gap-1.5">
              <Monitor className="w-4 h-4 text-emerald-700" />
              <span>Option A: Install Direct Desktop App (Edge or Chrome)</span>
            </h4>
            
            <p className="text-slate-600 text-xs">
              Because this payroll app contains a built-in Service Worker and Web App Manifest, Windows can install it as a native standalone window with a desktop icon:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="p-3 bg-white rounded-lg border border-emerald-200 space-y-1.5">
                <span className="font-bold text-slate-900 text-xs flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">1</span>
                  Open in Browser Tab
                </span>
                <p className="text-slate-600 text-[11px]">
                  If viewing inside this preview frame, open in a new browser tab so the address bar install icon appears:
                </p>
                <button
                  type="button"
                  onClick={handleOpenInNewTab}
                  className="w-full mt-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs transition cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Open in Full Browser Tab</span>
                </button>
              </div>

              <div className="p-3 bg-white rounded-lg border border-emerald-200 space-y-1.5">
                <span className="font-bold text-slate-900 text-xs flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">2</span>
                  Click "Install App" Icon
                </span>
                <p className="text-slate-600 text-[11px]">
                  In your browser's top address bar (or 3-dots menu ➔ <strong>Save &amp; share</strong>), click <strong>"Install MERZ Payroll"</strong>.
                </p>
                {deferredPrompt ? (
                  <button
                    type="button"
                    onClick={handleNativePwaPrompt}
                    className="w-full mt-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs transition cursor-pointer"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Click Here to Install Now</span>
                  </button>
                ) : (
                  <div className="text-[10.5px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-1 rounded">
                    ✓ Adds to Desktop &amp; Start Menu
                  </div>
                )}
              </div>
            </div>

            {/* Instant Desktop Shortcut Generator Bat */}
            <div className="p-3 bg-white/90 rounded-lg border border-emerald-300/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 text-xs flex items-center gap-1">
                  <Laptop className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Direct 1-Click Desktop Icon Generator</span>
                </span>
                <p className="text-[11px] text-slate-600">
                  Downloads a small <code className="font-bold text-slate-800 bg-slate-100 px-1 rounded">.bat</code> file. Double-click it to instantly place the <strong>"MERZ Security Payroll"</strong> standalone app icon on your Windows Desktop!
                </p>
              </div>
              <button
                type="button"
                onClick={handleDownloadDesktopShortcutBat}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs transition flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Create Desktop Icon</span>
              </button>
            </div>
          </div>

          {/* Method 2: Standalone .EXE File Builder via Electron */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700">
                Option B • Standalone Portable .EXE File
              </span>
              <span className="text-[11px] text-slate-500 font-mono">electron + electron-builder</span>
            </div>
            
            <h4 className="font-bold text-sm text-slate-950 flex items-center gap-1.5">
              <FolderArchive className="w-4 h-4 text-slate-700" />
              <span>Compile into "MERZ Security Solutions Payroll System.exe"</span>
            </h4>
            
            <p className="text-slate-600 text-xs">
              If you need a standalone portable executable (<code className="bg-slate-200 px-1 py-0.5 rounded text-rose-700 font-bold">.exe</code>) to copy onto a USB flash drive or deploy across agency desktop computers:
            </p>

            <div className="space-y-2 text-slate-700">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                <div>
                  <strong>Export / Download the Project</strong>: In Google AI Studio, click the top-right Settings/Menu ➔ <strong>Download / Export ZIP</strong> to save this folder onto your computer.
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                <div>
                  <strong>Run the 1-Click EXE Builder Script</strong>: Inside the extracted folder, double-click <strong><code className="bg-slate-200 px-1 rounded text-slate-900 font-bold">build-windows-exe.bat</code></strong>.
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                <div>
                  <strong>Collect your .EXE</strong>: The script runs the pre-configured Electron packaging engine. Look inside the <code className="bg-slate-200 px-1 rounded font-bold text-emerald-800">dist/</code> folder for:
                  <div className="mt-1 font-mono font-bold text-slate-900 bg-white p-2 rounded border border-slate-200 text-xs">
                    📁 dist / MERZ Security Solutions Payroll System.exe
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions for EXE */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleDownloadBatch}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download build-windows-exe.bat</span>
              </button>

              <button
                type="button"
                onClick={() => copyToClipboard('npm run dist:installer', 'cmd')}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition cursor-pointer"
              >
                {copiedCode === 'cmd' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copiedCode === 'cmd' ? 'Copied build command!' : 'Copy: npm run dist:installer'}</span>
              </button>
            </div>
          </div>

          {/* Option C: Python Standalone EXE Builder (No Node.js needed) */}
          <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-indigo-600 text-white">
                Option C • Python + PyInstaller (No Node.js Needed!)
              </span>
              <span className="text-[11px] text-indigo-700 font-mono font-bold">pip install pywebview pyinstaller</span>
            </div>

            <h4 className="font-bold text-sm text-slate-950 flex items-center gap-1.5">
              <span>Build with Python &amp; PyInstaller</span>
            </h4>

            <p className="text-slate-600 text-xs">
              If you have <strong>Python</strong> on your computer (and don't want to install Node.js), we've included ready-to-use Python scripts (<code className="font-bold text-slate-800">desktop_app.py</code> and <code className="font-bold text-slate-800">build_with_python.py</code>) that turn this payroll system into a standalone Windows <code className="bg-indigo-100 px-1 rounded font-bold text-indigo-900">.exe</code> using <strong>Microsoft Edge WebView2</strong>:
            </p>

            <div className="p-3 bg-white rounded-lg border border-indigo-200 space-y-2 text-slate-700 text-xs">
              <div className="font-bold text-slate-900">Quick 2-Step Python Build:</div>
              <div className="space-y-1 font-mono text-[11px] bg-slate-900 text-slate-100 p-2.5 rounded-lg overflow-x-auto">
                <div>pip install pywebview pyinstaller</div>
                <div>python build_with_python.py</div>
              </div>
              <p className="text-[11px] text-slate-500">
                PyInstaller compiles everything into a single file <code className="font-bold text-slate-800">dist/MERZ Security Solutions Payroll System.exe</code> that runs on any Windows PC!
              </p>
            </div>

            <div className="pt-1 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleDownloadPythonBat}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-indigo-700 hover:bg-indigo-800 rounded-xl transition shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download build-with-python.bat</span>
              </button>

              <button
                type="button"
                onClick={() => copyToClipboard('python build_with_python.py', 'pycmd')}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition cursor-pointer"
              >
                {copiedCode === 'pycmd' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copiedCode === 'pycmd' ? 'Copied command!' : 'Copy: python build_with_python.py'}</span>
              </button>
            </div>
          </div>

          {/* Point-and-Click Apps to Convert to EXE Installer */}
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/70 space-y-2.5">
            <h4 className="font-bold text-xs text-blue-950 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-700" />
              <span>Dedicated Point-and-Click Apps to Convert into EXE Installer</span>
            </h4>
            <p className="text-slate-600 text-[11px]">
              If you prefer a friendly visual app (no typing in terminal or command prompt) to produce a Windows setup installer:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 bg-white rounded-lg border border-blue-200 space-y-1">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>1. Web2Desk (Online 1-Click)</span>
                  <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">No Install</span>
                </div>
                <p className="text-slate-600 text-[10.5px]">
                  Go to <code className="font-bold text-slate-800">appmaker.xyz/web2desk</code>, paste this web app URL, name it <strong>MERZ Security Payroll</strong>, and click <strong>Create Desktop App</strong> to download your Windows setup .exe!
                </p>
                <button
                  type="button"
                  onClick={() => copyToClipboard(currentAppUrl, 'appurl')}
                  className="w-full text-left font-mono text-[10px] text-blue-700 hover:text-blue-900 truncate underline cursor-pointer"
                >
                  {copiedCode === 'appurl' ? '✓ Copied Web App URL!' : 'Click to copy App URL for Web2Desk'}
                </button>
              </div>

              <div className="p-2.5 bg-white rounded-lg border border-blue-200 space-y-1">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>2. Inno Setup (Free Windows App)</span>
                  <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">Windows Software</span>
                </div>
                <p className="text-slate-600 text-[10.5px]">
                  The world's most popular free installer creator (<code className="font-bold text-slate-800">jrsoftware.org</code>). Open its graphical <strong>Setup Script Wizard</strong>, select this extracted folder, and it generates a professional <code className="font-bold">Setup.exe</code>!
                </p>
              </div>
            </div>
          </div>

          {/* Troubleshooting Help: Why didn't it open? */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/80 space-y-2.5">
            <h4 className="font-bold text-xs text-amber-950 flex items-center gap-1.5">
              <span>⚠️ Why didn't the EXE builder open or what happened?</span>
            </h4>
            <div className="space-y-2 text-[11px] text-amber-900">
              <div className="p-2 bg-white/90 rounded-lg border border-amber-200 space-y-0.5">
                <div className="font-bold text-slate-900">1. Windows SmartScreen Blue Alert ("Windows protected your PC")</div>
                <p className="text-slate-600">
                  Because <code className="text-rose-700 font-bold">.bat</code> files are downloaded scripts, Windows Defender blocks them by default.
                  <br />
                  👉 <strong>Fix:</strong> Click <strong>"More info"</strong> link on the blue screen ➔ then click <strong>"Run anyway"</strong>.
                </p>
              </div>

              <div className="p-2 bg-white/90 rounded-lg border border-amber-200 space-y-0.5">
                <div className="font-bold text-slate-900">2. Running it in your Downloads folder instead of the Project Folder</div>
                <p className="text-slate-600">
                  The builder script needs the app's source code to create an executable. If run alone in your Downloads folder, it cannot find the app files.
                  <br />
                  👉 <strong>Fix:</strong> Click the top-right menu of AI Studio ➔ <strong>Download ZIP</strong>. Right-click the ZIP ➔ <strong>Extract All...</strong>, and double-click the script <em>inside</em> the extracted folder.
                </p>
              </div>

              <div className="p-2 bg-white/90 rounded-lg border border-amber-200 space-y-0.5">
                <div className="font-bold text-slate-900">3. Node.js is not installed on your PC</div>
                <p className="text-slate-600">
                  Electron packaging requires Node.js. If you do not have Node.js installed, the script pauses and tells you to install it from <a href="https://nodejs.org" target="_blank" rel="noreferrer" className="text-blue-600 underline font-bold">nodejs.org</a>.
                </p>
              </div>

              <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-300 space-y-0.5">
                <div className="font-bold text-emerald-950">✨ The Easier Alternative (No Builder Needed!):</div>
                <p className="text-emerald-900">
                  Use <strong>Option A</strong> at the top! Click <strong>"Create Desktop Icon"</strong> or click your browser's address bar <strong>Install</strong> button. It gives you the exact same standalone desktop window without compiling any code!
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Full instructions in <code className="font-bold text-slate-700">WINDOWS_EXE_INSTRUCTIONS.md</code>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

