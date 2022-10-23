import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-gestion-mesas',
  templateUrl: './gestion-mesas.component.html',
  styleUrls: ['./gestion-mesas.component.css']
})
export class GestionMesasComponent implements OnInit {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gSevice: GenericService
  ) { this.listaVideojuegos();}

  listaVideojuegos() {
    this.gSevice
      .list('mesa/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.datos = data;
      });
  }



  ngOnInit(): void {
  }

}
