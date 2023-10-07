import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceURL: string = "";
  http = inject(HttpClient)
  constructor() { 
    this.serviceURL = "http://localhost:3000/tasks"
  }
}
