import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-detalle-mesas',
  templateUrl: './detalle-mesas.component.html',
  styleUrls: ['./detalle-mesas.component.css']
})
export class DetalleMesasComponent implements OnInit {
  datos:any;
  datosDialog:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  constructor(
    @Inject(MAT_DIALOG_DATA) data:any,
    private dialogRef:MatDialogRef<DetalleMesasComponent>,
    private gService:GenericService
  ) {
    this.datosDialog=data;
   }

  ngOnInit(): void {
    if(this.datosDialog.id){
      this.obtenerMesa(this.datosDialog.id);
      console.log(this.datosDialog.id);
    }
  }

  obtenerMesa(id:any){
    this.gService
    .get('mesa',id)
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
