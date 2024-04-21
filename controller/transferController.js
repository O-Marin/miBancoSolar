import { addTransferQuery, getTransferQuery } from "../queries/consultas.js";

const addTransferControl = async(req,res)=>{
    try {
        const {emisor, receptor, monto} = req.body;
        const datos = [emisor,receptor,monto];
        const result = addTransferQuery(datos);
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getTransferControl = async (req,res)=>{
    try {
        const result = await getTransferQuery();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export {addTransferControl, getTransferControl};