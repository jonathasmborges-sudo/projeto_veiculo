//IMPORTANDO A FUNÇÃO DE CÁLCULO
import { calcularIPVA } from './script_calculo.js'


//PEGANDO ELEMENTOS DO DOM
const formVeiculo = document.querySelector('#form-veiculo')
const divLista = document.querySelector('#div-lista-veiculos')


//CRIANDO O ARRAY veiculos
const veiculos = []

//VALOR FIXO LICENCIAMENTO
const licenciamento = 150


//CAPTURAR O EVENTO submit
formVeiculo.addEventListener('submit', (evt) => {

    //CANCELA O ENVIO PADRÃO DO FORM
    evt.preventDefault()


    //PEGAR DADOS DO FORMULÁRIO
    const dadosFormVeiculo = new FormData(formVeiculo)


    //CRIAR OBJETO VEICULO
    const veiculo = {

        marca: dadosFormVeiculo.get('marca'),
        modelo: dadosFormVeiculo.get('modelo'),
        placa: dadosFormVeiculo.get('placa'),
        ano: dadosFormVeiculo.get('ano'),
        valor: dadosFormVeiculo.get('valor'),
        combustivel: dadosFormVeiculo.get('combustivel')

    }


    //ADICIONA VEICULO
    addVeiculo(veiculo)


    //LIMPA FORMULÁRIO
    formVeiculo.reset()

})


//FUNÇÃO ADICIONAR VEICULO
const addVeiculo = (objVeiculo) => {

    veiculos.push(objVeiculo)

    listVeiculos()

}



//CALCULAR IDADE DO VEICULO
const calcularIdade = (ano) => {

    const anoAtual = new Date().getFullYear()

    return anoAtual - ano

}



//CALCULAR SEGURO
const calcularSeguro = (valor) => {

    return Number(valor) * 0.10

}



//CALCULAR VALOR FINAL
const calcularValorFinal = (valor, seguro, ipva) => {


    if(ipva === 'Isento'){

        ipva = 0

    }


    return Number(valor) + seguro + Number(ipva) + licenciamento

}



//LISTAR VEICULOS
const listVeiculos = () => {


    divLista.innerHTML = ''


    veiculos.forEach((elem, i)=> {


        const idade = calcularIdade(elem.ano)


        const seguro = calcularSeguro(elem.valor)


        const ipva = calcularIPVA(
            elem.valor,
            elem.combustivel,
            idade
        )


        divLista.innerHTML += `

        <div>

            <p>
            ${i + 1}º Veículo
            </p>

            Marca: ${elem.marca}<br>

            Modelo: ${elem.modelo}<br>

            Placa: ${elem.placa}<br>

            Idade: ${idade} anos<br>

            Seguro: R$ ${seguro.toFixed(2).replace('.',',')}<br>

            IPVA: ${
                ipva === 'Isento'
                ? ipva
                : 'R$ ' + ipva.toFixed(2).replace('.',',')
            }<br>

            Licenciamento: R$ ${licenciamento.toFixed(2).replace('.',',')}<br>

            Valor final: R$ ${
                calcularValorFinal(elem.valor, seguro, ipva)
                .toFixed(2)
                .replace('.',',')
            }

        </div>

        <hr>

        `


    })


}