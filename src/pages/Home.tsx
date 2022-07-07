import { Toaster, toast } from "react-hot-toast";
import { Layout, Table } from "../components";
import { useStore } from "../store";
import { useColumns } from "../hooks/useColumns";
import { useState, useEffect } from "react";
import { getRowsByCuenta } from "../services";

export const Home = () => {
  const { rows, cuentas, cuenta, setRowsCuenta } = useStore();
  const [option, setOption] = useState(cuentas.length > 0 ? cuenta.id : "");
  const { columns } = useColumns();

  useEffect(() => {
    if (option) {
      getRowsByCuenta(Number(option))
        .then((data) => {
          setRowsCuenta(data, Number(option));
        })
        .catch((error) => {
          toast.error("Error al cargar los datos");
        });
    }
  }, [option]);

  return (
    <Layout>
      <>
        <Toaster position="top-right" />
        <h1 className="text-center text-3xl mt-2 font-bold text-gray-800">
          {cuentas.length > 0
            ? cuenta.nombre + " - " + cuenta.saldo.toFixed(2) + "$"
            : "No hay cuentas"}
        </h1>
        <div className="flex justify-center">
          {cuentas.length > 0 && (
            <select
              className="w-11/12 px-4 py-2 mt-4 bg-white border border-gray-400 rounded-lg shadow-md sm:w-9/12 md:w-1/2 lg:w-1/3 xl:w-1/4"
              onChange={(e) => setOption(e.target.value)}
            >
              {cuentas.map((c) => (
                <option key={c.id} value={c.id} selected={c.id === cuenta.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="p-5 px-4 mx-auto">
          {cuentas.length > 0 ? (
            <Table data={rows as any} columns={columns} />
          ) : (
            <div className="text-center">
              <h1 className="text-2xl text-gray-800">No hay registros</h1>
            </div>
          )}
        </div>
      </>
    </Layout>
  );
};
