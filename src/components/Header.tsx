import React from "react";

const Header = () => {
  return (
    <>
      <div className="top-bar text-center">
        Call: 416 543 9000 | Email: testing@gmail.com
      </div>

      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">
            L.I.C Insurance
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
               <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About Us</a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="insuranceDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Insurance Services
                </a>

                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Term Insurance</a></li>
                  <li><a className="dropdown-item" href="#">Whole Life Insurance</a></li>
                  <li><a className="dropdown-item" href="#">Super Visa Insurance</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Life Insurance</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Super Visa Insurance</a>
              </li>
               <li className="nav-item">
                <a className="nav-link" href="/blog/">Blog</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>
            </ul>

            <button className="btn btn-red ms-3">
              Request a Quote
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;