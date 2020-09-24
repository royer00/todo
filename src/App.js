import "./App.css";
import React, {Component} from "react";
import {ToDoBanner} from "./ToDoBanner";
import 'bootstrap/dist/css/bootstrap.css';
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
        {action: "Play Trombone", done: false}, 
        {action: "Clean Trombone", done: true}, 
        {action: "Admire Trombone", done: false}, 
        {action: "Walk Trombone", done: false}, 
        {action: "Put away Trombone", done: false},
      ]

    }
  } //end of constructor

  render = () => 
  <div>
    {/*Features 1 & 2 */}
    {/*Below is referred to as a react stub */}
    <ToDoBanner  userName={this.state.userName}
    todoItems = {this.state.todoItems}
    />
  </div>;
} //end of app component
