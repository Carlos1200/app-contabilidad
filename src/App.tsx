import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Home, NewCuenta, NewRow } from "./pages";
import { all } from "./services";
import { useStore } from "./store";

const App = () => {
  const { setRows } = useStore();
  useEffect(() => {
    all()
      .then(({ cuenta, cuentas, contabilidades }) => {
        setRows({
          cuenta,
          cuentas: cuentas,
          rows: contabilidades,
        });
      })
      .catch((error) => {
        toast.error("Error al cargar los datos");
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cuenta/new" element={<NewCuenta />} />
        <Route path="/new" element={<NewRow />} />
        <Route path="/:id" element={<NewRow />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
