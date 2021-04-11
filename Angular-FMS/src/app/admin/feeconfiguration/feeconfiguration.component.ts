import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder,Validators } from '@angular/forms'
import {Message,Authcheck,FeeTemplate} from '../Modal/auth.model'
import {AuthServiceService} from '../../auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-feeconfiguration',
  templateUrl: './feeconfiguration.component.html',
  styleUrls: ['./feeconfiguration.component.css']
})

export class FeeconfigurationComponent implements OnInit {

  
  selectedValue: string;
  constructor(private fb:FormBuilder,private auth:AuthServiceService,private router: Router) {
   
    this.feestructureform = this.fb.group({
      packagename: '',
      paymentstructure: this.fb.array([]) ,
      companyId:''
    });
  }
  NewTemplateVisible = false;
  DeleteTemplate = false;
  
  public storedata;
  public paymentconfidtata : FeeTemplate[];
  ngOnInit(): void {
    if(localStorage.getItem("jwstoken")!= undefined && localStorage.getItem("jwstoken")!=null && localStorage.getItem("jwstoken")!= '')
    {
      this.auth.checkuserAuthentication().subscribe(data =>{
        this.storedata=data;
        let obj: Authcheck =  this.storedata;
        if(obj.status==200)
        {
          localStorage.setItem("jwstoken", obj.jwstoken);
        }
        else{
          localStorage.removeItem("jwstoken");
          this.router.navigate(['/admin/login']);
        }
      })
    }
    else
    {
      localStorage.removeItem("jwstoken");
      this.router.navigate(['/admin/login']);
    }

    this.paymentconfig();
  }
  templateform: FormGroup = this.fb.group({
      template: ['', [Validators.required, Validators.required]]
    
   })
 paymentconfig()
 {
  this.paymentconfidtata=null;
  this.auth.getpaymentconfig().subscribe(data =>{
    this.paymentconfidtata=data;
  
  })
 }
    
  feestructureform: FormGroup = this.fb.group({
    packagename: ['', [Validators.required, Validators.required]],
    qty: ['', [Validators.required, Validators.required]],
    price: ['', [Validators.required, Validators.min(1000000000), Validators.max(999999999999)]],
    companyId: [''],

  })

  paymentstructure() : FormArray {
    return this.feestructureform.get("paymentstructure") as FormArray
  }
   
  newQuantity(): FormGroup {
    return this.fb.group({
      qty: '',
      price: '',
    })
  }

  Quantity(quty:string,priced :number): FormGroup {
    return this.fb.group({
      qty: quty,
      price: priced,
    })
  }
   
  addQuantity() {
    this.paymentstructure().push(this.newQuantity());
  }
  templateopener()
  {
    this.clearform(this.feestructureform.get("paymentstructure").value.length);
    this.feestructureform.controls['packagename'].setValue('');
     this.NewTemplateVisible = true;
   
    if (this.templateform.value.template=="new")
    {
     this.DeleteTemplate=false;

    }
    else
    {
     this.DeleteTemplate=true;
     let obj: FeeTemplate =  this.templateform.value.template;
     let userTestStatus: { qty: string, price:  number}[] =JSON.parse(obj.paymentstructure);
    
     this.feestructureform.controls['packagename'].setValue(obj.packagename);
     for(let obje of userTestStatus){
     
      this.paymentstructure().push(this.Quantity(obje.qty,obje.price));
     }
    }
       
  }
  public msg;
  deletetemplate()
  {
    this.auth.deletepaymentconfig(this.feestructureform.value.packagename).subscribe(data =>{
      this.msg=data;
      let obj: Message =  this.msg;
      if(obj.status==200)
      {
       alert(obj.message);
      }
      
    })

    this.clearform(this.feestructureform.get("paymentstructure").value.length);
    this.paymentstructure().reset();
    this.paymentconfig();
  }
  removeQuantity(i:number) {
   
    this.paymentstructure().removeAt(i);
  }
  clearform(noofobjects :number)
  {
      
    while (noofobjects !== -1) {
      console.log(noofobjects);
      this.removeQuantity(noofobjects);
      noofobjects=noofobjects-1;
    }
    this.NewTemplateVisible = false;
    this.DeleteTemplate = false;
    
  }
  public feestructredata; 
  onSubmit() {
    console.log("fee stru");
    if (!this.feestructureform.valid) {
    return;
    }
  
    console.log(this.feestructureform.value);
    
    this.auth.saveFeeStructure(this.feestructureform.value).subscribe(data =>{
      this.feestructredata=data;
      let obj: Message =  this.feestructredata;
      if(obj.status==200)
      {
        this.paymentstructure().reset();
        this.paymentconfig();
        this.clearform(this.feestructureform.get("paymentstructure").value.length);
       
      }
      
    })

  }
}


