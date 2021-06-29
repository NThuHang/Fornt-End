import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { DetaiKhoahocComponent } from './detai-khoahoc/detai-khoahoc.component';
import { HoithaoKhoahocComponent } from './hoithao-khoahoc/hoithao-khoahoc.component';
import { SachComponent } from './sach/sach.component';
import {LoaisachComponent } from './loai-sach/loai-sach.component';
import { HuongdanSinhvienNckhComponent } from './huongdan-sinhvien-nckh/huongdan-sinhvien-nckh.component';



@NgModule({
  declarations: [DetaiKhoahocComponent, HoithaoKhoahocComponent, SachComponent,LoaisachComponent,
     HuongdanSinhvienNckhComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'detai',
        component: DetaiKhoahocComponent,
      },
      {
        path: 'hoithao',
        component: HoithaoKhoahocComponent,
      },
      {
        path: 'sach',
        component: SachComponent,
      },
      {
        path: 'loaisach',
        component: LoaisachComponent,
      },
      {
        path: 'hdsv',
        component: HuongdanSinhvienNckhComponent,
      },
    ]),
  ]
})
export class QlDulieukhoahocModule { }
