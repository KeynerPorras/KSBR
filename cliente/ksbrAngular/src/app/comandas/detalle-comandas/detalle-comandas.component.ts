import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-detalle-comandas',
  templateUrl: './detalle-comandas.component.html',
  styleUrls: ['./detalle-comandas.component.css']
})
export class DetalleComandasComponent implements OnInit {
  datos:any;
  datosDialog:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  constructor(
    @Inject(MAT_DIALOG_DATA) data:any,
    private dialogRef:MatDialogRef<DetalleComandasComponent>,
    private gService:GenericService
  ) { 
    this.datosDialog=data;
    console.log(data);
  }

  ngOnInit(): void {
    if(this.datosDialog.id){
      this.obtenerComanda(this.datosDialog.id);
      console.log(this.datosDialog.id);
    }
  }

  obtenerComanda(id:any){
    this.gService
    .get('comanda',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
        this.datos=data; 
    });
  }
  close(){
    //Dentro de close ()
     //this.form.value 
    this.dialogRef.close();
  }

}
