import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactoService } from '../../services/contacto.service';
import { Contacto } from '../../models/contacto';

@Component({
  selector: 'app-formulario-contacto',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario-contacto.component.html'
})
export class FormularioContactoComponent implements OnInit {
  @Input() contacto: Contacto | null = null;
  @Output() guardado = new EventEmitter<void>();

  form: Contacto = { nombre: '', telefono: '', notas: '' };

  constructor(private contactoService: ContactoService) {}

  ngOnInit() {
    if (this.contacto) this.form = { ...this.contacto };
  }

  guardar() {
    if (this.form.id) {
      this.contactoService.update(this.form.id, this.form)
        .subscribe(() => this.guardado.emit());
    } else {
      this.contactoService.create(this.form)
        .subscribe(() => this.guardado.emit());
    }
  }

  cancelar() { this.guardado.emit(); }
}