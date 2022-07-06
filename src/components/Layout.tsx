interface Props {
  children: JSX.Element;
}

export const Layout = ({ children }: Props) => {
  return <div className="bg-neutral-500">{children}</div>;
};
