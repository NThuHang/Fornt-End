import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder,FormControl, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';

declare var $: any;

@Component({
  selector: 'app-ql-giangvien',
  templateUrl: './ql-giangvien.component.html',
  styleUrls: ['./ql-giangvien.component.css']
})
export class QlGiangvienComponent  extends BaseComponent implements OnInit {
  public giangviens: any ;
  public giangvien: any;
  public bomon: any;
  public totalRecords:any;
  public pageSize = 3;
  public page = 1;
  public uploadedFiles: any[] = [];
  public formsearch: any;
  public formdata: any;
  public formload: any;
  public doneSetupForm: any;
  public showUpdateModal:any;
  public showCTModal:any;
  public isCreate:any;
  public congtac:any;
  public daotao:any;
  submitted = false;
  pages: any;

  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private fb: FormBuilder, injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    this.formsearch = this.fb.group({
      'hoten': [''],
    });
    this.search();
  }
  //update số hàng hiển thị trên table
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
    this._api.post('/api/giangviens/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.giangviens = res.data;
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
    this._api.post('/api/giangviens/search',{page: this.page, pageSize: this.pageSize ,
      hoten: this.formsearch.get('hoten').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.giangviens = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

  lay_ds_bomon(){
    this._api.get('/api/bomons/get-all').subscribe(res=>{
      this.bomon = res;
    })
  }

  get f() { return this.formdata.controls; }

  onSubmit(value) {
    this.submitted = true;
    if (this.formdata.invalid) {
      return;
    }
    if(this.isCreate) {
      this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
        let data_image = data == '' ? null : data;
        let tmp = {
          Id_BoMon:value.id_BoMon,
          TenGV:value.tenGV,
          HinhAnh:data_image,
          GioiTinh:value.gioiTinh,
          NgaySinh:value.ngaySinh,
          Sdt:value.sdt,
          Email:value.email,
          NoiSinh:value.noiSinh,
          DiaChi:value.diaChi,
          TinHoc:value.tinHoc,
          ChucVu:value.chucVu,
          ChucDanh:value.chucDanh
          };
        this._api.post('/api/giangviens/create-gv',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.search();
          this.closeModal();

          });
      });
    } else {
      this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
        let data_image = data == '' ? null : data;
        let tmp;
        if(data==''){
          tmp = {
            HinhAnh:this.giangvien.hinhAnh,
            Id_BoMon:value.id_BoMon,
            TenGV:value.tenGV,
            GioiTinh:value.gioiTinh,
            NgaySinh:value.ngaySinh,
            Sdt:value.sdt,
            Email:value.email,
            NoiSinh:value.noiSinh,
            DiaChi:value.diaChi,
            TinHoc:value.tinHoc,
            ChucVu:value.chucVu,
            ChucDanh:value.chucDanh,
            Id :this.giangvien.id,
          };
        }
        else{
          tmp = {
            HinhAnh:data_image,
            Id_BoMon:value.id_BoMon,
            TenGV:value.tenGV,
            GioiTinh:value.gioiTinh,
            NgaySinh:value.ngaySinh,
            Sdt:value.sdt,
            Email:value.email,
            NoiSinh:value.noiSinh,
            DiaChi:value.diaChi,
            TinHoc:value.tinHoc,
            ChucVu:value.chucVu,
            ChucDanh:value.chucDanh,
            Id:this.giangvien.id,
          };
        }
        this._api.post('/api/giangviens/update-gv',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công!');
          this.search();
          this.closeModal();
          });
      });
    }
  }

  onDelete(row) {
    this._api.post('/api/GiangViens/delete-gv',{id:row.id}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa giảng viên thành công!');
      this.search();
      });
  }

  public chitiet(row) {
    this.showCTModal=true;
    setTimeout(() => {
      $('#profileModal').modal('toggle');
      this._api.get('/api/giangviens/get-by-id/'+ row.id).subscribe(res=> {
        this.giangvien = res;
        });
      this._api.get('/api/congtacs/get-gv/'+ row.id).subscribe(res=>{
        this.congtac = res;
      });
      this._api.get('/api/daotaos/get-gv/'+ row.id).subscribe(res=>{
        this.daotao = res;
      });
    });
  }

  Reset() {
    this.giangvien = null;
    this.formdata = this.fb.group({

      'id_BoMon': ['', Validators.required],
      'tenGV': ['', Validators.required],
      'hinhAnh': ['', Validators.required],
      'gioiTinh': [this.genders[0].value, Validators.required],
      'ngaySinh': [this.today, Validators.required],
      'sdt': ['', Validators.required],
      'email': ['', Validators.required],
      'noiSinh': [''],
      'diaChi': ['', Validators.required],
      'tinHoc': [''],
      'chucVu': ['', Validators.required],
      'chucDanh': ['', Validators.required],
    } );
  }

  createModal() {
    this.lay_ds_bomon();
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.giangvien = null;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.formdata = this.fb.group({
        'id_BoMon': ['', Validators.required],
        'tenGV': ['', Validators.required],
        'hinhAnh': [''],
        'gioiTinh': ['', Validators.required],
        'ngaySinh': ['', Validators.required],
        'sdt': ['', Validators.required,Validators.pattern(/[0-9]*/)],
        'email': ['', [Validators.required,Validators.email]],
        'noiSinh': [''],
        'diaChi': ['', Validators.required],
        'tinHoc': [''],
        'chucVu': ['', Validators.required],
        'chucDanh': ['', Validators.required],
      });
      this.formdata.get('ngaySinh').setValue(this.today);
      this.formdata.get('gioiTinh').setValue(this.genders[0].value);
      this.doneSetupForm = true;
    });
  }

  public openUpdateModal(row) {
    this.lay_ds_bomon();
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this._api.get('/api/giangviens/get-by-id/'+ row.id).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.giangvien = res;
        let ngaySinh = new Date(this.giangvien.ngaySinh);
          this.formdata = this.fb.group({
            'id_BoMon': [this.giangvien.id_BoMon, Validators.required],
            'tenGV': [this.giangvien.tenGV, Validators.required],
            'hinhAnh': [this.giangvien.hinhAnh],
            'gioiTinh': [this.giangvien.gioiTinh, Validators.required],
            'ngaySinh': [ngaySinh, Validators.required],
            'sdt': [this.giangvien.sdt, Validators.required],
            'email': [this.giangvien.email, [Validators.required,Validators.email]],
            'noiSinh': [this.giangvien.noiSinh],
            'diaChi': [this.giangvien.diaChi, Validators.required],
            'tinHoc': [this.giangvien.tinHoc],
            'chucVu': [this.giangvien.chucVu, Validators.required],
            'chucDanh': [this.giangvien.chucDanh, Validators.required],
          });
          this.doneSetupForm = true;
        });
    }, 700);
  }

  closeModal() {
    $('#createUserModal').closest('.modal').modal('hide');
    $('#profileModal').closest('.modal').modal('hide');
  }
}
