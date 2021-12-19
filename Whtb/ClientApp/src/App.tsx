import * as React from 'react';

import './custom.css'
import Navbar from "./components/Navbar/Navbar";

export default () => (
    <div className="app-wrapper">
        <Navbar/>
    </div>
    
    /*<Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    </Layout>*/
);
