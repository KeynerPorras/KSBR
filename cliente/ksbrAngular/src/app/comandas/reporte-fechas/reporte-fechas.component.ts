import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-reporte-fechas',
  templateUrl: './reporte-fechas.component.html',
  styleUrls: ['./reporte-fechas.component.css']
})
export class ReporteFechasComponent implements OnInit {
  datos: any;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  formulario: FormGroup;
  titulo: any;
  constructor(
    private gService: GenericService,
    public fb: FormBuilder) {
        this.reactiveForm();
    }


   ngOnInit(): void {
     this.gService
      .list('reporte/vFecha')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
      }); 
      let date = new Date();
      this.titulo = `Reporte de ventas de ${date.toLocaleDateString()}` 
  } 

reporteFiltrado(){
  if (this.formulario.invalid) {
    return;
  }

  this.gService
      .create('reporte/vFecha2', this.formulario.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data;
      });
      let date = new Date();
      this.titulo = `Reporte de ventas de ${this.formulario.value.fechaI.toLocaleDateString()} hasta  ${this.formulario.value.fechaF.toLocaleDateString()}` 
  }

  reactiveForm() {
    /*https://angular.io/guide/reactive-forms
   https://angular.io/api/forms/Validators */
 
   
      this.formulario = this.fb.group({
        fechaI: [
          '',
          [Validators.required],
        ],
        fechaF: [
          '',
          [Validators.required],
        ], 
      
      });
    
  }

  onReset() {
    this.formulario.reset();
  }

  public errorHandling = (control: string, error: string) => {
    return (
      this.formulario.controls[control].hasError(error) &&
      this.formulario.controls[control].invalid &&
      (this.makeSubmit || this.formulario.controls[control].touched)
    );
  };

  openPDF() {
    //htmlData: id del elemento HTML
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      //Configuraci??n del ancho y alto del Canvas de la imagen
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      //devuelve un data URI,el cual contiene una representaci??n
      // de la imagen en el formato especificado por el par??metro type
      const FILEURI = canvas.toDataURL('image/png');
      //Orientaci??n, unidad, formato
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      //Agregar imagen al PDF
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('reporte.pdf');
    });
  }
}