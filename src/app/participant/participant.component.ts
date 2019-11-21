import {Component, OnInit, Input} from '@angular/core';
import {Participant} from '../model/participant';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnInit {

  @Input() participant: Participant;

  constructor() {
  }

  ngOnInit() {
  }

}
