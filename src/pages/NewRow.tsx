import { Formik, Form } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { Layout, MyTextInput } from "../components";
import { schema } from "../schema";
import { create } from "../services";

export const NewRow = () => {
  const date = new Date();
  const dateParse = date.toISOString().split("T")[0];
  return (
    <Layout>
      <>
        <Toaster position="top-right" />
        <h1 className="mt-4 text-3xl text-center">Nuevo Registro</h1>
        <div className="w-11/12 px-4 py-5 mx-auto mt-5 rounded-md shadow-md bg-neutral-800 sm:w-9/12 md:w-1/2 lg:w-1/3 xl:w-1/4">
          <Formik
            initialValues={{
              concepto: "",
              entrada: "",
              salida: "",
              fecha: dateParse,
            }}
            validationSchema={schema}
            onSubmit={(
              { concepto, entrada, salida, fecha },
              { setSubmitting }
            ) => {
              setSubmitting(true);
              try {
                create({
                  concepto,
                  entrada: parseFloat(entrada),
                  salida: parseFloat(salida),
                  fecha,
                });
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
                  selected={new Date(dateParse)}
                  onChange={(date: Date) => {
                    const dateParsed = date.toISOString().split("T")[0];
                    setFieldValue("fecha", dateParsed);
                  }}
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 mt-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                >
                  Guardar
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </>
    </Layout>
  );
};
