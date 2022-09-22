import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { Footer } from "../../global/Footer";
import { Header } from "../../Nav/Header";
import { ViewSelected } from "../state/action";

export const AsideNav = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const viewState = useSelector((state) => {
    return state.AsideReducer;
  });

  let classNames = require("classnames");
  let homeSelected = classNames("section", {
    selected: location.pathname === "/home",
  });
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

  const bgNavResponsiveRef = useRef();
  const navResponsiveRef = useRef();

  const handleSelectedView = (view) => {
    dispatch(ViewSelected(view));
    if (bgNavResponsiveRef.current.style.display === "block") {
      handleToggleNavBar();
    }
  };

  const handleToggleNavBar = (param) => {
    if (param === "open") {
      bgNavResponsiveRef.current.style.display = "block";
      navResponsiveRef.current.style.display = "grid";
      setTimeout(() => {
        navResponsiveRef.current.style.opacity = "1";
        navResponsiveRef.current.style.width = "70%";
      }, 200);
    } else {
      navResponsiveRef.current.style.opacity = "0";
      setTimeout(() => {
        navResponsiveRef.current.style.width = "0%";
      }, 100);
      setTimeout(() => {
        bgNavResponsiveRef.current.style.display = "none";
        navResponsiveRef.current.style.display = "none";
      }, 300);
    }
  };

  return (
    <div className="aside">
      <div className="content-responsive-menu">
        <div className="container-responsive">
          <i
            className="fas fa-bars icon icon-menu"
            onClick={() => handleToggleNavBar("open")}
          ></i>
          <a className="title-responsive" href="/home">
            DOITNOW
          </a>
        </div>
      </div>
      <div
        className="bg-nav-bar"
        ref={bgNavResponsiveRef}
        onClick={(e) => {
          if (e.target.className === "bg-nav-bar") {
            handleToggleNavBar();
          }
        }}
      >
        <div className="nav-bar" ref={navResponsiveRef}>
          <i
            className="fas fa-times icon icon-close-nav"
            onClick={handleToggleNavBar}
          ></i>
          <div className="logo-app">
            <a className="title" href="/home">
              DOITNOW
            </a>
          </div>
          {/* START profile avatar on tablet size */}
          <div className="nav-avatar-content">
            <Header />
          </div>
          {/* END profile avatar on tablet size */}
          <div className="navegation-content">
            <div className={homeSelected}>
              <li
                className="section-content"
                onClick={() => {
                  handleSelectedView("today");
                }}
              >
                <i className="fas fa-home icon-section"></i>
                <p className="text">Home</p>
              </li>
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
            </div>
            <div className={profileSelected}>
              <li className="section-content">
                <i className="far fa-user-circle icon-section"></i>
                <p className="text">Profile</p>
              </li>
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
                </Link>
              </ul>
            </div>
          </div>
          <div className="content-logout">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};
