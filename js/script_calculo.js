//CRIANDO A FUNÇÃO PARA CALCULAR O IPVA
const calcularIPVA = (valor, combustivel, idade) => {
    let resultado = ''

    if (idade > 20) {
        resultado = 'Isento'
    } else if (combustivel == 'gasolina') {
        resultado = valor * 0.20
    } else if (combustivel == 'etanol') {
        resultado = valor * 0.15
    } else if (combustivel == 'bicombustivel') {
        resultado = valor * 0.10
    } else if (combustivel == 'hibrido') {
        resultado = valor * 0.08
    } else if (combustivel == 'eletrico') {
        resultado = valor * 0.02
    }

    return resultado
}

export { calcularIPVA }