import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormControl, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-detai-theo-nam',
  templateUrl: './detai-theo-nam.component.html',
  styleUrls: ['./detai-theo-nam.component.css']
})
export class DetaiTheoNamComponent extends BaseComponent implements OnInit {
  public detais: any;
  public nam: any;
  public trangthai:any;
  public formtk: any;
  constructor(private fb: FormBuilder, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.formtk = this.fb.group({
      'nam': [''],
      'trangthai': [''],
    });
    // this.tk_nam();

  }
  tk_nam() {
    this._api.post('/api/DeTaiNCKH/tk-nam',{nam: this.formtk.get('nam').value , trangthai: this.formtk.get('trangthai').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.detais = res.data;
      });
  }
}
