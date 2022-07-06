import { useEffect } from "react";
import { Layout } from "../components";
import { all } from "../services";

export const Home = () => {
  useEffect(() => {
    all().then((data) => console.log(data));
  });

  return (
    <Layout>
      <h1 className="text-center">Home</h1>
    </Layout>
  );
};
