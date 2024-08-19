// const nome = 
// const sobrenome = document.querySelector('.nome')
// const cpf = document.querySelector('.nome')
// const usuario = document.querySelector('.nome')
// const senha = document.querySelector('.nome')
// const repetirsenha = document.querySelector('.nome')

class ValidarForm{
    constructor () {
        this.formulario = document.querySelector('.formulario')
        this.eventos();
        // this.nome = document.querySelector('.nome')
        // this.sobrenome = document.querySelector('.sobrenome')
        // this.cpf = document.querySelector('.cpf')
        // this.usuario = document.querySelector('.usuario')
        // this.senha = document.querySelector('.senha')
        // this.repetirsenha = document.querySelector('.repetirsenha')
    }

    eventos () {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
            
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const camposValidos = this.camposSaoValidos();
        const senhasValidas = this.senhasSaoValidas();
        

        if (camposValidos && senhasValidas) {
            alert('Enviado')
        }
    }

    senhasSaoValidas () {
        let valid = true;
        const senha = document.querySelector('.senha')
        const repetirsenha = document.querySelector('.repetir-senha')

        if (senha.value !== repetirsenha.value) {
            valid = false;
            this.criaMsg(senha, 'As senhas precisam ser iguais')
            this.criaMsg(repetirsenha, 'As senhas precisam ser iguais')
        }

        if (senha.value.length < 6 || senha.value.length > 12) {
            valid = false
            this.criaMsg(senha, 'A senha precisa ter entre 6 e 12 caracteres')
        }

        return valid;
    }
    camposSaoValidos () {
        let valid = true;
        //remover o a msg de errro
        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove()
        }
        //selecionar todos os capos que eu quero validar 
        for(let campo of this.formulario.querySelectorAll('.validar')) {
            //elemento irmao anterior
            const label = campo.previousElementSibling.innerText
            if (!campo.value) {
                this.criaMsg(campo, `Campo '${label}' não pode estar vazio`)
                valid = false;
            }

            if (campo.classList.contains('cpf')) {
                // se for diferente de validaCpf
                if(!this.validaCpf(campo)) valid = false
            }
            if (campo.classList.contains('usuario')) {
                // se for diferente de validaCpf
                if(!this.validaUsuario(campo)) valid = false
            }
        }
        return valid;
    }

    validaCpf(campo) {
        const cpf = new ValidaCPF(campo.value)
        //o cpf é diferente de true?
        if (!cpf.valida()) {
            this.criaMsg(campo, 'CPF invalido')
            return false
        }
        //se for true apenas passa
        return true
    }

    validaUsuario (campo){
        let valid = true;
        const usuario = campo.value
        if (usuario.length < 3 || usuario.length > 12) {
            valid = false;
            this.criaMsg(campo, 'O usuario precisa ter entre 3 e 12 caracteres')
        }
        //usuario é dierente desses caracteres?
        if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            valid = false;
            this.criaMsg(campo, 'Não pode conter caracteres especiais')
        }
        return valid
    }
    criaMsg(campo, msg) {
        const div = document.createElement('div')
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }
}

const valida = new ValidarForm();