using { cuid } from '@sap/cds/common';

namespace Axios;

entity Ordenes
{
    key ID: Integer;
    shipVia: Integer;
    shipCity: String(50);
    shipCountry: String(50);
    orderDate_ShipRegion: String(100);
    producto: Association to many OrderDetails on producto.orden =$self;
};

entity Productos
{
    key ID: Integer;
    productName: String(50);
    unitPrice: Decimal;
    unitsInStock: Integer;
    unitsOnOrder: Integer;
    orden: Association to many OrderDetails on orden.producto =$self;
}

entity OrderDetails : cuid
{
    key orden: Association to Ordenes;
    key producto: Association to Productos;
    unitPrice: Decimal;
    quantity: Integer;
    discount: Decimal;
};