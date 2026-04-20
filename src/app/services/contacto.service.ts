import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contacto } from '../models/contacto'

@Injectable({ providedIn: 'root' })
export class ContactoService {
  private apiUrl = 'http://localhost:3000/contactos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Contacto[]> {
    return this.http.get<Contacto[]>(this.apiUrl);
  }

  create(c: Contacto): Observable<Contacto> {
    return this.http.post<Contacto>(this.apiUrl, c);
  }

  update(id: number, c: Contacto): Observable<Contacto> {
    return this.http.put<Contacto>(`${this.apiUrl}/${id}`, c);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}