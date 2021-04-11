import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {FeeTemplate,Student} from './admin/Modal/auth.model'


interface PaymentConfig
{
  packagename :string,
  companyId :number,
  paymentstructure :string
}
@Injectable({
  providedIn: 'root'
})


export class AuthServiceService {
  public authdata;

  constructor(private http:HttpClient) {}
   getuserAuthentication(data){
     return this.http.get("/api/loginuser/"+data.email+"/"+data.password);
  }

  savestudent(data)
  {
    const  headers = new  HttpHeaders().set("Authorization", localStorage.getItem("jwstoken"));
    return this.http.post("/api/savestudent",data,{headers});
  }
 checkuserAuthentication(){
    const  headers = new  HttpHeaders().set("Authorization", localStorage.getItem("jwstoken"));
    return this.http.get("/api/checkAuth/",{headers});
   }

   getpaymentconfig(){
    const  headers = new  HttpHeaders().set("Authorization", localStorage.getItem("jwstoken"));
    return this.http.get <FeeTemplate[]>("/api/getpaymentConfiguration",{headers});
   }

   getstudent(data){
    const  headers = new  HttpHeaders().set("Authorization", localStorage.getItem("jwstoken"));
    return this.http.get <Student[]>("/api/getStudent/"+data,{headers});
   } 
   
   getstudentwithid(data){
    const  headers = new  HttpHeaders().set("Authorization", localStorage.getItem("jwstoken"));
    return this.http.get <Student>("/api/getStudentbyId/"+data,{headers});
   }

   getsearchstudent(pageno,data){
    const  headers = new  HttpHeaders().set("Authorization", localStorage.getItem("jwstoken"));
    return this.http.get <Student[]>("/api/getStudent/"+pageno+"/"+data,{headers});
   }


  deletepaymentconfig(data)
  {
    const  headers = new  HttpHeaders().set("Authorization", localStorage.getItem("jwstoken"));
    
    return this.http.get("/api/deletepaymentConfiguration/"+data,{headers});
  }
   saveFeeStructure(data)
   {
    const  headers = new  HttpHeaders().set("Authorization", localStorage.getItem("jwstoken"));
    return this.http.post("/api/savepaymentConfiguration",data,{headers});
   }


}
