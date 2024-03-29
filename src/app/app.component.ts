import { Component, OnInit , OnDestroy } from '@angular/core';
import {Subscription, interval} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit , OnDestroy{
	secondes : number;
	counterSubscription : Subscription;
  constructor(){

  }

  ngOnInit(){
  	//definir une observable
  	const counter = interval(1000);
  	//definir un observeur
  	this.counterSubscription = counter.subscribe(
  		(value : number)=>{
  			this.secondes = value;
  		},
  		(error : any)=>{
  			console.log('une erreur a été rencontrée !');
  		},
  		()=>{
  			console.log('Observable completée !');
  		}
  	)
  }
  //destruction de l'observateur pour eviter les comportements infinis
  ngOnDestroy(){
  	this.counterSubscription.unsubscribe();
  }
}
