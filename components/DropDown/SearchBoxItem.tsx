import React from 'react';
import Highlight from '../Highlight/Highlight';
import SearchBoxItemProps from './SearchBoxItemProps';

class SearchBoxItem extends React.Component<SearchBoxItemProps, any> {
    constructor(props) {
        super(props);
        this.setItem = this.setItem.bind(this);
    }

    setItem() {
        this.props.onSelect(this.props.id);
    }

    render() {
        return (
        <li onMouseDown={this.setItem} className={this.props.highlight ? 'highlight' : ''}>
            <Highlight highlight={this.props.searchTerm} text={this.props.name} />
        </li>
        );
    }
}

export default SearchBoxItem;
