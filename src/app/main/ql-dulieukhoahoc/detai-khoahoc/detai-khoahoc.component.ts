import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
declare var $: any;

@Component({
  selector: 'app-detai-khoahoc',
  templateUrl: './detai-khoahoc.component.html',
  styleUrls: ['./detai-khoahoc.component.css']
})
export class DetaiKhoahocComponent  extends BaseComponent implements OnInit {
  public detais: any ;
  public detai: any;
  public tapchi: any;
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
  gv: any;
  constructor(private fb: FormBuilder, injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    this.thongtin();
    this.formsearch = this.fb.group({
      'ten': [''],
    });
    this.search();
  }

  thongtin(){
    this.gv = JSON.parse(localStorage.getItem('User'));
  }

  loadPage(page) {
    this._api.post('/api/detais/search',{page: page, pageSize: this.pageSize, ten: this.formsearch.get('ten').value, idGV: this.gv.id}).takeUntil(this.unsubscribe).subscribe(res => {
      this.detais = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

  search() {
    this.page = 1;
    this.pageSize = 5;
    this._api.post('/api/detais/search',{page: this.page, pageSize: this.pageSize, ten: this.formsearch.get('ten').value, idGV: this.gv.id}).takeUntil(this.unsubscribe).subscribe(res => {
      this.detais = res.data;
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
          LoaiDT:value.loaiDT,
          TenDT:value.tenDT,
          MaSo:value.maSo,
          CoQuanQuanLy : value.coQuanQuanLy,
          CapQuanLy : value.capQuanLy,
          ThoiGianBD: value.thoiGianBD ,
          ThanhTich: value.thanhTich
          };
        this._api.post('/api/detais/create-detai',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.search();
          this.closeModal();
          });
    } else {
        let tmp = {
          LoaiDT:value.loaiDT,
          TenDT:value.tenDT,
          MaSo:value.maSo,
          CoQuanQuanLy : value.coQuanQuanLy,
          CapQuanLy : value.capQuanLy,
          ThoiGianBD: value.thoiGianBD ,
          ThanhTich: value.thanhTich ,
          Id:this.detai.id
        };
        this._api.post('/api/detais/update-detai',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.search();
          this.closeModal();
          });
    }

  }
  onDelete(row) {
    this._api.post('/api/detais/delete-detai',{id:row.id}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search();
      });
  }

  Reset() {
    this.detai = null;
    this.formdata = this.fb.group({
      'loaiDT': ['', Validators.required],
      'tenDT': ['', Validators.required],
      'maSo': ['', Validators.required],
      'coQuanQuanLy': ['', Validators.required],
      'capQuanLy': ['', Validators.required],
      'thoiGianBD' : [this.today, Validators.required],
      'thoiGianKT' : [this.today, Validators.required],
      'thanhTich': ['', Validators.required]
    } );
  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.detai = null;
    setTimeout(() => {
      $('#createModal').modal('toggle');
      this.formdata = this.fb.group({
        'loaiDT': ['', Validators.required],
        'tenDT': ['', Validators.required],
        'maSo': ['', Validators.required],
        'coQuanQuanLy': ['', Validators.required],
        'capQuanLy': ['', Validators.required],
        'thoiGianBD' : [this.today, Validators.required],
        'thoiGianKT' : [this.today, Validators.required],
        'thanhTich': ['', Validators.required]
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
      this._api.get('/api/detais/get-by-id/'+ row.id).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.detai = res;
          let ngaybd = new Date(this.detai.thoiGianBD);
          let ngaykt = new Date(this.detai.thoiGianKT);
          this.formdata = this.fb.group({
            'loaiDT': [this.detai.loaiDT, Validators.required],
            'tenDT': [this.detai.tenDT, Validators.required],
            'maSo': [this.detai.maSo, Validators.required],
            'coQuanQuanLy': [this.detai.coQuanQuanLy, Validators.required],
            'capQuanLy': [this.detai.capQuanLy, Validators.required],
            'thoiGianBD': [ngaybd, Validators.required] ,
            'thoiGianKT': [ngaykt, Validators.required] ,
            'thanhTich': [this.detai.thanhTich, Validators.required]
          });
          this.doneSetupForm = true;
        });
    }, 700);
  }

  closeModal() {
    $('#createModal').closest('.modal').modal('hide');
  }
}

