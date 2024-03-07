
import os
import subprocess
import sys


def install_frontend():
    shell = os.name != 'posix'
    subprocess.run(["npm", "install"], cwd="frontend", shell=shell, check=True)

def install_backend():
    executable = sys.executable
    if os.name == 'posix':
        venv_executable = "venv/bin/python"
    elif os.name == 'nt':
        venv_executable = "backend/venv/Scripts/python.exe"

    subprocess.run([executable, "-m", "venv", "venv"], cwd="backend", check=True)
    subprocess.run([venv_executable, "-m", "pip", "install", "-r", "requirements.txt"], cwd="backend", check=True)

    data = """NAME_DB=name
USER_DB=user
PASSWORD_DB=password
HOST_DB=localhost
PORT_DB=5432"""

    with open("backend/.env", "w") as env_file:
        env_file.write(data)

def install_websocket_server():
    shell = os.name != 'posix'
    subprocess.run(["npm", "install"], cwd="websocket-server", shell=shell, check=True)


if __name__ == "__main__":
    try:
        install_frontend()
        install_backend()
        install_websocket_server()
    except subprocess.CalledProcessError as e:
        print("ERRO:", e)
    except NotImplementedError as e:
        print(e)