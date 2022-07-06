export interface Contabilidad {
  id?: number;
  concepto: string;
  entrada: number;
  salida: number;
  saldo: number;
  fecha: string;
}

export interface ContabilidadCreate {
  concepto: string;
  entrada: number;
  salida: number;
  fecha: string;
}

export interface ContabilidadState {
  rows: Contabilidad[];
  addRow: (row: Contabilidad) => void;
  setRows: (rows: Contabilidad[]) => void;
  deleteRow: (id: number) => void;
}
