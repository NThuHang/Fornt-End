import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
declare var $: any;

@Component({
  selector: 'app-ql-daotao',
  templateUrl: './ql-daotao.component.html',
  styleUrls: ['./ql-daotao.component.css']
})
export class QlDaotaoComponent  extends BaseComponent implements OnInit {
  public daotaos: any ;
  public daotao: any;
  public giangvien: any;
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
    this._api.post('/api/daotaos/search',{page: page, pageSize: this.pageSize, ten: this.formsearch.get('ten').value, idGV : this.gv.id}).takeUntil(this.unsubscribe).subscribe(res => {
      this.daotaos = res.data;
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
    this._api.post('/api/daotaos/search',{page: this.page, pageSize: this.pageSize, ten: this.formsearch.get('ten').value, idGV : this.gv.id}).takeUntil(this.unsubscribe).subscribe(res => {
      this.daotaos = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

  public chitiet(row) {
    this.showCTModal=true;
    setTimeout(() => {
      $('#profileModal').modal('toggle');
      this._api.get('/api/daotaos/get-by-id/'+ row.id_GiangVien).subscribe(res=> {
        this.daotao = res;
        });
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
          BacDT:value.bacDT,
          NoiDT:value.noiDT,
          ChuyenMon:value.chuyenMon,
          NamTotNghiep:value.namTotNghiep ,
          Id_GiangVien:this.gv.id,
          };
        this._api.post('/api/daotaos/create-daotao',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.search();
          this.closeModal();
          });
    } else {
        let tmp = {
          BacDT:value.bacDT,
          NoiDT:value.noiDT,
          ChuyenMon:value.chuyenMon,
          NamTotNghiep:value.namTotNghiep ,
          Id_GiangVien:this.gv.id ,
          Id:this.daotao.id
        };
        this._api.post('/api/daotaos/update-daotao',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.search();
          this.closeModal();
          });
    }
  }


  onDelete(row) {
    this._api.post('/api/daotaos/delete-daotao',{Id:row.id}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search();
      });
  }
  Reset() {
    this.daotao = null;
    this.formdata = this.fb.group({
      'bacDT': ['', Validators.required],
      'noiDT': ['', Validators.required],
      'chuyenMon': ['', Validators.required],
      'namTotNghiep' : ['', Validators.required],
      'id_GiangVien'  : ['', Validators.required]
    } );
  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.daotao = null;
    setTimeout(() => {
      $('#createModal').modal('toggle');
      this.formdata = this.fb.group({
        'bacDT': ['', Validators.required],
        'noiDT': ['', Validators.required],
        'chuyenMon': ['', Validators.required],
        'namTotNghiep' : ['', Validators.required],
        'id_GiangVien'  : ['', Validators.required]
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
      this._api.get('/api/daotaos/get-by-id/'+ row.id).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.daotao = res;
        console.log(row);
          this.formdata = this.fb.group({
            'bacDT': [this.daotao.bacDT, Validators.required],
            'noiDT': [this.daotao.noiDT, Validators.required],
            'chuyenMon': [this.daotao.chuyenMon, Validators.required],
            'namTotNghiep': [this.daotao.namTotNghiep, Validators.required],
            'id_GiangVien' : [this.daotao.id_GiangVien, Validators.required]
          });
          this.doneSetupForm = true;
        });
    }, 700);
  }

  closeModal() {
    $('#createModal').closest('.modal').modal('hide');
  }
}


