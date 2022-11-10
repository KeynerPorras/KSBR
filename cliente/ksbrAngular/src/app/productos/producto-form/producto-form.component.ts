import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css'],
})
export class ProductoFormComponent implements OnInit {
  titleForm: string = 'Crear';
  destroy$: Subject<boolean> = new Subject<boolean>();
  generosList: any;
  categoriaList:any;
  videojuegoInfo: any;
  respVideojuego: any;
  submitted = false;
  productoForm!: FormGroup;
  idVideojuego: number = 0;
  isCreate: boolean = true;
  constructor(private fb: FormBuilder, private gService: GenericService,
    private router: Router,private activeRouter: ActivatedRoute) {
      this.formularioReactive();
      this.listaRestaurantes();
      this.listaCategorias();
    }



    ngOnInit(): void {
      //Verificar si se envio un id por parametro para crear formulario para actualizar
      this.activeRouter.params.subscribe((params:Params)=>{
        this.idVideojuego=params['id'];
        if(this.idVideojuego!=undefined){
          this.isCreate=false;
          this.titleForm="Actualizar";
           //Obtener videojuego a actualizar del API
           this.gService.get('producto',this.idVideojuego).pipe(takeUntil(this.destroy$))
           .subscribe((data:any)=>{
            this.videojuegoInfo=data;
            
            this.productoForm.setValue({
              id:this.videojuegoInfo.id,
              nombre:this.videojuegoInfo.nombre,
              descripcion:this.videojuegoInfo.descripcion,
              precio:this.videojuegoInfo.precio,
              estado:this.videojuegoInfo.estado,
              idCategoria:this.videojuegoInfo.idCategoria,
              restaurantes:this.videojuegoInfo.restaurantes.map(({id}) => id)
            })
           });
        }
      });
    }

  //Crear Formulario
  formularioReactive(){
    //[null, Validators.required]
    this.productoForm=this.fb.group({
      id:[null,null],
      nombre:[null,Validators.compose([
        Validators.required, Validators.minLength(2),Validators.maxLength(20)
      ])],
      descripcion:[null, Validators.required],
      precio: [null, Validators.required],
      estado:[true, Validators.required],
      idCategoria:[null, Validators.required],
      restaurantes:[null, Validators.required],
    });
  }

  listaRestaurantes() {
    this.generosList = null;
    this.gService
      .list('restaurante')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.generosList = data;
      });
  }

  listaCategorias() {
    this.categoriaList = null;
    this.gService
      .list('categoria')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.categoriaList = data;
      });
  }

  public errorHandling = (control: string, error: string) => {
    return this.productoForm.controls[control].hasError(error);
  };

  crearVideojuego(): void {
    //Establecer submit verdadero
    this.submitted=true;
    //Verificar validación
    if(this.productoForm.invalid){
      return;
    }
    
    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    let gFormat:any=this.productoForm.get('restaurantes').value.map(x=>({['id']: x }));
    //Asignar valor al formulario 
    this.productoForm.patchValue({ restaurantes:gFormat});
    console.log(this.productoForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService.create('producto',this.productoForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      this.respVideojuego=data;
      this.router.navigate(['/productos/gestion-productos'],{
        queryParams: {create:'true'}
      });
    });
  }

  actualizarVideojuego(){
    //Establecer submit verdadero
    this.submitted=true;
    //Verificar validación
    if(this.productoForm.invalid){
      return;
    }
    
    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    let gFormat:any=this.productoForm.get('restaurantes').value.map(x=>({['id']: x }));
    //Asignar valor al formulario 
    this.productoForm.patchValue({ restaurantes:gFormat});
    console.log(this.productoForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService.update('producto',this.productoForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      this.respVideojuego=data;
      this.router.navigate(['/productos/gestion-productos'],{
        queryParams: {update:'true'}
      });
    });
  }

  onReset() {
    this.submitted = false;
    this.productoForm.reset();
  }
  onBack() {
    this.router.navigate(['/productos/gestion-productos']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
