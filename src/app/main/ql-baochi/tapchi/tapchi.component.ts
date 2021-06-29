import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';

import 'rxjs/add/operator/takeUntil';
declare var $: any;

@Component({
  selector: 'app-tapchi',
  templateUrl: './tapchi.component.html',
  styleUrls: ['./tapchi.component.css']
})
export class TapchiComponent extends BaseComponent implements OnInit {
  public tapchis: any ;
  public tapchi: any;
  public bbao: any;
  public loaitc: any;
  public totalRecords:any;
  public pageSize: any;
  public page = 1;
  public uploadedFiles: any[] = [];
  public formsearch: any;
  public formdata: any;
  public doneSetupForm: any;
  public showUpdateModal:any;
  public showCTModal:any;
  pages: any;
  public isCreate:any;
  submitted = false;
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
    this._api.post('/api/tapchi/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.tapchis = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

  search() {
    if(this.pages != null){
      this.pageSize = this.pages;
    }
    else{
      this.pageSize = 5;
    }
    this.page = 1;

    this._api.post('/api/tapchi/search',{page: this.page, pageSize: this.pageSize, ten: this.formsearch.get('ten').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.tapchis = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }
  lay_loai_tapchi(){
    this._api.get('/api/loai_tapchi/get-all').subscribe(res=>{
      this.loaitc = res;
    })
  }

  public chitiet(row) {
    this.showCTModal=true;
    setTimeout(() => {
      $('#profileModal').modal('toggle');
      this._api.get('/api/tapchi/get-by-id/'+ row.iD_TapChi).subscribe(res=> {
        this.tapchi= res;
        });
      this._api.get('/api/baochi/get-by-bbao/'+ row.iD_TapChi).subscribe(res=>{
        this.bbao = res;
      })
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
          ID_TapChi:value.iD_TapChi,
          ID_Loai:value.iD_Loai,
          Ten_TapChi:value.ten_TapChi,
          DonVi:value.donVi ,
          QuocGia:value.quocGia ,
          };
        this._api.post('/api/tapchi/create-tapchi',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.search();
          this.closeModal();
          });
    } else {
        let tmp = {
          ID_TapChi:value.iD_TapChi,
          ID_Loai:value.iD_Loai,
          Ten_TapChi:value.ten_TapChi,
          DonVi:value.donVi ,
          QuocGia:value.quocGia ,
          ID_tapchi:this.tapchi.iD_tapchi
        };
        this._api.post('/api/tapchi/update-tapchi',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.search();
          this.closeModal();
          });
    }

  }


  onDelete(row) {
    this._api.post('/api/tapchi/delete-tapchi',{tapchi_id:row.iD_tapchi}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search();
      });
  }

  Reset() {
    this.tapchi = null;
    this.formdata = this.fb.group({
      'iD_TapChi': ['', Validators.required],
      'iD_Loai': ['', Validators.required],
      'ten_TapChi': ['', Validators.required],
      'donVi': ['', Validators.required],
      'quocGia'  : ['', Validators.required]
    } );
  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.tapchi = null;
    setTimeout(() => {
      $('#createModal').modal('toggle');
      this.formdata = this.fb.group({
        'iD_TapChi': ['', Validators.required],
        'iD_Loai': ['', Validators.required],
        'ten_TapChi': ['', Validators.required],
        'donVi': ['', Validators.required],
        'quocGia'  : ['', Validators.required]
      });
      this.doneSetupForm = true;
    });
  }

  public openUpdateModal(row) {
    this.lay_loai_tapchi();
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    setTimeout(() => {
      $('#createModal').modal('toggle');
      this._api.get('/api/tapchi/get-by-id/'+ row.iD_TapChi).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.tapchi = res;
          this.formdata = this.fb.group({
            'iD_TapChi': [this.tapchi.iD_TapChi, Validators.required],
            'iD_Loai': [this.tapchi.iD_Loai, Validators.required],
            'ten_TapChi': [this.tapchi.ten_TapChi, Validators.required],
            'donVi': [this.tapchi.donVi, Validators.required],
            'quocGia' : [this.tapchi.quocGia, Validators.required]
          });
          this.doneSetupForm = true;
        });
    }, 700);
  }

  closeModal() {
    $('#createModal').closest('.modal').modal('hide');
  }
}

