import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, MyTextInput } from "../components";
import { cuentaSchema } from "../schema";
import { createCuenta } from "../services";
import { Cuenta } from "../models/Contabilidad";
import { useStore } from "../store";

export const NewCuenta = () => {
  const { id } = useParams();
  //   const navigate = useNavigate();
  const { setCuenta } = useStore();
  const [loading, setLoading] = useState(true);
  const [row, setRow] = useState({
    nombre: "",
  });

  useEffect(() => {
    if (id) {
    } else {
      setLoading(false);
    }
  }, [id]);

  return (
    <Layout>
      <>
        <Toaster position="top-right" />
        <h1 className="mt-4 text-3xl text-center">
          {id ? "Editar Cuenta" : "Nueva Cuenta"}
        </h1>
        {!loading ? (
          <div className="w-11/12 px-4 py-5 mx-auto mt-5 rounded-md shadow-md bg-neutral-800 sm:w-9/12 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <Formik
              initialValues={row}
              validationSchema={cuentaSchema}
              onSubmit={async ({ nombre }, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                try {
                  if (!id) {
                    const data = await createCuenta(nombre);
                    setCuenta(data);
                  }
                  resetForm();
                } catch (error) {
                  toast.error("Error al guardar el registro");
                }
              }}
            >
              {() => (
                <Form>
                  <MyTextInput
                    label="Nombre"
                    name="nombre"
                    type="text"
                    placeholder="Nombre"
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
