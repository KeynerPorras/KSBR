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
  idComanda:any;  //ID COMANDA SE LLENA EN NUMERO COMANDA
  submitted = false;
  ordenForm:FormGroup;
 
  isCreate:true;

  idProducto:any;
  nombre:any;

  listaDetalles: any[];
  subtotal:any; //SUB TOTAL DE LA COMANDA
  iv:any;  //IVA DE LA COMANDA
  total = 0; //TOTAL DE LA COMANDA
  fecha = Date.now();
  qtyItems = 0;
  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','nombre', 'precio','Agregar'];
  displayedColumns2: string[] = ['producto','cantidad', 'precio','subtotal','eliminar'];

  
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
  objetoComanda:any;
  numeroComanda(idMesa:any){
    this.gService   
    .get('comanda/mesa',idMesa)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {   
                     
      this.idComanda=data.id;
      this.objetoComanda=data;
    });
  }

  detalleComanda(id:any) {
    this.gService   
      .get('comanda/mesa',id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.lineasDetalle = data.lineaComandas;
        this.calcularTotales();
        this.dataSource2= new MatTableDataSource(data.lineaComandas);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;      
      });
  }

  

  calcularTotales(){ 
    console.log(this.lineasDetalle)
    this.subtotal=0;
    for(let i=0;i<this.lineasDetalle.length;i++){      
      //this.subtotal+=parseFloat(this.lineasDetalle[i].producto.precio)*parseInt((this.lineasDetalle[i].cantidad));
      this.subtotal=parseFloat(this.subtotal)+parseFloat(this.lineasDetalle[i].producto.precio)*parseInt((this.lineasDetalle[i].cantidad));
    }
    console.log(this.subtotal)
    this.iv=this.subtotal*0.13;
    this.total=this.subtotal+this.iv;
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


  seleccionarProducto(id:number){
    let comanda ={idComanda:this.idComanda,idProducto:id,cantidad:1,notas:"Prueba"}
    console.log(this.idComanda);
    this.gSevice
    .create('lineaComanda/',comanda)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      console.log(data);
      this.ngOnInit();
    //  this.formularioReactive();
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

  actualizarCantidad(id: any) {
    
  }
  eliminarItem(id: any) { 
    let detalle ={idComanda:this.idComanda,idProducto:id}  
    console.log(detalle);
    this.gSevice
    .create('lineaComanda/eliminar',detalle)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      console.log(data);
      this.ngOnInit();
    //  this.formularioReactive();
    });  
  }
  registrarOrden() {
    this.objetoComanda.estado="porPagar";
    this.objetoComanda.totalPagar=this.total;
    this.objetoComanda.impuesto=this.iv;
    this.objetoComanda.subTotal=this.subtotal;
    if(this.lineasDetalle.length!=0){ 
      
      this.gSevice
    .update('comanda',this.objetoComanda)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      console.log(data);
      this.ngOnInit();
      this.noti.mensaje('Orden',
      'Orden registrada',
      TipoMessage.success);
      this.router.navigate(['/mesas/gestion-mesas']);
    });  
         
     }else{
      this.noti.mensaje('Orden',
      'Agregue productos a la orden',
      TipoMessage.warning);
     }
  }


}
