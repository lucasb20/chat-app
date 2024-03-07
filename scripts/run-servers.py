
import os
import subprocess


def run_frontend():
    shell = os.name != 'posix'
    subprocess.Popen(["npm", "run", "dev"], cwd="frontend", shell=shell)

def run_backend():
    if os.name == 'posix':
        venv_executable = "venv/bin/python"
    elif os.name == 'nt':
        venv_executable = "backend/venv/Scripts/python.exe"
    subprocess.Popen([venv_executable, "manage.py", "runserver"], cwd="backend")

def run_websocket_server():
    shell = os.name != 'posix'
    subprocess.Popen(["npm", "run", "dev"], cwd="websocket-server", shell=shell)


if __name__ == "__main__":
    run_frontend()
    run_backend()
    run_websocket_server()