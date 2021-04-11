export class Authcheck {
    message: string;
    status: number;
    username: string;
    jwstoken: string;
  }

  export class Message {
    message: string;
    status: number;
  }

  export class FeeTemplate {
    id: number;
    packagename: string;
    companyId :number;
    paymentstructure : any;
  }

  export class Student {
    id: number;
    fname: string;
    mname: string;
    lname: string;
    semail: string;
    smobile: string;
    sclass: string;
    pname: string;
    pmobile: string;
    pemail: string;
    cschool: string;
    admidate: string;
    feepack: number;
    isactive: boolean;
    companyId :number;
    adminssionDate: Date;
    paymentstructure : any;
  }