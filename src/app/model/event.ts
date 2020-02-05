import {Option} from './option';

export interface Event {
    eventId: string;
    name: string;
    description: string;
    eventStart: number;
    eventEnd: number;
    deadlineRVSP: number;
    location: string;
    organizer: string;
    options: Option[];
    maxNumberOfApplicants: number;
}
