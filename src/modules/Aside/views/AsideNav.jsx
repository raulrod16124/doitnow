import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";

import { Footer } from "../../global/Footer";
import { HomeViewsVisibility } from "../state/action";

export const AsideNav = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  let classNames = require("classnames");

  // Section Selected
  const [sectionVisibility, setSectionVisibility] = useState({
    home: true,
    stats: false,
    profile: false,
  });

  useEffect(() => {
    switch (location.pathname) {
      case "/home":
        setSectionVisibility({ home: true, stats: false, profile: false });
        break;
      case "/stats":
        setSectionVisibility({ home: false, stats: true, profile: false });
        break;
      case "/profile":
        setSectionVisibility({ home: false, stats: false, profile: true });
        break;
    }
  }, [location]);

  // home view selector
  const [homeView, setHomeView] = useState(false);
  let todayViewClass = classNames("home-view", { selected: !homeView });
  let timestampViewClass = classNames("home-view", { selected: homeView });

  const handleShowHomeViews = (view) => {
    dispatch(HomeViewsVisibility(view));
    setHomeView(view);
  };

  return (
    <div className="aside">
      {sectionVisibility.home && (
        <>
          <ul className="home-view-selector">
            <li
              className={todayViewClass}
              onClick={() => handleShowHomeViews(false)}
            >
              <p className="view-text">
                <i class="fas fa-tasks icon"></i> Today
              </p>
            </li>
            <li
              className={timestampViewClass}
              onClick={() => handleShowHomeViews(true)}
            >
              <p className="view-text">
                <i class="far fa-calendar-alt icon"></i> Calendar
              </p>
            </li>
          </ul>
        </>
      )}
      {sectionVisibility.stats && (
        <p style={{ color: "#fff" }}>Here the Stats section</p>
      )}
      {sectionVisibility.profile && (
        <p style={{ color: "#fff" }}>Here the Profile section</p>
      )}
      <Footer />
    </div>
  );
};
