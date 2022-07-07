export interface Contabilidad {
  id?: number;
  concepto: string;
  entrada: number;
  salida: number;
  fecha: string;
}

export interface Cuenta {
  id?: number;
  nombre: string;
  saldo: number;
}

export interface ContabilidadCreate {
  concepto: string;
  entrada: number;
  salida: number;
  fecha: string;
  cuenta_id: number;
}

export interface ContabilidadUpdate {
  id: number;
  concepto: string;
  entrada: number;
  salida: number;
  fecha: string;
  cuenta_id: number;
}

export interface ContabilidadState {
  cuentas: Cuenta[];
  cuenta: Cuenta;
  rows: Contabilidad[];
  addRow: (row: Contabilidad, saldo: number) => void;
  setRows: (rows: ContabilidadCuenta) => void;
  deleteRow: (id: number, saldo: number) => void;
  updateRowById: (id: number, row: Contabilidad, saldo: number) => void;
  setCuenta: (cuenta: Cuenta) => void;
  setRowsCuenta: (rows: Contabilidad[], cuenta_id: number) => void;
}

export interface ContabilidadCuenta {
  cuentas: Cuenta[];
  cuenta: Cuenta;
  rows: Contabilidad[];
}
