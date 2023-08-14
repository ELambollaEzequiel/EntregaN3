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
      class="form-control"
      placeholder=""
      style="width:70px"
      id="cantidadProd"
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
  const validarId = carro.some((prod) => prod.id == producto.id);

  if (validarId == true) {
    alert("son iguales");
    producto.cantidad + 1;
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
    carro.push(producto);
    producto.cantidad++;
    cantidadProdCarrito.innerText = carro.length;
    totalCompra = carro.reduce(
      (acumulador, producto) =>
        acumulador + producto.precio * producto.cantidad,
      0
    );
    document.getElementById("tablabody").innerHTML += `
    <tr>
      <td>${producto.cantidad}</td>
      <td>${producto.modelo}</td>
      <td>${producto.precio}</td>
      <td><button type="button" class="btn btn-danger" onClick="borrarProd(${producto.id})">x</button></td>
    
      <td><button type="button" onClick="deleteProd(${producto.id})"class="btn btn-outline-danger">Danger</button></td>
    </tr>`;
    document.getElementById("total").innerText =
      "Total a pagar $: " + totalCompra;
    console.table(carro);
    //renderizado de prod individuales , con carrito abierto
    localStorage.setItem("carro", JSON.stringify(carro));
  }
};
// document.getElementById("tablabody").innerHTML += `
// <tr>
//   <td>${producto.cantidad}</td>
//   <td>${producto.modelo}</td>
//   <td>${producto.precio}</td>
//   <td><button type="button" class="btn btn-danger" onClick="borrarProd(${producto.id})">x</button></td>
// </tr>`;

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
let columna2 = document.getElementById("columna-2");
//abbrir y cerrar carito
let carritoEstado = "cerrado"; //estado actual del carrito
//abrir carrito y renderizar productos
let btnCarrito = document.getElementById("btnProdCarrito");
btnCarrito.addEventListener("click", () => {
  let columna3 = document.getElementById("columna-3");
  carritoEstado = "open";
  //modificar tamaño del main para abrir el carrito
  columna2.classList.replace("col-10", "col-7");
  //abrir carrito
  columna3.classList.add("col-3");
  console.log(carritoEstado);
  //renderizar el carrito siempre y cuando el estado del carro sea "open"
  if (carritoEstado == "open") {
    columna3.innerHTML = `           <div class="container-fluid">
<div class="row">
<h4>Tu carrito:</h4>
<table class="table table-striped">
    <thead>
        <tr>
            <th>Cant</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th></th>
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
    //renderizado de los prod de carro y del total en el caso de que haya productos guardados
    for (const prod of carro) {
      document.getElementById("tablabody").innerHTML += `
  <tr>
    <td>${prod.cantidad}</td>
    <td>${prod.modelo}</td>
    <td>${prod.precio}</td>
    <td><button type="button" class="btn btn-danger" onClick="borrarProd(${prod.id})">x</button></td>

    <td><button type="button" onClick="deleteProd(${prod.id})"class="btn btn-outline-danger">Danger</button></td>
  </tr>
  `;

      document.getElementById("total").innerText =
        "Total a pagar $: " + totalCompra;
      //boton eliminar
    }
  } else {
    carritoEstado = "cerrado";
  }
  //cerrar carrito de compra y seguir comprando
  let btnSeguirCompra = document.getElementById("seguirComprando");
  btnSeguirCompra.addEventListener("click", () => {
    //cerrado de carrito , removiendo las clases de bootstrap y remplazando los tamaños del main
    columna3.classList.remove("col-3");
    columna2.classList.replace("col-7", "col-10");
    columna3.innerHTML = "";
    carritoEstado = "cerrado"; //cerrar carrito para que no se ejecute el renderizado del carro
    console.log(carritoEstado);
  });
  //btn finalizar compra ,cerrar y vaciar carrrito
  let btnFinalizarCompra = document.getElementById("btnFinalizarCompra");
  btnFinalizarCompra.addEventListener("click", () => {
    //vaciar array carro y el renderizado

    document.getElementById("tablabody").innerHTML = ``;
    document.getElementById("total").innerText = `Total a pagar $: `;
    localStorage.removeItem("carro");
    carritoEstado = "cerrado";
    columna3.classList.remove("col-3");
    columna2.classList.replace("col-7", "col-10");
    columna3.innerHTML = "";
    //alert de sweet alert ( se que la profe dice que no incluyamos dos librerias que hacen lo mismo pero me servia en modo ilustrativo)
    console.log(carritoEstado);
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
      }
    });
  });
});
