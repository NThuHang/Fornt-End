import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import { FileUpload } from 'primeng/fileupload';
import 'rxjs/add/operator/takeUntil';
declare var $: any;

@Component({
  selector: 'app-baochi',
  templateUrl: './baochi.component.html',
  styleUrls: ['./baochi.component.css']
})
export class BaochiComponent extends BaseComponent implements OnInit {
  public baochis: any ;
  public baochi: any;
  public tapchi: any;
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
    this._api.post('/api/baochi/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.baochis = res.data;
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
    this._api.post('/api/baochi/search',{page: this.page, pageSize: this.pageSize, ten: this.formsearch.get('ten').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.baochis = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

  lay_tapchi(){
    this._api.get('/api/tapchi/get-all').subscribe(res=>{
      this.tapchi = res;
    })
  }
  lay_gv(){
    this._api.get('/api/giangvien/get-all').subscribe(res=>{
      this.giangvien = res;
    })
  }
  get f() { return this.formdata.controls; }

  onSubmit(value) {
    this.submitted = true;
    if (this.formdata.invalid) {
      return;
    }
    if(this.isCreate) {
        let tmp = {
          Ten_BBao:value.ten_BBao,
          Trang_BD:value.trang_BD,
          Trang_KT:value.trang_KT,
          ID_TapChi:value.iD_TapChi,
          ID_GV:value.iD_GV,
          TG_XB:value.tG_XB
          };
        this._api.post('/api/baochi/create-baochi',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.search();
          this.closeModal();
          });
    } else {
        let tmp = {
          Ten_BBao:value.ten_BBao,
          Trang_BD:value.trang_BD,
          Trang_KT:value.trang_KT,
          ID_TapChi:value.iD_TapChi ,
          ID_GV:value.iD_GV,
          TG_XB:value.tG_XB  ,
          ID_BBao:this.baochi.iD_BBao
        };
        this._api.post('/api/baochi/update-baochi',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.search();
          this.closeModal();
          });
    }

  }


  onDelete(row) {
    this._api.post('/api/baochi/delete-baochi',{bc_id:row.iD_BBao}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search();
      });
  }

  Reset() {
    this.baochi = null;
    this.formdata = this.fb.group({
      'iD_BBao': ['', Validators.required],
      'ten_BBao': ['', Validators.required],
      'trang_BD': ['', Validators.required],
      'trang_KT': ['', Validators.required],
      'iD_TapChi' : ['', Validators.required],
      'iD_GV' : ['', Validators.required],
      'tG_XB'  : [this.today, Validators.required]
    } );
  }

  createModal() {
    this.lay_tapchi();
    this.lay_gv();
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.baochi = null;
    setTimeout(() => {
      $('#createModal').modal('toggle');
      this.formdata = this.fb.group({
        'ten_BBao': ['', Validators.required],
        'trang_BD': ['', Validators.required],
        'trang_KT': ['', Validators.required],
        'iD_TapChi' : ['', Validators.required],
        'iD_GV' : ['', Validators.required],
        'tG_XB'  : ['', Validators.required]
      });
      this.formdata.get('tG_XB').setValue(this.today);
      this.doneSetupForm = true;
    });
  }

  public openUpdateModal(row) {
    this.lay_tapchi();
    this.lay_gv();
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    setTimeout(() => {
      $('#createModal').modal('toggle');
      this._api.get('/api/baochi/get-by-id/'+ row.iD_BBao).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.baochi = res;

        let tg = new Date(this.baochi.tG_XB);
          this.formdata = this.fb.group({
            'ten_BBao': [this.baochi.ten_BBao, Validators.required],
            'trang_BD': [this.baochi.trang_BD, Validators.required],
            'trang_KT': [this.baochi.trang_KT, Validators.required],
            'iD_TapChi' : [this.baochi.iD_TapChi, Validators.required],
            'iD_GV' : [this.baochi.iD_GV, Validators.required],
            'tG_XB'  : [tg, Validators.required]
          });
          this.doneSetupForm = true;
        });
    }, 700);
  }

  closeModal() {
    $('#createModal').closest('.modal').modal('hide');
  }
}
