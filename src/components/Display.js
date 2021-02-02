import React from "react";
const Display = (props) => {
  if (Object.entries(props.list).length === 0) {
    return (
      <div>
        <div></div>
        <h1>{"Loading...."}</h1>
      </div>
    );
  }
  return props.list.map((person, index) => {
    return (
      <div className=" ui link cards" key={person.CreditCardNumber}>
        <div className="card">
          <div className="ui">
            <div className="header">
              Name: {person.FirstName + " " + person.LastName}
              <div className="meta"> Username: {person.UserName}</div>
            </div>
            <div className="header">Email: {person.Email}</div>
            <div className="header">Phone number: {person.PhoneNumber}</div>
            <div className="meta">Gender: {person.Gender}</div>
            <div className="meta">Url: {person.URL}</div>
            <div className="meta">
              Location: {person.Longitude + ", " + person.Latitude}
            </div>
            <div className="meta">Credit Card: {person.CreditCardType}</div>
            <div className="meta">Payment method{person.PaymentMethod}</div>
            <div className="meta">Last Login: {person.LastLogin}</div>
          </div>
        </div>
      </div>
    );
  });
};

export default Display;
//  <ul>
//     {list.map((person) => (
//       <li key={person.CreditCardNumber}>{person.FirstName}</li>
//     ))}
//   </ul>
