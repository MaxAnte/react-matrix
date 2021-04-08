import React, { Component } from "react";
import { connect } from "react-redux";
import { addMatrix } from "../../redux/actions/index";

import './form.css';

function mapDispatchToProps(dispatch) {
  return {
    addMatrix: matrix => dispatch(addMatrix(matrix))
  };
}

class ConnectedForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 0,
      columns: 0,
      x: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ 
      [event.target.id]: +event.target.value 
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const settings = this.state;
    this.props.addMatrix(settings);
  }
  render() {
    const settings = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='inputs_group'>
          <label htmlFor='m'>Rows:</label>
          <input 
            type='number'
            id='rows' 
            min='1'
            value={settings.rows}
            onChange={this.handleChange}
          />
        </div>
        <div className='inputs_group'>
          <label htmlFor='n'>Columns:</label>
          <input 
            type='number' 
            id='columns' 
            min='1'
            value={settings.columns}
            onChange={this.handleChange}
          />
        </div>
        <div className='inputs_group'>
          <label htmlFor='n'>X:</label>
          <input 
            type='number' 
            id='x' 
            min='0'
            value={settings.x}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit">BUILD</button>
      </form>
    );
  }
}

const Form = connect(
  null,
  mapDispatchToProps
)(ConnectedForm);

export default Form;