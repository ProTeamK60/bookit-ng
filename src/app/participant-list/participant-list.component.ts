import { Component, OnInit, Input } from '@angular/core';
import { RegistrationService } from '../service/registration.service';
import { Participant } from '../model/participant';
import { ParticipantDataSource } from '../datasource/participant-data-source';

@Component({
	selector: 'app-participant-list',
	templateUrl: './participant-list.component.html',
	styleUrls: ['./participant-list.component.scss']
})
export class ParticipantListComponent implements OnInit {
	
	@Input() eventId: string;
	
	dataSource:  ParticipantDataSource; 
	
	displayedColumns : string[] =["email"];
	
	constructor(private registrationService: RegistrationService) {
		
	 }
	
	 sortedParticipants: Participant[];
	
	ngOnInit() {
		
		this.dataSource = new ParticipantDataSource(this.registrationService);
		this.dataSource.loadParicipants(this.eventId);	
	}
	
	/*
	sortData(sort: Sort) {
		let data; 
    	this.participants$.subscribe(p => { 
			data = p;
		});
    	if (!sort.active || sort.direction === '') {
      		this.sortedParticipants = data;
      		return;
    	}
		console.log(data, sort.direction);
    	this.sortedParticipants = data.sort((a, b) => {
      		const isAsc = sort.direction === 'asc';
      		switch (sort.active) {
        		case 'email': return compare(a.email, b.email, isAsc);
             	default: return 0;
      		}
    	});
		function compare(a: number | string, b: number | string, isAsc: boolean) {
  			return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
		}
  }
	*/
}
