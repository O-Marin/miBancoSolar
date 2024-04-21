import {
  agregarUsuarioQuery,
  getUsuariosQuery,
  updateUserQuery,
  deleteUserQuery
} from "../queries/consultas.js";

const getUserControl = async (req, res) => {
  try {
    const result = await getUsuariosQuery();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addUserControl = async (req, res) => {
  try {
    const { nombre, balance } = req.body;
    const datos = [nombre, balance];
    const result = await agregarUsuarioQuery(datos);
  
    res.status(201);
  } catch (err) {res.status(500).send(err.message)}
}

const updateUserControl = async (req, res) => {
  try {
    const { id } = req.query;
    const { nombre, balance } = req.body;

    const result = await updateUserQuery(nombre, balance, id);
    res.status(200).send(result)

  } catch (error) {
    res.status(500).send(error.message)
  }
};

const deleteUserControl = async (req, res) => {
    try {
        const {id} = req.query;
    const result = deleteUserQuery(id);
    res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message)
    }
    
}

export { getUserControl, addUserControl, updateUserControl, deleteUserControl };
