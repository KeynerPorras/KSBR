import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css'],
})
export class UsuarioFormComponent implements OnInit {
  titleForm: string = 'Crear';
  destroy$: Subject<boolean> = new Subject<boolean>();
  generosList: any;
  isRead: boolean = false;
  categoriaList: any;
  videojuegoInfo: any;
  respVideojuego: any;
  submitted = false;
  productoForm!: FormGroup;
  idVideojuego: number = 0;
  isCreate: boolean = true;
  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {
    this.formularioReactive();
    this.listaRestaurantes();
  }

  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params: Params) => {
      this.idVideojuego = params['id'];
      if (this.idVideojuego != undefined) {
        this.isCreate = false;
        this.isRead = true;
        this.titleForm = 'Actualizar';

        //Obtener videojuego a actualizar del API
        this.gService
          .get('usuario', this.idVideojuego)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.videojuegoInfo = data;

            this.productoForm.setValue({
              id: this.videojuegoInfo.id,
              correo: this.videojuegoInfo.correo,
              password: this.videojuegoInfo.password,
              rol: this.videojuegoInfo.rol,
              nombre: this.videojuegoInfo.nombre,
              apellido1: this.videojuegoInfo.apellido1,
              apellido2: this.videojuegoInfo.apellido2,
              idRestaurante: this.videojuegoInfo.idRestaurante,
             // restaurantes:this.videojuegoInfo.restaurantes.map(({id}) => id)
            });
          });
      }
    });
  }

  //Crear Formulario
  formularioReactive() {
    //[null, Validators.required]
    this.productoForm = this.fb.group({
      id: [null, null],
      correo: [null, Validators.required],
      password: [null, Validators.required],
      rol: [null, Validators.required],
      nombre: [true, Validators.required],
      apellido1: [null, Validators.required],
      apellido2: [null, Validators.required],
      idRestaurante: [null, Validators.required],
     // restaurantes: [null, Validators.required],
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
    
    console.log(this.productoForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService.create('usuario',this.productoForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      this.respVideojuego=data;
      this.router.navigate(['/usuarios/gestion-usuarios'],{
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
    
    console.log(this.productoForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService.update('usuario',this.productoForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      this.respVideojuego=data;
      this.router.navigate(['/usuarios/gestion-usuarios'],{
        queryParams: {update:'true'}
      });
    });
  }

  onReset() {
    this.submitted = false;
    this.productoForm.reset();
  }
  onBack() {
    this.router.navigate(['/usuarios/gestion-usuarios']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
