import { Component, OnInit } from '@angular/core';
//importing interface
import { Footballer } from '../footballer';
import { FootballerService } from '../footballer.service';

@Component({
  selector: 'app-footballers',
  templateUrl: './footballers.component.html',
  styleUrls: ['./footballers.component.css']
})
export class FootballersComponent implements OnInit {
   //declaration
  footballers: Footballer[] = [];

  constructor(private footballerService: FootballerService) { 
    //adding private parameter of type FootballerService^
  }

  //when component instance is constructed, get footballers is called
  ngOnInit(): void {
    this.getFootballers();
  }

  //method for recieving footballers from service
  getFootballers(): void {
    this.footballerService.getFootballers()
        .subscribe(footballers => this.footballers = footballers);
  }

  //call click handler[add], in response to click event
  add(name: string): void
  {
    //if name entered, handler creates and passses to addFootballer service
    name = name.trim();
    if (!name) { return; }
    this.footballerService.addFootballer({ name } as Footballer).subscribe(footballer => {
      this.footballers.push(footballer);
    })
  }

  delete(footballer: Footballer): void
  {
    this.footballers = this.footballers.filter(f => f !== footballer);
    this.footballerService.deleteFootballer(footballer.id).subscribe();
  }
}
