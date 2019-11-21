import {Component, Input, OnInit} from '@angular/core';
import {RegistrationService} from '../service/registration.service';
import {ParticipantDataSource} from '../datasource/participant-data-source';

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.scss']
})
export class ParticipantListComponent implements OnInit {

  @Input() eventId: string;
  dataSource: ParticipantDataSource;
  displayedColumns: string[] = ['email'];

  constructor(private registrationService: RegistrationService) {
  }

  ngOnInit() {
    this.dataSource = new ParticipantDataSource(this.registrationService);
    this.dataSource.loadParicipants(this.eventId);
  }

}
