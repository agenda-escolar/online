$(document).ready(function() {
  $('#btn-tarefa-impressa').click(function() {
    $('#opcoes-impressa').toggle();
  });
  $(document).click(function(e) {
    if (!$(e.target).closest('#btn-tarefa-impressa, #opcoes-impressa').length) {
      $('#opcoes-impressa').hide();
    }
  });
});

document.getElementById('btn-historico').addEventListener('click', async () => {
  document.getElementById('loading').style.display = 'block';
  const professorUid = auth.currentUser.uid;
  const q = query(collection(db, 'tarefas'), where('professor', '==', professorUid), orderBy('criadoEm', 'desc'), limit(20));
  const querySnapshot = await getDocs(q);
  let lista = '';
  if (querySnapshot.empty) {
    lista = '<li>Nenhuma tarefa encontrada.</li>';
  } else {
    querySnapshot.forEach((doc) => {
      const tarefa = doc.data();
      const dataFormatada = tarefa.data.split('-').reverse().join('/');
      lista += `<li><a href="javascript:void(0)" class="link-modal" onclick="editarTarefa('${doc.id}', true)">Editar - ${dataFormatada} - ${tarefa.disciplina}</a></li>`;
    });
  }
  document.getElementById('historico-lista').innerHTML = lista;
  document.getElementById('historico-modal').style.display = 'block';
  document.getElementById('loading').style.display = 'none';
});

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('#historico-modal');
  const closeBtn = modal.querySelector('.btn-fechar-modal');
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
});