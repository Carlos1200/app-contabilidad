CREATE TABLE contabilidad(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    concepto VARCHAR(255) NOT NULL,
    entrada FLOAT NOT NULL,
    salida FLOAT NOT NULL,
    saldo FLOAT NOT NULL,
    fecha DATE NOT NULL,
)