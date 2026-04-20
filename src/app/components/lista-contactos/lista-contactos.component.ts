import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactoService } from '../../services/contacto.service';
import { Contacto } from '../../models/contacto';
import { FormularioContactoComponent } from '../formulario-contacto/formulario-contacto.component';

@Component({
  selector: 'app-lista-contactos',
  standalone: true,
  imports: [CommonModule, FormularioContactoComponent],
  templateUrl: './lista-contactos.component.html'
})
export class ListaContactosComponent implements OnInit {
  contactos: Contacto[] = [];
  contactoSeleccionado: Contacto | null = null;
  mostrarFormulario = false;

  constructor(private contactoService: ContactoService) {}

  ngOnInit() { this.cargar(); }

  
  cargar() {
    this.contactoService.getAll().subscribe(data => this.contactos = data);
  }

    /*
    cargar() {
  this.contactos = [
    { id: 1, nombre: 'Juan', telefono: '123456', notas: 'Amigo' },
    { id: 2, nombre: 'Ana', telefono: '654321', notas: 'Trabajo' }
  ];
}
  */

  nuevo() {
    this.contactoSeleccionado = null;
    this.mostrarFormulario = true;
  }

  editar(c: Contacto) {
    this.contactoSeleccionado = c;
    this.mostrarFormulario = true;
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar contacto?')) {
      this.contactoService.delete(id).subscribe(() => this.cargar());
    }
  }

  alGuardar() {
    this.mostrarFormulario = false;
    this.cargar();
  }
}
