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
  categoriaList:any;
  videojuegoInfo: any;
  respVideojuego: any;
  submitted = false;
  productoForm!: FormGroup;
  idVideojuego: number = 0;
  isCreate: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}