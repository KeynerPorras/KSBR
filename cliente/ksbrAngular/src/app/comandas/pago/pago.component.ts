import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
idMesa:any;
tipoPago:any;
comanda:any;
respPago:any;
vuelto:any=0;
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
  ) { this.formularioReactive();}

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params:Params)=>{
      this.idMesa=params['id'];
      this.tipoPago=params['tipo'];  
      this.detalleComanda(this.idMesa);                                  
          })
  }

  esTipo():boolean {
            
    if((this.tipoPago==2) || (this.tipoPago==3)) {
            return true;
    }
     else { 
        return false;
    } 
}

  detalleComanda(id:any) {
    this.gService   
      .get('comanda/mesa',id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
          this.comanda=data;  
          console.log(this.comanda);                
      });
      
  }

  formularioReactive(){
    //[null, Validators.required]
    this.pagoForm=this.fb.group({
      id:[null,null],
      idTipo:[null,null],
      idComanda:[null, null],
      numeroTarjeta:[null,Validators.required],
      monto:[null,null],
      montoTarjeta:[null,Validators.max(9999999)],
      vuelto:[null,Validators.max(9999999)]
      
    });
    
  }

  calcVuelto(){
    let vuelto =this.pagoForm.value.monto - this.comanda.totalPagar;
    if(vuelto>0){
      return vuelto;
    }else{
      return 0;
    }
  }

  calcAmbas(){
    let montoTarjeta = this.comanda.totalPagar-this.pagoForm.value.monto;
    if(montoTarjeta>0){
      return montoTarjeta;
    }else{
      return 0;
    }
  }

  pagar(): void {
    //Establecer submit verdadero
    this.submitted=true;
    //Verificar validación
    if(this.pagoForm.invalid){
      return;
    }
    //Tarjeta
    if(this.tipoPago==1){
      this.pagoForm.value.idTipo=this.tipoPago;
      this.pagoForm.value.idComanda=this.comanda.id;
      this.pagoForm.value.monto=this.comanda.totalPagar;
    }
    //Efectivo
    if(this.tipoPago==2){
      if(this.pagoForm.value.monto < this.comanda.totalPagar){
        this.noti.mensaje('Orden',
      'Monto insuficiente',
      TipoMessage.error);
        return;
      }
    this.pagoForm.value.idTipo=this.tipoPago;
    this.pagoForm.value.idComanda=this.comanda.id;
    this.pagoForm.value.monto=this.comanda.totalPagar;
    }
 //Ambos
 if(this.tipoPago==3){
  if(this.pagoForm.value.monto + this.calcAmbas()< this.comanda.totalPagar){   
    console.log( this.pagoForm.value.montoTarjeta);
    this.noti.mensaje('Orden',
      'Monto insuficiente',
      TipoMessage.error);
    return;
  }
this.pagoForm.value.idTipo=this.tipoPago;
this.pagoForm.value.idComanda=this.comanda.id;
this.pagoForm.value.monto=this.comanda.totalPagar;
}
    console.log(this.pagoForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService.create('pago/',this.pagoForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      this.respPago=data;
      console.log(data);
      this.noti.mensaje('Orden',
      'Orden pagada',
      TipoMessage.success);
      this.router.navigate(['/mesas/gestion-mesas'],{
        queryParams: {create:'true'}
      });
    });
  }
  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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
