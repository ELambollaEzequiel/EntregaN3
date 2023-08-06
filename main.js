let cajasFila = document.getElementById("fila-cajas");
let caja = document.getElementById("caja");

// insertar productos en html
const generarCajas = (arr) => {
  cajasFila.innerHTML = "";
  for (const prod of arr) {
    cajasFila.innerHTML += `        <div class="card" id="caja">
    <img
      src="img/mediamodifier-Hijdo4O1iZU-unsplash (2).jpg"
      style="height: 600px"
      class="card-img-top"
      alt="..."
    />
    <div class="card-body">
      <h5 class="card-title" id="nombreProd">${prod.model}A15</h5>
      <p class="card-text" > 
      <strong>Especificaciones Tecnicas : </strong><br>
      <strong>Almacenamiento interno:</strong> ${prod.memoriaInterna} Gb<br>
      <strong>Camara Delantera: </strong>${prod.camaraDelantera} px <br>
      <strong>Camara Trasera : </strong>${prod.camaraTrasera} px <br>
      <strong id="precioProd">Precio :</strong> $ ${prod.price}
      </p>
      <button
      type="button"
      class="btn compra btn-secondary"
      id="${prod.id}"
      >
      Comprar
      </button>
    </div>
  </div>`;
  }
};

generarCajas(productos);

// carrito de Compras
let carro = JSON.parse(localStorage.getItem("carro")) || [];
let btnComprar = document.getElementsByClassName("compra");
let cantidadProdCarrito = document.getElementById("cantProdCarrito");
let totalCompra = "";
cantidadProdCarrito.innerText = carro.length;
totalCompra = carro.reduce(
  (acumulador, producto) => acumulador + producto.price,
  0
);
//mensaje de compra
const toastCompra = (prodNombre) => {
  Toastify({
    text: `Agrgaste al carrito : ${prodNombre} en 48hs llegara tu producto`,
    gravity: "bottom",
    position: "right",
    style: {
      background: "linear-gradient(to right, #0C134F, #D4ADFC)",
    },
    duration: 3000,
  }).showToast();
};
// pushear al arr carro
function agregarACarro(prod) {
  toastCompra(prod.model);
  carro.push(prod);
  cantidadProdCarrito.innerText = carro.length;
  totalCompra = carro.reduce(
    (acumulador, producto) => acumulador + producto.price,
    0
  );
  console.table(carro);
  document.getElementById("tablabody").innerHTML += `
  <tr>
    <td>${prod.id}</td>
    <td>${prod.model}</td>
    <td>${prod.price}</td>
  </tr>`;
  document.getElementById("total").innerText =
    "Total a pagar $: " + totalCompra;
  localStorage.setItem("carro", JSON.stringify(carro));
}
// for (const btn of btnComprar) {
//   btn.addEventListener("click", () => {
//     const prodACarro = productos.find((prod) => prod.id == btn.id);
//     agregarACarro(prodACarro);
//     agregarIdCompra(productos);
//   });
// }
//agregar id a los botnes y enciar al carrito
const agregarIdCompra = (arr) => {
  for (const btn of btnComprar) {
    btn.addEventListener("click", () => {
      const prodACarro = arr.find((prod) => prod.id == btn.id);
      agregarACarro(prodACarro);
    });
  }
};
agregarIdCompra(productos);

//filtrar por marca
let formulario = document.getElementById("formulario");
let botonesMarca = document.getElementsByClassName("btnMarca");
console.table(botonesMarca);
// validacion del id
let marca = "";
const validar = (btn) => {
  switch (btn.id) {
    case "btnSmasung":
      marca = "samsung";
      break;
    case "btnMotorola":
      marca = "motorola";
      break;
    case "btnXiaomi":
      marca = "xiaomi";
      break;
    case "btnIphone":
      marca = "apple";
      break;
    default:
      break;
  }
};
//btn funcion
for (const btn of botonesMarca) {
  console.log("EL boton " + btn.id);
  btn.addEventListener("click", () => {
    validar(btn);
    const filtroMarca = productos.filter((filtro) => filtro.marca == marca);
    console.table(filtroMarca);
    generarCajas(filtroMarca);
    agregarIdCompra(filtroMarca);
    console.log(marca);
  });
}
//Filtrar por precio
let inputMax = document.getElementById("input-Max");
let inputMin = document.getElementById("input-Min");
let botonSend = document.getElementById("btnSend");
let botonRemove = document.getElementById("btnRemove");

let max = "";
let min = "";

//boton send de precio
botonSend.addEventListener("click", () => {
  console.log(min);
  max = inputMax.value;
  min = inputMin.value;
  alert("monto Min : " + min + "monto Max : " + max);
  const filtrarXPrecio = productos.filter(
    (filtro) => filtro.price > min && filtro.price < max
  );
  generarCajas(filtrarXPrecio);
  agregarIdCompra(filtrarXPrecio);
  inputMin.value = "";
  inputMax.value = "";
});
// podria hacer un if en el boton sen de precio para que si se filtro x categoria ademas filtrar por precio
//boton remove
botonRemove.addEventListener("click", () => {
  console.log(min);
  generarCajas(productos);
  agregarIdCompra(productos);
});

// Boton Buscar Procutos

let inputBuscar = document.getElementById("input-buscar-prod");
let btnBuscar = document.getElementById("btn-buscar-prod");
console.log(inputBuscar);
console.dir(btnBuscar);
let resultadoInput = "";

btnBuscar.addEventListener("click", () => {
  resultadoInput = inputBuscar.value;
  console.log(resultadoInput);
  const buscarProd = productos.filter((prod) =>
    prod.model.toLowerCase().includes(resultadoInput)
  );
  generarCajas(buscarProd);
  agregarIdCompra(buscarProd);
  inputBuscar.value = "";
});

// carrito compra

let columna3 = document.getElementById("columna-3");
let carritoCompra = document.getElementById("carrito-compra");
let columna2 = document.getElementById("columna-2");
//abbrir y cerrar carito
let carritoEstado = "cerrado";
let btnCarrito = document.getElementById("btnProdCarrito");
btnCarrito.addEventListener("click", () => {
  carritoEstado = "open";

  columna2.classList.replace("col-10", "col-8");
  columna3.classList.add("col-2");
  console.log(carritoEstado);
  if (carritoEstado == "open") {
    columna3.innerHTML = `           <div class="container-fluid">
<div class="row">
<h4>Tu carrito:</h4>
<table class="table table-striped">
    <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
        </tr>
    </thead>
    <tbody id="tablabody">
        <!-- aqui tabla carrito -->
    </tbody>
</table>
<h4 id="total">Total a pagar $:</h4>
</div>
<button
class="btn btn-outline-secondary btnMaxMin"
type="button"
id="seguirComprando"
>
Seguir Comprando
</button>
<button
class="btn btn-outline-secondary btnMaxMin"
type="button"
id="btnFinalizarCompra"
>
Finalizar Compra
</button>
</div>`;
    for (const prod of carro) {
      document.getElementById("tablabody").innerHTML += `
  <tr>
    <td>${prod.id}</td>
    <td>${prod.model}</td>
    <td>${prod.price}</td>
  </tr>
  `;
      document.getElementById("total").innerText =
        "Total a pagar $: " + totalCompra;
    }
  } else {
    carritoEstado = "cerrado";
  }
  let btnSeguirCompra = document.getElementById("seguirComprando");
  btnSeguirCompra.addEventListener("click", () => {
    columna3.classList.remove("col-2");
    columna2.classList.replace("col-8", "col-10");
    columna3.innerHTML = "";
    carritoEstado = "cerrado";
    console.log(carritoEstado);
  });
  //
  let btnFinalizarCompra = document.getElementById("btnFinalizarCompra");
  btnFinalizarCompra.addEventListener("click", () => {
    carro = [];
    document.getElementById("tablabody").innerHTML = ``;
    document.getElementById("total").innerText = `Total a pagar $: `;
    localStorage.removeItem("carro");
    carritoEstado = "cerrado";
    columna3.classList.remove("col-2");
    columna2.classList.replace("col-8", "col-10");
    columna3.innerHTML = "";

    cantidadProdCarrito.innerText = carro.length;
    console.log(carritoEstado);
  });
});

//btn seguir comprando y cerrar carrito
