const productos = [];

class producto {
  constructor(id, modelo, precio, marca) {
    this.id = id;
    this.model = modelo;
    this.price = precio;
    this.marca = marca;
  }
  mostrar() {
    alert(
      "El producto que usted ingreso: " +
        this.modelo +
        " su precio es de : $" +
        this.precio
    );
  }
}

const crearProducto = (id, modelo, price, marca) => {
  let prductoIngreso = new producto(id, modelo, price, marca);
  let pushear = productos.push(prductoIngreso);
  return pushear;
};

crearProducto(1, "Samsung galaxy", 20450, "samsung");
crearProducto(2, "Moto e 20 ", 37500, "motorola");
crearProducto(3, "Iphone Xr3", 245000, "apple");
crearProducto(4, "Xiaomi Redmi note 35", 87000, "xiaomi");
crearProducto(5, "Xiaomi Redmi note 35", 87000, "xiaomi");
console.table(productos);
