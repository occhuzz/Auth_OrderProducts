const cds = require('@sap/cds')
const axios = require('axios');

module.exports = cds.server

cds.on('served', async()=>{
    const { Productos, Ordenes, OrderDetails } = cds.entities;
    
    //-----------------------------------------------------------------------------
    //Productos
    await axios.get('https://services.odata.org/Experimental/Northwind/Northwind.svc/Products?$orderby=ProductID')
    .then(async function(response)
    {            
        let resultado = response.data.value;
        let arrayResultados = []
        
        resultado.forEach(element =>
        {
            arrayResultados.push
            ({
                ID: element.ProductID,
                productName: element.ProductName,
                unitPrice: element.UnitPrice,
                unitsInStock: element.UnitsInStock,
                unitsOnOrder: element.UnitsOnOrder,
            });
        });
        await cds.run(INSERT.into(Productos).entries(arrayResultados));
        
        console.log("--------------PRODUCTOS CARGADOS----------------------");
        return "--------------PRODUCTOS CARGADOS----------------------";
    })
    .catch(async function(err)
    {
        console.log("Error");
        console.log(err);
    })

    //-----------------------------------------------------------------------------
    //Ordenes
    await axios.get('https://services.odata.org/Experimental/Northwind/Northwind.svc/Orders?$orderby=OrderID')
    .then(async function(response)
    {            
        let resultado = response.data.value;
        let arrayResultados = []
        
        resultado.forEach(element =>
        {
            arrayResultados.push
            ({
                ID: element.OrderID,
                shipVia: element.ShipVia,
                shipCity: element.ShipCity,
                shipCountry: element.ShipCountry,
                orderDate_ShipRegion: element.OrderDate + " / " + element.ShipRegion,
            });
        });
        await cds.run(INSERT.into(Ordenes).entries(arrayResultados));
        
        console.log("--------------ORDENES CARGADAS----------------------");
        return "--------------ORDENES CARGADAS----------------------";
    })
    .catch(async function(err)
    {
        console.log("Error");
        console.log(err);
    })

    //-----------------------------------------------------------------------------
    //OrderDetails
    await axios.get('https://services.odata.org/Experimental/Northwind/Northwind.svc/Order_Details?$filter=ProductID lt 20 and OrderID lt 10447')
    .then(async function(response)
    {            
        let resultado = response.data.value;
        let arrayResultados = []
        
        resultado.forEach(element =>
        {
            arrayResultados.push
            ({
                orden_ID: element.OrderID,
                producto_ID: element.ProductID,
                unitPrice: element.UnitPrice,
                quantity: element.Quantity,
                discount: element.Discount,
            });
        });
        await cds.run(INSERT.into(OrderDetails).entries(arrayResultados));
        
        console.log("--------------DETALLE DE ORDENES CARGADAS----------------------");
        return "--------------DETALLE DE ORDENES CARGADAS----------------------";
    })
    .catch(async function(err)
    {
        console.log("Error");
        console.log(err);
    })
});