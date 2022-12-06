import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { CartService } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-pago-online',
  templateUrl: './pago-online.component.html',
  styleUrls: ['./pago-online.component.css']
})
export class PagoOnlineComponent implements OnInit {
 
  currentUser: any;
  idRestaurante:any;
  respPago:any;
  subtotal:any;
  iv:any;
  total:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  titleForm:string='Formulario de pago';
  submitted = false;
  pagoForm!: FormGroup;
  @Input() editable: boolean = false; // doesn't have to be an @Input
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private activeRouter: ActivatedRoute,
    private gService:GenericService,private fb: FormBuilder,private noti: NotificacionService,
    private cartService:CartService,private authService: AuthenticationService
  ) { this.formularioReactive();}

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params:Params)=>{
    this.idRestaurante=params['idComanda'];
        })
        this.subtotal=this.cartService.getTotal();
        this.iv=this.cartService.getImpuesto();
        this.total=this.cartService.getTotalFinal();
  }

  formularioReactive(){
    //[null, Validators.required]
    this.pagoForm=this.fb.group({
      id:[null,null],
      idTipo:[null,null],
      numeroTarjeta:[null,Validators.required],
      monto:[null,null],     
    });
  }

  

  calcularTotales(){ 
    console.log(this.cartService.getItems)
    this.subtotal=this.cartService.getTotal();
    
    console.log(this.subtotal)
    this.iv=this.subtotal*0.13;
    this.total=this.subtotal+this.iv;
   }

  pagar(){  
  if(this.total > this.pagoForm.value.monto){
    this.noti.mensaje('Orden',
    'Monto insuficiente',
    TipoMessage.warning);
    return;
    }else{
      this.authService.currentUser.subscribe((x) => (this.currentUser = x));
    if (this.cartService.getItems != null) {
      //Obtener todo lo necesario para crear la orden
      let itemsCarrito = this.cartService.getItems;
      let detalles = itemsCarrito.map((x) => ({
        ['idProducto']: x.idItem,
        ['cantidad']: x.cantidad,
       // ['notas']: x.notas,
        ['notas']: "Prueba",
      }));
      let infoOrden={
        'idMesa': null,
        'fechaComanda':new Date(Date.now()),
        'lineaComandas':detalles,
        'direccion':"online",
        'idUsuario': this.currentUser.user.id,
        'idRestaurante': parseInt(this.idRestaurante),
        'estado':"pagada",
        'subTotal': this.subtotal,
        'impuesto': this.iv,
        'totalPagar': this.total
      }
      console.log(infoOrden)
      this.gService
      .create('comanda/cliente',infoOrden)
      .subscribe((respuesta:any)=>{
          this.noti.mensaje('Orden',
          'Orden registrada',
          TipoMessage.success);
          this.cartService.deleteCart();
          this.total=this.cartService.getTotal();
          console.log(respuesta);
        });
      
  
     }else{
      this.noti.mensaje('Orden',
      'Agregue videojuegos a la orden',
      TipoMessage.warning);     
    }
  }

} 

  public errorHandling = (control: string, error: string) => {
    return this.pagoForm.controls[control].hasError(error);
  };

  onReset() {
    this.submitted = false;
    this.pagoForm.reset();
  }
  onBack() {
    this.router.navigate(['/mesas/gestion-mesas']);
  } 

}
