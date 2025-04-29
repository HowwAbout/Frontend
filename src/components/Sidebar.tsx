import React from "react";
import MyDatingSchedule from "../assets/icons/MyDatingSchedule.svg";
import InvitedSchedule_Purple from "../assets/icons/InvitedSchedule_Purple.svg";
import InvitedSchedule_Gray from "../assets/icons/InvitedSchedule_Gray.svg";
import "./Sidebar.css";

export default function NavigationRail() {
  return (
    <div className="sidebar_navigation-rail clip-contents">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/20k36dgaltp-I41%3A3615%3B54567%3A25760?alt=media&token=fd913a2e-6218-43d4-b878-ca5f46bbdaf9"
        alt="Not Found"
        className="menu-fab"
      />
      <div className="sidebar_destinations clip-contents">
        <div className="nav-item-1">
          <img src={MyDatingSchedule} alt="Not Found" className="container" />
          <p className="label">My Dating Schedule</p>
        </div>
        <div className="nav-item-2">
          <img
            src={InvitedSchedule_Purple}
            alt="Not Found"
            className="container-1"
          />
          <p className="label-1">Invited Schedule</p>
        </div>
        <div className="nav-item-3">
          <img
            src={InvitedSchedule_Gray}
            alt="Not Found"
            className="container-2"
          />
          <p className="label-2">Invited Schedule</p>
        </div>
      </div>
    </div>
  );
}
