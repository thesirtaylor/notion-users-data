import React from "react";

const Header = (props) => {
  return (
    <div className="ui top menu">
      {/* <div className="header"> */}
      <div className="item">
        <h2>{props.oneProp}</h2>
      </div>
      {/* {console.log(props.list)}
      {console.log(props.oneProp)} */}
      <div className="right menu">
        <div className="item">
          <div className="ui icon input">
            <input
              type="text"
              placeholder="Search..."
              value={props.search}
              onChange={(e) => props.searchSpace(e)}
            />
            <i className="search link icon"></i>
          </div>
        </div>
      </div>
      <div>
        <form className="form">
          <label >Filter</label>
          <select
            name="category"
            onChange={(e) => props.setGender(e.target.value)}
            id = "select"
          >
            <option value="default" defaultValue>Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="Prefer to skip">ignore</option>
          </select>
          <select
            name="category"
            onChange={(e) => props.setGender(e.target.value)}
            id="select"
          >
            <option value="default" defaultValue>Payment Method</option>
            <option value="cc">CC</option>
            <option value="money order">Money order</option>
            <option value="paypal">Paypal</option>
            <option value="check">Check</option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default Header;
