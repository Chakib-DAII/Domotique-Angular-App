export class User{
	//firstName : string;
	//lastName : string;
	//il suffit d'ajouter public avant les parametres du constructeur pour les créer comme attributs
	constructor(public firstName : string, 
				public lastName : string,
				public email : string,
				public drinkPreference : string,
				public hobbies : string[]){}

}