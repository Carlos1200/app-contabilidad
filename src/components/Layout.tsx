import { Topbar } from "./Topbar";

interface Props {
  children: JSX.Element;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="bg-stone-400 w-full h-screen">
      <Topbar />
      {children}
    </div>
  );
};
