import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {
  isAuth =false;


  //promise est une fonction asynchrone , HTTP function ,connexion avec serveur
  lastUpdate = new Promise(
    (resolve,reject)=>{
      const date=new Date();
      setTimeout(
        ()=>{
          resolve(date);
        },2000
      );
    }
  );

  appareils : any[];
  appareilSubscription : Subscription;

  constructor(private appareilService : AppareilService){
  setTimeout(
  	//methode anonyme ()=>{}
  	()=>{
  		this.isAuth=true;
  	},4000
  );
  }

  ngOnInit() {
    //initialisation du tableau appareil en utilisant la service au moment de la création
    //this.appareils = this.appareilService.appareils;
    this.appareilSubscription = this.appareilService.appareilSubject.subscribe(
      (appareils : any) =>{
        this.appareils=appareils;
      }
    );
    this.appareilService.getAppareilsFromServer();
    this.appareilService.emitAppareilSubject();
  }

  onAllumer(){
  this.appareilService.switchOnAll();
  console.log('on allume tout!!');
  }

  onEteindre(){
  this.appareilService.switchOffAll();
  console.log('on éteint tout!!');
  }

  onSave()
  {
    this.appareilService.saveAppareilsToServeur();
  }

  onFetch()
  {
    this.appareilService.getAppareilsFromServer();
  }

}
