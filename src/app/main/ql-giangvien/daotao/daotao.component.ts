import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
declare var $: any;

@Component({
  selector: 'app-daotao',
  templateUrl: './daotao.component.html',
  styleUrls: ['./daotao.component.css']
})
export class DaotaoComponent extends BaseComponent implements OnInit {
  public daotaos: any ;
  public daotao: any;
  public giangvien: any;
  public totalRecords:any;
  public pageSize:any;
  public page = 1;
  public uploadedFiles: any[] = [];
  public formsearch: any;
  public formdata: any;
  public doneSetupForm: any;
  public showUpdateModal:any;
  public isCreate:any;
  public showCTModal:any;
  submitted = false;
  pages:any;
  constructor(private fb: FormBuilder, injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    this.formsearch = this.fb.group({
      'ten': [''],
    });
    this.search();

  }

  updateValue(value: any){
    this.pages = value;
    this.search();
  }

  loadPage(page) {
    if(this.pages != null){
      this.pageSize = this.pages;
    }
    else{
      this.pageSize = 5;
    }
    this._api.post('/api/qt_daotao/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.daotaos = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

  search() {
    this.page = 1;
    if(this.pages != null){
      this.pageSize = this.pages;
    }
    else{
      this.pageSize = 5;
    }
    this._api.post('/api/qt_daotao/search',{page: this.page, pageSize: this.pageSize, ten: this.formsearch.get('ten').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.daotaos = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

  public chitiet(row) {
    this.showCTModal=true;
    setTimeout(() => {
      $('#profileModal').modal('toggle');
      this._api.get('/api/qt_daotao/get-by-id/'+ row.iD_GV).subscribe(res=> {
        this.daotao = res;
        });
    });
  }

  public lay_gv(){
    this._api.get('/api/giangvien/get-all/').subscribe(res=> {
      this.giangvien = res;
      });
  }

  get f() { return this.formdata.controls; }

  onSubmit(value) {
    this.submitted = true;
    if (this.formdata.invalid) {
      return;
    }
    if(this.isCreate) {
        let tmp = {
          Ten_DT:value.ten_DT,
          ND_DT:value.nD_DT,
          ChuyenMon:value.chuyenMon,
          ThoiGian:value.thoiGian ,
          ID_GV:value.iD_GV,
          };
        this._api.post('/api/qt_daotao/create-daotao',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.search();
          this.closeModal();
          });
    } else {
        let tmp = {
          Ten_DT:value.ten_DT,
          ND_DT:value.nD_DT,
          ChuyenMon:value.chuyenMon,
          ThoiGian:value.thoiGian ,
          ID_GV:value.iD_GV ,
          ID_DT:this.daotao.iD_DT
        };
        this._api.post('/api/qt_daotao/update-daotao',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.search();
          this.closeModal();
          });
    }

  }


  onDelete(row) {
    this._api.post('/api/qt_daotao/delete-daotao',{dt_id:row.iD_DT}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search();
      });
  }
  Reset() {
    this.daotao = null;
    this.formdata = this.fb.group({
      'ten_DT': ['', Validators.required],
      'nD_DT': ['', Validators.required],
      'chuyenMon': ['', Validators.required],
      'thoiGian' : [this.today, Validators.required],
      'iD_GV'  : ['', Validators.required]
    } );
  }

  createModal() {
    this.lay_gv();
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.daotao = null;
    setTimeout(() => {
      $('#createModal').modal('toggle');
      this.formdata = this.fb.group({
        'ten_DT': ['', Validators.required],
        'nD_DT': ['', Validators.required],
        'chuyenMon': ['', Validators.required],
        'thoiGian' : [this.today, Validators.required],
        'iD_GV'  : ['', Validators.required]
      });
      this.formdata.get('thoiGian').setValue(this.today);
      this.doneSetupForm = true;
    });
  }

  public openUpdateModal(row) {
    this.lay_gv();
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    setTimeout(() => {
      $('#createModal').modal('toggle');
      this._api.get('/api/qt_daotao/get-by-id/'+ row.iD_DT).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.daotao = res;
        console.log(row);
        let ngay = new Date(this.daotao.thoiGian);
          this.formdata = this.fb.group({
            'ten_DT': [this.daotao.ten_DT, Validators.required],
            'nD_DT': [this.daotao.nD_DT, Validators.required],
            'chuyenMon': [this.daotao.chuyenMon, Validators.required],
            'thoiGian': [ngay, Validators.required],
            'iD_GV' : [this.daotao.iD_GV, Validators.required]
          });
          this.doneSetupForm = true;
        });
    }, 700);
  }

  closeModal() {
    $('#createModal').closest('.modal').modal('hide');
  }
}


