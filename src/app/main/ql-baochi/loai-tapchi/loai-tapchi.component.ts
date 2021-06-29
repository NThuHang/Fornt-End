import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import { FileUpload } from 'primeng/fileupload';
import 'rxjs/add/operator/takeUntil';
declare var $: any;
@Component({
  selector: 'app-loai-tapchi',
  templateUrl: './loai-tapchi.component.html',
  styleUrls: ['./loai-tapchi.component.css']
})
export class LoaiTapchiComponent extends BaseComponent implements OnInit {
  public loaiTCs: any ;
  public loaiTC: any;
  public tapchi: any;
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
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;

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
    this._api.post('/api/loai_tapchi/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.loaiTCs = res.data;
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
    this._api.post('/api/loai_tapchi/search',{page: this.page, pageSize: this.pageSize, ten: this.formsearch.get('ten').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.loaiTCs = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

  public chitiet(row) {
    this.showCTModal=true;
    setTimeout(() => {
      $('#profileModal').modal('toggle');
      this._api.get('/api/loai_tapchi/get-by-id/'+ row.iD_LoaiTC).subscribe(res=> {
        this.loaiTC= res;
        });
      this._api.get('/api/tapchi/get-by-loai/'+ row.iD_LoaiTC).subscribe(res=>{
        this.tapchi = res;
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
          ID_LoaiTC:value.iD_LoaiTC,
          Ten_Loai:value.ten_Loai,
          };
        this._api.post('/api/loai_tapchi/create-loaiTC',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.search();
          this.closeModal();
          });
    } else {
        let tmp = {
          ID_LoaiTC:value.iD_LoaiTC,
          Ten_Loai:value.ten_Loai,
          ID_loaiTC:this.loaiTC.iD_loaiTC
        };
        this._api.post('/api/loai_tapchi/update-loaiTC',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.search();
          this.closeModal();
          });
    }

  }


  onDelete(row) {
    this._api.post('/api/loai_tapchi/delete-loaiTC',{bc_id:row.iD_LoaiTC}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search();
      });
  }

  Reset() {
    this.loaiTC = null;
    this.formdata = this.fb.group({
      'iD_LoaiTC': ['', Validators.required],
      'ten_Loai': ['', Validators.required]
    } );
  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.loaiTC = null;
    setTimeout(() => {
      $('#createModal').modal('toggle');
      this.formdata = this.fb.group({
        'iD_LoaiTC': ['', Validators.required],
        'ten_Loai': ['', Validators.required]
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
      this._api.get('/api/loai_tapchi/get-by-id/'+ row.iD_LoaiTC).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.loaiTC = res;
        console.log(res);
          this.formdata = this.fb.group({
            'iD_LoaiTC': [this.loaiTC.iD_LoaiTC, Validators.required],
            'ten_Loai': [this.loaiTC.ten_Loai, Validators.required]
          });
          this.doneSetupForm = true;
        });
    }, 700);
  }

  closeModal() {
    $('#createModal').closest('.modal').modal('hide');
    $('#profileModal').closest('.modal').modal('hide');
  }
}

