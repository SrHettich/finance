const transactionsUl:any = document.querySelector('#transactions')
const balance = document.querySelector('#balance')
const moneyPlus = document.querySelector('#money-plus')
const moneyMinus = document.querySelector('#money-minus')

const transacoesExmp = [
    {id: 1, nome: 'Bolo', amount: -20},
    {id: 2, nome: 'Torta', amount: -10},
    {id: 3, nome: 'Luz', amount: -200},
    {id: 4, nome: 'Salário', amount: 2000}
]

const addDOM = (transaction: { id?: number; nome?: string; amount: number }) => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const onlyAmount = Math.abs(transaction.amount)

    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `${transaction.nome} <span>${operator} R$${onlyAmount}</span><button class="delete-btn">x</button>`
    
    transactionsUl.append(li)
}

const updateValues = () => {
    const transactionsAmounts:number[] = transacoesExmp.map(transaction => transaction.amount)
   
    const total = transactionsAmounts
    .reduce((accumulator, next) => accumulator + next, 0)
    .toFixed(2)

    const receitas = transactionsAmounts
    .filter(item => item > 0)
    .reduce((accumulator, next) => accumulator + next, 0).toFixed(2)

    const despesas = Math.abs(transactionsAmounts
    .filter(item => item < 0)
    .reduce((accumulator, next) => accumulator + next, 0)).toFixed(2)
    
    console.log((despesas))

    balance.textContent = `R$ ${total}`
    moneyPlus.textContent = `R$ ${receitas}`
    moneyMinus.textContent = `R$ ${despesas}`

    
}


const init = () =>{
    transacoesExmp.forEach(addDOM)
    updateValues()
}

init()

