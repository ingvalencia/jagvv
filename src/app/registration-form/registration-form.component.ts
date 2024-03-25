import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { UvmApiService } from '../uvm-api.service';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  campusOptions: any[] = [];
  carrerasOptions: any[] = [];
  carreraInteresOptions: any[] = [];
  subNivelInteresOptions: any[] = [];
  nivelInteresOptions: any[] = [];
  cicloOptions: any[] = [];
  selectedCampus: string | null = null;
  selectedCarrera: string | null = null;

  // Inicializa el modelo para los datos del formulario
  formData = {
    nombre: '',
    apaterno: '',
    email: '',
    celular: '',
    campusLargo: '',
    carrera: '',
    carreraInteres: '',
    subNivelInteres: '',
    nivelInteres: '',
    ciclo: '',
    // Campos que no se muestran en el formulario pero se envían
    gclid: '',
    utm_campaign: '',
    banner: 'GiovannyValencia',
    CID: '2016705784.1697574806',
    verify_token: 'UVM.G0-24',
    marcable: '2',
    urlreferrer: document.referrer || 'direct',
    dispositivo: `${navigator.platform}; ${navigator.userAgent}`
  };

  constructor(private uvmApiService: UvmApiService) {}

  ngOnInit(): void {
    this.uvmApiService.getAcademicOfferings().subscribe(data => {
      this.campusOptions = [...new Set(data.map((item: { nombrelargo_campus: any; }) => item.nombrelargo_campus))];
    });
  }

  onCampusSelected(value: string): void {
    console.log("algo");

    this.selectedCampus = value;
    this.uvmApiService.getAcademicOfferings().subscribe(data => {
      this.carrerasOptions = data.filter((item: { nombrelargo_campus: string; }) => item.nombrelargo_campus === value)
                                 .map((item: { crmit_claveprogramabanner: any; ofertando_crmit_name: any; }) => { 
                                   return { 
                                     clave: item.crmit_claveprogramabanner, 
                                     nombre: item.ofertando_crmit_name 
                                   }; 
                                 });
    });
  }

  onCarreraSelected(value: string): void {
    this.selectedCarrera = value;
  }

  onSubmit() {
    const dataToSend = {
      gclid: '',
      utm_campaign: '',
      banner: 'tunombre',
      CID: '2016705784.1697574806',
      verify_token: 'UVM.G0-24',
      marcable: '2',
      urlreferrer: document.referrer || 'direct',
      dispositivo: `${navigator.platform}; ${navigator.userAgent}`
    };

    console.log(dataToSend);
    // Aquí incluirías la lógica para enviar los datos a donde necesites
  }
}
