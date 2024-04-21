import pool from "../config/db.js";

const getUsuariosQuery = async () => {
  const sql = {
    text: "select * from usuarios",
  };
  try {
    const result = await pool.query(sql);

    console.log(result.rows);
    return result.rows;
  } catch (err) {
    console.log(err);
  }
};

const agregarUsuarioQuery = async (datos) => {
  const agregarDatos = {
    text: "insert into usuarios (nombre,balance) values ($1, $2) returning *",
    values: datos,
  };
  try {
    const result = await pool.query(agregarDatos);
    console.log("Datos agregados Correctamente");
    console.log(result.rows[0]);
    return result.rows[0];
  } catch (err) {
    console.log(err);
  }
};

const updateUserQuery = async (nombre, balance, id) => {
  
  const updateUser = {
    text: "update usuarios set nombre = $1 , balance = $2 where id = $3 returning *",
    values: [nombre, balance, id],
  };

  try {
    const result = pool.query(updateUser);
    
    if (result.rowCount === 0) {
      throw new Error("No se edito el usuario");
    } else {
      console.log(result.rows[0])
      return result.rows[0];
    }
  } catch (error) {}
};

const deleteUserQuery = async (id) => {
   const deleteUser = {
    text:'delete from usuarios where id = $1',
    values: [id],
   }
   try {
    const result = pool.query(deleteUser);
    
    if (result.rowCount === 0) {
      throw new Error("No se elimino el usuario");
    } else {
      console.log(result.rows[0])
      return result.rows[0];
    }
   } catch (error) {
    
   }
}

const addTransferQuery = async (datos) => {
  console.log(datos)
  const [emisor, receptor, monto] = datos;
  //id:emisorID le pone a id el nombre emisorId
  const { id: emisorId } = (
    await pool.query(`SELECT * FROM usuarios WHERE nombre = '${emisor}'`)
  ).rows[0];
  //buscamos el id del receptor

  const { id: receptorId } = (
    await pool.query(`SELECT * FROM usuarios WHERE nombre = '${receptor}'`)
  ).rows[0];
  const addTransfer = {
    text: "insert into transferencias (emisor,receptor,monto,fecha) values($1,$2,$3,now()) returning *",
    values: [emisorId, receptorId, monto],
  };

  const actualizarEmisor = {
    text: `update usuarios set balance = balance - $1 where nombre = $2 returning *`,
    values: [monto, emisor],
  };
  const actualizarReceptor = {
    text: `update usuarios set balance = balance + $1 where nombre = $2 returning *`,
    values: [monto, receptor],
  };
  try {
    await pool.query("begin");
    await pool.query(actualizarEmisor);
    await pool.query(actualizarReceptor);
    const result = await pool.query(addTransfer);
    await pool.query("commit");
    console.log(result.rows[0]);
    return true;
  } catch (err) {
    await pool.query("rollback");
    return err;
  }
};

const getTransferQuery = async () => {
  try {
    const getTransfer = {
      text: `SELECT e.nombre 
      AS emisor,
      r.nombre AS receptor,
      t.monto,
      t.fecha
    FROM transferencias t
    JOIN usuarios e ON t.emisor = e.id
    JOIN usuarios r ON t.receptor = r.id;`,
      rowMode: "array",
    };

    const result = await pool.query(getTransfer);
    console.log(result.rows);
    return result.rows;
  } catch (err) {
    console.log(err);
  }
};

export {
  addTransferQuery,
  getTransferQuery,
  getUsuariosQuery,
  agregarUsuarioQuery,
  updateUserQuery,
  deleteUserQuery,
};
