import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(private net:HttpClient) { }

  getWarframe() {
  	return this.net.get("http://localhost:3000/warframe/warframes")
  }

  getMelee() {
  	return this.net.get("http://localhost:3000/warframe/melee")
  }

  getPrimary() {
  	return this.net.get("http://localhost:3000/warframe/primary")
  }

  getSecondary() {
  	return this.net.get("http://localhost:3000/warframe/secondary")
  }

  getWarframeResources( items ) {
  	return this.net.post("http://localhost:3000/warframe/warframe-resources", {
  		items: items
  	})
  }

  getMeleeResources( items ){
  	return this.net.post("http://localhost:3000/warframe/melee-resources", {
  		items: items
  	})
  }

  getPrimaryResources( items ){
  	return this.net.post("http://localhost:3000/warframe/primary-resources", {
  		items: items
  	})
  }

  getSecondaryResources( items ){
  	return this.net.post("http://localhost:3000/warframe/secondary-resources", {
  		items: items
  	})
  	
  }


}
