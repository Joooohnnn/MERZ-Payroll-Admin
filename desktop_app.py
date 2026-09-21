import os
import sys
import threading
import http.server
import socketserver

# MERZ Security Solutions Agency Inc.
# DOLE D.O. 150-16 Security Guard Payroll System
# Python Desktop Standalone Application

APP_TITLE = "MERZ Security Solutions Agency Inc. - Payroll System"
ONLINE_APP_URL = "https://ais-pre-ss6yzzzbadmzbvjqyrmm66-31475915272.asia-southeast1.run.app"

def get_base_path():
    """Get absolute path to resource, works for dev and for PyInstaller bundle"""
    if getattr(sys, 'frozen', False):
        return sys._MEIPASS
    return os.path.dirname(os.path.abspath(__file__))

def start_local_server(port, directory):
    class QuietHandler(http.server.SimpleHTTPRequestHandler):
        def log_message(self, format, *args):
            pass  # Suppress console logging

        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=directory, **kwargs)

    with socketserver.TCPServer(("127.0.0.1", port), QuietHandler) as httpd:
        httpd.serve_forever()

def main():
    try:
        import webview
    except ImportError:
        print("pywebview is not installed.")
        print("Please install it by running: pip install pywebview")
        input("Press Enter to exit...")
        sys.exit(1)

    base_path = get_base_path()
    dist_dir = os.path.join(base_path, "dist")

    target_url = ONLINE_APP_URL

    # If local built dist folder exists with index.html, host it locally on a quiet internal port
    if os.path.exists(dist_dir) and os.path.exists(os.path.join(dist_dir, "index.html")):
        port = 34567
        server_thread = threading.Thread(target=start_local_server, args=(port, dist_dir), daemon=True)
        server_thread.start()
        target_url = f"http://127.0.0.1:{port}"

    # Create native Windows desktop window
    window = webview.create_window(
        title=APP_TITLE,
        url=target_url,
        width=1366,
        height=860,
        min_size=(1024, 700),
        confirm_close=True,
        text_select=True
    )

    webview.start(private_mode=False, storage_path=os.path.join(os.path.expanduser("~"), ".merz_payroll_data"))

if __name__ == "__main__":
    main()
