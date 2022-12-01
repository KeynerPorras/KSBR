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
  lineasDetalle:any;
  ProductoList:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource= new MatTableDataSource<any>();
  dataSource2= new MatTableDataSource<any>();
  idMesa:any;
  idRestaurante:any;
  idComanda:any;
  submitted = false;
  ordenForm:FormGroup;
 
  isCreate:true;

  idProducto:any;
  nombre:any;

  listaDetalles: any[];

  total = 0;
  fecha = Date.now();
  qtyItems = 0;
  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','nombre', 'precio','Agregar'];
  displayedColumns2: string[] = ['producto','cantidad', 'precio'];

  
  constructor(
    //private notificacion:NotificacionService,
    private fb: FormBuilder,
    private gSevice: GenericService,
    private dialog:MatDialog,
    private router: Router,
    private route: ActivatedRoute,private gService:GenericService,
    private cartService:CartService,private activeRouter: ActivatedRoute,
    private noti: NotificacionService,
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
          this.numeroComanda(this.idMesa);
          this.detalleComanda(this.idMesa);
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

  numeroComanda(idMesa:any){
    this.gService   
    .get('comanda/mesa',1)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {                    
      this.idComanda=data.id;
      console.log(data.id);
    });
  }

  detalleComanda(id:any) {
    this.gService   
      .get('comanda/mesa',id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.lineasDetalle = data.lineaComandas;
        console.log(this.lineasDetalle);
        this.dataSource2= new MatTableDataSource(data.lineaComandas);
        this.dataSource2.sort = this.sort;
        this.dataSource2.paginator = this.paginator;
        console.log(data.id);
        console.log(data.idMesa);
      });
  }

  listaRestaurante(id:any) {
    this.Mesa=null;
    this.gService
      .get('mesa',id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {        
        this.Mesa=data;
        this.idRestaurante=data.idRestaurante;
        this.listaProductos(data.idRestaurante);       
      });
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /* seleccionarProducto(id:number){
    this.gSevice
    .get('producto',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      this.producto=data;
      this.idProducto=data.id;
      this.nombre=data.nombre;     
      this.formularioReactive();     
    });
    
  } */

  

  seleccionarProducto(id:number){
    let comanda ={idComanda:5,idProducto:id,cantidad:1,notas:"Prueba"}

  console.log(comanda);
    this.gSevice
    .create('lineaComanda/',comanda)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      console.log(data);
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
      this.noti.mensaje(
        'Orden',
        'Producto: '+data.nombre+' agregado a la orden',
        TipoMessage.success
      );
    });
   
  }

  actualizarCantidad(item: any) {
    
  }
  eliminarItem(item: any) {    
  }
  registrarOrden() {
    if(this.cartService.getItems!=null){      
          this.noti.mensaje('Orden',
          'Orden registrada',
          TipoMessage.success);
          this.cartService.deleteCart();
          this.total=this.cartService.getTotal();
         
      
  
     }else{
      this.noti.mensaje('Orden',
      'Agregue videojuegos a la orden',
      TipoMessage.warning);
     }
  }


}
