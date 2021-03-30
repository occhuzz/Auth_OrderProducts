const cds = require("@sap/cds");
const axios = require('axios');
const https = require('https');
const agent = new https.Agent({ rejectUnauthorized: false });
const { Productos, Ordenes, OrderDetails } = cds.entities;

module.exports = cds.service.impl(async (srv)=>
{
    //------------------------------------------------------------------------------------------
    //Crear Ordenes
    
    srv.after('CREATE','OrderDetails', async (data,req) =>
    {
        let producto_ID = req.data.product_ID;
        let quantity = req.data.quantity;

        let stockReal = await cds.run(SELECT('unitsInStock','unitsOnOrder').one.from(Productos).where({ ID: producto_ID }));
        //Se guarda el Stock actual y en Orden

        try
        {
            if((stockReal.unitsOnOrder + quantity) > stockReal.unitsInStock) //Se comprueba si se intenta vender mas productos que los que hay disponibles
            {
                req.reject(405,`Venta cancelada, sólo puede vender ${stockReal.unitsInStock - stockReal.unitsOnOrder} productos.`);
            }

            await cds.run(UPDATE(Productos).with({unitsOnOrder: { '+=': quantity }}).where({ ID: producto_ID}));

            return "Orden realizada correctamente.";
        }
        catch(err)
        {
            console.log(err);
            return "Ocurrió un error al crear una Orden";
        };
    });

    //------------------------------------------------------------------------------------------
    //Eliminar producto

    srv.on('eliminarProducto', async(req) =>
    {
        const producto_ID  = req.data.producto.ID;

        try
        {
            await cds.run(DELETE.from(Productos).where({ID : producto_ID}));
            return "Producto eliminado correctamente";
        }
        catch(err)
        {
            console.log(err);
            return "Ocurrió un error al elinimar un Producto";
        }
    })

    //------------------------------------------------------------------------------------------
    //Reponer producto
    
    srv.on('reponerProducto', async(req,data) =>
    {
        const producto_ID = req.data.producto.ID;
        const stock = req.data.stock;

        try
        {
            await cds.run(UPDATE(Productos).with({unitsInStock: { '+=': stock }}).where({ ID: producto_ID}));
            return "Producto repuesto"
        }
        catch(err)
        {
            console.log(err);
            return "Hubo un error al reponer productos"
        }
    });
});