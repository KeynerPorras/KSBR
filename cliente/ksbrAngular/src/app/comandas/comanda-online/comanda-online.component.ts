import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-comanda-online',
  templateUrl: './comanda-online.component.html',
  styleUrls: ['./comanda-online.component.css']
})
export class ComandaOnlineComponent implements OnInit {

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
  dataSource2= new MatTableDataSource<any>();
  idMesa:any;
  idRestaurante:any;
  submitted = false;
  ordenForm:FormGroup;
  isCreate:true;

  idProducto:any;
  nombre:any;

  listaRestaurantes:any;

  listaDetalles: any[];

  total = 0;
  fecha = Date.now();
  qtyItems = 0;
  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','nombre', 'precio','Agregar'];
  displayedColumns2: string[] = ['producto','cantidad', 'precio','notas', 'subtotal','eliminar'];
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

  ngOnInit(): void {
     
    this.obtenerRestaurantes();
   // this.listaRestaurante(1);
        this.cartService.currentDataCart$.subscribe(data=>{
        this.dataSource2=new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.total=this.cartService.getTotal();
          })
  }

  formularioReactive(){
    //[null, Validators.required]
    this.ordenForm=this.fb.group({
      id:[this.idProducto,null],
      nombre:[this.nombre,Validators.required],
      cantidad:[null, Validators.required],
      notas: [null, Validators.required],   
    });
   
  }



  listaProductos(id:number) {
    this.gService
      .get('restaurante/sede',id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {   
        this.idRestaurante=id;     
        this.datos = data.productos;
        this.dataSource= new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      });
  }

  listaRestaurante(id:number) {
    this.Mesa=null;
    this.gService
      .get('mesa',id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {        
        this.Mesa=data;
        console.log(this.Mesa)
        this.listaProductos(data.idRestaurante);
      });
  }

  obtenerRestaurantes() {
    this.gSevice
      .list('restaurante/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
       // console.log(data);
        this.listaRestaurantes = data;
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
      this.noti.mensaje(
        'Orden',
        'Producto: '+data.nombre+' agregado a la orden',
        TipoMessage.success
      );
    });   
  }

  obtenerdescripcion(item: any) {
    this.cartService.addToCart(item);
    this.noti.mensaje('orden', 'Descripci??n actualizada', TipoMessage.success);
  }

  actualizarCantidad(item: any) {
    this.cartService.addToCart(item);
    this.total=this.cartService.getTotal();
    this.noti.mensaje('Orden',
    'Cantidad actualizada',
    TipoMessage.success);
  }
  eliminarItem(item: any) {   
    this.cartService.removeFromCart(item);
    this.total=this.cartService.getTotal();
    this.noti.mensaje('Orden',
    'Producto eliminado',
    TipoMessage.warning);
  }
  registrarOrden() {
    let comanda ={idRestaurante: this.idRestaurante ,estado: "registrada",
    direccion: "online",subTotal: 0,impuesto: 0,totalPagar: 0,fechaComanda: Date.now}

    if(this.cartService.getItems.length!=0 ){

      if( this.idRestaurante!=null){
        this.router.navigate(['/comandas/pago-online',this.idRestaurante ], {
          relativeTo: this.route,
        });
      }else{
        this.noti.mensaje('Orden',
      'Seleccione restaurante',
      TipoMessage.warning);
      }
         
          this.total=this.cartService.getTotal();  
     }else{
      this.noti.mensaje('Orden',
      'Agregue productos a la orden',
      TipoMessage.warning);
     }
  }


}
