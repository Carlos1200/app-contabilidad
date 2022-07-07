import { OneDArray, TColumn } from "gridjs/dist/src/types";
import { ComponentChild } from "preact";
import { useMemo } from "react";
import { h } from "gridjs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteById } from "../services";
import { useStore } from "../store";

const MySwal = withReactContent(Swal);

export const useColumns = () => {
  const {
    deleteRow,
    cuenta: { id },
  } = useStore();
  const navigate = useNavigate();

  const columns: OneDArray<ComponentChild | TColumn> | undefined =
    useMemo(() => {
      return [
        {
          name: "Fecha",
          id: "fecha",
        },
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
            return Number((row as any).entrada).toFixed(2) + "$";
          },
        },
        {
          name: "Salida",
          id: "salida",
          data(row) {
            return Number((row as any).salida).toFixed(2) + "$";
          },
        },
        {
          name: "Diezmo",
          data: (row) => (Number((row as any).entrada) * 0.1).toFixed(2) + "$",
        },
        {
          name: "Actualizar",
          data: (row) => {
            return h(
              "button",
              {
                className: " text-yellow-500 font-bold",
                onClick: () => {
                  navigate(`/${(row as any).id}`);
                },
              },
              "Actualizar"
            );
          },
        },
        {
          name: "Eliminar",
          id: "delete",
          data: (row) => {
            return h(
              "button",
              {
                className: "text-red-500 font-bold",
                onClick: () => {
                  MySwal.fire({
                    title: "¿Estas seguro?",
                    text: "No podras revertir esto!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, eliminar!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deleteById((row as any).id, id!)
                        .then(({ id, saldo }) => {
                          deleteRow(id, saldo);
                          MySwal.fire(
                            "Eliminado!",
                            "El registro ha sido eliminado",
                            "success"
                          );
                        })
                        .catch(() => {
                          toast.error("Error al eliminar");
                        });
                    }
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
