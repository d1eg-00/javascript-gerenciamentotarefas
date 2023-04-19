const prompt = require('prompt-sync')();
const axios = require('./api.js');


async function cadastrarTarefa() {
  let id = Number(prompt('Digite o "ID" da tarefa que deseja cadastrar: '));
  let descricao = prompt('Descreva a terefa desejada a cadastrar: ');

  try {
    let addtarefa = await axios.api.post('/tarefas', {
      id: id,
      descricao: descricao,
      status: 'Pendente'

    })
    console.log('Sucesso no cadastro da tarefa!');
  } catch (erro) {
    console.log('A tarefa não foi cadastrada, erro de cadastro!');
  }

}

async function alterarTarefa() {

  let id = Number(prompt(`Digite o "ID" que deseja alterar a tarefa: `));
  let descricao = prompt(`Digite a descrição para a tarefa selecionada: `);

  try {
    await axios.api.put(`/tarefas/${id}`, {
      id: id,
      descricao: descricao,
      status: 'Pendente'
    });
    console.log("A tarefa foi alterada com sucesso.");
  } catch (erro) {
    console.log(`Erro de atualização da tarefa!`)
  }

}

async function tarefaConcluida() {

  const id = prompt(`Digite o "ID" da tarefa concluída: `);

  try {
    await axios.api.patch(`/tarefas/${id}`, { status: "Concluída" });

    console.log('Tarefa concluída com sucesso!');
  } catch (err) {
    console.log('Erro ao concluir tarefa!');
  }
}

async function obterTarefa(id) {

  let response = await axios.api.get(`/tarefas ${id}`);
  let tarefa = response.data;
  return tarefa;
}

// passar parâmetro para excluir ?
async function excluirTarefa() {
  let id = Number(prompt(`Digite o "ID" da tarefa que deseja excluir: `));
  try {

    await axios.api.delete(`/tarefas/${id}`);
    console.log('Tarefa deletada com sucesso!');

  } catch (erro) {
    console.log('Erro ao realizar exclusão da tarefa !');
  }


}


async function listarTarefasPendentes() {
  try {
    let response = await axios.api.get('/tarefas');
    let lista = response.data.filter((item) => item.status === 'Pendente');

    console.table(lista);
  } catch (erro) {
    console.log('Ocorreu um erro inesperado ao listar tarefas pendentes!')
  }
}

async function listarTarefasConcluidas() {
  try {
    let response = await axios.api.get('/tarefas');
    let lista = response.data.filter((item) => item.status === 'Concluída');
    console.table(lista);
  } catch (erro) {
    console.log('Ocorreu um erro inesperado ao listar tarefas concluídas!')
  }
}

// Menu do programa

async function main() {
  let op;

  do {
    console.log(`Sistema de de gerenciamento de tarefas:
    
    1 - Cadastrar nova tarefa
    2 - Alterar uma tarefa
    3 - Marcar tarefa como concluída
    4 - Excluir uma tarefa
    5 - Listar tarefas pendentes
    6 - Listar tarefas concluídas
    0 - Sair do sistema
    `);

    op = prompt(`Digite a Opção desejada: `);

    switch (op) {
      case '1':
        await cadastrarTarefa();
        prompt(`
        
        Enter para continuar...`);
        console.clear();
        break;
      case '2':
        await alterarTarefa();
        prompt(`
        
        Enter para continuar...`);
        console.clear();
        break;
      case '3':
        await tarefaConcluida();
        prompt(`
        
        Enter para continuar...`);
        console.clear();
        break;
      case '4':
        await excluirTarefa();
        prompt(`
        
        Enter para continuar...`);
        console.clear();
        break;
      case '5':
        await listarTarefasPendentes();
        prompt(`
        
        Enter para continuar...`);
        console.clear();
        break;
      case '6':
        await listarTarefasConcluidas();
        prompt(`
        
        Enter para continuar...`);
        console.clear();
        break;
      case '0':
        console.log(`Obrigado por usar o sistema. Até mais!`);
        break;
      default:
        console.log(`Entrada inválida...`);
    }
  } while (op !== '0');
}

main();