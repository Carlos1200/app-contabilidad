import Database from "tauri-plugin-sql-api";
import { Cuenta } from "../models/Contabilidad";
import type {
  Contabilidad,
  ContabilidadCreate,
  ContabilidadUpdate,
} from "../models/Contabilidad";

let db: Database | null = null;
const load = Database.load("sqlite:test.db").then((instance) => {
  db = instance;
  return db;
});

export const all = async () => {
  await load;
  const cuentas = await db!.select<Cuenta[]>("SELECT * FROM cuenta");
  if (cuentas.length > 0) {
    const cuentaTop1 = await db!.select<Cuenta[]>(
      "SELECT * FROM cuenta ORDER BY id DESC LIMIT 1"
    );
    const contabilidades = await db!.select<Contabilidad[]>(
      "SELECT * FROM contabilidad WHERE cuenta_id = ?",
      [cuentaTop1[0].id]
    );
    return { cuentas, cuenta: cuentaTop1[0], contabilidades };
  } else {
    return { cuentas, cuenta: {} as Cuenta, contabilidades: [] };
  }
};

export const create = async (
  data: ContabilidadCreate
): Promise<{ row: Contabilidad; saldo: number }> => {
  await load;
  //get the last saldo
  const last = await db!.select<Cuenta[]>("SELECT * FROM cuenta WHERE id = ?", [
    data.cuenta_id,
  ]);
  let newSaldo = 0;
  if (last.length > 0) {
    const lastSaldo = last[0].saldo;
    //calculate the new saldo
    newSaldo = Number(lastSaldo) + Number(data.entrada) - Number(data.salida);
  } else {
    newSaldo = Number(data.entrada) - Number(data.salida);
  }

  //insert the new data
  const { lastInsertId: id } = await db!.execute(
    "INSERT INTO contabilidad (concepto, entrada, salida, fecha, cuenta_id) VALUES (?, ?, ?, ?, ?)",
    [data.concepto, data.entrada, data.salida, data.fecha, data.cuenta_id]
  );

  await db!.execute("UPDATE cuenta SET saldo = ? WHERE id = ?", [
    newSaldo,
    data.cuenta_id,
  ]);

  return {
    row: {
      ...data,
      id,
    },
    saldo: newSaldo,
  };
};

export const deleteById = async (
  id: number,
  cuenta_id: number
): Promise<{ id: number; saldo: number }> => {
  await load;
  //get the last saldo
  const last = await db!.select<Cuenta[]>("SELECT * FROM cuenta WHERE id = ?", [
    cuenta_id,
  ]);
  //get the row
  const row = await db!.select<Contabilidad[]>(
    "SELECT * FROM contabilidad WHERE id = ?",
    [id]
  );
  const nuevoSaldo =
    Number(last[0].saldo) - Number(row[0].entrada) + Number(row[0].salida);
  await db!.execute("DELETE FROM contabilidad WHERE id = ?", [id]);
  await db!.execute("UPDATE cuenta SET saldo = ? WHERE id = ?", [
    nuevoSaldo,
    cuenta_id,
  ]);
  return { id, saldo: nuevoSaldo };
};

export const selectById = async (id: number) => {
  await load;
  const data = await db!.select<Contabilidad[]>(
    "SELECT * FROM contabilidad WHERE id = ?",
    [id]
  );
  return data[0];
};

export const updateRow = async (
  data: ContabilidadUpdate
): Promise<{ row: Contabilidad; saldo: number }> => {
  await load;

  const cuentaActual = await db!.select<Cuenta[]>(
    "SELECT * FROM cuenta WHERE id = ?",
    [data.cuenta_id]
  );
  let saldoActual = cuentaActual[0].saldo;
  const rowActual = await db!.select<Contabilidad[]>(
    "SELECT * FROM contabilidad WHERE id = ?",
    [data.id]
  );

  const saldoNuevo =
    saldoActual -
    Number(rowActual[0].entrada) +
    Number(rowActual[0].salida) +
    Number(data.entrada) -
    Number(data.salida);

  await db!.execute(
    "UPDATE contabilidad SET concepto = ?, entrada = ?, salida = ?, fecha = ? WHERE id = ?",
    [data.concepto, data.entrada, data.salida, data.fecha, data.id]
  );
  await db!.execute("UPDATE cuenta SET saldo = ? WHERE id = ?", [
    saldoNuevo,
    data.cuenta_id,
  ]);
  return {
    row: {
      concepto: data.concepto,
      entrada: data.entrada,
      salida: data.salida,
      fecha: data.fecha,
      id: data.id,
    },
    saldo: saldoNuevo,
  };
};

export const createCuenta = async (nombre: string) => {
  await load;
  const { lastInsertId: id } = await db!.execute(
    "INSERT INTO cuenta (nombre, saldo) VALUES (?, ?)",
    [nombre, 0]
  );
  return { id, nombre, saldo: 0 };
};

export const getRowsByCuenta = async (id: number) => {
  await load;
  const data = await db!.select<Contabilidad[]>(
    "SELECT * FROM contabilidad WHERE cuenta_id = ?",
    [id]
  );
  return data;
};
