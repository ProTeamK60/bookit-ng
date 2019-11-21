import {ParticipantDataSource} from './participant-data-source';

describe('ParticipantDataSource', () => {
  it('should create an instance', () => {
    const registrationService = jasmine.createSpyObj('registrationService', ['loadParticipants']);
    expect(new ParticipantDataSource(registrationService)).toBeTruthy();
  });
});
