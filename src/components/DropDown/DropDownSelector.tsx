import React from 'react';
import SearchBox from './SearchBox';
import DropDownSelectorProps from './DropDownSelectorProps';
import DropDownSelectorState from './DropDownSelectorState';
import DropDownItem from './DropDownItem';

class DropDownSelector extends React.Component<DropDownSelectorProps, DropDownSelectorState> {
    container: any;

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            selectedItem: props.selectedItem,
            searchBoxVisible: false,
            searchTerm: props.selectedItem ? props.selectedItem.title : '',
            itemPosition: 0
        };

        this.openSearchBox = this.openSearchBox.bind(this);
        this.search = this.search.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.filterData = this.filterData.bind(this);
    }

    openSearchBox(e) {
        if (this.props.disabled) {
            return;
        }

        let control = e.target;
        if (control.className === 'selected') {
            control = e.target.firstChild;
        }
        control.select();

        this.setState(state => ({
            data: state.data,
            selectedItem: state.selectedItem,
            searchBoxVisible: true,
            searchTerm: state.searchTerm,
            itemPosition: 0
        }));
    }
    filterData(searchTerm) {
        return this.props.data.filter(i => i.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    search(e) {
        if (!e || !e.target) {
            return;
        }

        const value = e.target.value;

        this.setState(state => ({
            data: this.filterData(value),
            selectedItem: state.selectedItem,
            searchBoxVisible: true,
            searchTerm: value,
            itemPosition: 0
        }));
    }
    keyDown(e) {
        if (e.keyCode === 40) {
            // up
            this.setState(state => ({
                data: state.data,
                selectedItem: state.selectedItem,
                searchBoxVisible: true,
                searchTerm: state.searchTerm,
                itemPosition: state.itemPosition + 1 === state.data.length ? state.itemPosition : state.itemPosition + 1
            }));
        } else if (e.keyCode === 38) {
            // down
            this.setState(state => ({
                data: state.data,
                selectedItem: state.selectedItem,
                searchBoxVisible: true,
                searchTerm: state.searchTerm,
                itemPosition: state.itemPosition > 0 ? state.itemPosition - 1 : 0
            }));
        } else if (e.keyCode === 13) {
            // enter
            const selectedItem = this.state.data[this.state.itemPosition];
            this.selectItem(selectedItem);
        }
    }

    selectItem(item: DropDownItem) {
        const selectedItem = this.props.data.find(i => i.value === item.value);
        if (!selectedItem) {
            return;
        }

        this.setState(state => ({
            data: this.filterData(selectedItem.title),
            selectedItem,
            searchBoxVisible: false,
            searchTerm: selectedItem.title,
            itemPosition: 0
        }));

        this.props.onItemSelected(selectedItem);
    }
    onBlur(e) {
        if (e.relatedTarget && e.relatedTarget === this.container)
        {
            return;
        }

        this.setState(state => ({
            data: state.data,
            selectedItem: state.selectedItem,
            searchBoxVisible: false,
            searchTerm: state.searchTerm,
            itemPosition: 0
        }));
    }

    componentWillReceiveProps(props: DropDownSelectorProps) {
        if (props.selectedItem !== this.state.selectedItem) {
            this.setState(state => ({
                data: this.filterData(props.selectedItem.title),
                selectedItem: props.selectedItem,
                searchBoxVisible: state.searchBoxVisible,
                searchTerm: props.selectedItem.title,
                itemPosition: 0
            }));
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="wrapper" onBlur={this.onBlur} tabIndex={0} ref={(container) => { this.container = container; }}>
                    <div className={this.props.disabled ? 'selected disabled' : 'selected'} onClick={this.openSearchBox}>
                        <input type="text" value={this.state.searchTerm} onChange={this.search} disabled={this.props.disabled} onKeyDown={this.keyDown} />
                    </div>
                    <i className="fa fa-check"/>
                    {this.state.searchBoxVisible &&
                        <SearchBox data={this.state.data} searchTerm={this.state.searchTerm} itemPosition={this.state.itemPosition} onSelectItem={this.selectItem} />}
                </div>
            </React.Fragment>
        );
    }
}

export { DropDownSelector, DropDownItem };
