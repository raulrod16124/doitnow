import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { Footer } from "../../global/Footer";
import { HomeViewsVisibility } from "../state/action";

export const AsideNav = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const initialSectionView = {
    home: true,
    stats: false,
    profile: false,
  };

  const [sectionView, setSectionView] = useState(initialSectionView);

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
            <li
              className="section-content"
              onClick={() =>
                setSectionView({
                  ...sectionView,
                  home: !sectionView.home,
                })
              }
            >
              <Link to="/home" className="link">
                <i className="fas fa-home icon"></i>
                <p className="text">Home</p>
              </Link>
              {sectionView.home ? (
                <i className="fas fa-chevron-up icon arrow"></i>
              ) : (
                <i className="fas fa-chevron-down icon arrow"></i>
              )}
            </li>
            {sectionView.home && (
              <ul className="section-selector">
                <Link to="/home" className="link">
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
                </Link>
              </ul>
            )}
          </div>
          <div className={statsSelected}>
            <li
              className="section-content"
              onClick={() =>
                setSectionView({ ...sectionView, stats: !sectionView.stats })
              }
            >
              <Link to="/stats" className="link">
                <i className="fas fa-chart-bar icon"></i>
                <p className="text">Stats</p>
              </Link>
              {sectionView.stats ? (
                <i className="fas fa-chevron-up icon arrow"></i>
              ) : (
                <i className="fas fa-chevron-down icon arrow"></i>
              )}
            </li>
            {sectionView.stats && (
              <ul className="section-selector">
                <Link to="/stats" className="link">
                  <li className="view">
                    <p className="view-text">
                      <i className="fas fa-chart-pie icon"></i> Global
                    </p>
                  </li>
                </Link>
              </ul>
            )}
          </div>
          <div className={profileSelected}>
            <li
              className="section-content"
              onClick={() =>
                setSectionView({
                  ...sectionView,
                  profile: !sectionView.profile,
                })
              }
            >
              <Link to="/profile" className="link">
                <i className="far fa-user-circle icon"></i>
                <p className="text">Profile</p>
              </Link>
              {sectionView.profile ? (
                <i className="fas fa-chevron-up icon arrow"></i>
              ) : (
                <i className="fas fa-chevron-down icon arrow"></i>
              )}
            </li>
            {sectionView.profile && (
              <ul className="section-selector">
                <Link to="/profile" className="link">
                  <li className="view">
                    <p className="view-text">
                      <i className="fas fa-user icon"></i> Account
                    </p>
                  </li>
                  <li className="view">
                    <p className="view-text">
                      <i className="fas fa-cog icon"></i> Settings
                    </p>
                  </li>
                </Link>
              </ul>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
