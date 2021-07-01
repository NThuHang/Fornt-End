import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import {HomeComponent} from './home/home.component';
import { RoleGuard } from '../lib/auth.guard';
import { Role } from '../models/role';
import { UnauthorizedComponent } from '../shared/unauthorized/unauthorized.component';
import { FileNotFoundComponent } from '../shared/file-not-found/file-not-found.component';

export const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'trangchu',
        component: HomeComponent,
      },
      {
        path: 'not-found',
        component: FileNotFoundComponent,
      },
      {
        path: 'unauthorized',
        component: UnauthorizedComponent,
      },
      {
        path: 'quantri',
        loadChildren: () =>
          import('./quantrivien/quantrivien.module').then((m) => m.QuantrivienModule),
          // canActivate: [RoleGuard],
          // data: { roles: [Role.Admin] },

      },
      {
        path: 'nguoidung',
        loadChildren: () =>
          import('./nguoidung-giangvien/nguoidung-giangvien.module').then((m) => m.NguoidungGiangvienModule),
          // canActivate: [RoleGuard],
          // data: { roles: [Role.GiangVien] },
      },
      {
        path: 'qlgiangvien',
        loadChildren: () =>
          import('./ql-giangvien/ql-giangvien.module').then((m) => m.QlGiangvienModule),

      },
      {
        path: 'qlbaochi',
        loadChildren: () =>
          import('./ql-baochi/ql-baochi.module').then((m) => m.QlBaochiModule),

      },
      {
        path: 'qltaikhoan',
        loadChildren: () =>
          import('./ql-taikhoan/ql-taikhoan.module').then((m) => m.QltaikhoanModule),
      },
      {
        path: 'qldulieu',
        loadChildren: () =>
          import('./ql-dulieukhoahoc/ql-dulieukhoahoc.module').then((m) => m.QlDulieukhoahocModule),
      },
      {
        path: 'thongke',
        loadChildren: () =>
          import('./ql-thongke/ql-thongke.module').then((m) =>m.QlThongkeModule),
      },
    ],
  },
];

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    MainComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(mainRoutes)],
})
export class MainModule { }
