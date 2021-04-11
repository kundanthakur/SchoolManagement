import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup,Validators} from '@angular/forms';
import {AuthServiceService} from '../../auth-service.service';
import {Message,Authcheck,FeeTemplate   } from '../Modal/auth.model'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  public selected="" ;
  public paymentdefault =0;
  constructor(private activatedroute:ActivatedRoute,private fb: FormBuilder,private auth:AuthServiceService,private router: Router) {
  
   }
public storedata;
public stuid=0;

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
  savestudentform: FormGroup = this.fb.group({
    id:[''],
    fname: ['', [Validators.required, Validators.required]],
    mname: [''],
    lname: ['', [Validators.required, Validators.required]],
    semail: ['', [Validators.required, Validators.email]],
    smobile: ['', [Validators.required, Validators.min(1000000000), Validators.max(999999999999)]],
    sclass: [this.selected, [Validators.required, Validators.min(1), Validators.max(12)]],
    pname: ['', [Validators.required, Validators.required]],
    pmobile: ['', [Validators.required, Validators.min(1000000000), Validators.max(999999999999)]],
    pemail: [''],
    companyId:[1],
    cschool: ['', [Validators.required, Validators.required]],
    admidate: ['', [Validators.required, Validators.required]],
    feepack: [this.paymentdefault, [Validators.min(1)]]

  })
  public paymentconfidtata : FeeTemplate[];
  paymentconfig()
  {
 
   this.auth.getpaymentconfig().subscribe(data =>{
     this.paymentconfidtata=data;
   
   })
   this.getstudentInf();
  }
  public selectedclass: FeeTemplate; 

  getstudentInf()
  {
    this.stuid=this.activatedroute.snapshot.params["id"];
    if(this.stuid!=undefined && this.stuid!=0)
    {
      this.auth.getstudentwithid(this.stuid).subscribe(data =>{
        this.savestudentform.controls['fname'].setValue(data.fname);
        this.savestudentform.controls['mname'].setValue(data.mname);
        this.savestudentform.controls['lname'].setValue(data.lname);
        this.savestudentform.controls['semail'].setValue(data.semail);
        this.savestudentform.controls['smobile'].setValue(data.smobile);
        this.savestudentform.controls['pname'].setValue(data.pname);
        this.savestudentform.controls['pmobile'].setValue(data.pmobile);
        this.savestudentform.controls['pemail'].setValue(data.pemail);
        this.savestudentform.controls['companyId'].setValue(data.companyId);
        this.savestudentform.controls['pname'].setValue(data.pname);
        this.savestudentform.controls['cschool'].setValue(data.cschool);
        this.savestudentform.controls['admidate'].setValue(data.admidate);
        this.savestudentform.controls['id'].setValue(data.id);
        this.selected=""+data.sclass;
        this.paymentdefault=data.feepack;
        console.log(this.paymentdefault);
     
      })

    }
  }
  public studentdata;
  savestudent() {
    if (!this.savestudentform.valid) {
      return;
    }
    this.savestudentform.value.feepack= JSON.stringify(this.savestudentform.value.feepack);
   
    console.log(this.savestudentform.value);
    this.auth.savestudent(this.savestudentform.value).subscribe(data =>{
      this.studentdata=data;
      let obj: Message =  this.studentdata;
      if(obj.status==200)
      {
        alert(obj.message);
       
      }
      
    })

  }

  clearform()
  {
    this.savestudentform.reset();
  }


}
