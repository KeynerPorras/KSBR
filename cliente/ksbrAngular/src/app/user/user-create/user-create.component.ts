import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GenericService } from 'src/app/share/generic.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificacionService } from 'src/app/share/notification.service';
import { AuthenticationService } from 'src/app/share/authentication.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
  hide = true;
  usuario: any;
  generosList: any;
  formCreate: FormGroup;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthenticationService
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.formCreate = this.fb.group({
      id: [null, null],
      correo: [null, Validators.required],
      password: [null, Validators.required],
      rol: [null, Validators.required],
      nombre: [true, Validators.required],
      apellido1: [null, Validators.required],
      apellido2: [null, Validators.required],
      idRestaurante: [null, Validators.required],
    });
    this.listaRestaurantes();
  }
  ngOnInit(): void {}
  submitForm() {
    this.makeSubmit = true;

    if (this.formCreate.invalid) {
      return;
    }
    this.authService
      .createUser(this.formCreate.value)
      .subscribe((respuesta: any) => {
        this.router.navigate(['/usuario/login'], {
          queryParams: { register: 'true' },
        });
      });
  }
  onReset() {
    this.formCreate.reset();
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
    return (
      this.formCreate.controls[control].hasError(error) &&
      this.formCreate.controls[control].invalid &&
      (this.makeSubmit || this.formCreate.controls[control].touched)
    );
  };
}