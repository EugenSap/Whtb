import * as React from 'react';
import './custom.css'
import Navbar from "./components/Navbar/Navbar";
import ProfileInfoSmall from "./components/profileInfoSmall/profileInfoSmall";
import {Route} from "react-router";
import Friends from "./components/Friends/friends";
import Groups from "./components/Groups/groups";
import Group from "./components/Group/group";
import Group2 from "./components/Group/group2";

export default () => (
    <div className="app-wrapper">
        <Navbar/>
        <ProfileInfoSmall/>
        <Route path='/friends' component={Friends} />
        <Route path='/groups' component={Groups} />
        <Route path='/group/:id' component={Group2} />
    </div>
);
