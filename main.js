let cajasFila = document.getElementById("fila-cajas");
let caja = document.getElementById("caja");

// renderizar productos
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
      <h5 class="card-title" id="nombreProd">${prod.modelo}A15</h5>
      <p class="card-text" > 
      <strong id="precioProd">Precio :</strong> $ ${prod.precio}
      <input
      type="number"
      class=" cantidadProd form-control"
      placeholder=""
      style="width:70px"
      id="cantProd"
    />
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
//renderizado de cant de productos (primer instancia)
cantidadProdCarrito.innerText = carro.length;
// renderizado total de compra , con carro en 0
totalCompra = carro.reduce(
  (acumulador, producto) => acumulador + producto.price,
  0
);
//mensaje de compra por prod
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
const validarCarro = (producto) => {
  //validando producto con el mismo id de un producto en carro
  const validarId = carro.some((prod) => prod.id == producto.id);

  if (validarId == true) {
    alert("son iguales");
    producto.cantidad = producto.cantidad + 1;
    toastCompra(producto.modelo);
    cantidadProdCarrito.innerText = carro.length;
    totalCompra = carro.reduce(
      (acumulador, producto) =>
        acumulador + producto.precio * producto.cantidad,
      0
    );

    //boton eliminar
    console.table(carro);
    //renderizado de prod individuales , con carrito abierto
    document.getElementById("total").innerText =
      "Total a pagar $: " + totalCompra;
    localStorage.setItem("carro", JSON.stringify(carro));
  } else {
    alert("no son iguales");
    toastCompra(producto.modelo);
    carro.push(producto);
    producto.cantidad = producto.cantidad + 1;
    cantidadProdCarrito.innerText = carro.length;
    totalCompra = carro.reduce(
      (acumulador, producto) =>
        acumulador + producto.precio * producto.cantidad,
      0
    );

    document.getElementById("tablabody").innerHTML = "";
    for (const prod of carro) {
      document.getElementById("tablabody").innerHTML += `
  <tr>
    <td>${prod.cantidad}</td>
    <td>${prod.modelo}</td>
    <td>${prod.precio}</td>
    <td><button type="button" class="btn btn-danger" onClick="borrarProd(${prod.id})">x</button></td>
  </tr>
  `;
    }
    document.getElementById("total").innerText =
      "Total a pagar $: " + totalCompra;
    console.table(carro);
    //renderizado de prod individuales , con carrito abierto
    localStorage.setItem("carro", JSON.stringify(carro));
  }
};
const inputCantidad = () => {
  let cantidadProd = document.getElementsByClassName("cantidadProd");
  console.table("hola" + cantidadProd);
  for (const cant of cantidadProd) {
    if (cant != 0) {
      alert("hola");
    } else {
      alert("no esta trola");
    }
  }
};

const renderizarProductos = () => {};
//agregar id a los botnes y enviar al carrito
const agregarIdComprar = (arr) => {
  for (const btn of btnComprar) {
    btn.addEventListener("click", () => {
      const prodACarro = arr.find((prod) => prod.id == btn.id);
      validarCarro(prodACarro);
    });
  }

  //filtrar por marca
};
agregarIdComprar(productos);

let formulario = document.getElementById("formulario");
let botonesMarca = document.getElementsByClassName("btnMarca");
console.table(botonesMarca);
// validacion del id segun la marca
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
//btn funcion para filtrar x marca
for (const btn of botonesMarca) {
  console.log("EL boton " + btn.id);
  btn.addEventListener("click", () => {
    validar(btn);
    const filtroMarca = productos.filter((filtro) => filtro.marca == marca);
    console.table(filtroMarca);
    generarCajas(filtroMarca);
    agregarIdComprar(filtroMarca);
    console.log(marca);
  });
}
//Filtrar por precio maximo y minimo
let inputMax = document.getElementById("input-Max");
let inputMin = document.getElementById("input-Min");
let botonSend = document.getElementById("btnSend");
let botonRemove = document.getElementById("btnRemove");

let max = "";
let min = "";

//boton send de filtro precio
botonSend.addEventListener("click", () => {
  console.log(min);
  max = inputMax.value;
  min = inputMin.value;
  alert("monto Min : " + min + "monto Max : " + max);
  const filtrarXPrecio = productos.filter(
    (filtro) => filtro.precio > min && filtro.precio < max
  );
  generarCajas(filtrarXPrecio);
  agregarIdComprar(filtrarXPrecio);
  inputMin.value = "";
  inputMax.value = "";
});
//boton remover filtros
botonRemove.addEventListener("click", () => {
  console.log(min);
  generarCajas(productos);
  agregarIdComprar(productos);
});

// Boton Buscar Procutos por nombre

let inputBuscar = document.getElementById("input-buscar-prod");
let btnBuscar = document.getElementById("btn-buscar-prod");
console.log(inputBuscar);
console.dir(btnBuscar);
let resultadoInput = "";

btnBuscar.addEventListener("click", () => {
  resultadoInput = inputBuscar.value;
  console.log(resultadoInput);
  const buscarProd = productos.filter((prod) =>
    prod.modelo.toLowerCase().includes(resultadoInput)
  );
  generarCajas(buscarProd);
  agregarIdComprar(buscarProd);
  inputBuscar.value = "";
});

// carrito compra

let carritoCompra = document.getElementById("carrito-compra");

let btnCarrito = document.getElementById("btnProdCarrito");

console.log(btnCarrito);
btnCarrito.addEventListener("click", () => {
  console.log("click");
  //renderizado de los prod de carro y del total en el caso de que haya productos guardados
  for (const prod of carro) {
    document.getElementById("tablabody").innerHTML += `
  <tr>
    <td>${prod.cantidad}</td>
    <td>${prod.modelo}</td>
    <td>${prod.precio}</td>
    <td><button type="button" class="btn btn-danger" onClick="borrarProd(${prod.id})">x</button></td>
  </tr>
  `;

    document.getElementById("total").innerText =
      "Total a pagar $: " + totalCompra;
    //boton eliminar
  }
});
//cerrar carrito de compra y seguir comprando

//btn finalizar compra ,cerrar y vaciar carrrito
let btnFinalizarCompra = document.getElementById("btnFinalizarCompra");
btnFinalizarCompra.addEventListener("click", () => {
  //vaciar array carro y el renderizado
  //alert de sweet alert ( se que la profe dice que no incluyamos dos librerias que hacen lo mismo pero me servia en modo ilustrativo)
  Swal.fire({
    title: "VERIFIQUE ESTOS DATOS?",
    text: `Usted posee : ${carro.length} de prod en carro , por un total de : ${totalCompra}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "confirmar!",
  }).then((result) => {
    //da un mensaje de succes y en caso de que este bien sigue con el vaciado del carrito y del contador de prod
    if (result.isConfirmed) {
      Swal.fire(
        "Tu carrito a sido validado con exito",
        "En unos momentos te enviaremos el link de pago",
        "success"
      );
      carro = [];
      cantidadProdCarrito.innerText = carro.length;
      for (const producto of productos) {
        producto.cantidad = 0;
      }
    }
  });
});
