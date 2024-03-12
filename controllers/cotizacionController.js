import { request, response } from "express";
import Cotizacion from "../models/Cotizacion.js";
import { enviarEmail } from "../helpers/enviarEmail.js";
import { Product } from "../models/Product.js";

export const createCotizacion = async (req = request, res = response) => {

    const { name, tel, products, weigth, email, from, to, price } = req.body;

    const cotizacion = new Cotizacion({ name, tel, products, weigth, email, from, to, price })

    try {
        await cotizacion.save();

        const product = await Product.findById(products[0]);

        await enviarEmail({ name, products: product.name, weigth, email, from, to, price });

        return res.status(200).json({ ok: true, msg: "Información Registrada, Revisa tu Email" })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ ok: false, msg: "Algo salió mal" })
    }

}

export const getCotizaciones = async (req = request, res = response) => {
    try {
        const cotizaciones = await Cotizacion.find().populate("products", "name");
        res.json(cotizaciones);
    } catch (error) {
        console.log(error);
    }
};

export const completarCotizacion = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const cotizacion = await Cotizacion.findById(id);
        cotizacion.status = true;

        await cotizacion.save();

        res.status(200).json({ ok: true, msg: "Cotización Completada" });
    } catch (error) {
        console.log(error);
    }
};