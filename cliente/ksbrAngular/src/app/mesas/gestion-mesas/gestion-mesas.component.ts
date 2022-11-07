import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
  datosRestaurante: any;
  datosSelect: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gSevice: GenericService,
    private dialog:MatDialog
  ) { this.listaVideojuegos(); this.listaRestaurante();}

  listaVideojuegos() {
    this.gSevice
      .list('mesa/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
      });
  }
  listaRestaurante() {
    this.gSevice
      .list('restaurante/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datosRestaurante = data;
      });
  }
  selectListaPorRestaurante(id:any) {
    this.gSevice
    .get('mesa/rest',id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datosSelect = data;
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

  crearMesa() {
    this.router.navigate(['/mesas/create'], {
      relativeTo: this.route,
    });
  }

}
