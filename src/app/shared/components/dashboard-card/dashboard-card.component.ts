import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss'],
})
export class DashboardCardComponent implements OnInit {
@Input() data;
  constructor( private router :Router) { }
  ngOnInit() {}
  navigate(action){
    this.router.navigate([action.url]);
  }
}
