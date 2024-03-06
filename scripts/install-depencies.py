
import subprocess

def install_frontend():
    process = subprocess.run(["npm", "install"], cwd="../frontend")
    return process.returncode

def install_backend():
    try:
        subprocess.run(["py", "-m", "venv", "venv"], cwd="../backend", check=True)
        subprocess.run(["py", "-m", "pip", "install", "-r", "requirements.txt"], cwd="../backend", check=True)
        subprocess.run(["py", "manage.py", "migrate"], check=True)
    except Exception:
        exit(1)

    return 0

def install_websocket_server():
    process = subprocess.run(["npm", "install"], cwd="../websocket-server")
    return process.returncode


if __name__ == "__main__":
    install_frontend()
    install_backend()
    install_websocket_server()