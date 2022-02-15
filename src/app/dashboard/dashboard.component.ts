import { Component, OnInit } from '@angular/core';
import { Footballer } from '../footballer';
import { FootballerService } from '../footballer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  footballers: Footballer[] = [];

  constructor(private footballerService: FootballerService ) { }

  ngOnInit(): void {
    this.getFootballers();
  }

  getFootballers(): void {
    this.footballerService.getFootballers().subscribe(footballers => this.footballers = footballers.slice(1,5));
  }

}
