import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
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
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.makeSubmit = true;

    if (this.formCreate.invalid) {
      return;
    }
    this.authService
      .createUser(this.formCreate.value)
      .subscribe((respuesta: any) => {
        this.router.navigate(['/usuarios/login'], {
          queryParams: { register: 'true' },
        });
      });
  }

  onReset() {
    this.formCreate.reset();
  }

  getgenerosList() {
    this.gService
      .list('restaurante')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.generosList = data;
        console.log(this.generosList);
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
