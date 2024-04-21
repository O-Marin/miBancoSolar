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

const insertarTransferenciaQuery = async (datos) => {
  const actualizarCuentaEmisor = {
    text: "update cuentas set saldo = saldo - $1 where id = $2 returning *",
    values: [monto, emisor],
  };
  const actualizarCuentaReceptor = {
    text: "update cuentas set saldo = saldo + $1 where id = $2 returning *",
    values: [monto, receptor],
  };
  const sqlTransferencia = {
    text: "insert into transferencias (emisor,receptor,monto) values ($1,$2,$3) returning * ",
    values: datos,
  };
  try {
    await pool.query("begin");
    await pool.query(actualizarCuentaEmisor);
    await pool.query(actualizarCuentaReceptor);
    const result = await pool.query(sqlTransferencia);
    await pool.query("commit");

    console.log("Transaccion Realizada con exito");
    console.log(result.rows);
    //return result.rows
  } catch (err) {
    console.log(err);
  }
};

export {
  insertarTransferenciaQuery,
  getUsuariosQuery,
  agregarUsuarioQuery,
  updateUserQuery,
  deleteUserQuery,
};
