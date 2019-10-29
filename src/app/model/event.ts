export interface Event {
    id: number;
    eventId: string;
    name: string;
    description: string;
    eventStart: Date;
    eventEnd: Date;
    deadlineRVSP: Date;
    location: string;
    organizer: string;
}
