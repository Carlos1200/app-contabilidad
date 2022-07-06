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
