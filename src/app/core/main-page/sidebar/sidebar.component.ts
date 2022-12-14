import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {AuthService} from "../../../providers/service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  title: string = "App Angular Spring";
  autorizado: boolean;
  auth: any;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.autorizado = this.authService.isAuthenticated();
    this.auth = this.authService;
  }
  logout(): void {
    // let username = this.authService.usuario.username;
    Swal.fire('Logout', `Hola ${this.auth.usuario.username}, has cerrado sesión con éxito!`, 'success');
    this.authService.logout();
    this.autorizado = false;
    this.auth = [];
    this.router.navigate(['/']);//ruta para salir
  }
}
