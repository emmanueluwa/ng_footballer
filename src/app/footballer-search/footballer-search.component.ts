import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Footballer } from '../footballer';
import { FootballerService } from '../footballer.service';

@Component({
  selector: 'app-footballer-search',
  templateUrl: './footballer-search.component.html',
  styleUrls: ['./footballer-search.component.css']
})
export class FootballerSearchComponent implements OnInit {
  footballers$!: Observable<Footballer[]>;
  //RxJS Subject --> searchTerms
  private searchTerms = new Subject<string>();

  constructor(private footballerService: FootballerService) { }

  //pushing search term into observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.footballers$ = this.searchTerms.pipe(
      //wait 300ms after each enter before analysing term
      debounceTime(300),

      //ignore new entry if same as previous, no request sent
      distinctUntilChanged(),

      //when entry changes, switch to new search observable
      //returns only thr latest observable
      switchMap((term: string) => this.footballerService.searchFootballers(term)),
    );
  }

}
