import { Component, OnInit, VERSION, ViewChild } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  constructor() { }
  breakpoint: number;
  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
  }
 
    


onResize(event) {
  this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
}

}
