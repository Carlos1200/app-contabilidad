import { ErrorMessage, useField } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  label: string;
  name: string;
  type?: "text" | "email" | "password" | "date";
  placeholder?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  [key: string]: any;
}

export const MyTextInput = ({
  label,
  errorClassName,
  inputClassName,
  labelClassName,
  ...props
}: Props) => {
  const [field] = useField(props);

  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className={`block text-white text-sm font-bold my-2 ${labelClassName}`}
      >
        {label}
      </label>
      {props.type === "date" ? (
        <DatePicker
          selected={props.selected}
          {...field}
          {...props}
          onChange={(date) => props.onChange(date)}
          dateFormat="dd/MM/yyyy"
          className={` shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${inputClassName}`}
        />
      ) : (
        <input
          type="text"
          {...field}
          {...props}
          className={` shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${inputClassName}`}
        />
      )}
      <ErrorMessage
        name={props.name}
        component="span"
        className={`text-red-500 text-sm ${errorClassName}`}
      />
    </>
  );
};
