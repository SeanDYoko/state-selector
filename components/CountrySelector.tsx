import React from 'react'
import axios from 'axios'
import Country from './Country'
import State from './State'
import { DropDownSelector, DropDownItem } from './DropDown/DropDownSelector'
import CountrySelectorState from './CountrySelectorState'
import KCdata from './KCdata'
import CountrySelectorProps from './CountrySelectorProps'


class CountrySelector extends React.Component<CountrySelectorProps, CountrySelectorState>
{
    constructor(props){
        super(props);
        this.state = {
            selectedCountry: null,
            selectedState: null,
            countries: []
        };

        this.getCountryItems = this.getCountryItems.bind(this);
        this.getStateItems = this.getStateItems.bind(this);
        this.getCountryItem = this.getCountryItem.bind(this);
        this.getStateItem = this.getStateItem.bind(this);
        this.countrySelected = this.countrySelected.bind(this);
        this.stateSelected = this.stateSelected.bind(this);
        this.setData = this.setData.bind(this);
    }

    countrySelected(countryItem: DropDownItem)
    {
        let selectedCountry = this.state.countries.find(c => c.code === countryItem.value);

        if (selectedCountry === this.state.selectedCountry)
        {
            return;
        }

        let newState = new CountrySelectorState();
        newState.selectedCountry = selectedCountry;
        newState.selectedState = null;
        newState.countries = this.state.countries;

        this.setState(newState);

        var kcData = new KCdata(selectedCountry.code, null);
        this.props.setData(kcData);
    }
    stateSelected(stateItem: DropDownItem)
    {
        let selectedState = this.state.selectedCountry.states.find(s => s.code === stateItem.value);

        let newState = new CountrySelectorState();
        newState.selectedCountry = this.state.selectedCountry;
        newState.selectedState = selectedState;
        newState.countries = this.state.countries;

        this.setState(newState);

        var kcData = new KCdata(this.state.selectedCountry.code, selectedState.code);
        this.props.setData(kcData);
    }
    componentDidMount(){
        this.getCountries();
    }

    async getCountries()
    {
        let response = await axios.get('https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json');
        let countries = response.data.map(item => new Country(item["Code"], item["Name"]));

        let us = countries.find(country => country.code === "US");
        // get US states
        let usStatesResponse = await axios.get('https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_titlecase.json');
        us.states = usStatesResponse.data.map(state => new State(state["abbreviation"], state["name"]));

        let newState = new CountrySelectorState();
        newState.countries = countries;

        this.setState(newState);
        this.setData(this.props.data);
    }
    
    getCountryItem(item: Country) : DropDownItem
    {
        if (!item)
        {
            return null;
        }
        return new DropDownItem(item.code, item.name);
    }
    getCountryItems() : DropDownItem[]
    {
        return this.state.countries.map(item => this.getCountryItem(item));
    }
    getStateItem(item: State) : DropDownItem
    {
        if (!item)
        {
            return null;
        }
        return new DropDownItem(item.code, item.name);
    }
    getStateItems() : DropDownItem[]
    {
        if (!this.state.selectedCountry || !this.state.selectedCountry.states || this.state.selectedCountry.states.length == 0)
        {
            return [];
        }

        return this.state.selectedCountry.states.map(item => this.getStateItem(item));
    }

    setData(obj : KCdata)
    {
        let selectedCountry = this.state.countries.find(c => c.code === obj.countryCode);
        let selectedState = selectedCountry && selectedCountry.states && selectedCountry.states.length > 0 ? selectedCountry.states.find(s => s.code === obj.stateCode) : null;

        if (selectedCountry)
        {
            let newState = new CountrySelectorState();
            newState.selectedCountry = selectedCountry;

            if (selectedState)
            {
                newState.selectedState = selectedState;
            }

            newState.countries = this.state.countries;

            this.setState(newState);
        }
    }
    
    render(){
        return (
            <React.Fragment>
                <div className="title">Country</div>
                <DropDownSelector
                    data={this.getCountryItems()}
                    selectedItem={this.getCountryItem(this.state.selectedCountry)}
                    onItemSelected={this.countrySelected} />
                {this.getStateItems().length > 0 &&
                    <React.Fragment>
                        <div className="title">State</div>
                        <DropDownSelector
                            data={this.getStateItems()}
                            selectedItem={this.getStateItem(this.state.selectedState)}
                            onItemSelected={this.stateSelected} />
                    </React.Fragment>}
            </React.Fragment>
        );
    }
}

export default CountrySelector