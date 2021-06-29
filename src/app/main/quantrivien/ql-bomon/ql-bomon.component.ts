import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormControl, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';

declare var $: any;
@Component({
  selector: 'app-ql-bomon',
  templateUrl: './ql-bomon.component.html',
  styleUrls: ['./ql-bomon.component.css']
})
export class QlBomonComponent  extends BaseComponent implements OnInit {
  public bomons: any ;
  public bomon: any;
  public khoa: any;
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
      this.pageSize = 5;
    }
    this._api.post('/api/bomons/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.bomons = res.data;
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
    this._api.post('/api/bomons/search',{page: this.page, pageSize: this.pageSize, ten: this.formsearch.get('ten').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.bomons = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

  lay_ds_khoa(){
    this._api.get('/api/khoas/get-all').subscribe(res=>{
      this.khoa = res;
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
          Id_Khoa:value.id_Khoa,
          TenBM:value.tenBM,
          };
        this._api.post('/api/bomons/create-BoMon',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm bộ môn thành công');
          this.search();
          this.closeModal();
          });
    } else {
        let tmp = {
          Id_Khoa:value.id_Khoa,
          TenBM:value.tenBM,
          Id:this.bomon.id
        };
        this._api.post('/api/bomons/update-BoMon',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.search();
          this.closeModal();
          });
    }

  }

  onDelete(row) {
    this._api.post('/api/bomons/delete-BoMon',{bc_id:row.id}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search();
      });
  }

  Reset() {
    this.bomon = null;
    this.formdata = this.fb.group({
      'id_Khoa': ['', Validators.required],
      'tenBM': ['', Validators.required]
    } );
  }

  createModal() {
    this.lay_ds_khoa();
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.bomon = null;
    setTimeout(() => {
      $('#createModal').modal('toggle');
      this.formdata = this.fb.group({
        'id_Khoa': ['', Validators.required],
        'tenBM': ['', Validators.required]
      });
      this.doneSetupForm = true;
    });
  }

  public openUpdateModal(row) {
    this.lay_ds_khoa();
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    setTimeout(() => {
      $('#createModal').modal('toggle');
      this._api.get('/api/bomons/get-by-id/'+ row.id).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.bomon = res;
        console.log(res);
          this.formdata = this.fb.group({
            'id_Khoa': [this.bomon.id_Khoa, Validators.required],
            'tenBM': [this.bomon.tenBM, Validators.required]
          });
          this.doneSetupForm = true;
        });
    }, 700);
  }

  closeModal() {
    $('#createModal').closest('.modal').modal('hide');
  }
}


