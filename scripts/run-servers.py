
import subprocess


def run_frontend():
    subprocess.Popen(["npm", "run", "dev"], cwd="../frontend", shell=True)

def run_backend():
    venv_executable = "../backend/venv/Scripts/python.exe"
    subprocess.Popen([venv_executable, "manage.py", "runserver"], cwd="../backend")

def run_websocket_server():
    subprocess.Popen(["npm", "run", "dev"], cwd="../websocket-server", shell=True)

if __name__ == "__main__":
    run_frontend()
    run_backend()
    run_websocket_server()