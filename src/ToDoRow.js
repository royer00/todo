import React, { Component } from "react";

export class ToDoRow extends Component {
  //Feature 3 & 4
  //// There are 2 different kinds of PROPS
    // Data PROPS - allows the parent to pass data to the child
    // FUNCTION PROPS - allows the child to communicate with the parent.  this is the purpose of a callback.

  render = () => (
    <tr>
      <td>{this.props.item.action}</td>
      <td>
        <input 
        type="checkbox" 
        checked={this.props.item.done}
        onChange={() => this.props.callback(this.props.item)}
        />
      </td>
    </tr>
  );
}
