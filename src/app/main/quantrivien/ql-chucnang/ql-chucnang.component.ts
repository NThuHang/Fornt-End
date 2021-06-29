import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder,FormControl, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';

declare var $: any;

@Component({
  selector: 'app-ql-chucnang',
  templateUrl: './ql-chucnang.component.html',
  styleUrls: ['./ql-chucnang.component.css']
})
export class QlChucnangComponent  extends BaseComponent implements OnInit {
  public danhmucs: any ;
  public danhmuc: any;
  public totalRecords:any;
  public pageSize = 3;
  public page = 1;
  public uploadedFiles: any[] = [];
  public formsearch: any;
  public formdata: any;
  public doneSetupForm: any;
  public showUpdateModal:any;
  public isCreate:any;
  submitted = false;
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

  loadPage(page) {
    this._api.post('/api/danhmuc/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.danhmucs = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

  search() {
    this.page = 1;
    this.pageSize = 5;
    this._api.post('/api/danhmuc/search',{page: this.page, pageSize: this.pageSize, ten: this.formsearch.get('ten').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.danhmucs = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
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
          ID_BBao:value.iD_BBao,
          Ten_BBao:value.ten_BBao,
          Trang_BD:value.trang_BD,
          Trang_KT:value.trang_KT,
          ID_TapChi:value.iD_TapChi ,
          TG_XB:value.tG_XB ,
          };
        this._api.post('/api/danhmuc/create-danhmuc',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.search();
          this.closeModal();
          });
    } else {
        let tmp = {
          ID_BBao:value.iD_BBao,
          Ten_BBao:value.ten_BBao,
          Trang_BD:value.trang_BD,
          Trang_KT:value.trang_KT,
          ID_TapChi:value.iD_TapChi ,
          TG_XB:value.tG_XB  ,
          ID_danhmuc:this.danhmuc.iD_danhmuc
        };
        this._api.post('/api/danhmuc/update-danhmuc',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.search();
          this.closeModal();
          });
    }

  }


  onDelete(row) {
    this._api.post('/api/danhmuc/delete-danhmuc',{danhmuc_id:row.iD_danhmuc}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search();
      });
  }

  Reset() {
    this.danhmuc = null;
    this.formdata = this.fb.group({
      'iD_BBao': ['', Validators.required],
      'ten_BBao': ['', Validators.required],
      'trang_BD': ['', Validators.required],
      'trang_KT': ['', Validators.required],
      'iD_TapChi' : ['', Validators.required],
      'tG_XB'  : ['', Validators.required]
    } );
  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.danhmuc = null;
    setTimeout(() => {
      $('#createModal').modal('toggle');
      this.formdata = this.fb.group({
        'iD_BBao': ['', Validators.required],
        'ten_BBao': ['', Validators.required],
        'trang_BD': ['', Validators.required],
        'trang_KT': ['', Validators.required],
        'iD_TapChi' : ['', Validators.required],
        'tG_XB'  : ['', Validators.required]
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
      this._api.get('/api/danhmuc/get-by-id/'+ row.iD_BBao).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.danhmuc = res;

          this.formdata = this.fb.group({
            'iD_BBao': [this.danhmuc.iD_BBao, Validators.required],
            'ten_BBao': [this.danhmuc.ten_BBao, Validators.required],
            'trang_BD': [this.danhmuc.trang_BD, Validators.required],
            'trang_KT': [this.danhmuc.trang_KT, Validators.required],
            'iD_TapChi' : [this.danhmuc.iD_TapChi, Validators.required],
            'tG_XB'  : [this.danhmuc.tG_XB, Validators.required]
          });
          this.doneSetupForm = true;
        });
    }, 700);
  }

  closeModal() {
    $('#createModal').closest('.modal').modal('hide');
  }
}

