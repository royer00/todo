import "./App.css";
import React, { Component } from "react";
import { ToDoBanner } from "./ToDoBanner";
import { ToDoCreator } from "./ToDoCreator";
import { ToDoRow } from "./ToDoRow";
import "bootstrap/dist/css/bootstrap.css";

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
      .map((y) => (
        <ToDoRow
          key={y.action}
          item={y}
          callback={this.toggleToDo} //The callback will be invoked (executed) when everything in <ToDoRow> is finished AND the user clicks the input box
        />
      ));

  //Feature #4
  //.setState allows the in-memory data to be updated
  //When setState is invoked, React will make a new object with the changes.  Under the hood, React will compare the new object with the DOM version of the object.  If there is a difference between those 2 objects, then the DOM will get redrawn (NOT a reload) and then we see the changes
  //--------Function to toggle done property to true/false (opposite of what )
  toggleToDo = (checkedtodoItem) =>
    this.setState({
      todoItems: this.state.todoItems.map((x) =>
        x.action === checkedtodoItem.action ? { ...x, done: !x.done } : x
      ),
    });

  //Feature 5d
  // createNewTodoCallback method below is the callback for the ToDoCreator component
  //  The "newToDo" parameter passed into the createNewTodoCallback method below comes from where the callback it initiated from- which is in the createNewTodo method of the ToDoCreator Component
  createNewToDoCallback = (newToDo) => {
    //  The if block below checks if the newly created todo item is NOT already in the list of todos.  If it is NOT already in the list then it adds it as below.  If it is in the list already there is no else block so nothing happens - this is not to user friendly but.... :)

    if (
      !this.state.todoItems.find((x) => x.action === this.state.newToDoItem)
    ) {
      this.setState(
        {
          todoItems: [
            ...this.state.todoItems,
            { action: newToDo, done: false },
          ],
          // By default every new todo should not be done- in other words it's done property should have a value of false.
        },
        () => localStorage.setItem("storedTodos", JSON.stringify(this.state)) //END OF setItem
      ); //END of setState
    } //END of if block
  };

  //Feature 5e
  //  the componentDidMount method below is a built in react method to handle logic for when the app "mounts" or "loads"
  //  the localStorage object is a React built in object that allows persistent local storage much like how cookies work
  //  localStorage reference: https://programmingwithmosh.com/react/localstorage-react/

  componentDidMount = () => {
    let storedData = localStorage.getItem("storedTodos");
    this.setState(
      storedData != null
        ? JSON.parse(storedData)
        : {
            userName: "Billy Bob",
            todoItems: [{ action: "Default todo", done: false }],
          }
    );
  };

  render = () => (
    <div>
      {/*Features 1 & 2 */}
      {/*Below is referred to as a react stub */}
      <ToDoBanner
        userName={this.state.userName}
        todoItems={this.state.todoItems}
      />

      {/*Feature 5a */}
      {/*The createNewToDoCallback method is defined above as Feature 5d */}
      <ToDoCreator callback={this.createNewToDoCallback} />

      {/*Feature 3  + 4*/}
      <table className="table table-striped table-bordered">
        <thead>
          <th>Description</th>
          <th>Mark Complete</th>
        </thead>
        <tbody>{this.todoTableRows(false)}</tbody>
      </table>

      <div className="bg-secondary text-white text-center p-2">
        Feature 8 TBD
      </div>

      {/*Features 6 & 7 */}
      <table className="table table-striped table-bordered">
        <thead>
          <th>Description</th>
          <th>Mark Incomplete</th>
        </thead>
        <tbody>{this.todoTableRows(true)}</tbody>
      </table>
    </div>
  );
} //end of app component
