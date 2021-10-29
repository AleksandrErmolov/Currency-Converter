const inputTo = document.querySelector(".inpute-to")
const inputFrom = document.querySelector(".inpute-from")
const priceMoneyTo = document.querySelector(".info_money_to")
const priceMoneyFrom = document.querySelector(".info_money_from")
const select = document.querySelectorAll(".list-currency")
const allButtonTo = document.querySelector(".money__change-to")
const allButtonFrom = document.querySelector(".money__change-from")
const leftSelect = document.querySelector(".list-currency-left")
const rightSelect = document.querySelector(".list-currency-right")
const changeButton = document.querySelector(".change-button")


allButtonTo.addEventListener("click", changeColorTo)
allButtonFrom.addEventListener("click", changeColorFrom)
allButtonTo.addEventListener("click", renderCurrencyOnButton)
allButtonFrom.addEventListener("click", renderCurrencyOnButton)
rightSelect.addEventListener("change", changeSelectFrom)
leftSelect.addEventListener("change", changeSelectTo)
inputTo.addEventListener("keyup", generalChange)
inputFrom.addEventListener("keyup", changeInputFrom)
changeButton.addEventListener("click", changeCurrencyButton)

//Загрузка начальных данных программы. Расчёта доллара и рублей.
async function startProgram() {
    const resp = await fetch('https://api.exchangerate.host/convert?from=RUB&to=USD')
    const data = await resp.json()
    return data
}
startProgram()
    .then((data) => {
        let changed = data.result
        let dollars = (1 / `${changed}`).toFixed(4)
        priceMoneyTo.innerText = `1 ${data.query.from} = ${changed.toFixed(4)} ${data.query.to}`
        inputFrom.value = `${changed.toFixed(4)}`
        priceMoneyFrom.innerText = `1 ${data.query.to} = ${dollars} ${data.query.from}`
    })
///////////////////////////////////////////////////////////////////


//Получаем список всех валют
async function getAllCrypto() {

    const resp = await fetch("https://api.exchangerate.host/latest")
    const data = await resp.json()
    return data
}


//Получаем данные с сервера
getAllCrypto()
    .then((data) => {
        const allCrypto = Object.keys(data.rates)
        renderSelectCrypto(allCrypto, select[0])
        renderSelectCrypto(allCrypto, select[1])
    })

//Отрисовываем селекты в HTML
function renderSelectCrypto(arr, where) {
    arr.forEach(element => {
        const newOption = document.createElement("option")
        newOption.value = element
        newOption.innerText = element
        where.append(newOption)
    });
}


//Меняем цвет кнопок у правой стороны
function changeColorTo(event) {
    let button = event.target

    if (button.tagName === "BUTTON") {
        let oldButton = document.querySelector(".money__change__button-active-to")
        oldButton.classList.remove("money__change__button-active-to")
        button.classList.add("money__change__button-active-to")
    }
}


//Меняем цвет кнопок у левой стороны
function changeColorFrom(event) {
    let button = event.target
    

    if (button.tagName === "BUTTON") {
        let oldButton = document.querySelector(".money__change__button-active-from")
        oldButton.classList.remove("money__change__button-active-from")
        button.classList.add("money__change__button-active-from")
    } 
}


function changeSelectTo() {
    let oldButton = document.querySelector(".money__change__button-active-to")
    oldButton.classList.remove("money__change__button-active-to")
    leftSelect.classList.add("money__change__button-active-to")
}



function changeSelectFrom() {
    let oldButton = document.querySelector(".money__change__button-active-from")
    oldButton.classList.remove("money__change__button-active-from")
    rightSelect.classList.add("money__change__button-active-from")
}



//Генерируем значение по кнопкам в INPUT
function renderCurrencyOnButton() {

    let activeTo = document.querySelector(".money__change__button-active-to")
    let activeFrom = document.querySelector(".money__change__button-active-from")
    let left = document.querySelector(".money__change__button-active-to").value
    let right = document.querySelector(".money__change__button-active-from").value

    if (left === right) {
        inputFrom.value = inputTo.value
        priceMoneyFrom.innerText = `1 ${activeTo.value} = 1.0000 ${activeTo.value}`
        priceMoneyTo.innerText = `1 ${activeTo.value} = 1.0000 ${activeTo.value}`
    } else {

        async function startProgram() {
            const resp = await fetch(`https://api.exchangerate.host/convert?from=${left}&to=${right}`)
            const data = await resp.json()
            return data
        }
        startProgram()
            .then((data) => {
                let value = (1 / `${data.result}`).toFixed(4)
                priceMoneyTo.innerText = `1 ${left} = ${data.result.toFixed(4)} ${data.query.to}`
                priceMoneyFrom.innerText = `1 ${data.query.to} = ${value} ${data.query.from}`
                inputFrom.value = `${data.result.toFixed(4) * Number(inputTo.value).toFixed(4)}`
                let test = Number(inputFrom.value).toFixed(4)
                inputFrom.value = test
            })
    }
}


function generalChange() {
   
    let left = document.querySelector(".money__change__button-active-to").value
    let right = document.querySelector(".money__change__button-active-from").value

    async function startProgram() {
        const resp = await fetch(`https://api.exchangerate.host/convert?from=${left}&to=${right}`)
        const data = await resp.json()
        return data
    }
    startProgram()
        .then((data) => {
            let value = (1 / `${data.result}`).toFixed(4)
            priceMoneyTo.innerText = `1 ${left} = ${data.result.toFixed(4)} ${data.query.to}`
            priceMoneyFrom.innerText = `1 ${data.query.to} = ${value} ${data.query.from}`
            inputFrom.value = `${data.result.toFixed(4) * Number(inputTo.value).toFixed(4)}`
            let test = Number(inputFrom.value).toFixed(4)
            inputFrom.value = test
        })
}


function changeInputFrom() {
  
        let left = document.querySelector(".money__change__button-active-to").value
        let right = document.querySelector(".money__change__button-active-from").value

        async function startProgram() {
            const resp = await fetch(`https://api.exchangerate.host/convert?from=${right}&to=${left}`)
            const data = await resp.json()
            return data
        }
        startProgram()
            .then((data) => {
                console.log(data.result)
                inputTo.value = (1 * inputFrom.value * data.result).toFixed(4)
            })
}



function changeCurrencyButton() {
    const p1 = document.querySelector(".calculate-to")
    const p2 = document.querySelector(".calculate-from")
    let div = document.querySelector(".calculate")


    if (div.classList.contains("active") === false) {
        div.classList.toggle("active")
        div.style.flexdDirection = "row-reverse"
        p1.innerText = "Хочу приобрести"
        p2.innerText = "У меня есть"

    } else {
        div.classList.toggle("active")
        p1.innerText = "У меня есть"
        p2.innerText = "Хочу приобрести"
    }
}