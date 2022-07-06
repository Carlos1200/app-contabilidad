import Database from "tauri-plugin-sql-api";
import type { Contabilidad, ContabilidadCreate } from "../models/Contabilidad";

let db: Database | null = null;
const load = Database.load("sqlite:test.db").then((instance) => {
  db = instance;
  return db;
});

export const all = async () => {
  await load;
  const data = await db!.select<Contabilidad[]>("SELECT * FROM contabilidad");
  return data;
};

export const create = async (data: ContabilidadCreate) => {
  await load;
  //get the last saldo
  const last = await db!.select<Contabilidad[]>(
    "SELECT * FROM contabilidad ORDER BY id DESC LIMIT 1"
  );
  let newSaldo = 0;
  if (last.length > 0) {
    const lastSaldo = last[0].saldo;
    //calculate the new saldo
    newSaldo = lastSaldo + data.entrada - data.salida;
  } else {
    newSaldo = data.entrada - data.salida;
  }

  //insert the new data
  const { lastInsertId: id } = await db!.execute(
    "INSERT INTO contabilidad (concepto, entrada, salida, saldo, fecha) VALUES (?, ?, ?, ?, ?)",
    [data.concepto, data.entrada, data.salida, newSaldo, data.fecha]
  );

  return {
    ...data,
    id,
  };
};

export const deleteById = async (id: number) => {
  await load;
  await db!.execute("DELETE FROM contabilidad WHERE id = ?", [id]);
};
