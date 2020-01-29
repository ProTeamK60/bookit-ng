import {Answer} from './answer';

export interface Participant {
  email: string;
  answers: Answer[];
}
