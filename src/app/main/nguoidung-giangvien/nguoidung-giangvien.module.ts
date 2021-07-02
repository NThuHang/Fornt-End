import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LylichKhoahocComponent } from './lylich-khoahoc/lylich-khoahoc.component';
import { QlDaotaoComponent } from './ql-daotao/ql-daotao.component';
import { QlCongtacComponent } from './ql-congtac/ql-congtac.component';
import { ThongtinCanhanComponent } from './thongtin-canhan/thongtin-canhan.component';


@NgModule({
  declarations: [LylichKhoahocComponent, QlDaotaoComponent, QlCongtacComponent, ThongtinCanhanComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'thongtin',
        component: ThongtinCanhanComponent,
      },
      {
        path: 'lylich',
        component: LylichKhoahocComponent,
      },
      {
        path: 'daotao',
        component: QlDaotaoComponent,
      },
      {
        path: 'congtac',
        component: QlCongtacComponent,
      }

    ]),
  ]
})
export class NguoidungGiangvienModule { }
