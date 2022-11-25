import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';


@Component({
  selector: 'app-linea-detalle',
  templateUrl: './linea-detalle.component.html',
  styleUrls: ['./linea-detalle.component.css']
})
export class LineaDetalleComponent implements OnInit {
  datos:any;
  datosDialog:any;
  destroy$:Subject<boolean>= new Subject<boolean>();

  dataSource= new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nombre','cantidad','notas'];
  constructor(
    @Inject(MAT_DIALOG_DATA) data:any,
    private dialogRef:MatDialogRef<LineaDetalleComponent>,
    private gService:GenericService,private fb: FormBuilder
  ) { }

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
