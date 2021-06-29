import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-lylich-khoahoc',
  templateUrl: './lylich-khoahoc.component.html',
  styleUrls: ['./lylich-khoahoc.component.css']
})
export class LylichKhoahocComponent extends BaseComponent implements OnInit {

  public giangvien: any;
  public daotao: any;
  public congtac: any;
  public ngoaingu: any;
  public detai_chutri: any;
  public detai_thanhvien: any;
  public tapchi: any;
  public baochi: any;
  public sach: any;
  public khoadaotao: any;
  public Id: any;
  public vitri1 = 'Chủ trì';
  public vitri2 = 'Thành viên';
  gv:any;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.thongtin();
    this.laytt();
  }

  thongtin(){
    this.gv = JSON.parse(localStorage.getItem('User'));
  }


  laytt(){

    this._api.get('/api/giangviens/get-by-id/'+ this.gv.id).subscribe(res=> {
      this.giangvien = res;
    });

    this._api.get('/api/daotaos/get-gv/'+ this.gv.id).subscribe(res=> {
      this.daotao = res;
    });

    this._api.get('/api/congtacs/get-gv/'+ this.gv.id).subscribe(res=> {
      this.congtac= res;
    });

    this._api.get('/api/daotaos/get-ngoaingu-gv/'+ this.gv.id).subscribe(res=> {
      this.ngoaingu= res;
    });

    this._api.post('/api/detais/detai-gv-vitri',{Id: this.gv.id, vitri:this.vitri1}).takeUntil(this.unsubscribe).subscribe(res=> {
      this.detai_chutri= res;
    });

    this._api.post('/api/detais/detai-gv-vitri',{Id: this.gv.id, vitri: this.vitri2}).takeUntil(this.unsubscribe).subscribe(res=> {
      this.detai_thanhvien= res;
    });

  }


}
