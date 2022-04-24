import * as React from 'react';
import './custom.css'
import Navbar from "./components/Navbar/Navbar";
import ProfileInfoSmall from "./components/profileInfoSmall/profileInfoSmall";
import {Route} from "react-router";
import Friends from "./components/Friends/friends";
import Groups from "./components/Groups/groups";
import Group2 from "./components/Group/group";
import Login from "./components/Login/Login";
import Account from './components/Account/account';

export default () => (
    <div className="app-wrapper">
        <Navbar/>
        <ProfileInfoSmall/>
        <Route path='/account/:id?' component={Account} />
        <Route path='/login' component={Login} />
        <Route path='/friends' component={Friends} />
        <Route path='/groups' component={Groups} />
        <Route path='/group/:id' component={Group2} />
    </div>
);
