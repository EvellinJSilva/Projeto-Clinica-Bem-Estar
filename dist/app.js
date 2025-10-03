"use strict";
class Paciente {
    constructor(nome, email, telefone, especialidade) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.especialidade = especialidade;
    }
    especialidadeValida() {
        const especialidades = ["Neurologia", "Pediatria", "Cardiologia", "Dermatologia"];
        return especialidades.includes(this.especialidade);
    }
}
class CadastroPacientes {
    constructor(tabelaId) {
        this.pacientes = [];
        this.tabela = document.querySelector(tabelaId);
    }
    adicionarPaciente(paciente) {
        if (!paciente.especialidadeValida()) {
            alert("Especialidade inválida!");
            return;
        }
        this.pacientes.push(paciente);
        this.atualizarTabela();
    }
    atualizarTabela() {
        this.tabela.innerHTML = "";
        this.pacientes.forEach((paciente) => {
            this.tabela.innerHTML += `
                <tr>
                    <td>${paciente.nome}</td>
                    <td>${paciente.email}</td>
                    <td>${paciente.telefone}</td>
                    <td>${paciente.especialidade}</td>
                </tr>
            `;
        });
    }
}
const cadastro = new CadastroPacientes("#tabelaContainer tbody");
const form = document.getElementById("formPaciente");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const especialidade = document.getElementById("especialidade").value;
    if (!nome || !email || !telefone || !especialidade) {
        alert("Preencha todos os campos!");
        return;
    }
    const paciente = new Paciente(nome, email, telefone, especialidade);
    cadastro.adicionarPaciente(paciente);
    form.reset();
});
