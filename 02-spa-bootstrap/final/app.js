// Array usado para montar as opções de prioridade do formulário.
const prioridades = ["Baixa", "Média", "Alta"];

// Os dados ficam em memória e são perdidos quando a página é atualizada.
const chamados = [
    {
        id: 1,
        titulo: "Computador não liga",
        descricao: "O computador não está ligando.",
        prioridade: "Alta",
        status: "Aberto"
    },
    {
        id: 2,
        titulo: "Senha bloqueada",
        descricao: "Usuário não consegue acessar o sistema pois a senha está bloqueada.",
        prioridade: "Média",
        status: "Em atendimento"
    },
    {
        id: 3,
        titulo: "Mouse não funciona",
        descricao: "O mouse não está respondendo.",
        prioridade: "Baixa",
        status: "Encerrado",
        solucao: "O mouse foi conectado no usb."
    }
];

const app = document.getElementById("app");

function encontrarChamado(id) {
    return chamados.find(chamado => chamado.id === Number(id));
}

function mostrarPrioridade(prioridade) {
    const classes = {
        "Baixa": "text-bg-success",
        "Média": "text-bg-warning",
        "Alta": "text-bg-danger badge-prioridade-alta"
    };

    return `
        <span class="badge ${classes[prioridade] || "text-bg-secondary"}">
            ${prioridade}
        </span>
    `;
}

function mostrarStatus(status) {
    const classes = {
        "Aberto": "text-bg-primary",
        "Em atendimento": "text-bg-info",
        "Encerrado": "text-bg-secondary"
    };

    return `
        <span class="badge ${classes[status] || "text-bg-dark"}">
            ${status}
        </span>
    `;
}

function mostrarDashboard() {
    const contadores = {
        total: chamados.length,
        abertos: chamados.filter(chamado => chamado.status === "Aberto").length,
        emAtendimento: chamados
            .filter(chamado => chamado.status === "Em atendimento").length,
        encerrados: chamados
            .filter(chamado => chamado.status === "Encerrado").length,
        alta: chamados
            .filter(chamado => chamado.prioridade === "Alta").length
    };

    app.innerHTML = `
        <h1 class="mb-4">Dashboard</h1>

        <div class="row g-3">
            <div class="col-sm-6 col-lg">
                <div class="card h-100 border-primary">
                    <div class="card-body">
                        <h2 class="h6 text-muted">Total de chamados</h2>
                        <p class="display-6 mb-0">${contadores.total}</p>
                    </div>
                </div>
            </div>

            <div class="col-sm-6 col-lg">
                <div class="card h-100 border-info">
                    <div class="card-body">
                        <h2 class="h6 text-muted">Chamados abertos</h2>
                        <p class="display-6 mb-0">${contadores.abertos}</p>
                    </div>
                </div>
            </div>

            <div class="col-sm-6 col-lg">
                <div class="card h-100 border-warning">
                    <div class="card-body">
                        <h2 class="h6 text-muted">Em atendimento</h2>
                        <p class="display-6 mb-0">${contadores.emAtendimento}</p>
                    </div>
                </div>
            </div>

            <div class="col-sm-6 col-lg">
                <div class="card h-100 border-secondary">
                    <div class="card-body">
                        <h2 class="h6 text-muted">Encerrados</h2>
                        <p class="display-6 mb-0">${contadores.encerrados}</p>
                    </div>
                </div>
            </div>

            <div class="col-sm-6 col-lg">
                <div class="card h-100 border-danger">
                    <div class="card-body">
                        <h2 class="h6 text-muted">Prioridade alta</h2>
                        <p class="display-6 mb-0">${contadores.alta}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function mostrarChamados() {
    const linhas = chamados.map(chamado => {
        const acaoEncerrar = chamado.status !== "Encerrado"
            ? `
                <button
                    class="btn btn-sm btn-danger"
                    type="button"
                    data-action="encerrar"
                    data-id="${chamado.id}">
                    Encerrar
                </button>
            `
            : "";

        return `
            <tr>
                <td>${chamado.id}</td>
                <td>${chamado.titulo}</td>
                <td>${mostrarPrioridade(chamado.prioridade)}</td>
                <td>${mostrarStatus(chamado.status)}</td>
                <td class="text-nowrap">
                    <button
                        class="btn btn-sm btn-dark"
                        type="button"
                        data-action="detalhes"
                        data-id="${chamado.id}">
                        Visualizar
                    </button>
                    ${acaoEncerrar}
                </td>
            </tr>
        `;
    }).join("");

    app.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h1 class="mb-0">Chamados</h1>
            </div>
            <button
                class="btn btn-success"
                type="button"
                data-view="novo">
                Novo chamado
            </button>
        </div>

        <div class="table-responsive">
            <table class="table table-striped align-middle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Prioridade</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>${linhas}</tbody>
            </table>
        </div>
    `;
}

function mostrarDetalhes(id) {
    const chamado = encontrarChamado(id);

    if (!chamado) {
        mostrarChamados();
        return;
    }

    app.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h1 class="mb-0">Detalhes do chamado #${chamado.id}</h1>
            <button
                class="btn btn-outline-secondary"
                type="button"
                data-view="chamados">
                Voltar para chamados
            </button>
        </div>

        <div class="card">
            <div class="card-body">
                <dl class="row mb-0">
                    <dt class="col-sm-3">Número</dt>
                    <dd class="col-sm-9">#${chamado.id}</dd>

                    <dt class="col-sm-3">Título</dt>
                    <dd class="col-sm-9">${chamado.titulo}</dd>

                    <dt class="col-sm-3">Descrição</dt>
                    <dd class="col-sm-9">${chamado.descricao}</dd>

                    <dt class="col-sm-3">Prioridade</dt>
                    <dd class="col-sm-9">${mostrarPrioridade(chamado.prioridade)}</dd>

                    <dt class="col-sm-3">Status</dt>
                    <dd class="col-sm-9">${mostrarStatus(chamado.status)}</dd>

                    ${chamado.status === "Encerrado" ? `
                        <dt class="col-sm-3">Solução realizada</dt>
                        <dd class="col-sm-9">${chamado.solucao || "Não informada."}</dd>
                    ` : ""}
                </dl>
            </div>
        </div>
    `;
}

function mostrarEncerramento(id) {
    const chamado = encontrarChamado(id);

    if (!chamado || chamado.status === "Encerrado") {
        mostrarDetalhes(id);
        return;
    }

    app.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h1 class="mb-0">Encerrar chamado #${chamado.id}</h1>
            <button
                class="btn btn-outline-secondary"
                type="button"
                data-view="chamados">
                Cancelar
            </button>
        </div>

        <div class="card mb-4">
            <div class="card-body">
                <h2 class="h5">${chamado.titulo}</h2>
                <p class="mb-2">${chamado.descricao}</p>
                <p class="mb-0">
                    <strong>Prioridade:</strong> ${mostrarPrioridade(chamado.prioridade)}
                    <span class="ms-3"><strong>Status atual:</strong>
                        ${mostrarStatus(chamado.status)}
                    </span>
                </p>
            </div>
        </div>

        <form id="formEncerramento" novalidate>
            <div class="mb-3">
                <label class="form-label" for="solucao">
                    Solução realizada
                </label>
                <textarea
                    class="form-control"
                    id="solucao"
                    rows="5"
                    required></textarea>
                <div class="invalid-feedback">
                    Informe o procedimento realizado antes de encerrar o chamado.
                </div>
            </div>

            <button class="btn btn-danger" type="submit">
                Confirmar encerramento
            </button>
        </form>
    `;

    document.getElementById("formEncerramento")
        .addEventListener("submit", evento => encerrarChamado(evento, id));
}

function mostrarNovoChamado() {
    app.innerHTML = `
        <div class="mb-4">
            <h1 class="mb-4">Novo chamado</h1>
        </div>

        <form id="formChamado">
            <div class="mb-3">
                <label class="form-label" for="titulo">Título</label>
                <input class="form-control" id="titulo" required>
                <div class="invalid-feedback">Informe o título do chamado.</div>
            </div>

            <div class="mb-3">
                <label class="form-label" for="descricao">Descrição</label>
                <textarea class="form-control" id="descricao" rows="4" required></textarea>
                <div class="invalid-feedback">Informe a descrição do chamado.</div>
            </div>

            <div class="mb-3">
                <label class="form-label" for="prioridade">Prioridade</label>
                <select class="form-select" id="prioridade" required>
                    <option value="">Selecione</option>
                    ${prioridades.map(prioridade => `
                        <option value="${prioridade}">${prioridade}</option>
                    `).join("")}
                </select>
                <div class="invalid-feedback">Selecione uma prioridade.</div>
            </div>

            <button class="btn btn-success" type="submit">Cadastrar</button>
        </form>
    `;

    document.getElementById("formChamado")
        .addEventListener("submit", cadastrarChamado);
}

function cadastrarChamado(evento) {
    evento.preventDefault();

    const formulario = evento.currentTarget;
    if (!formulario.checkValidity()) {
        formulario.classList.add("was-validated");
        return;
    }

    chamados.push({
        id: chamados.length === 0
            ? 1
            : Math.max(...chamados.map(chamado => chamado.id)) + 1,
        titulo: document.getElementById("titulo").value.trim(),
        descricao: document.getElementById("descricao").value.trim(),
        prioridade: document.getElementById("prioridade").value,
        status: "Aberto"
    });

    mostrarChamados();
}

function encerrarChamado(evento, id) {
    evento.preventDefault();

    const formulario = evento.currentTarget;
    const campoSolucao = document.getElementById("solucao");
    const solucao = campoSolucao.value.trim();

    if (!solucao) {
        campoSolucao.classList.add("is-invalid");
        campoSolucao.focus();
        return;
    }

    campoSolucao.classList.remove("is-invalid");
    const chamado = encontrarChamado(id);

    if (!chamado) {
        mostrarChamados();
        return;
    }

    chamado.solucao = solucao;
    chamado.status = "Encerrado";
    mostrarDetalhes(chamado.id);
}

function mostrarTela(view) {
    if (view === "dashboard") {
        mostrarDashboard();
    } else if (view === "chamados") {
        mostrarChamados();
    } else if (view === "novo") {
        mostrarNovoChamado();
    }
}

document.addEventListener("click", evento => {
    const elemento = evento.target.closest("[data-view], [data-action]");
    if (!elemento) {
        return;
    }

    evento.preventDefault();

    if (elemento.dataset.view) {
        mostrarTela(elemento.dataset.view);
        return;
    }

    const id = elemento.dataset.id;
    if (elemento.dataset.action === "detalhes") {
        mostrarDetalhes(id);
    } else if (elemento.dataset.action === "encerrar") {
        mostrarEncerramento(id);
    }
});

document.querySelectorAll("[data-view]").forEach(link => {
    link.addEventListener("click", evento => evento.preventDefault());
});

mostrarDashboard();
