
import subprocess
import sys

def install_frontend():
    process = subprocess.run(["npm", "install"], cwd="../frontend", shell=True)
    return process.returncode

def install_backend():
    executable = sys.executable

    try:
        subprocess.run([executable, "-m", "venv", "venv"], cwd="../backend", check=True)
        subprocess.run([executable, "-m", "pip", "install", "-r", "requirements.txt"], cwd="../backend", check=True)
        subprocess.run([executable, "manage.py", "migrate"], check=True)
    except Exception:
        exit(1)

    return 0

def install_websocket_server():
    process = subprocess.run(["npm", "install"], cwd="../websocket-server", shell=True)
    return process.returncode


if __name__ == "__main__":
    install_frontend()
    install_backend()
    install_websocket_server()