const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },
  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },
  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },
  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },
  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];


const result = document.getElementById('result-container');
const searchedId = document.getElementById('id-pizza');
const btnSearch = document.getElementById('search');

const templeteMessage = (message) =>{
  return `<p class="error-message"> ${ message }</p> `;
}

const createCardTemplate = (pizza) =>{
  return `
    <div class='item-container'>
      <img src='${ pizza.imagen }'>
      <div class='description'>
        <h2 class='title'> ${ pizza.nombre } </h2>
        <p>Ingredientes: </p>
        <ul>
          
          ${ pizza.ingredientes.map(ingrediente =>{
              return `<li>${ ingrediente }</li>` 
            }
          ).join('') }
        </ul>
        <div class='block'>
          <p class='id'> ID: ${ pizza.id } </p>
          <span> $ ${ pizza.precio }</span>
        </div>
      </div>
    </div>  
  `
}

const searchPizzaByID = (id) =>{
  resultArray = pizzas.filter(pizza => {
    if(id === pizza.id){
      //console.log(pizza);
      return pizza;
    }
  });
  return resultArray[0]
}

const savePizza = (pizza) =>{
  localStorage.setItem('pizza', JSON.stringify(pizza));
}

const getPizza = () =>{
  return JSON.parse(localStorage.getItem('pizza'));
}

const startApp = () =>{
  let data = getPizza();
  if(data){
    result.innerHTML = createCardTemplate(data);
  }
}

startApp();

btnSearch.addEventListener('click', ()=>{
  let searchID = parseInt(searchedId.value);
  
  if(searchID){
    let resultPizza = searchPizzaByID(searchID);
    
    if(resultPizza){
      result.innerHTML = createCardTemplate(resultPizza);
      savePizza(resultPizza);
    }
    else{
      message = ` No tenemos registrado ninguna pizza con el ID ${searchID} `;
      result.innerHTML = templeteMessage(message);
      //result.innerHTML = `<p class="error-message"> No tenemos registrado ninguna pizza con el ID ${searchID}.</p>`
    }     
  }
  else{
    message = "Por favor ingrese un numero para buscar pizzas";
    //result.innerHTML = '<p class="error-message"> Por favor ingrese un numero para buscar pizzas </p>'
    result.innerHTML = templeteMessage(message)
  }
})