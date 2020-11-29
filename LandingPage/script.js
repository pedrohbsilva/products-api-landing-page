const array = []

const initialData = async () => {
  const apiData = `https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1`
  const allData = await fetch(apiData).then(response => response.json())
  document.getElementById("teste1").innerHTML +=
  `<button class="button_more_products" onclick="getData('${allData.nextPage}')">` +
  "Teste" +
  "</button>"

  allData.products.map((item, index) => (
    document.getElementById("teste").innerHTML +=
    "<div class='grid_items'>" +
     `<img src='${item.image}' alt='${item.name}'>` +
      `<h4>${item.name}</h4>`+
      `<h5>${item.description}</h5>` +
      `<h6>${item.oldPrice}</h6>` +
      `<h5>${item.price}</h5>` +
      `<h6>ou ${item.installments.count} de ${item.installments.value}</h6>` +
      `<button>Comprar</button>` +
    "</div>"
  )); 
}

const getData = async (nextPage) => {
  array.push(nextPage)
  const newData = await fetch(`https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=${array.length+1}`).then(response => response.json())

  newData.products.map((item) => (
    document.getElementById("teste").innerHTML +=
    "<div class='grid_items'>" +
     `<img src='${item.image}' alt='${item.name}'>` +
      `<h4>${item.name}</h4>`+
      `<h5>${item.description}</h5>` +
      `<h6>${item.oldPrice}</h6>` +
      `<h5>${item.price}</h5>` +
      `<h6>ou ${item.installments.count} de ${item.installments.value}</h6>` +
      `<button>Comprar</button>` +
    "</div>"
  )); 
}

initialData()

