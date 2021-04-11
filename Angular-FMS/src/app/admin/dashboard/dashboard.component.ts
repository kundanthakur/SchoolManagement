import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../auth-service.service';
import { Router } from '@angular/router';
import {Authcheck} from '../Modal/auth.model'
import {FooterComponent} from '../footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as Chartist from 'chartist';
import {MatTooltipModule} from '@angular/material/tooltip'



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  panelOpenState = false;
  constructor(private auth:AuthServiceService,private router: Router) { }
  public storedata;
 header="Dashboard";

  ngOnInit(): void {
    if(localStorage.getItem("jwstoken")!= undefined && localStorage.getItem("jwstoken")!=null && localStorage.getItem("jwstoken")!= '')
    {
      this.auth.checkuserAuthentication().subscribe(data =>{
        this.storedata=data;
        let obj: Authcheck =  this.storedata;
        if(obj.status==200)
        {
          localStorage.setItem("jwstoken", obj.jwstoken);
          this.router.navigate(['/admin/Dashboard']);
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
     /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

  }

}
