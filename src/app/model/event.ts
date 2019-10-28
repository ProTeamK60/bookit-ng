export interface Event {
    id: number;
    name: string;
    description: string;
    eventStart: Date;
    eventEnd: Date;
    deadlineRSVP: Date;
    location: string;
    //Partipants: Participant[],
    organizer: string;
}
