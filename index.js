const getCep = {
    form: document.querySelector('#form'),
    tbody: document.querySelector('#tbody'),
    
    cep_input: document.querySelector('#campo'),

    cep_string: '',

    cep_obj: {},

    url_atual: '',

    setListener: function() {
        this.form.addEventListener('submit', event => {
            url = `https://viacep.com.br/ws/${this.cep_input.value}/json`

            if (url !== this.url_atual){
                this.main(url)
            } else {
                window.alert('Você acabou de requisitar esse CEP')
            }

            this.url_atual = url

            event.preventDefault()
        })
    },

    main: function(url) {
        this.fazGET(url)
        this.GETtoJSON()
        this.escreverLinhas(this.cep_obj)
    },

    fazGET: function(url) {
        const request = new XMLHttpRequest()
        request.open('GET', url, false)
        request.send()

        this.cep_string = request.responseText
        console.log(this.cep_string)
    },

    GETtoJSON: function() {
        this.cep_obj = JSON.parse(this.cep_string)
    },

    escreverLinhas: function(cep_obj) {
        for (let propriedade in cep_obj) {
            if (cep_obj[propriedade] !== '') {
                let row = document.createElement('tr')
                let td1 = document.createElement('td')
                let td2 = document.createElement('td')

                td1.textContent = propriedade
                td2.textContent = cep_obj[propriedade]
                
                row.appendChild(td1)
                row.appendChild(td2)

                this.tbody.appendChild(row)
            }
        }
    }
}
