export interface Event {
    eventId: string;
    name: string;
    description: string;
    eventStart: Date;
    eventEnd: Date;
    deadlineRVSP: Date;
    location: string;
    organizer: string;
}
