import React from "react";
const Header = (props) => {
  return (
    <div className="ui top menu">
      {/* <div className="header"> */}
        <h2 className="item">Hello World</h2>
        <div className="right menu">
          <div className="item">
            <div className="ui icon input">
              <input type="text" placeholder="Search..." />
              <i className="search link icon"></i>
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default Header;
