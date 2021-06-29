import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { QlKhoaComponent } from './ql-khoa/ql-khoa.component';
import { QlBomonComponent } from './ql-bomon/ql-bomon.component';
import { QlDetaiComponent } from './ql-detai/ql-detai.component';
import { QlSachComponent } from './ql-sach/ql-sach.component';
import { QlBaochiComponent } from './ql-baochi/ql-baochi.component';
import { QlHoinghiComponent } from './ql-hoinghi/ql-hoinghi.component';
import { QlGiangvienComponent } from './ql-giangvien/ql-giangvien.component';
import { QlQuyenComponent } from './ql-quyen/ql-quyen.component';
import { QlChucnangComponent } from './ql-chucnang/ql-chucnang.component';
import { QlTaikhoanComponent } from './ql-taikhoan/ql-taikhoan.component';

@NgModule({
  declarations: [QlKhoaComponent, QlBomonComponent, QlDetaiComponent, QlSachComponent, QlBaochiComponent,
    QlHoinghiComponent, QlGiangvienComponent, QlQuyenComponent, QlChucnangComponent, QlTaikhoanComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'khoa',
        component: QlKhoaComponent,
      },
      {
        path: 'bomon',
        component: QlBomonComponent,
      },
      {
        path: 'sach',
        component: QlSachComponent,
      },
      {
        path: 'giangvien',
        component: QlGiangvienComponent,
      },
      {
        path: 'detai',
        component: QlDetaiComponent,
      },
      {
        path: 'baochi',
        component: QlBaochiComponent,
      },
      {
        path: 'hoinghi',
        component: QlHoinghiComponent,
      },
      {
        path: 'quyen',
        component: QlQuyenComponent,
      },
      {
        path: 'chucnang',
        component: QlChucnangComponent,
      },
      {
        path: 'taikhoan',
        component: QlTaikhoanComponent,
      }
    ]),
  ]
})
export class QuantrivienModule { }


