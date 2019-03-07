import React from 'react';

class Highlight extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        let prefix = '';
        let suffix = this.props.text;
        let highlight = '';

        if (this.props.highlight) {
            const index = this.props.text.toLowerCase().indexOf(this.props.highlight.toLowerCase());

            if (index > -1) {
                prefix = this.props.text.substring(0, index);
                suffix = this.props.text.substring(index + this.props.highlight.length);
                highlight = this.props.text.substring(index, index + this.props.highlight.length);
            }
        }



        return (
            <React.Fragment>
                {prefix}{highlight && <strong>{highlight}</strong>}{suffix}
            </React.Fragment>);
    }
}

export default Highlight;
