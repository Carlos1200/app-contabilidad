import { Grid } from "gridjs-react";
import { OneDArray, TColumn, TDataObject } from "gridjs/dist/src/types";
import { ComponentChild } from "preact";
import "gridjs/dist/theme/mermaid.css";

interface TableProps {
  data: TDataObject;
  columns?: OneDArray<ComponentChild | TColumn>;
}

export const Table = ({ data, columns }: TableProps) => {
  return (
    <Grid
      data={data}
      columns={columns}
      search={{
        enabled: true,
        ignoreHiddenColumns: true,
      }}
      pagination={{
        limit: 8,
        enabled: true,
      }}
      style={{
        th: {
          backgroundColor: "#525252",
          color: "#fff",
        },
        td: {
          backgroundColor: "#262626",
          color: "#fff",
        },
      }}
      className={{
        table: "w-full bg-neutral-800",
      }}
    />
  );
};
