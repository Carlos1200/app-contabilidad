import { Link } from "react-router-dom";
import { useStore } from "../store";

export const Topbar = () => {
  const { cuentas } = useStore();
  return (
    <div className="py-4 bg-neutral-800">
      <div className="flex justify-between">
        <Link to="/" className="text-2xl text-white font-bold ml-4">
          Contabilidad
        </Link>
        <nav className="mr-4">
          {cuentas.length > 0 && (
            <Link to="/new" className="text-xl text-white font-bold ml-4">
              Nuevo
            </Link>
          )}
          <Link to="/cuenta/new" className="text-xl text-white font-bold ml-4">
            Nueva Cuenta
          </Link>
        </nav>
      </div>
    </div>
  );
};
