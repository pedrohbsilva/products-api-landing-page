const array = []

const initialData = async () => {
  const apiData = `https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1`
  const allData = await fetch(apiData).then(response => response.json())
  document.getElementById("button_for_add_more_products").innerHTML +=
  
  `<div class="header_button_more_products">
    <button class="button_add_products" onclick="getData('${allData.nextPage}')">`
    +
      "Ainda mais produtos aqui!" 
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
        `<button>Comprar</button>` +
      "</div>"+
    "</div>"
  )); 
}

const getData = async (nextPage) => {
  array.push(nextPage)
  const newData = await fetch(`https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=${array.length+1}`).then(response => response.json())
  console.log(newData)
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
        `<button>Comprar</button>` +
      "</div>"+
    "</div>"
  )); 
}

const createButtonsForHeader = () => {
  const createObjectForButtons = [
    {text: "Conheça a Linx", redirect: "https://www.linx.com.br/nossa-historia/", send: "_blank"},
    {text: "Ajude o algoritmo", redirect: "#algorithm", send: ""},
    {text: "Seus produtos", redirect: "#api_products", send: ""},
    {text: "Compartilhe", redirect: "#share", send: ""},
  ]
  createObjectForButtons.map((item)=>(
    document.getElementById("buttons").innerHTML +=
      `<a class="header_style_for_a" href="${item.redirect}" target="${item.send}">`+
      item.text +
      `</a>`
  ))
} 

createButtonsForHeader()
initialData()
