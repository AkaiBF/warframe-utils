import { Component, OnInit } from '@angular/core';

import { ResourcesService } from '../../services/resources.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items = []
  searched = []
  resources = []
  mode:number

  constructor( private srv:ResourcesService ) { }

  ngOnInit() {
  	this.openWarframe()
  }

  removeActive() {
  	document.getElementById("warframe-tab").classList.remove('active')
  	document.getElementById("melee-tab").classList.remove('active')
  	document.getElementById("primary-tab").classList.remove('active')
  	document.getElementById("secondary-tab").classList.remove('active')
  }

  openWarframe() {
  	this.resources = []
  	this.mode = 0
  	this.removeActive()
  	document.getElementById("warframe-tab").classList.add('active')
  	this.srv.getWarframe().subscribe( response => {
  		let aux = response as any
  		this.items = []

  		for( let i of aux )
  		{
  			this.items.push({name: i, value: false})
  		}
  		this.resourcesWarframes()
  	}, error => {
  		console.error(error)
  	})
  }

  openMelee() {
  	this.resources = []
  	this.mode = 1
  	this.removeActive()
	document.getElementById("melee-tab").classList.add('active')
	this.srv.getMelee().subscribe( response => {
		let aux = response as any
  		this.items = []

  		for( let i of aux )
  		{
  			this.items.push({name: i, value: false})
  		}
  		this.recolectTask()
  	}, error => {
  		console.error(error)
  	})
  }

  openPrimary() {
  	this.resources = []
  	this.mode = 2
  	this.removeActive()
	document.getElementById("primary-tab").classList.add('active')
	this.srv.getPrimary().subscribe( response => {
		let aux = response as any
  		this.items = []

  		for( let i of aux )
  		{
  			this.items.push({name: i, value: false})
  		}
  		this.recolectTask()
  	}, error => {
  		console.error(error)
  	})
  }

  openSecondary() {
  	this.resources = []
  	this.mode = 3
  	this.removeActive()
	document.getElementById("secondary-tab").classList.add('active')
	this.srv.getSecondary().subscribe( response => {
		let aux = response as any
  		this.items = []

  		for( let i of aux )
  		{
  			this.items.push({name: i, value: false})
  		}
  		this.recolectTask()
  	}, error => {
  		console.error(error)
  	})
  }

  recolectTask() {
  	this.searched = []

  	for( let i of this.items )
  		if( i.value )
  			this.searched.push(i.name)
  }


  resourcesWarframes() {
  	this.recolectTask()
  	this.srv.getWarframeResources( this.searched ).subscribe( response => {
  		this.resources = response as any
  	}, error => {
  		console.error(error)
  	})
  }
  
  resourcesMelee() {
  	this.recolectTask()
  	this.srv.getMeleeResources( this.searched ).subscribe( response => {
  		this.resources = response as any
  	}, error => {
  		console.error(error)
  	})
  }

  resourcesPrimary() {
  	this.recolectTask()
  	this.srv.getPrimaryResources( this.searched ).subscribe( response => {
  		this.resources = response as any
  	}, error => {
  		console.error(error)
  	})
  }

  resourcesSecondary() {
  	this.recolectTask()
  	this.srv.getSecondaryResources( this.searched ).subscribe( response => {
  		this.resources = response as any
  	}, error => {
  		console.error(error)
  	})
  }

  modeResources() {
  	switch ( this.mode ) {
  		case 0:
  			this.resourcesWarframes()
  			break;
  		
  		case 1:
  			this.resourcesMelee()
  			break;

  		case 2:
  			this.resourcesPrimary()
  			break;

  		case 3:
  			this.resourcesSecondary()
  			break;
  	}
  }

}
