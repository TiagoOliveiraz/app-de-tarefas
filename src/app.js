document.getElementById('formTarefa').addEventListener('submit', saveTarefa)

function saveTarefa(e) {
    let titulo = document.getElementById('titulo').value
    let descricao = document.getElementById('descricao').value
    // console.log(descricao, titulo)

    let tarefa = {
        titulo,
        descricao
    }

    if(localStorage.getItem('tarefas') === null) {
        let tarefas = []
        tarefas.push(tarefa)
        localStorage.setItem('tarefas', JSON.stringify(tarefas))
    } else {
        let tarefas = JSON.parse(localStorage.getItem('tarefas'))
        tarefas.push(tarefa)
        localStorage.setItem('tarefas', JSON.stringify(tarefas))
    }

    getTarefas();
    document.getElementById('formTarefa').reset()
    e.preventDefault()
}

function getTarefas() {
    let tarefas = JSON.parse(localStorage.getItem('tarefas'))
    let tarefasView = document.getElementById('tarefas')
    tarefasView.innerHTML = ''
    for(let i = 0; i < tarefas.length; i++) {
        let titulo = tarefas[i].titulo
        let descricao = tarefas[i].descricao

        tarefasView.innerHTML += `<div class="card mb-3">
            <div class="card-body">
                <p>${titulo} - ${descricao}
                    <a href="#" onclick="deleteTarefa('${titulo}')" class="btn btn-danger">Delete</a>
                </p>
            </div>
        </div>`
    }

}

function deleteTarefa(titulo) {
    let tarefas = JSON.parse(localStorage.getItem('tarefas'))
    for(let i = 0; i < tarefas.length; i++) {
        if(tarefas[i].titulo == titulo) {
            tarefas.splice(i, 1)
        }
    }

    localStorage.setItem('tarefas', JSON.stringify(tarefas))
    getTarefas()
}

getTarefas()