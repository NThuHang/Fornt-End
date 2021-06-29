import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import {DetaiTheoNamComponent} from './detai-theo-nam/detai-theo-nam.component'

@NgModule({
  declarations: [DetaiTheoNamComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'detaitheonam',
        component: DetaiTheoNamComponent,
      },
    ]),
  ]
})

export class QlThongkeModule { }
