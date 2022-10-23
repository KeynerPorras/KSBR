import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { DetalleMesasComponent } from '../detalle-mesas/detalle-mesas.component';

@Component({
  selector: 'app-gestion-mesas',
  templateUrl: './gestion-mesas.component.html',
  styleUrls: ['./gestion-mesas.component.css']
})
export class GestionMesasComponent implements OnInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gSevice: GenericService,
    private dialog:MatDialog
  ) { this.listaVideojuegos();}

  listaVideojuegos() {
    this.gSevice
      .list('mesa/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
      });
  }

  detalleMesa(id:number){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.data={
      id:id
    };
    this.dialog.open(DetalleMesasComponent,dialogConfig);
  }

  ngOnInit(): void {
  }

}
