import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-mesa-form',
  templateUrl: './mesa-form.component.html',
  styleUrls: ['./mesa-form.component.css']
})
export class MesaFormComponent implements OnInit {
  titleForm:string='Crear';
  destroy$: Subject<boolean> = new Subject<boolean>();
  restauranteList:any;
  mesasList:any;
  mesaInfo :any;
  respVideojuego:any;
  submitted = false;
  mesaForm!: FormGroup;
  idMesa: number = 0;
  cantidad: number = 0;
  isCreate:boolean=true;


  constructor(
    private fb: FormBuilder, private gService: GenericService,
    private router: Router,private activeRouter: ActivatedRoute
  ) { 
    this.formularioReactive();
      this.listaRestaurante();
      this.listaMesas();
  }

  ngOnInit(): void {

    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params:Params)=>{
      this.idMesa=params['id'];
      if(this.idMesa!=undefined){
        this.isCreate=false;
        this.titleForm="Actualizar";
         //Obtener videojuego a actualizar del API
         this.gService.get('mesa',this.idMesa).pipe(takeUntil(this.destroy$))
         .subscribe((data:any)=>{
          this.mesaInfo=data;
          this.mesaForm.setValue({
            id:this.mesaInfo.id,
            codigo:this.mesaInfo.codigo,
            idRestaurante:this.mesaInfo.idRestaurante,
            capacidad:this.mesaInfo.capacidad,
            estado:this.mesaInfo.estado,           
          })
         });
      }
    });
  }

  //Crear Formulario
  formularioReactive(){
    //[null, Validators.required]
    this.mesaForm=this.fb.group({
      id:[null,null],
      codigo:[null,Validators.compose([
        Validators.required, Validators.minLength(2),Validators.maxLength(20)
      ])],
      idRestaurante:[null, Validators.required],
      capacidad: [null, Validators.required],
      estado:[null, Validators.required],     
    });
   
  }
  listaRestaurante() {
    this.restauranteList = null;
    this.gService
      .list('restaurante/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
      //  console.log(data);
        this.restauranteList = data;
      });
  }

  public errorHandling = (control: string, error: string) => {
    return this.mesaForm.controls[control].hasError(error);
  };

  listaMesas() {
    this.gService
      .list('mesa/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
      //  console.log(data);
        this.mesasList = data;
      });
  }


//Crear Videojueogo
crearMesa(): void {
  let arregloMesas:string[] = [this.mesasList];
  console.log(arregloMesas);
  console.log(arregloMesas[0].length);
  let count=arregloMesas[0].length + 1;
  this.mesaForm.value.codigo=this.mesaForm.value.codigo+"-"+count;
  //Establecer submit verdadero
  this.submitted=true;
  //Verificar validación
  if(this.mesaForm.invalid){
    return;
  }
  
  
  //Accion API create enviando toda la informacion del formulario
  this.gService.create('mesa/',this.mesaForm.value)
  .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
    //Obtener respuesta
    this.respVideojuego=data;
    console.log(data);
    this.router.navigate(['/mesas/gestion-mesas'],{
      queryParams: {create:'true'}
    });
  });
}

actualizarVideojuego(){
  //Establecer submit verdadero
  this.submitted=true;
  //Verificar validación
  if(this.mesaForm.invalid){
    return;
  }
  
  //Obtener id Generos del Formulario y Crear arreglo con {id: value}
 
  //console.log(this.mesaForm.value);
  //Accion API create enviando toda la informacion del formulario
  this.gService.update('mesa',this.mesaForm.value)
  .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
    //Obtener respuesta
    this.respVideojuego=data;
    this.router.navigate(['/mesas/gestion-mesas'],{
      queryParams: {update:'true'}
    });
  });
}

onReset() {
  this.submitted = false;
  this.mesaForm.reset();
}
onBack() {
  this.router.navigate(['/mesas/gestion-mesas']);
}
ngOnDestroy() {
  this.destroy$.next(true);
  // Desinscribirse
  this.destroy$.unsubscribe();
}
}
