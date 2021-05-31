import {Subject} from 'rxjs';
import{ HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppareilService{

  appareilSubject = new Subject<any[]>();
	private appareils =[
    {
      id : 1,
      name:'machine â laver',
      status:'éteint'
    },

    {
      id : 2,
      name:'Télévision',
      status:'allumé'
    },

    {
      id : 3,
      name:'Ordinateur',
      status:'éteint'
    }

  ];

  constructor(private httpClient : HttpClient){

  }
  emitAppareilSubject(){
    this.appareilSubject.next(this.appareils.slice());
  }

  getAppareilById(id : number){
    const appareil = this.appareils.find(
      (appareilObject) =>{
        return appareilObject.id === id;
      }
    );
    return appareil;
  }

  switchOnAll(){
  	for(let appareil of this.appareils){
  		appareil.status='allumé';
  	}
    this.emitAppareilSubject();
  }

  switchOffAll(){
  	for(let appareil of this.appareils){
  		appareil.status='éteint';
  	}
    this.emitAppareilSubject();
  }

  switchOnOne(index : number){
  	this.appareils[index].status='allumé';
    this.emitAppareilSubject();
  }

  switchOffOne(index : number){
  	this.appareils[index].status='éteint';
    this.emitAppareilSubject();
  }

  addAppareil(name : string , status : string){
    const appareilObject ={
      id :0,
      name :'',
      status :''
    };
    appareilObject.name=name;
    appareilObject.status=status;
    appareilObject.id= this.appareils[this.appareils.length - 1].id + 1;

    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }

  saveAppareilsToServeur(){
  //post ajoute , put supprime l'existant et ajoute les nouveaux enregistrements
  this.httpClient
    .put('https://http-client-demo-ddd2a.firebaseio.com/appareils.json', this.appareils)
    .subscribe(
      ()=>{
        console.log('enregistrement terminé !');
      },
      (error)=>{
        console.log('erreur de sauvegarde ! '+error);
      }
    );
  }

  getAppareilsFromServer(){
   this.httpClient
   .get<any[]>('https://http-client-demo-ddd2a01.firebaseio.com/appareils.json')
   .subscribe(
      (response)=>{
        console.log('chargement reussie ! ');
        this.appareils = response;
        this.emitAppareilSubject();
      },
      (error)=>{
        console.log('erreur de chargement ! '+error);
      }
   );
  }
}
