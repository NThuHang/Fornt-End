import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import { SelectItem } from 'primeng/api';
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
  public sohuuDT: any ;
  loadvt: SelectItem[];
  public giangvienDT: any;
  public dsgv: any;
  public totalRecords:any;
  public pageSize = 3;
  public page = 1;
  public formsearch: any;
  public formdata: any;
  public doneSetupForm: any;
  public showUpdateModal:any;
  public showUpdateVTModal:any;
  public showDeTaiGV: any;
  public isCreate:any;
  public isUpdateGV: any;
  public status : any;
  submitted = false;
  submittedVT = false;
  gv: any;
  constructor(private fb: FormBuilder, injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    this.showDeTaiGV = false;
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

  lay_ds_giangvien(){
    this._api.get('/api/giangviens/get-all').subscribe(res=>{
      this.dsgv = res;
      // for (let i = 0; i <= this.dsgv.length; i++) {
      //   this.loadgv.push({ label: this.dsgv[i].tenGV, value: this.dsgv[i].id});
      // }
    });
    // this.loadvt =[
    //   {label: 'Ch??? tr??', value: 'Ch??? tr??'},
    //   {label: 'Th??nh vi??n', value: 'Th??nh vi??n'}
    // ]
  }

  public dsgv_thamgia(){
    this._api.get('/api/detais/get-by-gv/'+ this.detai.id).subscribe(res=>{
      this.giangvienDT = res;
    });
  }

  public chitiet(row) {
    this.showDeTaiGV=true;
    setTimeout(() => {
      $('#viewModal').modal('toggle');
      this._api.get('/api/detais/get-by-id/'+ row.id).subscribe(res=> {
        this.detai= res;
      });
      this._api.get('/api/detais/get-by-gv/'+ row.id).subscribe(res=>{
        this.giangvienDT = res;
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
      this.status = false;
        let tmp = {
          LoaiDT:value.loaiDT,
          TenDT:value.tenDT,
          MaSo:value.maSo,
          CoQuanQuanLy : value.coQuanQuanLy,
          CapQuanLy : value.capQuanLy,
          ThoiGianBD: value.thoiGianBD,
          ThoiGianKT: value.thoiGianKT,
          ThanhTich: value.thanhTich,
          Status: this.status
          };
        this._api.post('/api/detais/create-detai',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Th??m ????? t??i th??nh c??ng');
          this.search();
          this.closeModal();
          });
    }
    else {
        let tmp = {
          LoaiDT:value.loaiDT,
          TenDT:value.tenDT,
          MaSo:value.maSo,
          CoQuanQuanLy : value.coQuanQuanLy,
          CapQuanLy : value.capQuanLy,
          ThoiGianBD: value.thoiGianBD,
          ThoiGianKT: value.thoiGianKT,
          ThanhTich: value.thanhTich ,
          Id:this.detai.id
        };
        this._api.post('/api/detais/update-detai',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('C???p nh???t th??nh c??ng');
          this.search();
          this.closeModal();
          });
    }

  }
  SubmitVT(value) {
    this.submittedVT = true;
    if (this.formdata.invalid) {
      return;
    }
    if(!this.isUpdateGV) {
      let tmp = {
        Id_GiangVien:value.id_GiangVien,
        ViTri:value.viTri,
        Id_DeTai:this.detai.id
        };
      this._api.post('/api/detais/create-gv-detai',tmp).takeUntil(this.unsubscribe).subscribe(res => {
        alert('Th??m v??? tr?? gi???ng vi??n th??nh c??ng');
        this.dsgv_thamgia();
        this.closeModal();
        });
    }
    else {
      let tmp = {
        Id_GiangVien:value.id_GiangVien,
        ViTri:value.viTri,
        Id_DeTai:this.detai.id
        };
      this._api.post('/api/detais/update-gv-detai',tmp).takeUntil(this.unsubscribe).subscribe(res => {
        alert('Ch???nh s???a v??? tr?? gi???ng vi??n th??nh c??ng');
        this.dsgv_thamgia();
        this.closeModal();
        });
    }
  }
  onDelete(row) {
    this._api.post('/api/detais/delete-detai',{id:row.id}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('X??a th??nh c??ng');
      this.search();
      });
  }

  onDeleteVT(row) {
    this._api.post('/api/detais/delete-gv-detai',{idDT: this.detai.id, idGV : row.id_GiangVien}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('X??a gi???ng vi??n tham gia th??nh c??ng');
      this.dsgv_thamgia();
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

  createViTriGVModal() {
    this.lay_ds_giangvien();
    this.doneSetupForm = false;
    this.showUpdateVTModal = true;
    this.isUpdateGV = false;
    this.sohuuDT = null;
    setTimeout(() => {
      $('#updateModal').modal('toggle');
      this.formdata = this.fb.group({
        'id_GiangVien': ['', Validators.required],
        'viTri': ['', Validators.required]
      });
      this.doneSetupForm = true;
    });
  }

  updateViTriGVModal(row){
    this.lay_ds_giangvien();
    this.doneSetupForm = false;
    this.showUpdateVTModal = true;
    this.isUpdateGV = true;
    setTimeout(() => {
      $('#updateModal').modal('toggle');
      this._api.post('/api/detais/get-by-vitri/',{idDT: this.detai.id, idGV : row.id_GiangVien}).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.sohuuDT = res;
          this.formdata = this.fb.group({
            'id_GiangVien': [this.sohuuDT.id_GiangVien, Validators.required],
            'tenGV': [this.sohuuDT.tenGV, Validators.required],
            'viTri': [this.sohuuDT.viTri, Validators.required]
          })
          this.doneSetupForm = true;
        });
    }, 700);
  }

  closeModal() {
    $('#createModal').closest('.modal').modal('hide');
    $('#updateModal').closest('.modal').modal('hide');
  }
  Quaylai(){
    this.showDeTaiGV=false;
  }
}

