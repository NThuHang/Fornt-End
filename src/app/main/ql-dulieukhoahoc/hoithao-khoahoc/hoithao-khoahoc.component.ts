import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';
declare var $: any;
@Component({
  selector: 'app-hoithao-khoahoc',
  templateUrl: './hoithao-khoahoc.component.html',
  styleUrls: ['./hoithao-khoahoc.component.css']
})
export class HoithaoKhoahocComponent  extends BaseComponent implements OnInit {
  public hoithaos: any ;
  public hoithao: any;
  public tapchi: any;
  public totalRecords:any;
  public pageSize:any;
  public page = 1;
  public uploadedFiles: any[] = [];
  public formsearch: any;
  public formdata: any;
  public doneSetupForm: any;
  public showUpdateModal:any;
  public isCreate:any;
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
    this.search();
  }

  loadPage(page) {
    if(this.pages != null){
      this.pageSize = this.pages;
    }
    else{
      this.pageSize = 5;
    }
    this._api.post('/api/hoithaokhoahoc/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.hoithaos = res.data;
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
    this._api.post('/api/hoithaokhoahoc/search',{page: this.page, pageSize: this.pageSize, ten: this.formsearch.get('ten').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.hoithaos = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

  lay_tapchi(){
    this._api.get('/api/tapchi/get-all').subscribe(res=>{
      this.tapchi = res;
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
          ID_BBao:value.iD_BBao,
          Ten_BBao:value.ten_BBao,
          Trang_BD:value.trang_BD,
          Trang_KT:value.trang_KT,
          ID_TapChi:value.iD_TapChi ,
          TG_XB:value.tG_XB ,
          };
        this._api.post('/api/hoithaokhoahoc/create-hoithao',tmp).takeUntil(this.unsubscribe).subscribe(res => {
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
          ID_hoithao:this.hoithao.iD_hoithao
        };
        this._api.post('/api/hoithaokhoahoc/update-hoithao',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.search();
          this.closeModal();
          });
    }

  }


  onDelete(row) {
    this._api.post('/api/hoithaokhoahoc/delete-hoithao',{hoithao_id:row.iD_hoithao}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search();
      });
  }

  Reset() {
    this.hoithao = null;
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
    this.hoithao = null;
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
    this.lay_tapchi();
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    setTimeout(() => {
      $('#createModal').modal('toggle');
      this._api.get('/api/hoithaokhoahoc/get-by-id/'+ row.iD_BBao).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.hoithao = res;

          this.formdata = this.fb.group({
            'iD_BBao': [this.hoithao.iD_BBao, Validators.required],
            'ten_BBao': [this.hoithao.ten_BBao, Validators.required],
            'trang_BD': [this.hoithao.trang_BD, Validators.required],
            'trang_KT': [this.hoithao.trang_KT, Validators.required],
            'iD_TapChi' : [this.hoithao.iD_TapChi, Validators.required],
            'tG_XB'  : [this.hoithao.tG_XB, Validators.required]
          });
          this.doneSetupForm = true;
        });
    }, 700);
  }

  closeModal() {
    $('#createModal').closest('.modal').modal('hide');
  }
}
