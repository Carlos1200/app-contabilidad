import { Link } from "react-router-dom";

export const Topbar = () => {
  return (
    <div className="py-4 bg-neutral-800">
      <div className="flex justify-between">
        <Link to="/" className="text-2xl text-white font-bold ml-4">
          Contabilidad
        </Link>
        <nav className="mr-4">
          <Link to="/new" className="text-xl text-white font-bold ml-4">
            Nuevo
          </Link>
        </nav>
      </div>
    </div>
  );
};
