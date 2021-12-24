import * as React from 'react';
import './custom.css'
import Navbar from "./components/Navbar/Navbar";
import ProfileInfoSmall from "./components/profileInfoSmall/profileInfoSmall";
import {Route} from "react-router";
import Friends from "./components/Friends/friends";
import Groups from "./components/Groups/groups";
import Group from "./components/Group/group";

export default () => (
    <div className="app-wrapper">
        <Navbar/>
        <ProfileInfoSmall/>
        <Route path='/friends' component={Friends} />
        <Route path='/groups' component={Groups} />
        <Route path='/group/:id' component={Group} />
    </div>
    
    /*<Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    </Layout>*/
);
