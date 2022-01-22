import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {


  httpOptions = {
    headers:{
      'Content-Type': 'application/json'
    }
  };

  items:Item[] = [
    {
      id: 0,
      title: 'manzana',
      price: 10.5,
      quantity: 4,
      completed: false
    },
    {
      id: 1,
      title: 'pan',
      price: 3.5,
      quantity: 8,
      completed: true
    },
    {
      id: 2,
      title: 'chamarra',
      price: 300,
      quantity: 1,
      completed: false
    }
  ];
  constructor( private http:HttpClient) { }

  getItems():Observable<Item[]>{
    // return this.items;
    return this.http.get<Item[]>(environment.api + "/items/");
  }

  addItem(item:Item):Observable<Item>{
    // this.items.unshift(item);
    return this.http.post<Item>(environment.api + "/items", item, this.httpOptions); 
  }

  toggleItem(item:Item):Observable<Item>{
    console.log(item.id);
    return this.http.put<Item>(environment.api + "/items/" + item.id, item, this.httpOptions);
  }

  deleteItem(item:Item):Observable<Item>{
    return this.http.delete<Item>(environment.api + "/items/" + item.id);
  }
}
