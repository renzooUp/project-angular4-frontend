import { Component, OnInit } from '@angular/core';
import {PersonaService} from "../../../providers/service/persona.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import {FormModalPersonasComponent} from "./form-modal-personas/form-modal-personas.component";
import {TipoPersonaService} from "../../../providers/service/tipo-persona.service";

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  personas: any = [];
  tipoPersonas: any = [];

  constructor(private personaService: PersonaService,
              private modalService: NgbModal,
              private tipoPersonaService: TipoPersonaService) {}

  ngOnInit(): void {
    this.getPersonas();
    this.getTipoPersonas();
  }

  getPersonas(): void {
    this.personaService.getAll$().subscribe(response => {
      this.personas = response.data || [];
      console.log(this.personas);
    });
  }

  getTipoPersonas(): void {
    this.tipoPersonaService.getAll$().subscribe(response => {
      this.tipoPersonas = response.data || [];
      console.log(this.tipoPersonas);
    });
  }

  openModal(): void {
    const modal = this.modalService.open(FormModalPersonasComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.title = 'Nueva';
    modal.result.then(res => {
      if(res.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Persona',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1500
        })
        this.getPersonas();
      }
    }).catch(err => {});
  }

  openModalEdit(item: any): any {
    const modal = this.modalService.open(FormModalPersonasComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.persId = item.persId;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Persona',
          text: `${res.message}`,
          showConfirmButton: false,
          timer: 1300
        });
        this.getPersonas();
      }
    }).catch(res => {
    });
  }

  public onDelete(item: any): void {
    const ID = item.persId;
    const mensaje = '¿ Desea eliminar ' + item.persNombres + ' ?';
    if (ID) {
      Swal.fire({
        title: 'Se eliminará el registro',
        text: `${mensaje}`,
        backdrop: true,
        //animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#0F3971',
        confirmButtonText: 'Estoy de acuerdo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.personaService.delete$(ID).subscribe(response => {
            if (response.success) {
              Swal.fire({
                title: 'Eliminado',
                text: response.message,
                backdrop: true,
                //animation: true,
                showConfirmButton: false,
                confirmButtonColor: '#0F3971',
                timer: 1500,
              });
              this.getPersonas();
            }
          });
        }
      });
    }
  }
}
