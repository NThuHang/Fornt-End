import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormControl, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';

declare var $: any;

@Component({
  selector: 'app-ql-khoa',
  templateUrl: './ql-khoa.component.html',
  styleUrls: ['./ql-khoa.component.css']
})
export class QlKhoaComponent  extends BaseComponent implements OnInit {
  public khoas: any ;
  public khoa: any;
  public bomon: any;
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
    this._api.post('/api/khoas/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.khoas = res.data;
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
    this._api.post('/api/khoas/search',{page: this.page, pageSize: this.pageSize, ten: this.formsearch.get('ten').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.khoas = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

  public chitiet(row) {
    this.showCTModal=true;
    setTimeout(() => {
      $('#viewModal').modal('toggle');
      this._api.get('/api/khoas/get-by-id/'+ row.id).subscribe(res=> {
        this.khoa= res;
        });
      this._api.get('/api/bomons/getKhoa/'+ row.id).subscribe(res=>{
        this.bomon = res;
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
          TenKhoa:value.tenKhoa,
          };
        this._api.post('/api/khoas/create-Khoa',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Th??m khoa th??nh c??ng');
          this.search();
          this.closeModal();
          });
    } else {
        let tmp = {
          TenKhoa:value.tenKhoa,
          Id:this.khoa.id
        };
        this._api.post('/api/khoas/update-Khoa',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('C???p nh???t th??nh c??ng');
          this.search();
          this.closeModal();
          });
    }

  }

  onDelete(row) {
    this._api.post('/api/khoas/delete-Khoa',{bc_id:row.id}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('X??a th??nh c??ng');
      this.search();
      });
  }

  Reset() {
    this.khoa = null;
    this.formdata = this.fb.group({
      'tenKhoa': ['', Validators.required]
    } );
  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.khoa = null;
    setTimeout(() => {
      $('#createModal').modal('toggle');
      this.formdata = this.fb.group({
        'tenKhoa': ['', Validators.required]
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
      this._api.get('/api/khoas/get-by-id/'+ row.id).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.khoa = res;
        console.log(res);
          this.formdata = this.fb.group({
            'tenKhoa': [this.khoa.tenKhoa, Validators.required]
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

