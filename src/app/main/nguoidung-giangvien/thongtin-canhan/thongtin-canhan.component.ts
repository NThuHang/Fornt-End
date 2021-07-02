import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder,FormControl, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-thongtin-canhan',
  templateUrl: './thongtin-canhan.component.html',
  styleUrls: ['./thongtin-canhan.component.css']
})
export class ThongtinCanhanComponent extends BaseComponent implements OnInit {
  public giangviens: any ;
  public giangvien: any;
  public bomon: any;
  public uploadedFiles: any[] = [];
  public formdata: any;
  public formload: any;
  public doneSetupForm: any;
  submitted = false;
  public gv: any;

  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private fb: FormBuilder, injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    this.thongtin();
    this.ChinhSuaGV(this.gv.id);
  }

  thongtin(){
    this.gv = JSON.parse(localStorage.getItem('User'));
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
        });

      });

  }

  public ChinhSuaGV(id) {
    this.lay_ds_bomon();
    this.doneSetupForm = false;
      this._api.get('/api/giangviens/get-by-id/'+ this.gv.id).takeUntil(this.unsubscribe).subscribe((res:any) => {
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
  }

}
