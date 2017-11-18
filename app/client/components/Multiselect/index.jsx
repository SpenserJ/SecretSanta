import React from 'react';
import PropTypes from 'prop-types';
import 'react-widgets/dist/css/react-widgets.css';
import MultiselectBase from 'react-widgets/lib/Multiselect';

const noop = () => {};

export default class Multiselect extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    name: undefined,
    onChange: undefined,
  }

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
