import * as Yup from "yup";

export const schema = Yup.object({
  concepto: Yup.string().required("Este campo es requerido"),
  entrada: Yup.number()
    .typeError("Debe ser un número")
    .required("Este campo es requerido"),
  salida: Yup.number()
    .typeError("Debe ser un número")
    .required("Este campo es requerido"),
});
