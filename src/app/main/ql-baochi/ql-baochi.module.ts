import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { BaochiComponent } from './baochi/baochi.component';
import { TapchiComponent } from './tapchi/tapchi.component';
import { LoaiTapchiComponent } from './loai-tapchi/loai-tapchi.component';



@NgModule({
  declarations: [BaochiComponent, TapchiComponent, LoaiTapchiComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'tapchi',
        component: TapchiComponent,
      },
      {
        path: 'loaitc',
        component: LoaiTapchiComponent,
      },
      {
        path: 'baochi',
        component: BaochiComponent,
      },
    ]),
  ]
})
export class QlBaochiModule { }
