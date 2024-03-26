import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UvmApiService {
  private ofertaAcademicaUrl = 'https://uvm.mx/suitev3/get_ofertando_vigente';
  private leadsUrl = '/proc-leads/lead/medios.php';

  constructor(private http: HttpClient) {}

  getAcademicOfferings(): Observable<any> {
    return this.http.get<any>(this.ofertaAcademicaUrl).pipe(
      map((response: { message: any; }) => response.message)
    );
  }

  sendFormData(formData: any): Observable<any> {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    return this.http.post(this.leadsUrl, formDataToSend);
  }
}
