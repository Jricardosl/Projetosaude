/*************************
 * FUNCIONALIDADES GERAIS
 *************************/

// Confirmação de consulta
function confirmarConsulta() {
  alert("Consulta confirmada com sucesso!");
}

// Agendar lembrete
function agendarLembrete() {
  const data = document.getElementById("lembreteData").value;
  if (data) {
    alert(`Lembrete agendado para o dia ${data}`);
  } else {
    alert("Por favor, escolha uma data.");
  }
}

// Salvar e carregar notas (bloco de anotações)
function salvarNotas() {
  const texto = document.getElementById("blocoNotas").value;
  localStorage.setItem("notas", texto);
  alert("Notas salvas!");
}

function carregarNotas() {
  const textoSalvo = localStorage.getItem("notas");
  if (textoSalvo) {
    document.getElementById("blocoNotas").value = textoSalvo;
    alert("Notas carregadas.");
  } else {
    alert("Nenhuma nota encontrada.");
  }
}

// Mostrar resumo do agendamento
function mostrarResumo() {
  const profissional = document.getElementById("profissional").value;
  const local = document.getElementById("local").value;
  const resumo = document.getElementById("resumoEscolha");

  if (profissional && local) {
    resumo.textContent = `Você escolheu ${profissional} na(o) ${local}.`;
  } else {
    resumo.textContent = "Por favor, selecione o profissional e o local.";
  }
}

// Salvar orientações
function salvarOrientacao() {
  const titulo = document.getElementById("tituloOrientacao").value;
  const descricao = document.getElementById("descricaoOrientacao").value;
  const lista = document.getElementById("listaOrientacoes");

  if (titulo && descricao) {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${titulo}:</strong> ${descricao}`;
    lista.appendChild(item);
    document.getElementById("tituloOrientacao").value = "";
    document.getElementById("descricaoOrientacao").value = "";
  } else {
    alert("Por favor, preencha todos os campos.");
  }
}

// Validação do agendamento
function validarAgendamento() {
  const nome = document.getElementById("nomePaciente").value;
  const data = document.getElementById("dataConsulta").value;

  if (!nome || !data) {
    alert("Por favor, preencha o nome e a data.");
    return;
  }

  alert(`Consulta agendada para ${nome} no dia ${data}.`);
}

/*************************
 * LOGIN E USUÁRIO LOGADO
 *************************/

// Exibir nome do usuário logado na página inicial
window.addEventListener('DOMContentLoaded', () => {
  const divUsuario = document.getElementById("usuarioLogado");
  if (divUsuario) {
    const cpfLogado = localStorage.getItem("usuarioLogado");
    if (cpfLogado) {
      const dados = localStorage.getItem(`usuario_${cpfLogado}`);
      const usuario = JSON.parse(dados);
      divUsuario.innerHTML = `👤 Logado como: <strong>${usuario.nome}</strong> (CPF: ${usuario.cpf})`;
    } else {
      divUsuario.innerHTML = `🔒 Não logado`;
    }
  }
});

// Login
const formLogin = document.getElementById('formLogin');
if (formLogin) {
  formLogin.addEventListener('submit', function (event) {
    event.preventDefault();

    const cpf = document.getElementById('cpfLogin').value;
    const senha = document.getElementById('senhaLogin').value.replaceAll("-", "");

    const dadosSalvos = localStorage.getItem(`usuario_${cpf}`);

    if (!dadosSalvos) {
      alert("Usuário não encontrado. Faça o cadastro.");
      return;
    }

    const usuario = JSON.parse(dadosSalvos);

    if (usuario.senha === senha) {
      localStorage.setItem("usuarioLogado", cpf);
      alert(`Bem-vindo, ${usuario.nome}!`);
      window.location.href = "paginainicial.html";
    } else {
      alert("Senha incorreta.");
    }
  });
}

/*************************
 * CADASTRO
 *************************/

// Cadastro de novo usuário
const formCadastro = document.getElementById('formCadastro');
if (formCadastro) {
  formCadastro.addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nomeCompleto').value;
    const cpf = document.getElementById('cpf').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const senha = dataNascimento.replaceAll("-", "");

    const usuario = {
      nome: nome,
      cpf: cpf,
      senha: senha
    };

    localStorage.setItem(`usuario_${cpf}`, JSON.stringify(usuario));
    localStorage.setItem("usuarioLogado", cpf);

    alert("Cadastro realizado com sucesso!");
    window.location.href = 'login.html';
  });
}

/*************************
 * RESPONSIVIDADE
 *************************/

// Abre/fecha dropdown no mobile ao clicar
function toggleDropdown(element) {
  if (window.innerWidth <= 768) {
    element.classList.toggle('open');
    const dropdownContent = element.querySelector('.dropdown-content');
    dropdownContent.style.display = element.classList.contains('open') ? 'block' : 'none';
  }
}

// Fecha dropdown se redimensionar para desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(drop => {
      drop.classList.remove('open');
      const content = drop.querySelector('.dropdown-content');
      if (content) content.style.display = '';
    });
  }
});