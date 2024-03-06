
import os
import subprocess
import sys

def install_frontend():
    subprocess.run(["npm", "install"], cwd="../frontend", shell=True, check=True)

def install_backend():
    executable = sys.executable
    if os.name == 'posix':
        raise NotImplementedError("Not implemented for this OS.")
    elif os.name == 'nt':
        venv_executable = "../backend/venv/Scripts/python.exe"

    subprocess.run([executable, "-m", "venv", "venv"], cwd="../backend", check=True)
    subprocess.run([venv_executable, "-m", "pip", "install", "-r", "requirements.txt"], cwd="../backend", check=True)

def install_websocket_server():
    subprocess.run(["npm", "install"], cwd="../websocket-server", shell=True, check=True)


if __name__ == "__main__":
    try:
        install_frontend()
        install_backend()
        install_websocket_server()
    except subprocess.CalledProcessError as e:
        print("ERRO:", e)
    except NotImplementedError as e:
        print(e)