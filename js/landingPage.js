/** 
* initialData.
* @summary Faz uma requisição inicial, para pegar os primeiros 8 itens
* Nos itens oldPrice,installments, price, passo a função toLocaleString para converter para a moeda brasileira.
* 
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
        `<button onclick="alert('O produto foi comprado!')">Comprar</button>` +
      "</div>"+
    "</div>"
  )); 
}

/** 
* createButtonsForHeader().
* @summary Cria varíos botões a partir do array de objetos
* @return Retorna várias tags "a" do html com dados respectivos.
*/

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

/** 
* validateForm(param).
* @summary recebe um parametro para saber qual dos formulários devem ser validados
* @return É retornado em cada fiz específico, uma respectiva mensagem com o problema 
* da mensagem para ser resolvido. 
*/

const validateForm = (param) =>{
  if(param === 'firstForm'){
    document.getElementById('form_error_name').innerHTML = '';
    document.getElementById('form_error_email').innerHTML = ''; 
    document.getElementById('form_error_cpf').innerHTML = ''; 
    document.getElementById('form_error_gender').innerHTML = '';
    
    if(document.getElementById('name').value === '') {
        document.getElementById('form_error_name').innerHTML += 'É preciso informar o nome.'
    }

    const email = document.getElementById('e-mail').value;
    const check = email.indexOf('@');
    const checkCom = email.indexOf('.com');
    if(check <= 0 || checkCom <=0 -1) {
        document.createElement('br');
        document.getElementById('form_error_email').innerHTML += 'Informe um email válido.'
    }

    const cpf = document.getElementById('cpf').value;
    if(typeof(cpf) != 'number' && cpf === ''){
        document.getElementById('form_error_cpf').innerHTML = 'O cpf deve ser composto apenas por números.'
    }
    if(cpf.length !== 11){
      document.getElementById('form_error_cpf').innerHTML = 'O cpf deve ter 11 dígitos.' 
    }
    if(document.getElementById('male').checked === false && document.getElementById('female').checked === false){
        document.getElementById('form_error_gender').innerHTML = 'Escolha um gênero.'
    }
  }
  if(param === 'secondForm'){
    document.getElementById('form_error_friendname').innerHTML = '';
    document.getElementById('form_error_friendemail').innerHTML = ''; 

    if(document.getElementById('friendName').value === '') {
      document.getElementById('form_error_friendname').innerHTML += 'É preciso informar o nome.'
    }
    const email = document.getElementById('friendEmail').value;
    const check = email.indexOf('@');
    const checkCom = email.indexOf('.com');
    if(check <= 0 || checkCom <=0 -1) {
        document.createElement('br');
        document.getElementById('form_error_friendemail').innerHTML += 'Informe um email válido.'
    }
  }
}

createButtonsForHeader()
initialData()
