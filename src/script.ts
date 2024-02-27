const transactionsUl:any = document.querySelector('#transactions')
const balance = document.querySelector('#balance')!
const moneyPlus = document.querySelector('#money-plus')!
const moneyMinus = document.querySelector('#money-minus')!
const form = document.querySelector('#form')
const transactionName = document.querySelector('#text') as HTMLInputElement
const transactionAMount = document.querySelector('#amount') as HTMLInputElement


let transactions:any[] = []
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions')!)

if(localStorage.getItem('transactions') !== null)
{
    transactions = localStorageTransactions
}


const delTransaction = (ID:number) => {
    transactions = transactions
    .filter(transaction => transaction.id !== ID)
    updateLocalStorage()
    init()
}

const addDOM = (transaction: { id: number; nome: string; amount: number }) => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const onlyAmount = Math.abs(transaction.amount)

    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `${transaction.nome} 
    <span>${operator} R$${onlyAmount}</span>
    
    <button class="delete-btn" onClick='delTransaction(${transaction.id})'>
    x
    </button>`
    
    transactionsUl.append(li)
}

const updateValues = () => {
    const transactionsAmounts:number[] = transactions.map(transaction => transaction.amount)
   
    const total = transactionsAmounts
    .reduce((accumulator, next) => accumulator + next, 0)
    .toFixed(2)

    const receitas = transactionsAmounts
    .filter(item => item > 0)
    .reduce((accumulator, next) => accumulator + next, 0).toFixed(2)

    const despesas = Math.abs(transactionsAmounts
    .filter(item => item < 0)
    .reduce((accumulator, next) => accumulator + next, 0)).toFixed(2)
    
    balance.textContent = `R$ ${total}`
    moneyPlus.textContent = `R$ ${receitas}`
    moneyMinus.textContent = `R$ ${despesas}`
   
}

const init = () => {
    transactionsUl.innerHTML = ''

    transactions.forEach(addDOM)
    updateValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => `${Math.round(Math.random() * 10000)}`

const addToArray = (newAmount:any, newTransactionName:string) => {
    transactions.push({ 
        id: Number(generateID()),
        nome: newTransactionName,
        amount: Number(newAmount)
    })
}

const handleFormSubmit = (evento: { preventDefault: () => void }) => {
    evento.preventDefault() 

    const newAmount = transactionAMount.value.trim()
    const newTransactionName = transactionName.value.trim()

    if(newAmount === '' || newTransactionName === '')
    {
        alert('Preencha todos os campos!')
        return
    }

    addToArray(newAmount, newTransactionName)
    init()
    updateLocalStorage()

    transactionAMount.value = ''
    transactionName.value = ''
}

form?.addEventListener('submit', handleFormSubmit)