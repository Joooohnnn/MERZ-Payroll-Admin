import os
import sys
import subprocess
import shutil

# MERZ Security Solutions Agency Inc.
# 1-Click Python to Windows .EXE Builder

def main():
    print("=" * 60)
    print("  MERZ SECURITY SOLUTIONS AGENCY INC. - PYTHON EXE BUILDER")
    print("  DOLE D.O. 150-16 Security Guard Payroll System")
    print("=" * 60)
    print()

    # Step 1: Install required packages (pywebview & pyinstaller)
    print("[1/3] Checking and installing Python build tools...")
    packages = ["pywebview", "pyinstaller"]
    for pkg in packages:
        print(f"Installing {pkg}...")
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", "--upgrade", pkg])
        except subprocess.CalledProcessError:
            print(f"[ERROR] Failed to install {pkg}. Make sure pip is working.")
            input("Press Enter to exit...")
            return

    # Step 2: Build the standalone EXE using PyInstaller
    print()
    print("[2/3] Compiling standalone Windows .EXE with PyInstaller...")
    
    cmd = [
        sys.executable, "-m", "PyInstaller",
        "--onefile",
        "--noconsole",
        "--clean",
        "--name", "MERZ Security Solutions Payroll System",
        "desktop_app.py"
    ]

    # Include dist folder if it exists
    if os.path.exists("dist") and os.path.exists(os.path.join("dist", "index.html")):
        cmd.extend(["--add-data", "dist;dist"])

    print("Running PyInstaller...")
    ret = subprocess.call(cmd)

    if ret == 0:
        print()
        print("=" * 60)
        print("  SUCCESS! Your standalone Windows .EXE is ready!")
        print("  Location: Check inside the 'dist' folder for:")
        print("  --> MERZ Security Solutions Payroll System.exe")
        print("=" * 60)
    else:
        print()
        print("[ERROR] PyInstaller failed to compile the EXE.")

    input("\nPress Enter to exit...")

if __name__ == "__main__":
    main()
