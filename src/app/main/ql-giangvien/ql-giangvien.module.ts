import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GiangvienComponent } from './giangvien/giangvien.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DaotaoComponent } from './daotao/daotao.component';
import { CongtacComponent } from './congtac/congtac.component';
import { QlGiangvienComponent } from './ql-giangvien.component';

@NgModule({
  declarations: [GiangvienComponent, DaotaoComponent, DaotaoComponent, CongtacComponent, QlGiangvienComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'giangvien',
        component: GiangvienComponent,
      },
      {
        path: 'congtac',
        component: CongtacComponent,
      },
      {
        path: 'daotao',
        component: DaotaoComponent,
      },
    ]),
  ]
})
export class QlGiangvienModule { }


