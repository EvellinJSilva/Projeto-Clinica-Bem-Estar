class Paciente {
    nome: string;
    email: string;
    telefone: string;
    especialidade: string;

    constructor(nome: string, email: string, telefone: string, especialidade: string) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.especialidade = especialidade;
    }

    especialidadeValida(): boolean {
        const especialidades = ["Neurologia", "Pediatria", "Cardiologia", "Dermatologia"];
        return especialidades.includes(this.especialidade);
    }
}

class CadastroPacientes {
    pacientes: Paciente[] = [];
    tabela: HTMLElement;

    constructor(tabelaId: string) {
        this.tabela = document.querySelector(tabelaId) as HTMLElement;
    }

    adicionarPaciente(paciente: Paciente) {
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
const form = document.getElementById("formPaciente") as HTMLFormElement;

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = (document.getElementById("nome") as HTMLInputElement).value.trim();
    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const telefone = (document.getElementById("telefone") as HTMLInputElement).value.trim();
    const especialidade = (document.getElementById("especialidade") as HTMLSelectElement).value;

    if (!nome || !email || !telefone || !especialidade) {
        alert("Preencha todos os campos!");
        return;
    }

    const paciente = new Paciente(nome, email, telefone, especialidade);
    cadastro.adicionarPaciente(paciente);

    form.reset();
});
