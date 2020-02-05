import React from 'react';
import { Country } from './Country';
import { State } from './State';
import { DropDownSelector, DropDownItem } from './DropDown/DropDownSelector';
import { CountrySelectorState } from './CountrySelectorState';
import { KCdata } from './KCdata';
import { CountrySelectorProps } from './CountrySelectorProps';

const Countries = require('../data/countries.json');
const States = require('../data/states.json');


class CountrySelector extends React.Component<CountrySelectorProps, CountrySelectorState> {
    constructor(props) {
        super(props);
        this.state = {
            selectedCountry: null,
            selectedState: null,
            countries: Countries,
            disabled: this.props.disabled
        };

        this.props.customElementApi.onDisabledChanged((disabled) => {
            if (disabled) {
                this.disable();
            }
            else {
                this.enable();
            }
        });
    }

    disable = () => {
        this.setState(() => ({
            disabled: true
        }));
    }

    enable = () => {
        this.setState(() => ({
            disabled: false
        }));
    }

    countrySelected = (countryItem: DropDownItem) => {
        const selectedCountry = this.state.countries.find(c => c.code === countryItem.value);

        if (selectedCountry === this.state.selectedCountry) {
            return;
        }

        this.setState((state) => ({
            selectedCountry,
            selectedState: null,
            countries: state.countries,
            disabled: state.disabled,
        }));

        const kcData: KCdata = {
            countryCode: selectedCountry.code,
            stateCode: null
        };
        this.props.customElementApi.setValue(JSON.stringify(kcData));
    }

    stateSelected = (stateItem: DropDownItem) => {
        const selectedState = this.state.selectedCountry.states.find(s => s.code === stateItem.value);
        this.setState((state) => ({
            selectedState,
        }));

        const kcData: KCdata = {
            countryCode: this.state.selectedCountry.code,
            stateCode: selectedState.code,
        };
        this.props.customElementApi.setValue(JSON.stringify(kcData));
    }

    getCountries = () => {
        const us = Countries.find(country => country.code === 'US');
        // get US states
        us.states = States;

        this.setState((state) => ({
            countries: Countries,
            disabled: state.disabled,
        }));
        this.setData(this.props.data);
    }

    getCountryItem = (item: Country): DropDownItem => {
        if (!item) {
            return null;
        }
        return new DropDownItem(item.code, item.name);
    }

    getCountryItems(): DropDownItem[] {
        return this.state.countries.map(item => this.getCountryItem(item));
    }

    getStateItem = (item: State): DropDownItem => {
        if (!item) {
            return null;
        }
        return new DropDownItem(item.code, item.name);
    }

    getStateItems = (): DropDownItem[] => {
        if (!this.state.selectedCountry || !this.state.selectedCountry.states || this.state.selectedCountry.states.length === 0) {
            return [];
        }
        return this.state.selectedCountry.states.map(item => this.getStateItem(item));
    }

    setData = (obj: KCdata) => {
        if (!obj) {
            return;
        }

        const selectedCountry = this.state.countries.find(c => c.code === obj.countryCode);
        const selectedState = selectedCountry && selectedCountry.states && selectedCountry.states.length > 0 ? selectedCountry.states.find(s => s.code === obj.stateCode) : null;
        if (selectedCountry) {
            this.setState((state) => ({
                selectedCountry,
                selectedState: selectedState || state.selectedState
            }));
        }
    }

    componentDidMount() {
        this.getCountries();
    }

    render() {
        return (
            <React.Fragment>
                <div className="title">Country</div>
                <DropDownSelector
                    data={this.getCountryItems()}
                    selectedItem={this.getCountryItem(this.state.selectedCountry)}
                    disabled={this.state.disabled}
                    onItemSelected={this.countrySelected} />
                {this.getStateItems().length > 0 &&
                    <React.Fragment>
                        <div className="title">State</div>
                        <DropDownSelector
                            data={this.getStateItems()}
                            selectedItem={this.getStateItem(this.state.selectedState)}
                            disabled={this.state.disabled}
                            onItemSelected={this.stateSelected} />
                    </React.Fragment>}
            </React.Fragment>
        );
    }
}

export default CountrySelector;
