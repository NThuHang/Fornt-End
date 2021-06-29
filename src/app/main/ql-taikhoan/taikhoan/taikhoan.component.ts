import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
declare var $: any;

@Component({
  selector: 'app-taikhoan',
  templateUrl: './taikhoan.component.html',
  styleUrls: ['./taikhoan.component.css']
})
export class TaikhoanComponent extends BaseComponent implements OnInit {
  public taikhoans: any ;
  public taikhoan: any;
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
      'hoten': [''],
    });

  }

  loadPage(page) {
    this._api.post('/api/taikhoan/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.taikhoans = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

  search() {
    this.page = 1;
    this.pageSize = 5;
    this._api.post('/api/taikhoan/search',{page: this.page, pageSize: this.pageSize, hoten: this.formsearch.get('hoten').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.taikhoans = res.data;
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
      this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
        let data_image = data == '' ? null : data;
        let tmp = {
          HinhAnh:data_image,
          HoTen:value.hoTen,
          DiaChi:value.diaChi,
          GioiTinh:value.gioiTinh,
          Email:value.email,
          NgaySinh:value.ngaySinh,
          Sdt:value.sdt,
          QueQuan:value.queQuan,
          };
        this._api.post('/api/taikhoan/create-gv',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.search();
          this.closeModal();
          console.log(this.isCreate);
          });
      });
    } else {
      this.getEncodeFromImage(this.file_image).subscribe((data: any): void => {
        let data_image = data == '' ? null : data;
        let tmp = {
          HinhAnh:data_image,
          HoTen:value.hoTen,
          DiaChi:value.diaChi,
          GioiTinh:value.gioiTinh,
          Email:value.email,
          NgaySinh:value.ngaySinh,
          Sdt:value.sdt,
          QueQuan:value.queQuan,
          ID_GV:this.taikhoan.iD_GV,
        };
        this._api.post('/api/taikhoan/update-gv',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.search();
          this.closeModal();
          });
      });
    }

  }


  onDelete(row) {
    this._api.post('/api/taikhoan/delete-gv',{gv_id:row.iD_GV}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search();
      });
  }

  Reset() {
    this.taikhoan = null;
    this.formdata = this.fb.group({
      'hoTen': ['', Validators.required],
      'hinhAnh': ['', Validators.required],
      'ngaySinh': [this.today, Validators.required],
      'gioiTinh': [this.genders[0].value, Validators.required],
      'queQuan': [''],
      'diaChi': ['', Validators.required],
      'sdt': ['', Validators.required],
      'email': ['', Validators.required],
    } );
  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.taikhoan = null;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.formdata = this.fb.group({
        'hoTen': ['', Validators.required],
        'hinhAnh': [''],
        'ngaySinh': ['', Validators.required],
        'gioiTinh': ['', Validators.required],
        'queQuan': [''],
        'diaChi': ['', Validators.required],
        'sdt': ['', Validators.required],
        'email': ['', [Validators.required,Validators.email]],
      });
      this.formdata.get('ngaySinh').setValue(this.today);
      this.formdata.get('gioiTinh').setValue(this.genders[0].value);
      this.doneSetupForm = true;
    });
  }

  public openUpdateModal(row) {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this._api.get('/api/taikhoan/get-by-id/'+ row.iD_GV).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.taikhoan = res;
        let ngaySinh = new Date(this.taikhoan.ngaySinh);
          this.formdata = this.fb.group({
            'hoTen': [this.taikhoan.hoTen, Validators.required],
            'hinhAnh': [this.taikhoan.hinhAnh],
            'ngaySinh': [ngaySinh, Validators.required],
            'gioiTinh': [this.taikhoan.gioiTinh, Validators.required],
            'queQuan': [this.taikhoan.queQuan],
            'diaChi': [this.taikhoan.diaChi, Validators.required],
            'sdt': [this.taikhoan.sdt, Validators.required],
            'email': [this.taikhoan.email, [Validators.required,Validators.email]],
          });
          this.doneSetupForm = true;
        });
    }, 700);
  }

  closeModal() {
    $('#createUserModal').closest('.modal').modal('hide');
  }
}
