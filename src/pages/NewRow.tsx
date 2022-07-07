import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, MyTextInput } from "../components";
import { rowSchema } from "../schema";
import { create, selectById, updateRow } from "../services";
import { Contabilidad } from "../models/Contabilidad";
import { useStore } from "../store";

export const NewRow = () => {
  const date = new Date();
  const dateParse = date.toLocaleString("es-ES", {
    dateStyle: "short",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    addRow,
    updateRowById,
    cuenta: { id: cuenta_id },
  } = useStore();
  const [loading, setLoading] = useState(true);
  const [row, setRow] = useState<Contabilidad>({
    concepto: "",
    entrada: 0,
    salida: 0,
    fecha: dateParse,
  });

  useEffect(() => {
    if (id) {
      selectById(Number(id))
        .then((row) => {
          setRow(row);
        })
        .catch((err) => {
          toast.error("Error al cargar la fila");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  return (
    <Layout>
      <>
        <Toaster position="top-right" />
        <h1 className="mt-4 text-3xl text-center">
          {id ? "Editar Registro" : "Nuevo Registro"}
        </h1>
        {!loading ? (
          <div className="w-11/12 px-4 py-5 mx-auto mt-5 rounded-md shadow-md bg-neutral-800 sm:w-9/12 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <Formik
              initialValues={row}
              validationSchema={rowSchema}
              onSubmit={async (
                { concepto, entrada, salida, fecha },
                { setSubmitting, resetForm }
              ) => {
                setSubmitting(true);
                try {
                  if (!id) {
                    const { row, saldo } = await create({
                      concepto,
                      entrada,
                      salida,
                      fecha,
                      cuenta_id: cuenta_id!,
                    });
                    addRow(row, saldo);
                  } else {
                    const { row, saldo } = await updateRow({
                      concepto,
                      entrada,
                      salida,
                      fecha,
                      id: Number(id),
                      cuenta_id: cuenta_id!,
                    });
                    updateRowById(Number(id), row, saldo);
                    navigate("/");
                  }
                  resetForm();
                } catch (error) {
                  toast.error("Error al guardar el registro");
                }
              }}
            >
              {({ setFieldValue }) => (
                <Form>
                  <MyTextInput
                    label="Concepto"
                    name="concepto"
                    type="text"
                    placeholder="Concepto"
                  />
                  <MyTextInput
                    label="Entrada"
                    name="entrada"
                    type="text"
                    placeholder="Entrada"
                  />
                  <MyTextInput
                    label="Salida"
                    name="salida"
                    type="text"
                    placeholder="Salida"
                  />
                  <MyTextInput
                    label="Fecha"
                    name="fecha"
                    type="date"
                    placeholder="Fecha"
                    selected={new Date()}
                    onChange={(date: Date) => {
                      const dateParsed = date.toLocaleString("es-ES", {
                        dateStyle: "short",
                      });

                      setFieldValue("fecha", dateParsed);
                    }}
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2 mt-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                  >
                    {id ? "Editar" : "Guardar"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        ) : (
          <div className="text-center mt-4">Cargando...</div>
        )}
      </>
    </Layout>
  );
};
