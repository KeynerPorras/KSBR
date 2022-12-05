import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
idMesa:any;
tipoPago:any;
comanda:any;
destroy$:Subject<boolean>= new Subject<boolean>();
titleForm:string='Formulario de pago';
submitted = false;
pagoForm!: FormGroup;
@Input() editable: boolean = false; // doesn't have to be an @Input
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private activeRouter: ActivatedRoute,
    private gService:GenericService,private fb: FormBuilder,
  ) { this.formularioReactive();}

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params:Params)=>{
      this.idMesa=params['id'];
      this.tipoPago=params['tipo'];  
      this.detalleComanda(this.idMesa);                                  
          })                          
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
      idTipo:[1,null],     
      idComanda:[1, null], 
      numeroTarjeta:[null,Validators.required],
      monto:[null,Validators.required,],      
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
