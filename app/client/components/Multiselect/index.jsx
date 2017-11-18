import React from 'react';
import 'react-widgets/dist/css/react-widgets.css';
import MultiselectBase from 'react-widgets/lib/Multiselect';

const noop = () => {};

export default class Multiselect extends React.PureComponent {
  onChange = (value) => {
    if (!this.props.onChange) { return; }
    this.props.onChange({
      preventDefault: noop,
      target: {
        name: this.props.name,
        value,
      },
    });
  }

  render() {
    return (<MultiselectBase
      {...this.props}
      onChange={this.onChange}
    />);
  }
}
