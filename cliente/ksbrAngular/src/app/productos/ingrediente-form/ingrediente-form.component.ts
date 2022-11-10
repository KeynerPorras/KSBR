import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-ingrediente-form',
  templateUrl: './ingrediente-form.component.html',
  styleUrls: ['./ingrediente-form.component.css']
})
export class IngredienteFormComponent implements OnInit {
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
      this.listaProductos();
    }

    ngOnInit(): void {
      //Verificar si se envio un id por parametro para crear formulario para actualizar
      this.activeRouter.params.subscribe((params:Params)=>{
        this.idVideojuego=params['id'];
        if(this.idVideojuego!=undefined){
          this.isCreate=true;
          this.titleForm="Crear";
           //Obtener videojuego a actualizar del API
           this.gService.get('producto',this.idVideojuego).pipe(takeUntil(this.destroy$))
           .subscribe((data:any)=>{
            this.videojuegoInfo=data;
            
            this.productoForm.setValue({
              idProducto:this.videojuegoInfo.idProducto
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
      idProducto:[null, Validators.required],
      nombre: [null, Validators.required]
    });
  }

  listaProductos() {
    this.generosList = null;
    this.gService
      .list('ingrediente')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.generosList = data;
      });
  }

  public errorHandling = (control: string, error: string) => {
    return this.productoForm.controls[control].hasError(error);
  };

  crearIngrediente(): void {
    //Establecer submit verdadero
    this.submitted=true;
    //Verificar validación
    if(this.productoForm.invalid){
      return;
    }
    //Accion API create enviando toda la informacion del formulario
    this.gService.create('ingrediente',this.productoForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      this.respVideojuego=data;
      this.router.navigate(['/productos/gestion-productos'],{
        queryParams: {create:'true'}
      });
    });
  }

  actualizarIngrediente(): void {
  
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
