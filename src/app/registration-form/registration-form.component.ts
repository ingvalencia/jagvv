import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { UvmApiService } from '../uvm-api.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  @ViewChild('registrationForm') registrationForm!: NgForm;

  campusOptions: any[] = [];
  carrerasOptions: any[] = [];

  // Inicializa el modelo para los datos del formulario
  formData = {
    nombre: '',
    apaterno: '',
    email: '',
    celular: '',
    campusLargo: '',
    carrera: '',
    carreraInteres: '',
    subNivelInteres: '12',
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

  constructor(
    private uvmApiService: UvmApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.uvmApiService.getAcademicOfferings().subscribe(data => {
      this.campusOptions = [...new Set(data.map((item: { nombrelargo_campus: any; }) => item.nombrelargo_campus))];
    });
  }

  onCampusSelected(value: string): void {
    this.formData.campusLargo = value;
  
    this.uvmApiService.getAcademicOfferings().subscribe(data => {
      this.carrerasOptions = data
        .filter((item: any) => item.nombrelargo_campus === value)
        .map((item: any) => ({
          clave: item.crmit_claveprogramabanner,
          nombre: item.ofertando_crmit_name
        }));
    });
  }

  onCarreraSelected(value: any): void {
    this.formData.carrera = value;

    this.uvmApiService.getAcademicOfferings().subscribe(data => {
      const ofertaSeleccionada = data.find((item: any) => item.crmit_claveprogramabanner === value);

      if (ofertaSeleccionada) {
        this.formData.carreraInteres = ofertaSeleccionada.carrerainteres;
        this.formData.nivelInteres = ofertaSeleccionada.crmit_nivelcrm;
        this.formData.ciclo = ofertaSeleccionada.crmit_cicloreinscripciones;
      }
    });
  }

  onSubmit() {
    const dataToSend = {
      ...this.formData,
      nombre: this.formData.nombre,
      apaterno: this.formData.apaterno,
      email: this.formData.email,
      celular: this.formData.celular,
      campusLargo: this.formData.campusLargo,
      carrera: this.formData.carrera
    };

    this.uvmApiService.sendFormData(this.formData).subscribe(
      response => {
        // Respuesta exitosa y no es un duplicado
        if (response.tipo === 'nuevo') {
          this.snackBar.open('Registro exitoso.', 'Cerrar', { duration: 3000 });
          this.resetFormData();
        } else if (response.tipo === 'dupli') {
          // Manejo de duplicados
          this.snackBar.open('Error: El email ya está registrado.', 'Cerrar', { duration: 3000 });
        }
      },
      error => {
        this.snackBar.open('Hubo un error al enviar el formulario.', 'Cerrar', { duration: 3000 });
        console.error('Hubo un error al enviar el formulario', error);
      }
    );
  }

  private resetFormData() {
    this.registrationForm.resetForm();

    this.formData = {
      nombre: '',
      apaterno: '',
      email: '',
      celular: '',
      campusLargo: '',
      carrera: '',
      carreraInteres: '',
      subNivelInteres: '12',
      nivelInteres: '',
      ciclo: '',
      gclid: '',
      utm_campaign: '',
      banner: 'GiovannyValencia',
      CID: '2016705784.1697574806',
      verify_token: 'UVM.G0-24',
      marcable: '2',
      urlreferrer: document.referrer || 'direct',
      dispositivo: `${navigator.platform}; ${navigator.userAgent}`
    };
  }
}
