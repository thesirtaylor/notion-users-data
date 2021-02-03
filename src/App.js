import { useEffect, useState } from "react";
import { data } from "./services/enyetech";
import "./App.css";
import Display from "./components/Display";
import Header from "./components/Header";
import Pagination from "react-js-pagination";

function App() {
  const [list, setList] = useState([]);
  const [search, searchState] = useState("");
  const [filterGender, filterGenderState] = useState("");
  const [filterMethod, filterMethodState] = useState("");
  const perPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const current = list.slice(indexOfFirst, indexOfLast);
  const oneProp = "Users Data";
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  function searchSpace(event) {
    event.preventDefault();
    searchState(event.target.value);
  }
  useEffect(() => {
    setList(current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
    let filtereditems;
    if (search === "") {
      console.log("what gender", filterGender);

      function fil(item) {
        if (
          (item.Gender.toString() === filterGender.toString() ||
          item.PaymentMethod.toString() === filterMethod.toString()) ||
          (item.Gender.toString() === filterGender.toString() &&
            item.PaymentMethod.toString() === filterMethod.toString())
        ) {
          return true;
        }
      }
      // eslint-disable-next-line array-callback-return
      filtereditems =
        (filterGender === "" && filterMethod === ""
          ? current
          : current.filter(fil)) ||
        (filterGender !== "" && filterMethod === ""
          ? current.filter(fil)
          : current) ||
        (filterMethod !== "" && filterGender === ""
          ? current.filter(fil)
          : current);
      return (
        <div>
          <div>
            {header({
              oneProp,
              searchSpace,
              search,
              filterGender,
              filterGenderState,
              filterMethod,
              filterMethodState,
            })}
          </div>
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
            <Display list={filtereditems} />
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
