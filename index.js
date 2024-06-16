const lista_carros = document.getElementById("lista-carros");
const selecionarMarca = document.getElementById("marca")

async function lista() {
    fetch("../data/db.json")
        .then(res => res.json())
        .then(data => {
            let str = '';
            
            data.dados.forEach(carro => {
                str += `
                            <div class="card col-md-4" style="width: 22rem; margin: 20px;">
                                <img src="${carro.imagem}" class="card-img-top">
                                <div class="card-body">
                                    <h5 class="card-title">${carro.titulo}</h5>
                                    <h6 class="card-tittle" style="font-style: italic">Marca: ${carro.marca}</h6>
                                    <h6 class="card-text" style="font-style: italic">FIPE: R$ ${carro.preco}</h6>
                                    <p class="card-text" style="text-align: justify;">${carro.descricao}</p>
                                    <a class="btn btn-primary" target="_blank" href="${carro.link}">Visualizar</a>
                                </div>
                            </div>`;
            });
            lista_carros.innerHTML = str;
        })
        .catch(error => console.error("erro", error));
}

function filtrolista() {
    const input = document.getElementById("preco")
    let filtroMarca = selecionarMarca.value
    lista_carros.innerHTML = ''

    fetch("../data/db.json")
        .then(res => res.json())
        .then(data => {
            let str = '';
            data.dados.forEach(carro => {

                let preco_carro = parseFloat(carro.preco.replace(/\./g, '').replace(',', '.'));
                let preco_filtro = parseFloat(input.value.replace(/\./g, '').replace(',', '.')) || Infinity;

                if (input.value > 1164432.00) {
                    input.value = 1164432.00;
                }

                if (carro.marca.toUpperCase() == filtroMarca.toUpperCase() || filtroMarca == "all" && preco_carro <= preco_filtro || preco_filtro == "") {
                    if(preco_carro <= preco_filtro || preco_filtro == ""){
                    str += `<div class="card col-md-4" style="width: 22rem; margin: 20px;">
                    <img src="${carro.imagem}" class="card-img-top">
                    <div class="card-body">
                    <h5 class="card-title">${carro.titulo}</h5>
                    <h6 class="card-tittle" style="font-style: italic">Marca: ${carro.marca}</h6>
                    <h6 class="card-text" style="font-style: italic">FIPE: R$ ${carro.preco}</h6>
                    <p class="card-text" style="text-align: justify;">${carro.descricao}</p>
                    <a class="btn btn-primary" target="_blank" href="${carro.link}">Visualizar</a>
                    </div>
                    </div>
                    `
                    lista_carros.innerHTML = str;
                    }
                }
            })
        })
}

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('../data/db.json')
const cors = require('cors');

// Para permitir que os dados sejam alterados, altere a linha abaixo
// colocando o atributo readOnly como false.
const middlewares = jsonServer.defaults()

server.use(cors())
server.use(middlewares)
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running em http://localhost:3000/dados')
})