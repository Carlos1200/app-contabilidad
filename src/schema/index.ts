import * as Yup from "yup";

export const rowSchema = Yup.object({
  concepto: Yup.string().required("Este campo es requerido"),
  entrada: Yup.number()
    .typeError("Debe ser un número")
    .required("Este campo es requerido"),
  salida: Yup.number()
    .typeError("Debe ser un número")
    .required("Este campo es requerido"),
});

export const cuentaSchema = Yup.object({
  nombre: Yup.string().required("Este campo es requerido"),
});
