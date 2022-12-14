import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { PersonaTallerService } from 'src/app/providers/service/persona-taller.service';
import {TallerService} from "../../../providers/service/taller.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { PersonaService } from 'src/app/providers/service/persona.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.css']
})
export class AsistenciasComponent implements OnInit {

  frmPersonaTaller: FormGroup;
  personasTaller: any = [];
  talleres: any = [];
  personas: any = [];
  constructor(private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private personaTallerService: PersonaTallerService,
              private tallerService: TallerService,
              private personaService: PersonaService) { }

  ngOnInit(): void {
    this.formInit();
    this.getPersonaTaller();
    this.getTalleres();
    this.getPersonas();
    this.onTabla();
  }

  getPersonaTaller(): void{
    this.personaTallerService.getAll$().subscribe(response => {
      this.personasTaller = response.data || []; /*|| es OR*/
    });
  }

  getPersonas(): void{
    this.personaService.getAll$().subscribe(response => {
      this.personas = response.data || []; /*|| es OR*/
    });
  }

  getTalleres(): void{
    this.tallerService.getAll$().subscribe(response => {
      this.talleres = response.data || []; /*|| es OR*/
    });
  }

  formInit(): void {
    const controls = {
      taller: ['', [Validators.required]],
      persona: ['', [Validators.required]]
    };
    this.frmPersonaTaller = this.formBuilder.group(controls);
  }

  public onAsistio(item: any): void {
    const IdAsistio = item.petaId;
    const persIdAsistio = item.persona.persId;
    const tallIdAsistio = item.taller.tallId
    const mensaje = '¿ Estas seguro que asistio ?';
    Swal.fire({
      title: 'Confirmación de la asistencia',
      text: `${mensaje}`,
      backdrop: true,
      //animation: true,
      showCloseButton: true,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#0F3971',
      confirmButtonText: 'Si!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let data = Object.assign(
          {taller: {tallId: tallIdAsistio}},
          {persona: {persId: persIdAsistio}},
          {petaAsistencia: 'A'});
        // @ts-ignore
        this.personaTallerService.update$(IdAsistio, data).subscribe(response => {
          if (response.success) {
            Swal.fire({
              title: 'Asistencia guardada',
              text: response.message,
              backdrop: true,
              //animation: true,
              showConfirmButton: false,
              confirmButtonColor: '#0F3971',
              timer: 1500,
            });
            this.getPersonaTaller();
            this.getTalleres();
            this.getPersonas();
          }
        });
      }
    });
  }

  public onFalto(item: any): void {
    const IDFalto = item.petaId;
    const persIdFalto = item.persona.persId;
    const tallIdFalto = item.taller.tallId
    const mensaje = '¿ Estas seguro que NO asistio ?';
    Swal.fire({
      title: 'Confirmación la inasistencia',
      text: `${mensaje}`,
      backdrop: true,
      //animation: true,
      showCloseButton: true,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#0F3971',
      confirmButtonText: 'Si!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let data = Object.assign(
          {taller: {tallId: tallIdFalto}},
          {persona: {persId: persIdFalto}},
          {petaAsistencia: 'F'});
        // @ts-ignore
        this.personaTallerService.update$(IDFalto, data).subscribe(response => {
          if (response.success) {
            Swal.fire({
              title: 'Inasistencia guardada',
              text: response.message,
              backdrop: true,
              //animation: true,
              showConfirmButton: false,
              confirmButtonColor: '#0F3971',
              timer: 1500,
            });
            this.getPersonaTaller();
            this.getTalleres();
            this.getPersonas();
          }
        });

      }
    });
  }

  assign(): void {
    let data = Object.assign(this.frmPersonaTaller.value,
      {persona: {persId: this.frmPersonaTaller.value.persona}},
      {taller: {tallId: this.frmPersonaTaller.value.taller}});
    this.personaTallerService.add$(data).subscribe(response =>{
      if (response.success) {
        Swal.fire({
          title: 'Agregado correctamente',
          text: response.message,
          backdrop: true,
          //animation: true,
          showConfirmButton: false,
          confirmButtonColor: '#0F3971',
          timer: 1500,
        });
        this.getPersonaTaller();
        this.getTalleres();
        this.getPersonas();

      }
    });//serializa y envia formato tipo JS
  }

  public onDelete(item: any): void {
    const ID = item.petaId;
    const mensaje = '¿ Esta seguro que desea eliminar ?';
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
          this.personaTallerService.delete$(ID).subscribe(response => {
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
              this.getPersonaTaller();
              this.getTalleres();
              this.getPersonas();
            }
          });
        }
      });
    }
  }

  public onTabla(): void {
    return this.frmPersonaTaller.value.taller;

  }

}
