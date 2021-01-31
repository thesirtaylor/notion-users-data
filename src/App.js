import { useEffect, useState } from "react";
import { data } from "./services/enyetech";
import "./App.css";
import Display from "./components/Display";
import Header from "./components/Header";

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    let mounted = true;
    data()
      .then((items) => {
        if (mounted) {
          setList(items.records.profiles);
        }
      })
      .catch((error) => {
        document.querySelector("#error").innerHTML = error;
      }); //rewrite for better display
    return () => (mounted = false);
  }, []);

  if (!list) {
    return (
      <div>
        <div>{header()}</div>
        <div className="ui negative message">
          <div className="header">We encountered an Error</div>
          <div id="error"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>{header()}</div>
        <div className="ui centered grid container">
          <Display list={list} />
        </div>
      </div>

      //  <ul>
      //     {list.map((person) => (
      //       <li key={person.CreditCardNumber}>{person.FirstName}</li>
      //     ))}
      //   </ul>
    );
  }
}
function header() {
  return (
    <header>
      <div>
        <Header />
      </div>
    </header>
  );
}

export default App;
