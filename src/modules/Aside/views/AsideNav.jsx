import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { Footer } from "../../global/Footer";
import { HomeViewsVisibility, ViewSelected } from "../state/action";

export const AsideNav = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const initialSectionView = {
    home: true,
    stats: false,
    profile: false,
  };

  const [sectionView, setSectionView] = useState(initialSectionView);

  const viewState = useSelector((state) => {
    return state.AsideReducer;
  });

  let classNames = require("classnames");
  let homeSelected = classNames("section", {
    selected: location.pathname === "/home",
  });
  // let statsSelected = classNames("section", {
  //   selected: location.pathname === "/stats",
  // });
  let profileSelected = classNames("section", {
    selected: location.pathname === "/profile",
  });

  const initialViewSelected = {
    today: true,
    calendar: false,
    account: false,
    settings: false,
  };

  // home view selector
  const [viewSelected, setViewSelected] = useState(initialViewSelected);

  useEffect(() => {
    if (location.pathname === "/home") {
      dispatch(ViewSelected("today"));
    }
    if (location.pathname === "/profile") {
      dispatch(ViewSelected("account"));
    }
  }, []);

  useEffect(() => {
    setViewSelected(viewState);
  }, [viewState]);

  let todayViewClass = classNames("view", { selected: viewSelected.today });
  let calendarClass = classNames("view", { selected: viewSelected.calendar });
  let accountClass = classNames("view", { selected: viewSelected.account });
  // let settingsClass = classNames("view", {
  //   selected: viewSelected.settings,
  // });

  const handleSelectedView = (view) => {
    console.log(view);
    dispatch(ViewSelected(view));
    // setHomeView(view);
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
              <Link
                to="/home"
                className="link"
                onClick={() => handleSelectedView("today")}
              >
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
                    onClick={() => handleSelectedView("today")}
                  >
                    <p className="view-text">
                      <i className="fas fa-tasks icon"></i> Today
                    </p>
                  </li>
                  <li
                    className={calendarClass}
                    onClick={() => handleSelectedView("calendar")}
                  >
                    <p className="view-text">
                      <i className="far fa-calendar-alt icon"></i> Calendar
                    </p>
                  </li>
                </Link>
              </ul>
            )}
          </div>
          {/* <div className={statsSelected}>
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
          </div> */}
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
              <Link
                to="/profile"
                className="link"
                onClick={() => handleSelectedView("account")}
              >
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
                  <li
                    className={accountClass}
                    onClick={() => handleSelectedView("account")}
                  >
                    <p className="view-text">
                      <i className="fas fa-user icon"></i> Account
                    </p>
                  </li>
                  {/* <li
                    className={settingsClass}
                    onClick={() => handleSelectedView("settings")}
                  >
                    <p className="view-text">
                      <i className="fas fa-cog icon"></i> Settings
                    </p>
                  </li> */}
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
