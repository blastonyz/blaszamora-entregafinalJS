//constructor de objetos,para stock de propductos
class Stock{
    constructor(id,producto,precio,disponibles,imagen){
    this.id = id;            
    this.producto = producto;
    this.precio = precio;
    this.disponibles = disponibles;
    this.imagen = imagen;
    }
    restaDisponible(){
        this.disponibles = this.disponibles - 1;
    }
}   

const stock1 = new Stock(0,"Aceite",500,20,'prod.png') ;
const stock2 = new Stock(1,"Cera",350,25,'prod1.jpg');
const stock3 = new Stock(2,"Shampoo",400,25,'prod3.png');
const stock4 = new Stock(3,"Jabon",200,40,'prod.png');
const stock5 = new Stock(4,"Peine",370,20,'prod1.jpg');

const arrayStock = [stock1,stock2,stock3,stock4,stock5];
//array para instanciar las compras
const arrayCarro = [];
//array para instanciar precios de productos comprados
const arrayTotal = [];


//funcion para crear las card en el index

const cardProductos  = (listaProductos) => {
    for ( e of listaProductos) {
         
      let tarjeta = document.createElement("div")
         tarjeta.innerHTML = `<div class="card mb-3" style="max-width: 540px;">
         <div class="row g-col-6 g-col-6">
           <div class="col-md-6">
             <img src="./fotos/${e.imagen}" class="img-fluid rounded-start" alt="...">
           </div>
           <div class="col-md-6">
             <div class="card-body">
               <h5 class="card-title">${e.producto}</h5>
               <h5 class="card-title">$${e.precio}</h5>
             </div>
          
             <input type = "button" class = "btn btn-primary" value="Comprar" onclick="agregaCarrito(${e.id})">
              
           </div>
         </div>
       </div>
       `
      tarjeta.classList.add("productos")
       document.body.append(tarjeta);
    }
}

cardProductos(arrayStock);
//constructor de objetos instanciados con codigo de producto y cantidad
class objProd {
    constructor(codigo,cantidad){
      this.codigo = codigo,
      this.cantidad = cantidad;      
    }
    sumaStock(){
      this.cantidad = this.cantidad + 1
    }
}
//funcion instanciadora,busca el elemento si lo encuentra, suma 1 unidad,si no lo encuentra lo instancia

function agregaCarrito(prod){
  let existe = arrayCarro.find(e=> e.codigo == prod);
  
  if(existe != undefined){
    let posicion = arrayCarro.findIndex(elem => elem.codigo == existe.codigo);
    arrayCarro[posicion].sumaStock()
    compraHecha();
  }
  else{ const agregado = new objProd(prod,1);
        arrayCarro.push(agregado); 
        compraHecha();   
  }
}

function compraHecha (){
  swal({
    icon: "success",
    title: "Agregado 👍"
  });
}
function verCarro (){
  document.body.innerHTML = ``

  for(obj of arrayCarro){
    let carro = document.createElement("div")
    let datoStock = arrayStock.find(elem => elem.id == obj.codigo)

    carro.innerHTML = `<div class="card" style="width: 18rem;">
    <img src="./fotos/${datoStock.imagen}" class="card-img-top" alt="">
    <div class="card-body">
    <h5 class="card-title"> ${datoStock.producto}</h5>
    <p class="card-text"> Llevas ${obj.cantidad} unidades</p>
    </div>
    </div>`
    let totalParcial = obj.cantidad * datoStock.precio;
    arrayTotal.push(totalParcial);//pushea en otro array auxiliar, los totales parciales por producto
document.body.append(carro)
  }
  let botonTotal = document.createElement("div");
botonTotal.innerHTML = `<input type = "button" class = "btn btn-primary" value="Comprar" onclick="totalPurchase(${e.id})">`;
document.body.append(botonTotal);
console.table(arrayCarro);
const elegidos = JSON.stringify(arrayCarro)//almacena el carrito de compras
localStorage.setItem("deseos",elegidos);
}

let botonVer = document.createElement("div");
botonVer.innerHTML = `<input type = "button" class = "btn btn-primary" value="Ver Carrito" onclick="verCarro(${e.id})">`;
document.body.append(botonVer);

//calcula el total de los valores del array auxiliar

function totalPurchase(){

    const sumatoria = arrayTotal.reduce((acc,pa)=>
    {
     return  acc+pa;
    }
    )
    let factura = document.createElement("div")
    factura.innerHTML = `<h1> Total $${sumatoria} </h1>`
    document.body.append(factura);
    totalFinal();
  }

 const recuBtn = document.getElementById("recu")
 recuBtn.innerHTML = `<input type = "button" class = "btn btn-primary" value="Recuperar Carrito" onclick="recuperar()">` 
//muestra el carrito guardado
function recuperar(){
         const recuperadosJSON = localStorage.getItem("deseos");
         const recuperados =  JSON.parse(recuperadosJSON);
         console.table(recuperados);
         const conte = document.getElementById("recu")
         conte.innerHTML = `<h1>Anteriormente te habia gustado:</h1>`
         
         for(objs of recuperados){
          let carroViejo = document.createElement("div")
          let datoStock = arrayStock.find(elem => elem.id == objs.codigo)
      
          carroViejo.innerHTML = `
          <div class="card" style="width: 18rem;">
          <img src="./fotos/${datoStock.imagen}" class="card-img-top" alt="">
          <div class="card-body">
          <h5 class="card-title"> ${datoStock.producto}</h5>
          <p class="card-text"> Llevas ${objs.cantidad} unidades</p>
          </div>
          </div>`
          let totalParcial = objs.cantidad * datoStock.precio;
          arrayTotal.push(totalParcial);
      document.body.append(carroViejo) 
}
}

const urlCotizacion = "https://criptoya.com/api/dolar";
const divCoti = document.getElementById("divCoti");

setInterval(() => {
  fetch(urlCotizacion)
  .then(response => response.json())
  .then(({oficial,blue,ccb,ccl})=>{
    divCoti.innerHTML =`<h2>Cotizaciones Actuales</h2>
    <p>Dolar Oficial:  ${oficial}</p>
    <p>Dolar Blue:  ${blue}</p>
    <p>Dolar Bolsa:  ${ccb}</p>
    <p>Contado con Liquidacion:  ${ccl}</p>
    ` 
  }
  
  )
  .catch(error =>console.error(error));
}, 2000);

function  totalFinal(){
  setTimeout(() => {
    swal({
      icon: "success",
      title: "compra exitosa!",
    });
  }, 500);
}