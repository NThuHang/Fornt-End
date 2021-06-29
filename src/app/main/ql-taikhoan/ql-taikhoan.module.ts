import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { TaikhoanComponent } from './taikhoan/taikhoan.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [TaikhoanComponent, ProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'taikhoan',
        component: TaikhoanComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ]),
  ]
})
export class QltaikhoanModule { }


