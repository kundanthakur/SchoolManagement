import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { from } from 'rxjs';
import {AuthServiceService} from '../../auth-service.service';
import { Router } from '@angular/router';
import {Authcheck} from '../Modal/auth.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  
  hide: boolean = false;
  public storedata;

  constructor(private fb: FormBuilder,private auth:AuthServiceService,
    private router: Router) { }

  ngOnInit(): void {
    
    if(localStorage.getItem("jwstoken")!= undefined && localStorage.getItem("jwstoken")!=null && localStorage.getItem("jwstoken")!= '')
    {
      this.auth.checkuserAuthentication().subscribe(data =>{
        this.storedata=data;
        let obj: Authcheck =  this.storedata;
        if(obj.status==200)
        {
          localStorage.setItem("jwstoken", obj.jwstoken);
          this.router.navigate(['/admin']);
        }
      })
    }
    
  }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  
  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    console.log(this.loginForm.value);
    this.auth.getuserAuthentication(this.loginForm.value).subscribe(data =>{
      this.storedata=data;
      let obj: Authcheck =  this.storedata;
      if(obj.status==200)
      {
        localStorage.setItem("jwstoken", obj.jwstoken);
        this.router.navigate(['/admin']);
      }
    })
}
  
}
