import React, { Component } from "react";
import "../../static/css/side.css"; 
export default class Side extends Component {
  componentDidMount() {
    let arrow = document.querySelectorAll(".arrow");
    for (var i = 0; i < arrow.length; i++) {
      arrow[i].addEventListener("click", (e) => {
        let arrowParent = e.target.parentElement.parentElement; //selecting main parent of arrow
        arrowParent.classList.toggle("showMenu");
      });
    }
    let sidebar = document.querySelector(".sidebar");
    let sidebarBtn = document.querySelector(".bx-menu");
    sidebarBtn.addEventListener("click", () => {
      sidebar.classList.toggle("close");
    });
  }

  render() {
    return (
      <>
        <div className="sidebar close">
          <div className="logo-details">
            <i className="bx bxl-c-plus-plus"></i>
            <span className="logo_name">chekavjyo</span>
          </div>
          <ul className="nav-links">
            <li>
              <a href="#">
                <i className="bx bx-grid-alt"></i>
                <span className="link_name">Timeline</span>
              </a>
              <ul className="sub-menu blank">
                <li><a className="link_name" href="#">Category</a></li>
              </ul>
            </li>
            <li>
              <div className="iocn-link">
                <a href="#">
                  <i className="bx bx-book-alt"></i>
                  <span className="link_name">Posts</span>
                </a>
              </div>
            </li>
            <li>
              <a href="#">
                <i className="bx bx-pie-chart-alt-2"></i>
                <span className="link_name">Analytics</span>
              </a>
              <ul className="sub-menu blank">
                <li><a className="link_name" href="#">Analytics</a></li>
              </ul>
            </li>
            <li>
              <a href="#">
                <i className="bx bx-line-chart"></i>
                <span className="link_name">Chart</span>
              </a>
              <ul className="sub-menu blank">
                <li><a className="link_name" href="#">Chart</a></li>
              </ul>
            </li>
            <li>
              <div className="iocn-link">
                <a href="#">
                  <i className="bx bx-plug"></i>
                  <span className="link_name">Plugins</span>
                </a>
                <i className="bx bxs-chevron-down arrow"></i>
              </div>
              <ul className="sub-menu">
                <li><a className="link_name" href="#">Plugins</a></li>
                <li><a href="#">UI Face</a></li>
                <li><a href="#">Pigments</a></li>
                <li><a href="#">Box Icons</a></li>
              </ul>
            </li>
          </ul>
        </div>
        <section className="home-section">
          <div className="home-content">
            <i className="bx bx-menu"></i>
          </div>
        </section>
      
      </>
    );
  }
}
