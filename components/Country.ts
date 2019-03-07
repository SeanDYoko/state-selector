import { State } from './State';

export interface Country {
    code: string;
    name: string;
    states: State[];
}
