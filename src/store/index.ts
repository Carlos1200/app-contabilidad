import create from "zustand";
import { ContabilidadState, Contabilidad } from "../models/Contabilidad";

export const useStore = create<ContabilidadState>((set) => ({
  rows: [],
  addRow: (row: Contabilidad) =>
    set((state) => ({
      rows: [...state.rows, row],
    })),
  setRows: (rows: Contabilidad[]) =>
    set((state) => ({
      rows,
    })),
  deleteRow: (id: number) =>
    set((state) => ({
      rows: state.rows.filter((row) => row.id !== id),
    })),
}));
