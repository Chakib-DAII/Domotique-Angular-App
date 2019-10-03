import { User } from "../models/user.model";
import {Subject} from "rxjs/Subject";
import{ HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService{
	private users : User[] = [
		{
		firstName : 'chakib',
		lastName : 'DAII',
		email : 'chakib@DAII.com',
		drinkPreference : 'Beer',
		hobbies :[
		'coder',
		'reading'
		]

		},
		{
		firstName : 'chakib',
		lastName : 'DAII',
		email : 'chakib@DAII.com',
		drinkPreference : 'Beer',
		hobbies :[
		'coder',
		'reading'
		]

		}
	];
	userSubject = new Subject<User[]>();

	constructor(private httpClient : HttpClient){}
	
	emitUsers(){
	this.userSubject.next(this.users.slice());
	}

	addUser(user : User){
		this.users.push(user);
		this.emitUsers();
	}

	saveUsersToServer(){
		this.httpClient
			.put('https://http-client-demo-ddd2a.firebaseio.com/users.json',this.users)
			.subscribe(
				 ()=>{
        			console.log('enregistrement terminé !');
      				},
     			 (error)=>{
       				 console.log('erreur de sauvegarde ! '+error);
     			 }
			)
	}

	getUsersFromServer(){
		this.httpClient
   			.get<User[]>('https://http-client-demo-ddd2a.firebaseio.com/users.json')
   			.subscribe(
     			 (response)=>{
      				  console.log('chargement reussie ! ');
      				  this.users = response;
      				  this.emitUsers(); 
      				},
     			 (error)=>{
       				 console.log('erreur de chargement ! '+error);
     			    }
     		);
	}
}