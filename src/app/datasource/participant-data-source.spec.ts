import { ParticipantDataSource } from './participant-data-source';

describe('ParticipantDataSource', () => {
  it('should create an instance', () => {
	var registrationService = jasmine.createSpyObj('RegistrationService', []);
    expect(new ParticipantDataSource(registrationService)).toBeTruthy();
  });
});
