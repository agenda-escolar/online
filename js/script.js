function abrirModal(tipo) {
  // Fecha todos os modais
  document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
  // Abre o modal clicado
  document.getElementById(`modal-${tipo}`).style.display = 'block';
}

function fecharModal(tipo) {
  document.getElementById(`modal-${tipo}`).style.display = 'none';
}




