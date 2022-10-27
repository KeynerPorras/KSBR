import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetalleComandasComponent } from '../detalle-comandas/detalle-comandas.component';

@Component({
  selector: 'app-gestion-comandas',
  templateUrl: './gestion-comandas.component.html',
  styleUrls: ['./gestion-comandas.component.css',]
  
})

export class GestionComandasComponent  implements AfterViewInit {
  datos:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource= new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','idMesa', 'usuario','estado','fechaComanda', 'totalPagar','detalle'];

  constructor(
    private gSevice: GenericService,
    private dialog:MatDialog,
    private router: Router,
    private route: ActivatedRoute,private gService:GenericService) {
    
  }

  

  ngAfterViewInit(): void {
   
    this.listaVideojuegos();
  }
  listaVideojuegos() {
    this.gService
      .list('comanda/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
        this.dataSource= new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  detalleComanda(id:number){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.data={
      id:id
    };
    this.dialog.open(DetalleComandasComponent,dialogConfig);
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
