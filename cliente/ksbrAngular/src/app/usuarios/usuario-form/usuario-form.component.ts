import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {
  titleForm: string = 'Crear';
  destroy$: Subject<boolean> = new Subject<boolean>();
  generosList: any;
  rolList: any;
  usuarioInfo: any;
  respUsuario: any;
  submitted = false;
  usuarioForm!: FormGroup;
  idUsuario: any;
  isCreate: boolean = true;
  constructor(private fb: FormBuilder, private gService: GenericService,
    private router: Router,private activeRouter: ActivatedRoute) { 
      this.formularioReactive();
      this.listaRestaurantes();
      this.listaRoles();
    }

    ngOnInit(): void {
      //Verificar si se envio un id por parametro para crear formulario para actualizar
      this.activeRouter.params.subscribe((params:Params)=>{
        this.idUsuario=params['id'];

        console.log(this.idUsuario);

        if(this.idUsuario!=undefined){
          this.isCreate=false;
          this.titleForm="Actualizar";
           //Obtener videojuego a actualizar del API
           this.gService.get('usuario',this.idUsuario).pipe(takeUntil(this.destroy$))
           .subscribe((data:any)=>{
            this.usuarioInfo=data;
           
            this.usuarioForm.setValue({
              id:this.usuarioInfo.id,
              correo:this.usuarioInfo.correo,
              password:this.usuarioInfo.password,
              rol:this.usuarioInfo.rol,
              nombre:this.usuarioInfo.nombre,
              apellido1:this.usuarioInfo.apellido1,
              apellido2:this.usuarioInfo.apellido2,
              restaurantes:this.usuarioInfo.restaurantes.map(({id}) => id)
            })
           });
        }
      });
    }

    //Crear Formulario
  formularioReactive(){
    //[null, Validators.required]
    this.usuarioForm=this.fb.group({
      id:[null,null],
      correo:[null,Validators.compose([
        Validators.required, Validators.minLength(2),Validators.maxLength(20)
      ])],
      password:[null, Validators.required],
      rol: [null, Validators.required],
      nombre:[true, Validators.required],
      apellido1:[null, Validators.required],
      apellido2:[null, Validators.required],
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

  listaRoles() {
    this.rolList = null;
    this.gService
      .list('usuario/estados/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.rolList = data;
      });
  }

  public errorHandling = (control: string, error: string) => {
    return this.usuarioForm.controls[control].hasError(error);
  };

  crearUsuario(): void {
    //Establecer submit verdadero
    this.submitted=true;
    //Verificar validación
    if(this.usuarioForm.invalid){
      return;
    }
    
    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    let gFormat:any=this.usuarioForm.get('restaurantes').value.map(x=>({['id']: x }));
    //Asignar valor al formulario 
    this.usuarioForm.patchValue({ restaurantes:gFormat});
    console.log(this.usuarioForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService.create('usuario',this.usuarioForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      this.respUsuario=data;
      this.router.navigate(['/usuarios/gestion-usuarios'],{
        queryParams: {create:'true'}
      });
    });
  }

  actualizarUsuario(){
    //Establecer submit verdadero
    this.submitted=true;
    //Verificar validación
    if(this.usuarioForm.invalid){
      return;
    }
    
    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    let gFormat:any=this.usuarioForm.get('usuarios').value.map(x=>({['id']: x }));
    //Asignar valor al formulario 
    this.usuarioForm.patchValue({ usuarios:gFormat});
    console.log(this.usuarioForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService.update('usuario',this.usuarioForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      this.respUsuario=data;
      this.router.navigate(['/usuarios/gestion-usuarios'],{
        queryParams: {update:'true'}
      });
    });
  }

  onReset() {
    this.submitted = false;
    this.usuarioForm.reset();
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