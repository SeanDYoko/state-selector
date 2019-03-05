import React from 'react'
import SearchBoxItem from './SearchBoxItem'
import SearchBoxProps from './SearchBoxProps'

class SearchBox extends React.Component<SearchBoxProps, any>
{
    constructor(props) {
        super(props);

        this.selectItem = this.selectItem.bind(this);
    }

    selectItem(value)
    {
        let item = this.props.data.find(i => i.value === value);
        this.props.onSelectItem(item);
    }

    render(){
        let data = [];
        if (this.props.data)
        {
            data = this.props.data;
        }

        if (data.length > 0)
        {
            data = data.map((item, index) => (
                <SearchBoxItem
                    id={item.value}
                    key={item.value}
                    name={item.title}
                    searchTerm={this.props.searchTerm}
                    onSelect={this.selectItem}
                    highlight={(this.props.itemPosition == index)} />));
        }
        
        return (
        <div className="search">
            {data.length > 0 &&
            <ul>
                {data}
            </ul>}
        </div>);
    }
}

export default SearchBox