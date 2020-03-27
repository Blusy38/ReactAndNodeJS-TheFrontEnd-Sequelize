import React from 'react';
import Input from '../../components/Input/Input';

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    this.props.onFilter({
      [name]: value
    });
  }
  render() {
    return (
      <form className="form-inline">
        <div className="col-3">
          <Input
            inputType={"text"}
            placeholder={"First Name"}
            value={this.props.filterFirst}
            name="filterFirst"
            className={"form-control-plaintext"}
            handleChange={this.handleChange}
          /></div>
        <div className="col-3">
          <Input
            inputType={"text"}
            placeholder={"Last Name"}
            value={this.props.filterLast}
            name="filterLast"
            className={"form-control-plaintext"}
            handleChange={this.handleChange}
          /></div>
        <div className="col-3">
          <Input
            inputType={"text"}
            placeholder={"Email"}
            value={this.props.filterEmail}
            name="filterEmail"
            className={"form-control-plaintext"}
            handleChange={this.handleChange}
          /></div>
        <div className="col-3">
          <Input
            inputType={"text"}
            placeholder={"Phone number"}
            value={this.props.filterPhone}
            name="filterPhone"
            className={"form-control-plaintext"}
            handleChange={this.handleChange}
          /></div>
      </form>
    );
  }
}

export default Filters;