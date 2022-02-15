import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  //exposing cache of messages and two methods
  messages: string[] = [];

  //adding message to cache
  add(message: string) {
    this.messages.push(message);
  }

  //clearing the cache
  clear() { 
    this.messages = [];
  }
}
