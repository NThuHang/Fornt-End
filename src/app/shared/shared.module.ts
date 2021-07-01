import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {ProgressBarModule} from 'primeng/progressbar';
import {PanelModule} from 'primeng/panel';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {FileUploadModule} from 'primeng/fileupload';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileNotFoundComponent } from './file-not-found/file-not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

@NgModule({
  declarations: [FileNotFoundComponent, UnauthorizedComponent],
  imports: [
    FormsModule,
    PanelModule,
    TableModule,
    InputTextModule,
    CommonModule,
    CalendarModule,
    DropdownModule,
    FileUploadModule,
    ReactiveFormsModule,
    NgbModule,
    ToastModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    ButtonModule,
    ProgressBarModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    PanelModule,
    TableModule,
    InputTextModule,
    CommonModule,
    CalendarModule,
    DropdownModule,
    FileUploadModule,
    NgbModule
  ],
})
export class SharedModule { }
