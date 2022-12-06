import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-forma-pago',
  templateUrl: './forma-pago.component.html',
  styleUrls: ['./forma-pago.component.css']
})
export class FormaPagoComponent implements OnInit {
  datos:any;
  datosDialog:any;
  selectedValue: any;
  selected:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  constructor(
    @Inject(MAT_DIALOG_DATA) data:any,
    private dialogRef:MatDialogRef<FormaPagoComponent>,
    private gService:GenericService,
    private router: Router,
    private route: ActivatedRoute,
  ) {this.datosDialog=data; }

  ngOnInit(): void {
    if(this.datosDialog.id){     
      console.log(this.datosDialog.id);
    }
  }

  pago(tipo: number) {
    this.router.navigate(['/comandas/pago', this.datosDialog.id,tipo], {
      relativeTo: this.route,
    });
    this.dialogRef.close();
  }

  obtenerTipo(id:any){
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
