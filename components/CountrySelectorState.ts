
import { Country } from './Country';
import { State } from './State';

export interface CountrySelectorState {
    selectedCountry: Country;
    selectedState: State;
    countries: Country[];
    disabled: boolean;
}
