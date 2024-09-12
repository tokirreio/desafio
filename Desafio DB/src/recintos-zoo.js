class RecintosZoo {

const recintos = [
        { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
        { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
        { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
        { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
        { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
    ];

}

const animais = {
    'LEAO': { tamanho: 3, biomas: ['savana'], carnivoro: true },
    'LEOPARDO': { tamanho: 2, biomas: ['savana'], carnivoro: true },
    'CROCODILO': { tamanho: 3, biomas: ['rio'], carnivoro: true },
    'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
    'GAZELA': { tamanho: 2, biomas: ['savana'], carnivoro: false },
    'HIPOPOTAMO': { tamanho: 4, biomas: ['savana e rio'], carnivoro: false }
};

export { RecintosZoo as RecintosZoo }

function encontraRecintos(especie, quantidade) {

    if (!animais[especie]) {
        return 'Animal inválido';
    }

    if (isNaN(quantidade) || quantidade <= 0) {
        return 'Quantidade inválida';
    }

    const animal = animais[especie];
    const espaçoNecessario = animal.tamanho * quantidade;

    const recintosViaveis = recintos.filter(recinto => {
        const espaçoOcupado = recinto.animais.reduce((acumulado, a) => {
            const espaçoAnimal = animais[a.especie].tamanho * a.quantidade;
            return acumulado + espaçoAnimal;
        }, 0);

        const espaçoDisponivel = recinto.tamanho - espaçoOcupado;

        if (!animal.biomas.includes(recinto.bioma)) {
            return false;
        }

        if (espaçoDisponivel < espaçoNecessario) {
            return false;
        }

        const temAnimaisExistentes = recinto.animais.length > 0;
        if (animal.carnivoro && temAnimaisExistentes) {
            
            if (recinto.animais.some(a => a.especie !== especie)) {
                return false;
            }
        }

        if (especie === 'MACACO' && !temAnimaisExistentes && quantidade < 2) {
            return false; 
        }

        if (especie === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio' && temAnimaisExistentes) {
            return false; 
        }

        return true;
    });

    if (recintosViaveis.length === 0) {
        return 'Não há recinto viável';
    }

    return recintosViaveis
        .map(recinto => {
            const espaçoOcupado = recinto.animais.reduce((acumulado, a) => {
                const espaçoAnimal = animais[a.especie].tamanho * a.quantidade;
                return acumulado + espaçoAnimal;
            }, 0);

            const espaçoDisponivel = recinto.tamanho - espaçoOcupado - (recinto.animais.length > 0 ? 1 : 0);
            return `Recinto nro ${recinto.numero} (espaço livre: ${espaçoDisponivel} total: ${recinto.tamanho})`;
        })
        .sort((a, b) => a.numero - b.numero);
}