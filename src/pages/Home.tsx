import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Layout, Table } from "../components";
import { all } from "../services";
import { useStore } from "../store";
import { useColumns } from "../hooks/useColumns";

export const Home = () => {
  const { setRows, rows } = useStore();
  const { columns } = useColumns();
  useEffect(() => {
    all()
      .then((data) => {
        setRows(data);
      })
      .catch(() => {
        toast.error("Error al cargar los datos");
      });
  }, []);

  return (
    <Layout>
      <>
        <Toaster position="top-right" />
        <h1 className="text-center">Home</h1>
        <div className="p-5 px-4 mx-auto">
          <Table data={rows as any} columns={columns} />
        </div>
      </>
    </Layout>
  );
};
