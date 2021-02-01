import React from "react";

const Header = (props) => {
  return (
    <div className="ui top menu">
      {/* <div className="header"> */}
      <div className="item">
        <h2>{props.oneProp}</h2>
      </div>
      {console.log(props.list)}
      {console.log(props.oneProp)}
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

    </div>
  );
};

export default Header;
