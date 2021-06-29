import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
declare var $: any;

@Component({
  selector: 'app-ql-congtac',
  templateUrl: './ql-congtac.component.html',
  styleUrls: ['./ql-congtac.component.css']
})
export class QlCongtacComponent extends BaseComponent implements OnInit {
  public congtacs: any ;
  public congtac: any;
  public idGV: any;
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
  gv : any;
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
    this._api.post('/api/congtacs/search',{page: page, pageSize: this.pageSize,ten: this.formsearch.get('ten').value, idGV: this.gv.id}).takeUntil(this.unsubscribe).subscribe(res => {
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
    this._api.post('/api/congtacs/search',{page: this.page, pageSize: this.pageSize, ten: this.formsearch.get('ten').value, idGV: this.gv.id }).takeUntil(this.unsubscribe).subscribe(res => {
      this.congtacs = res.data;
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
          CoQuan:value.coQuan,
          ViTri:value.viTri,
          DiaChi:value.diaChi,
          ThoiGianBD:value.thoiGianBD,
          ThoiGianKT:value.thoiGianKT,
          Id_GiangVien: this.gv.id ,
          Id:value.id,
          };
        this._api.post('/api/congtacs/create-congtac',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.search();
          this.closeModal();
          });
    } else {
        let tmp = {
          CoQuan:value.coQuan,
          ViTri:value.viTri,
          DiaChi:value.diaChi,
          ThoiGianBD:value.thoiGianBD,
          ThoiGianKT:value.thoiGianKT,
          Id_GiangVien: this.gv.id,
          Id:this.congtac.id
        };
        this._api.post('/api/congtacs/update-congtac',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.search();
          this.closeModal();
          });
    }

  }
  onDelete(row) {
    this._api.post('/api/congtacs/delete-congtac',{ct_id:row.id}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search();
      });
  }
  Reset() {
    this.congtac = null;
    this.formdata = this.fb.group({
      'coQuan': ['', Validators.required],
      'viTri': ['', Validators.required],
      'diaChi': ['', Validators.required],
      'thoiGianBD' : [this.today, Validators.required],
      'thoiGianKT' : [this.today, Validators.required]
    } );
  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.congtac = null;
    setTimeout(() => {
      $('#createModal').modal('toggle');
      this.formdata = this.fb.group({
        'coQuan': ['', Validators.required],
        'viTri': ['', Validators.required],
        'diaChi': ['', Validators.required],
        'thoiGianBD' : [this.today, Validators.required],
        'thoiGianKT' : [this.today, Validators.required],
        'id'  : ['', Validators.required]
      });
      this.formdata.get('thoiGianBD').setValue(this.today);
      this.doneSetupForm = true;
    });
  }

  public openUpdateModal(row) {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    setTimeout(() => {
      $('#createModal').modal('toggle');
      this._api.get('/api/congtacs/get-by-id/'+ row.id).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.congtac = res;
        console.log(row);
        let ngaybd = new Date(this.congtac.thoiGianBD);
        let ngaykt = new Date(this.congtac.thoiGianKT);
          this.formdata = this.fb.group({
            'coQuan': [this.congtac.coQuan, Validators.required],
            'viTri': [this.congtac.viTri, Validators.required],
            'diaChi': [this.congtac.diaChi, Validators.required],
            'thoiGianBD': [ngaybd, Validators.required],
            'thoiGianKT': [ngaykt, Validators.required],
            'id' : [this.congtac.id, Validators.required]
          });
          this.doneSetupForm = true;
        });
    }, 700);
  }

  closeModal() {
    $('#createModal').closest('.modal').modal('hide');
  }
}



