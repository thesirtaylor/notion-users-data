import React from "react";
const Header = (props) => {
  return (
    <div className="ui top menu">
      {/* <div className="header"> */}
        <h2 className="item">Hello World</h2>
        <div className="right menu">
          <div class="item">
            <div class="ui icon input">
              <input type="text" placeholder="Search..." />
              <i class="search link icon"></i>
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default Header;
