import { useEffect, useState } from "react";
import { data } from "./services/enyetech";
import "./App.css";
import Display from "./components/Display";
import Header from "./components/Header";

const FILTER_MAP = {
  ALL: () => true,
};

function Body(props) {
  
  useEffect(() => {
    let mounted = true;
    data()
      .then((items) => {
        if (mounted) {
          props.setList(items.records.profiles);
        }
      })
      .catch((error) => {
        document.querySelector("#error").innerHTML = error;
      }); //rewrite for better display
    return () => (mounted = false);
  }, []);

  if (!props.list) {
    return (
      <div>
        <div className="ui negative message">
          <div className="header">We encountered an Error</div>
          <div id="error"></div>
        </div>
      </div>
    );
  } else {
    if (props.search === "") {
      return (
        <div>
          <div className="ui container centered grid">
            <div className="ui row divided grid ">
              <Display list={props.list} />
            </div>
          </div>
        </div>
      );
    } else {
      // eslint-disable-next-line array-callback-return
      const items = props.list.filter((item) => {
        if (
          item.FirstName.toLowerCase().includes(search.toLocaleLowerCase()) ||
          item.LastName.toLowerCase().includes(search.toLocaleLowerCase())
        ) {
          return item;
        }
      });
      return (
        <div>
          <div>{header({ oneProp, searchSpace, search })}</div>
          <div className="ui container centered grid">
            <div className="ui row divided grid ">
              <Display list={items} />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Body;
