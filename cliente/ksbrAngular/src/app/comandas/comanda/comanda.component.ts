import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
import { LineaDetalleComponent } from '../linea-detalle/linea-detalle.component';
@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.component.html',
  styleUrls: ['./comanda.component.css']
})
export class ComandaComponent implements OnInit {
  producto:any;
  datos:any;
  Mesa:any;
  RestaurantesList:any;
  ProductoList:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource= new MatTableDataSource<any>();
  idMesa:any;
  idRestaurante:any;
  submitted = false;
  ordenForm:FormGroup;
  isCreate:true;

  idProducto:any;
  nombre:any;

  listaDetalles: any[];
  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','nombre', 'precio','Agregar'];
  displayedColumns2=['codigoProducto']
  constructor(
    //private notificacion:NotificacionService,
    private fb: FormBuilder,
    private gSevice: GenericService,
    private dialog:MatDialog,
    private router: Router,
    private route: ActivatedRoute,private gService:GenericService,
    private cartService:CartService,private activeRouter: ActivatedRoute
  ) {
    this.formularioReactive();
   }

//Crear Formulario
formularioReactive(){
  //[null, Validators.required]
  this.ordenForm=this.fb.group({
    id:[this.idProducto,null],
    nombre:[this.nombre,Validators.required],
    cantidad:[null, Validators.required],
    notas: [null, Validators.required],   
  });
 
}

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params:Params)=>{
      this.idMesa=params['id'];                              
          })
          this.listaRestaurante(this.idMesa); 
  }

  listaProductos(id:any) {
    this.gService
      .get('restaurante/sede',id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {        
        this.datos = data.productos;
        this.dataSource= new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  listaRestaurante(id:any) {
    this.Mesa=null;
    this.gService
      .get('mesa',id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {        
        this.Mesa=data;
        console.log(this.Mesa)
        this.listaProductos(this.Mesa.idRestaurante);
      });
  }



  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  seleccionarProducto(id:number){
    this.gSevice
    .get('producto',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      this.producto=data;
      this.idProducto=data.id;
      this.nombre=data.nombre;     
      this.formularioReactive();
    });
    
  }

  comprar(id:number){
    this.gSevice
    .get('producto',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      //Agregar videojuego obtenido del API al carrito
      this.cartService.addToCart(data);
      //Notificar al usuario
      /* this.notificacion.mensaje(
        'Orden',
        'Producto: '+data.nombre+' agregado a la orden',
        TipoMessage.success
      ); */
    });
  }

  pruebaCompra(){
    if(this.ordenForm.invalid){
      return;
    }
    console.log(this.ordenForm.value);
    console.log(this.Mesa.id);
    console.log(this.idRestaurante);
    console.log(this.ordenForm.value.id);
    console.log(this.ordenForm.value.cantidad);
    console.log(this.ordenForm.value.notas);
    console.log("Sirve");

    lineaDetalle:{
       {idProducto:this.ordenForm.value.id}
       {cantidad:this.ordenForm.value.cantidad}
       {notas:this.ordenForm.value.notas}
    };

    this.listaDetalles.push(this.lineaDetalle);

  }
  lineaDetalle(id:number){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.data={
      id:id
    };
    this.dialog.open(LineaDetalleComponent,dialogConfig);   
  }


}
