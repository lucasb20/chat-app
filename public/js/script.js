document.querySelector('form').addEventListener('submit', (event) => {
    var senha = document.querySelector('#senha').value;
    var senha2 = document.querySelector('#senha2').value;
    if (senha !== senha2) {
        alert('As senhas não coincidem.');
        event.preventDefault();
    }
});
