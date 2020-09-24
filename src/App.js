import "./App.css";
import React, { Component } from "react";
import { ToDoBanner } from "./ToDoBanner";
import "bootstrap/dist/css/bootstrap.css";
import { ToDoRow } from "./ToDoRow";
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

export default class App extends Component {
  //  Above we have created a class called App the extends the functionality of the Component class
  //  The export keyword makes the class available for use outside of the JS file where it is created
  constructor() {
    super();

    //React components have a special property called "state".  The "state" is used to define teh state of date (props)
    this.state = {
      userName: "Kevin Royer",
      todoItems: [
        { action: "Play Trombone", done: false },
        { action: "Clean Trombone", done: true },
        { action: "Admire Trombone", done: false },
        { action: "Walk Trombone", done: false },
        { action: "Put away Trombone", done: false },
      ],
    };
  } //end of constructor

  //Feature 3
  //If the ToDoRow Component's "done" property experiences a change event(ie. checking the Mark Complete Box UI) then the ToDoRow Component calls a callback method called toggleToDo (below) and passes toggleToDo the checked todo item
  /*Function to display table rows*/
  todoTableRows = (finishedTask) =>
    this.state.todoItems
      .filter((x) => x.done === finishedTask)
      .map((y) => <ToDoRow 
      key={y.action} 
      item={y} 
      callback={this.toggleToDo}//The callback will be invoked (executed) when everything in <ToDoRow> is finished AND the user clicks the input box
      />);

      //Feature #4
      //.setState allows the in-memory data to be updated
      //When setState is invoked, React will make a new object with the changes.  Under the hood, React will compare the new object with the DOM version of the object.  If there is a difference between those 2 objects, then the DOM will get redrawn (NOT a reload) and then we see the changes
//--------Function to toggle done property to true/false (opposite of what )
  toggleToDo = (checkedtodoItem) => this.setState(
    {
      todoItems: this.state.todoItems.map(
        x => x.action === checkedtodoItem.action ? {...x, done: !x.done} : x
      )
    }
  );

  render = () => (
    <div>
      {/*Features 1 & 2 */}
      {/*Below is referred to as a react stub */}
      <ToDoBanner
        userName={this.state.userName}
        todoItems={this.state.todoItems}
      />
      {/*Feature 3 */}
      <table className="table table-striped table-bordered">
        <thead>
          <th>Description</th>
          <th>Mark Complete</th>
        </thead>
        <tbody>{this.todoTableRows(false)}</tbody>
      </table>
    </div>
  );
} //end of app component
