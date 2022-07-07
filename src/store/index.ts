import create from "zustand";
import { ContabilidadState } from "../models/Contabilidad";

export const useStore = create<ContabilidadState>((set) => ({
  cuentas: [],
  cuenta: {
    nombre: "",
    saldo: 0,
  },
  rows: [],
  addRow: (row, saldo) =>
    set((state) => ({
      rows: [...state.rows, row],
      cuenta: { ...state.cuenta, saldo },
    })),
  setRows: ({ cuenta, cuentas, rows }) =>
    set((state) => ({
      ...state,
      cuenta,
      cuentas,
      rows,
    })),
  deleteRow: (id) =>
    set((state) => ({
      rows: state.rows.filter((row) => row.id !== id),
    })),
  updateRowById: (id, row, saldo) => {
    set((state) => ({
      ...state,
      rows: state.rows.map((r) => (r.id === id ? row : r)),
      cuenta: { ...state.cuenta, saldo },
    }));
  },
  setCuenta: (cuenta) =>
    set((state) => ({
      ...state,
      cuenta,
      cuentas: [...state.cuentas, cuenta],
    })),
  setRowsCuenta: (rows, cuenta_id) => {
    set((state) => ({
      ...state,
      rows,
      cuenta: state.cuentas.find((c) => c.id === cuenta_id),
    }));
  },
}));
