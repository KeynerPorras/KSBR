import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormaPagoComponent } from 'src/app/comandas/forma-pago/forma-pago.component';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
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
  currentUser: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor( 
    
    private router: Router,
    private route: ActivatedRoute,
    private gSevice: GenericService,
    private dialog:MatDialog,
    private noti: NotificacionService,private authService: AuthenticationService
  ) {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
     this.listaVideojuegos();
      this.listaRestaurante();
    }

  listaVideojuegos() {
    
      this.gSevice
      .list('mesa/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
      //  console.log(data);
        this.datos = data;
      });
    
    
  }
  listaRestaurante() {
    if(this.currentUser.user.rol=="administrador" || this.currentUser.user.rol=="cliente" ){
      this.gSevice
      .list('restaurante/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
       // console.log(data);
        this.datosRestaurante = data;
      });
    }else{
      this.gSevice
      .get('restaurante/all',this.currentUser.user.idRestaurante)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
       // console.log(data);
        this.datosRestaurante = data;
      });
    }
      
    
    
  }
  selectListaPorRestaurante(id:any) {
    this.gSevice
    .get('mesa/rest',id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
       // console.log(data);
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
  actualizarMesa(id: number) {
    this.router.navigate(['/mesa/update', id], {
      relativeTo: this.route,
    });
  }
  reservarMesa(id: number, estado: string, idRestaurante:number) {
    if(estado == "libre"){
      this.crearComanda(id,idRestaurante);
      this.router.navigate(['/comandas/comanda',id ], {
        relativeTo: this.route,
      });
    }
    if(estado == "porPagar"){
      this.formaPago(id);
    }else{
      this.router.navigate(['/comandas/comanda',id ], {
        relativeTo: this.route,
      });
    }
  }

  crearComanda(id:number,idRestaurante:number){
    let comanda ={idMesa:id,idUsuario: "208060669",idRestaurante: idRestaurante ,estado: "registrada",
    direccion: "Restaurante",subTotal: 0,impuesto: 0,totalPagar: 0,fechaComanda: Date.now}

    this.gSevice
    .create('comanda/',comanda)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      console.log(data);
      this.noti.mensaje(
        'Orden',
        'Comanda: '+data.id+' Creada',
        TipoMessage.success
      );
    });
  }
  formaPago(id:number){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.data={
      id:id
    };
    this.dialog.open(FormaPagoComponent,dialogConfig);
    
  }
  
}