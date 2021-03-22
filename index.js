const form  = document.querySelector('#form')
const tbody = document.querySelector('#tbody')

var cep = document.querySelector('#campo')

form.addEventListener('submit', (event) => {

    url = `https://viacep.com.br/ws/${cep.value}/json/` 

    main(url)

    event.preventDefault()
})

function fazGET(url) {
    const request  = new XMLHttpRequest()
    request.open('GET', url, false)
    request.send()

    return request.responseText
}

function toJSON(url) {
    let data = fazGET(url)
    let cep  = JSON.parse(data)
    console.log(cep)

    return cep
}

function escreverLinha(cep) {
    for (let propriedade in cep) {
        if (cep[propriedade] !== '') {
            let linha = document.createElement('tr')
            let td1   = document.createElement('td')
            let td2   = document.createElement('td')
            
            td1.textContent = propriedade.charAt(0).toUpperCase() + propriedade.slice(1)
            td2.textContent = cep[propriedade]

            linha.appendChild(td1)
            linha.appendChild(td2)

            tbody.appendChild(linha)
        }
    }
}

function main(url) {
    const cep = toJSON(url)
    escreverLinha(cep)
}
