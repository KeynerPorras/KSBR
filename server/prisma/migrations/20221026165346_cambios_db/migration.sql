-- AlterTable
ALTER TABLE `comanda` MODIFY `estado` ENUM('registrada', 'pendiente', 'enProceso', 'entregada', 'porPagar', 'pagada') NOT NULL;

-- AlterTable
ALTER TABLE `mesa` MODIFY `estado` ENUM('registrada', 'pendiente', 'enProceso', 'entregada', 'porPagar', 'pagada') NOT NULL;
