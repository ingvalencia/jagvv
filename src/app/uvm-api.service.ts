import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UvmApiService {
  private apiUrl = 'https://uvm.mx/suitev3/get_ofertando_vigente';

  constructor(private http: HttpClient) {}

  getAcademicOfferings(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      map((response: any) => response.message)
    );
  }
}
