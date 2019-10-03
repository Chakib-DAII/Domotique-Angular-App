import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
	authStatus : boolean;

  constructor(private authService : AuthService ,private router : Router) { }

  ngOnInit() {
  this.authStatus = this.authService.isAuth;
  }
  //pour les methodes async on doit utiliser la methode then()
  onSignIn(){
  	this.authService.signIn().then(
  		()=>{
  			console.log('Connexion réussie ! ');
  			this.router.navigate(['appareils']);
  			this.authStatus = this.authService.isAuth;
  		}
  	);
  }

  onSignOut(){
  	this.authService.signOut();
  	this.authStatus = this.authService.isAuth;
  }

}
