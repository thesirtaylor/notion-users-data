/* eslint-disable no-undef */
import { useEffect, useState} from "react";
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
  const oneProp = "Users Data";
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  function searchSpace(event) {
    event.preventDefault();
    searchState(event.target.value);
  }
  const [gender, setGender] = useState("");
  // const [paymentMethod, setPaymentMethod] = useState("");
  // const [persons, setPersons] = useState(current);

  // const handleFilterChange = (e, filterType) => {
  //   switch (filterType) {
  //     case "gender":
  //       setGender(e.target.value);
  //       break;
  //     case "paymentMethod":
  //       setPaymentMethod(e.target.value);
  //       break;
  //     default:
  //       break;
  //   }
  // };
//load data
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

//filter
    // useEffect(() => {
    //   let filtered = current;
    //   console.log("first filtered", filtered);
    //   if (gender !== "") {
    //     filtered = filtered.filter(
    //       (persons) => persons.Gender === gender.toLocaleLowerCase()
    //     );
    //     console.log("filtered", filtered);
    //     console.log("gender", gender);
    //   }
    //   if (paymentMethod !== "") {
    //     filtered = filtered.filter(
    //       (persons) =>
    //         persons.PaymentMethod === paymentMethod.toLocaleLowerCase()
    //     );
    //   }
    //   setList(filtered);
    //   return ()=> {
    //     setList(current)
    //   }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);


  // console.log(list);
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
          <div>
            {header({
              oneProp,
              searchSpace,
              search,
              setGender
              // handleFilterChange,
              // gender,
              // paymentMethod,
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
