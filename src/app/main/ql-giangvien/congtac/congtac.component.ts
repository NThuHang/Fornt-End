import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
declare var $: any;

@Component({
  selector: 'app-congtac',
  templateUrl: './congtac.component.html',
  styleUrls: ['./congtac.component.css']
})
export class CongtacComponent extends BaseComponent implements OnInit {
  public congtacs: any ;
  public congtac: any;
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
    this._api.post('/api/qt_congtac/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.congtacs = res.data;
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
    this._api.post('/api/qt_congtac/search',{page: this.page, pageSize: this.pageSize, ten: this.formsearch.get('ten').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.congtacs = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

  public chitiet(row) {
    this.showCTModal=true;
    setTimeout(() => {
      $('#profileModal').modal('toggle');
      this._api.get('/api/qt_congtac/get-by-id/'+ row.iD_GV).subscribe(res=> {
        this.congtac = res;
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
          CoQuan:value.coQuan,
          ChucVu:value.chucVu,
          DiaChi:value.diaChi,
          ThoiGian:value.thoiGian ,
          ID_GV:value.iD_GV,
          };
        this._api.post('/api/qt_congtac/create-congtac',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.search();
          this.closeModal();
          });
    } else {
        let tmp = {
          CoQuan:value.coQuan,
          CHUCVU:value.chucVu,
          DiaChi:value.diaChi,
          ThoiGian:value.thoiGian ,
          ID_GV:value.iD_GV ,
          ID_CT:this.congtac.iD_CT
        };
        this._api.post('/api/qt_congtac/update-congtac',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.search();
          this.closeModal();
          });
    }

  }


  onDelete(row) {
    this._api.post('/api/qt_congtac/delete-congtac',{ct_id:row.iD_CT}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search();
      });
  }
  Reset() {
    this.congtac = null;
    this.formdata = this.fb.group({
      'coQuan': ['', Validators.required],
      'chucVu': ['', Validators.required],
      'diaChi': ['', Validators.required],
      'thoiGian' : [this.today, Validators.required],
      'iD_GV'  : ['', Validators.required]
    } );
  }

  createModal() {
    this.lay_gv();
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.congtac = null;
    setTimeout(() => {
      $('#createModal').modal('toggle');
      this.formdata = this.fb.group({
        'coQuan': ['', Validators.required],
        'chucVu': ['', Validators.required],
        'diaChi': ['', Validators.required],
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
      this._api.get('/api/qt_congtac/get-by-id/'+ row.iD_CT).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.congtac = res;
        console.log(row);
        let ngay = new Date(this.congtac.thoiGian);
          this.formdata = this.fb.group({
            'coQuan': [this.congtac.coQuan, Validators.required],
            'chucVu': [this.congtac.chucVu, Validators.required],
            'diaChi': [this.congtac.diaChi, Validators.required],
            'thoiGian': [ngay, Validators.required],
            'iD_GV' : [this.congtac.iD_GV, Validators.required]
          });
          this.doneSetupForm = true;
        });
    }, 700);
  }

  closeModal() {
    $('#createModal').closest('.modal').modal('hide');
  }
}


