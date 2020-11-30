/** 
* initialData.
* @summary Faz uma requisição inicial, para pegar os primeiros 8 itens
* Nos itens oldPrice,installments, price, passo a função toLocaleString para converter para a moeda brasileira.
* @return Retorna vários itens dentro das divs e também um botão para fazer mais requisões.
*/

const array = []

const initialData = async () => {
  const apiData = `https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1`
  const allData = await fetch(apiData).then(response => response.json())
  document.getElementById("button_for_add_more_products").innerHTML +=
  
  `<div class="header_button_more_products">
    <button class="button_add_products" onclick="getData('${allData.nextPage}')">`
    +
      "Tem muito mais aqui. Vem ver!" 
    +
   "</button>"+
  "</div>"
  allData.products.map((item, index) => (
    document.getElementById("api_products").innerHTML +=
    "<div class='grid_items'>" +
     `<img src='${item.image}' alt='${item.name}'>` +
        "<div>" +
        `<h4>${item.name}</h4>`+
        `<h6 id="remove_in_mobile">${item.description}</h6>` +
        `<h6>De: ${item.oldPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h6>` +
        `<h5>Por: ${item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h5>` +
        `<h6>ou ${item.installments.count}x de ${item.installments.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h6>` +
        `<button onclick="alert('O produto foi comprado!')">Comprar</button>` +
      "</div>"+
    "</div>"
  )); 
}

/** 
* getData(nextPage).
* @summary Faz uma requisição para cada vez que clica no botão, por conta da const array global
* nos itens oldPrice,installments, price, passo a função toLocaleString para converter para a moeda brasileira.
* @return Retorna vários itens dentro das divs e também um botão para fazer mais requisões.
*/

const getData = async (nextPage) => {
  array.push(nextPage)
  const newData = await fetch(`https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=${array.length+1}`).then(response => response.json())
  newData.products.map((item) => (
    document.getElementById("api_products").innerHTML +=
    "<div class='grid_items'>" +
      `<img src='${item.image}' alt='${item.name}'>` +
      "<div>" +
        `<h4>${item.name}</h4>`+
        `<h6 id="remove_in_mobile">${item.description}</h6>` +
        `<h6>De: ${item.oldPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h6>` +
        `<h5>Por: ${item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h5>` +
        `<h6>ou ${item.installments.count}x de ${item.installments.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h6>` +
        `<button onclick="alert('O produto foi comprado!')">Comprar</button>` +
      "</div>"+
    "</div>"
  )); 
}

initialData()
