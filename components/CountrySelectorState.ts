
import Country from './Country'
import State from './State'

class CountrySelectorState {
    selectedCountry: Country
    selectedState: State
    countries: Country[]
    disabled: boolean
}

export default CountrySelectorState