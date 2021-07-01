import { Component, Injector, OnInit} from '@angular/core';
import { BaseComponent } from '../../lib/base-component';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {
  sl_gv:any;
  sl_detai: any;
  sl_sach: any;
  sl_bao: any;

  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    this.laytt();
  }
  laytt(){
    this._api.get('/api/giangviens/tongsl').subscribe(res=> {
      this.sl_gv = res;
    });
    // this._api.get('/api/detais/tongsl').subscribe(res=> {
    //   this.sl_detai = res;
    // });
    // this._api.get('/api/sachs/tongsl').subscribe(res=> {
    //   this.sl_sach= res;
    // });
    this._api.get('/api/baochis/tongsl').subscribe(res=> {
      this.sl_bao = res;
    });
  }
}
