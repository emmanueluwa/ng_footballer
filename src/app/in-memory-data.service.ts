import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Footballer } from './footballer'

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
    createDb() {
      const footballers = [
        { id: 1, name: 'Mendy' },
        { id: 2, name: 'Dias' },
        { id: 3, name: 'TAA' },
        { id: 4, name: 'Lamptey' },
        { id: 5, name: 'Debruyne' },
        { id: 6, name: 'Kovacic' },
        { id: 7, name: 'Messi' },
        { id: 8, name: 'Salah' },
        { id: 9, name: 'Greenwood' },
        { id: 10, name: 'Kane' },
      ];
      return {footballers};
    }
    //overriedes genId method and ensures hero always has id
    // if empty number inital baller is returned
    //if not empty method returns the highest
    genId(footballers: Footballer[]): number {return footballers.length > 0 ? Math.max(...footballers.map(footballer => footballer.id)) + 1: 1;
    }
  }