import { useEffect, useState } from "react";
import { data } from "./services/enyetech";
import "./App.css";
import Display from "./components/Display";
import Header from "./components/Header";
import Pagination from "react-js-pagination";

function App() {
  const [list, setList] = useState([]);
  const [search, searchState] = useState("");
  const perPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const current = list.slice(indexOfFirst, indexOfLast);
  const oneProp = "Come here";
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  function searchSpace(event) {
    event.preventDefault();
    searchState(event.target.value);
  }
  useEffect(() => {
    let mounted = true;
    data()
      .then((items) => {
        if (mounted) {
          setList(items.records.profiles);
        }
      })
      .catch((error) => {
        // document.getElementById("error").innerHTML = error;
        console.log(error);
      }); //rewrite for better display
    return () => (mounted = false);
  }, []);

  if (!list) {
    return (
      <div>
        <div className="ui negative message">
          <div className="header">We encountered an Error</div>
          <div id="error"></div>
        </div>
      </div>
    );
  } else {
    if (search === "") {
      return (
        <div>
          <div>{header({ oneProp, searchSpace, search })}</div>
          <div className="before-list">
            <Pagination
              className="item"
              activePage={currentPage}
              itemsCountPerPage={20}
              totalItemsCount={list.length}
              pageRangeDisplayed={20}
              onChange={handlePageChange}
              itemClass="page-item"
            />
          </div>
          <div className="ui centered grid container">
            <Display list={current} />
          </div>
        </div>
      );
    } else {
      // eslint-disable-next-line array-callback-return
      const items = list.filter((item) => {
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
          <div>
            <Pagination
              className="item"
              activePage={currentPage}
              itemsCountPerPage={20}
              totalItemsCount={list.length}
              pageRangeDisplayed={20}
              onChange={handlePageChange}
              itemClass="page-item"
            />
          </div>
          <div className="ui centered grid container">
            <Display list={items} />
          </div>
        </div>
      );
    }
  }
}
function header(props) {
  return (
    <header>
      <div>
        <Header {...props} />
      </div>
    </header>
  );
}

export default App;
