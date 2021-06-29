import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormControl, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';

declare var $: any;

@Component({
  selector: 'app-ql-sach',
  templateUrl: './ql-sach.component.html',
  styleUrls: ['./ql-sach.component.css']
})
export class QlSachComponent extends BaseComponent implements OnInit {
  public sachs: any ;
  public sach: any;
  public giangvien: any;
  public totalRecords:any;
  public pageSize :any;
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
    console.log(this.pages);
    this.search();
  }

  loadPage(page) {

    if(this.pages != null){
      this.pageSize = this.pages;
    }
    else{
      this.pageSize = 3;
    }
    this._api.post('/api/sachs/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.sachs = res.data;
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
      this.pageSize = 3;
    }
    this._api.post('/api/sachs/search',{page: this.page, pageSize: this.pageSize, ten: this.formsearch.get('ten').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.sachs = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

  public chitiet(row) {
    this.showCTModal=true;
    setTimeout(() => {
      $('#viewModal').modal('toggle');
      this._api.get('/api/sachs/get-by-id/'+ row.id).subscribe(res=> {
        this.sach= res;
        });
      this._api.get('/api/giangviens/getsach/'+ row.id).subscribe(res=>{
        this.giangvien = res;
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
          Tensach:value.tensach,
          };
        this._api.post('/api/sachs/create-sach',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm sach thành công');
          this.search();
          this.closeModal();
          });
    } else {
        let tmp = {
          Tensach:value.tensach,
          Id:this.sach.id
        };
        this._api.post('/api/sachs/update-sach',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.search();
          this.closeModal();
          });
    }

  }

  onDelete(row) {
    this._api.post('/api/sachs/delete-sach',{bc_id:row.id}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search();
      });
  }

  Reset() {
    this.sach = null;
    this.formdata = this.fb.group({
      'tensach': ['', Validators.required]
    } );
  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.sach = null;
    setTimeout(() => {
      $('#createModal').modal('toggle');
      this.formdata = this.fb.group({
        'tensach': ['', Validators.required]
      });
      this.doneSetupForm = true;
    });
  }

  public openUpdateModal(row) {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    setTimeout(() => {
      $('#createModal').modal('toggle');
      this._api.get('/api/sachs/get-by-id/'+ row.id).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.sach = res;
        console.log(res);
          this.formdata = this.fb.group({
            'tensach': [this.sach.tensach, Validators.required]
          });
          this.doneSetupForm = true;
        });
    }, 700);
  }

  closeModal() {
    $('#createModal').closest('.modal').modal('hide');
    $('#viewModal').closest('.modal').modal('hide');
  }
}


