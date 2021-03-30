using { Axios as my } from '../db/schema';

@(path: '/AuthService')
service ApiService @(requires:'authenticated-user')
{
    entity Ordenes as projection on my.Ordenes;
    entity Productos as projection on my.Productos;
    entity OrderDetails as projection on my.OrderDetails;

    entity Detalle_Producto as select from OrderDetails
    {
        producto.unitPrice as Precio_Unidad,
        quantity as Cantidad,
        discount as Descuento,
        producto.productName as Nombre_Producto,
        producto.unitPrice as Precio_Unitario,
        producto.unitsInStock as Unidades_En_Stock,
        producto.unitsOnOrder as Unidades_En_Orden
    };

    action eliminarProducto(producto : Productos) returns String;
    action reponerProducto(producto : Productos, stock : Productos : unitsInStock) returns String;
}

@(path: '/GeneralService')
service GeneralService @(_requires: 'Scope1')
{
    entity Ordenes as projection on my.Ordenes;
    entity Productos as projection on my.Productos;
    entity OrderDetails as projection on my.OrderDetails;

    entity Detalle_Producto as select from OrderDetails
    {
        producto.unitPrice as Precio_Unidad,
        quantity as Cantidad,
        discount as Descuento,
        producto.productName as Nombre_Producto,
        producto.unitPrice as Precio_Unitario,
        producto.unitsInStock as Unidades_En_Stock,
        producto.unitsOnOrder as Unidades_En_Orden
    };

    action eliminarProducto(producto : Productos) returns String;
    action reponerProducto(producto : Productos, stock : Productos : unitsInStock) returns String;
}

@(path: '/AdminService')
service AuthService @(requires:'Scope1')
{
    entity Ordenes as projection on my.Ordenes;
    entity Productos as projection on my.Productos;
    entity OrderDetails as projection on my.OrderDetails;

    entity Detalle_Producto as select from OrderDetails
    {
        producto.unitPrice as Precio_Unidad,
        quantity as Cantidad,
        discount as Descuento,
        producto.productName as Nombre_Producto,
        producto.unitPrice as Precio_Unitario,
        producto.unitsInStock as Unidades_En_Stock,
        producto.unitsOnOrder as Unidades_En_Orden
    };

    action eliminarProducto(producto : Productos) returns String;
    action reponerProducto(producto : Productos, stock : Productos : unitsInStock) returns String;
}