import { Component, OnInit, VERSION, ViewChild ,HostListener} from '@angular/core';
import {Message,Authcheck,Student} from '../Modal/auth.model'
import {AuthServiceService} from '../../auth-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder,Validators } from '@angular/forms'


@Component({
  selector: 'app-studentinfo',
  templateUrl: './studentinfo.component.html',
  styleUrls: ['./studentinfo.component.css']
})
export class StudentinfoComponent implements OnInit {

  constructor(private fb: FormBuilder,private auth:AuthServiceService,private router: Router) { }
  breakpoint: number;
  pageno: number=1;
  public storedata;
  ngOnInit(): void {
    this.getstudent();
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;

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

  }

  searchform: FormGroup = this.fb.group({
    searchvalue: ['']
  
 })
 
 searchstudent()
 {
  
  this.pageno=0;
  this.auth.getsearchstudent(this.pageno++,this.searchform.value.searchvalue).subscribe(data =>{
    this.studentdtata=data;
  })
 
  
 }
  public studentdtata : Student[];
  getstudent()
  {
  
   this.auth.getstudent(0).subscribe(data =>{
     this.studentdtata=data;
   })
  
  }
  getstudentsearchwithpagination()
  {
    this.auth.getsearchstudent(this.pageno++,this.searchform.value.searchvalue).subscribe(data =>{
      for (var val of data) {
       this.studentdtata.push(val);
      }
     })
  }
  getstudentwithpagination()
  {
  
   this.auth.getstudent(this.pageno++).subscribe(data =>{
    for (var val of data) {
     this.studentdtata.push(val);
    }
   })
  
  }
  @HostListener('window:scroll', ['$event']) 
    scrollHandler(event) {
      if(this.searchform.value.searchvalue=='')
      this.getstudentwithpagination();
      else
      this.getstudentsearchwithpagination();
      console.log(this.pageno);
    }



onResize(event) {
  this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
}

}
