import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { Footer } from "../../global/Footer";
import { HomeViewsVisibility } from "../state/action";

export const AsideNav = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  let classNames = require("classnames");
  let homeSelected = classNames("section", {
    selected: location.pathname === "/home",
  });
  let statsSelected = classNames("section", {
    selected: location.pathname === "/stats",
  });
  let profileSelected = classNames("section", {
    selected: location.pathname === "/profile",
  });

  // home view selector
  const [homeView, setHomeView] = useState(false);
  let todayViewClass = classNames("view", { selected: !homeView });
  let timestampViewClass = classNames("view", { selected: homeView });

  const handleShowHomeViews = (view) => {
    dispatch(HomeViewsVisibility(view));
    setHomeView(view);
  };

  return (
    <div className="aside">
      <div className="nav-bar">
        <div className="logo-app">
          <h1>DOITNOW</h1>
        </div>
        <div className="navegation-content">
          <div className={homeSelected}>
            <Link to="/home" className="link">
              <li className="section-content">
                <i className="fas fa-home icon"></i> Home
              </li>
            </Link>
            {location.pathname === "/home" && (
              <ul className="section-selector">
                <li
                  className={todayViewClass}
                  onClick={() => handleShowHomeViews(false)}
                >
                  <p className="view-text">
                    <i className="fas fa-tasks icon"></i> Today
                  </p>
                </li>
                <li
                  className={timestampViewClass}
                  onClick={() => handleShowHomeViews(true)}
                >
                  <p className="view-text">
                    <i className="far fa-calendar-alt icon"></i> Calendar
                  </p>
                </li>
              </ul>
            )}
          </div>
          <div className={statsSelected}>
            <Link to="/stats" className="link">
              <li className="section-content">
                <i className="fas fa-chart-bar icon"></i> Stats
              </li>
            </Link>
            {location.pathname === "/stats" && (
              <ul className="section-selector">
                <li className="view selected">
                  <p className="view-text">
                    <i className="fas fa-chart-pie icon"></i> Global
                  </p>
                </li>
                <li className="view">
                  <p className="view-text">
                    <i className="fas fa-angle-double-up icon"></i> Perfomance
                  </p>
                </li>
              </ul>
            )}
          </div>
          <div className={profileSelected}>
            <Link to="/profile" className="link">
              <li className="section-content">
                <i className="far fa-user-circle icon"></i> Profile
              </li>
            </Link>
            {location.pathname === "/profile" && (
              <ul className="section-selector">
                <li className="view selected">
                  <p className="view-text">
                    <i className="fas fa-user icon"></i> Account
                  </p>
                </li>
                <li className="view">
                  <p className="view-text">
                    <i className="fas fa-cog icon"></i> Settings
                  </p>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
