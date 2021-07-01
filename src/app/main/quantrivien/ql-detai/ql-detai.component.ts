import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormControl, Validators} from '@angular/forms';
import { BaseComponent } from '../../../lib/base-component';
import 'rxjs/add/operator/takeUntil';

declare var $: any;

@Component({
  selector: 'app-ql-detai',
  templateUrl: './ql-detai.component.html',
  styleUrls: ['./ql-detai.component.css']
})
export class QlDetaiComponent extends BaseComponent implements OnInit {
  public detais: any ;
  public detai: any;
  public giangvien: any;
  public giangviens: any;
  public totalRecords:any;
  public pageSize =5;
  public page = 1;
  public idGV : any;
  public formsearch: any;
  public formdata: any;
  public doneSetupForm: any;
  public showCTModal:any;
  submitted = false;
  id_gv: any;

  constructor(private fb: FormBuilder, injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    this.formsearch = this.fb.group({
      'ten': [''],
    });
    this.search();
  }

  lay_ds_giangvien(){
    this._api.get('/api/giangviens/giangvien-co-detai').subscribe(res=>{
      this.giangvien = res;
    })
  }

  dataChanged(value: any){
    this.id_gv = value;
    this.search();
  }

  loadPage(page) {

    this._api.post('/api/detais/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.detais = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

  search() {
    this.lay_ds_giangvien();
    this.page = 1;
    this.pageSize =5;
    if(this.id_gv != null ){
      this.idGV = this.id_gv;
    }
    else{
      this.idGV ='';
    }
    this._api.post('/api/detais/search',{page: this.page, pageSize: this.pageSize, idGV: this.idGV,
      ten: this.formsearch.get('ten').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.detais = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

  public chitiet(row) {
    this.showCTModal=true;
    setTimeout(() => {
      $('#viewModal').modal('toggle');
      this._api.get('/api/detais/get-by-id/'+ row.id).subscribe(res=> {
        this.detai= res;
      });
      this._api.get('/api/detais/get-by-gv/'+ row.id).subscribe(res=>{
        this.giangviens = res;
      });
    });
  }

  closeModal() {
    $('#viewModal').closest('.modal').modal('hide');
  }
}



