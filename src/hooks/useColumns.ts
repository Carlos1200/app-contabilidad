import { OneDArray, TColumn } from "gridjs/dist/src/types";
import { ComponentChild } from "preact";
import { useMemo } from "react";
import { h } from "gridjs";
import { deleteById } from "../services";
import { useStore } from "../store";
import { toast } from "react-hot-toast";

export const useColumns = () => {
  const { deleteRow } = useStore();

  const columns: OneDArray<ComponentChild | TColumn> | undefined =
    useMemo(() => {
      return [
        {
          name: "Id",
          id: "id",
          hidden: true,
        },
        {
          name: "Concepto",
          id: "concepto",
        },
        {
          name: "Entrada",
          id: "entrada",
          data(row) {
            return (row as any).entrada.toFixed(2) + "$";
          },
        },
        {
          name: "Salida",
          id: "salida",
          data(row) {
            return (row as any).salida.toFixed(2) + "$";
          },
        },
        {
          name: "Fecha",
          id: "fecha",
        },
        {
          name: "Saldo",
          id: "saldo",
          data(row) {
            return (row as any).saldo.toFixed(2) + "$";
          },
        },
        {
          name: "Diezmo",
          data: (row) => (row as any).entrada * 0.1 + "$",
        },
        {
          name: "Eliminar",
          id: "delete",
          data: (row) => {
            return h(
              "button",
              {
                onClick: () => {
                  deleteById((row as any).id)
                    .then(() => {
                      deleteRow((row as any).id);
                    })
                    .catch(() => {
                      toast.error("Error al eliminar");
                    });
                },
              },
              "Eliminar"
            );
          },
        },
      ];
    }, []);

  return {
    columns,
  };
};
