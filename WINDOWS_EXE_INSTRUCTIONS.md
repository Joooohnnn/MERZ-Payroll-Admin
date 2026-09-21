# MERZ Security Solutions - Windows Desktop Packaging Guide (.exe)

This project contains everything needed to run as a standalone Windows desktop app (`.exe`).

## Method 1: Instant 1-Click Desktop App (Zero installation)
You can already install this web app as a standalone desktop application on Windows:
1. Open your shared app link in **Google Chrome** or **Microsoft Edge**:
2. In the browser address bar, click the **"Install App"** icon (or click the 3-dot menu ➔ **Save and share** / **Apps** ➔ **Install MERZ Security Solutions Payroll**).
3. Check **"Open as window"** and click **Install**.
4. The application will now appear on your Windows desktop, Start Menu, and Taskbar, running in its own native, frameless window with offline caching enabled!

---

## Method 2: Compile a Standalone Windows `.exe` Installer or Portable Executable via Electron

If you want an actual `.exe` file to distribute via USB drive or deploy to local agency PCs:

### Prerequisites
- Node.js (v18 or v20+) installed on your PC.

### Step-by-Step Instructions:

1. **Export the Project**:
   - In Google AI Studio, click the top-right Settings/Menu ➔ **Download / Export as ZIP**.
   - Unzip the folder onto your Windows PC.

2. **Open Terminal / Command Prompt** inside the unzipped folder.

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Install Electron & Packaging Tools**:
   ```bash
   npm install --save-dev electron electron-builder electron-squirrel-startup
   ```

5. **Build the Application & Create Windows `.exe`**:
   Run the pre-configured build commands:
   ```bash
   npm run build
   npx electron-builder --win portable
   ```
   *(Or run `npx electron-builder --win nsis` to generate a standard Windows setup wizard installer!)*

6. **Find your `.exe` file**:
   Look inside the newly created `dist_electron/` (or `dist/`) directory. You will find:
   - `MERZ Security Solutions Payroll System.exe`

---

## Method 3: Python + PyInstaller (No Node.js Required!)

If you have Python installed on your Windows PC (and do not want to install Node.js), you can build a standalone `.exe` using Python:

### Step 1: Install Python tools
Open Command Prompt and run:
```cmd
pip install pywebview pyinstaller
```

### Step 2: Build the EXE
Run the included Python builder:
```cmd
python build_with_python.py
```
*(Or simply double-click **`build-with-python.bat`**)*

### Step 3: Find your `.exe`
Look inside the `dist\` folder for:
`MERZ Security Solutions Payroll System.exe`
