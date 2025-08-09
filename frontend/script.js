let tarefas = [];

async function fetchTarefas() {
    try {
        const response = await fetch('http://localhost:3000/tarefas');
        if (!response.ok) throw new Error('Erro ao buscar tarefas');
        const data = await response.json();
        
        tarefas = data.map(tarefa => {
            let status;
            if (tarefa.status === 0 || tarefa.status === 'concluido') status = 'concluido';
            else if (tarefa.status === 1 || tarefa.status === 'pendente') status = 'pendente';
            else status = 'em-andamento';
            return {
                id: tarefa.id,
                nome: tarefa.nome,
                dataInicio: tarefa.data_inicio,
                dataConclusao: tarefa.data_conclusao,
                custoEstimado: parseFloat(tarefa.custo),
                status
            };
        });
        renderTarefas();
    } catch (error) {
        console.error(error);
    }
}

window.addEventListener('DOMContentLoaded', fetchTarefas);
let editandoId = null;

function toggleCadastro() {
    const accordion = document.getElementById('accordionCadastro');
    const isOpen = accordion.classList.contains('open');
    
    if (isOpen) {
        accordion.classList.remove('open');
        resetForm();
    } else {
        accordion.classList.add('open');
    }
}

function resetForm() {
    document.getElementById('formTarefa').reset();
    editandoId = null;
    document.querySelector('.header-form h3').textContent = 'Nova Tarefa';
    document.querySelector('.btn-salvar').textContent = 'Salvar';
    const buttonExcluir = document.querySelector('.button-excluir');
    const btnExcluir = document.querySelector('.btn-excluir');
    if (buttonExcluir) buttonExcluir.style.display = 'none';
    if (btnExcluir) btnExcluir.style.display = 'none';
    document.getElementById('accordionConfirmacao').classList.remove('open');
}


document.getElementById('formTarefa').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const tarefaPayload = {
        nome: formData.get('nome'),
        data_inicio: formData.get('dataInicio'),
        data_conclusao: formData.get('dataConclusao'),
        custo: formData.get('custoEstimado'),
        status: formData.get('status') === 'concluido' ? 0 : formData.get('status') === 'pendente' ? 1 : 2
    };

    try {
        if (editandoId) {
 
            await fetch(`http://localhost:3000/tarefas/${editandoId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tarefa: tarefaPayload })
            });
        } else {
            
            await fetch('http://localhost:3000/tarefas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tarefa: tarefaPayload })
            });
        }
        await fetchTarefas();
        toggleCadastro();
    } catch (error) {
        alert('Erro ao salvar tarefa!');
    }
});

function renderTarefas() {
    const container = document.getElementById('tarefasList');
    container.innerHTML = '';

    tarefas.forEach(tarefa => {
        const tarefaElement = createTarefaElement(tarefa);
        container.appendChild(tarefaElement);
    });
}

function createTarefaElement(tarefa) {
    const div = document.createElement('div');
    div.className = 'tarefa-item';
    
    div.innerHTML = `
        <div class="tarefas-list" id="tarefasList">
            <div class="tarefa-header" onclick="toggleTarefa(${tarefa.id})">
                <div class="tarefa-info">
                    <i class="fas fa-chevron-right tarefa-chevron" style="color: #3E9AD9;"></i>
                    <span class="tarefa-titulo">${tarefa.nome}</span>
                </div>
                <div class="tarefa-actions">
                    <button class="btn-edit" onclick="editarTarefa(${tarefa.id}); event.stopPropagation();" title="Editar tarefa">
                        <i class="fas fa-pencil-alt" style="color: coral;"></i>
                    </button>
                </div>
            </div>
            <div class="tarefa-content" id="tarefa-${tarefa.id}">
                <div class="tarefa-details">
                    <div class="form-dates">
                        <div class="form-date-results-labels">
                            <h3>Inicio</h3>
                            <h3>Conclusão</h3>
                        </div>
                        <div class="input-date-results">
                            <div>
                                <h3>${new Date(tarefa.dataInicio).toLocaleDateString('pt-BR')}</h3>
                            </div>
                            <div>
                                <h3>${new Date(tarefa.dataConclusao).toLocaleDateString('pt-BR')}</h3>
                            </div>
                        </div>
                    </div>
                    <div class="custo-estimado-results">
                        <p><strong>Custo Estimado:</strong> R$ ${tarefa.custoEstimado.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                        <p><strong>Status da Tarefa:</strong> ${getStatusLabel(tarefa.status)}</p>
                    </div>
                </div>
                <div class="container-comentarios">
                    <div class="comentarios-title">
                        <i class="fa-solid fa-message" style="color: #3E9AD9;"></i>
                        <h3>Comentários</h3>
                    </div>
                    <div class="card-comentario">
                        <div class="conteudo-comentario">
                            <div class="icon-comentario">
                                <img src="./Assets/icon-mulher.jpeg" alt="" style="border: #333 solid 1px;">
                            </div>
                            <div class="text-comentario">
                                <div class="name-trash-comentario">
                                    <h3>Fulana de Tal</h3>
                                    <i class="fa-solid fa-trash-can" style="color: tomato;"></i>
                                </div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                        </div>
                        <div class="data-comentario">
                            <p>comentado 16 de Jun. 2014</p>
                        </div>
                    </div>
                    <div class="card-comentario">
                        <div class="conteudo-comentario">
                            <div class="icon-comentario">
                                <img src="./Assets/icon-mulher.jpeg" alt="" style="border: #333 solid 1px;">
                            </div>
                            <div class="text-comentario">
                                <div class="name-trash-comentario">
                                    <h3>Fulana de Tal</h3>
                                    <i class="fa-solid fa-trash-can" style="color: tomato;"></i>
                                </div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                        </div>
                        <div class="data-comentario">
                            <p>comentado 16 de Jun. 2014</p>
                        </div>
                    </div>
                    <div class="buttons-comentarios">
                        <div class="button-mais-comentarios">
                            <button>Ver Mais Comentários</button>
                        </div>
                        <div class="input-comentario">
                            <input type="text" placeholder="">
                        </div>
                        <div class="button-enviar-comentario">
                            <i class="fa-solid fa-envelope" style="color: #E9F3F9;"></i>
                            <button>Enviar Comentário</button>
                        </div>
                    </div>
                </div>                          
            </div>                          
        </div>                 
    `;
    
    return div;
}

function getStatusLabel(status) {
    const statusLabels = {
        'concluido': 'Concluído',
        'em-andamento': 'Em Andamento', 
        'pendente': 'Pendente'
    };
    return statusLabels[status] || status;
}

function toggleTarefa(id) {
    const content = document.getElementById(`tarefa-${id}`);
    const chevron = content.previousElementSibling.querySelector('.tarefa-chevron');
    
    if (content.classList.contains('open')) {
        content.classList.remove('open');
        chevron.style.transform = 'rotate(0deg)';
    } else {
        content.classList.add('open');
        chevron.style.transform = 'rotate(180deg)';
    }
}

function editarTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) return;

    document.getElementById('nome').value = tarefa.nome;
    document.getElementById('dataInicio').value = tarefa.dataInicio;
    document.getElementById('dataConclusao').value = tarefa.dataConclusao;
    document.getElementById('custoEstimado').value = tarefa.custoEstimado;
    document.getElementById('status').value = tarefa.status;

    document.querySelector('.header-form h3').textContent = 'Editar Tarefa';
    document.querySelector('.btn-salvar').textContent = 'Atualizar';
    
    document.querySelector('.button-excluir').style.display = 'flex';
    document.querySelector('.btn-excluir').style.display = 'block';
    
    editandoId = id;
    
    document.getElementById('accordionCadastro').classList.add('open');
}

function excluirTarefaForm() {
    if (!editandoId) return;
    
    const tarefa = tarefas.find(t => t.id === editandoId);
    if (!tarefa) return;

    document.getElementById('accordionConfirmacao').classList.add('open');
}

function fecharConfirmacao() {
    document.getElementById('accordionConfirmacao').classList.remove('open');
}


async function confirmarExclusao() {
    if (!editandoId) return;
    try {
        await fetch(`http://localhost:3000/tarefas/${editandoId}`, {
            method: 'DELETE'
        });
        await fetchTarefas();
        fecharConfirmacao();
        toggleCadastro();
    } catch (error) {
        alert('Erro ao excluir tarefa!');
    }
}

function excluirTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) return;

    editandoId = id;
    document.getElementById('accordionConfirmacao').classList.add('open');
}
