import React from 'react';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Signup from './components/Signup/Signup';
import Groups from './components/Groups/Groups';
import GroupCreate from './components/GroupCreate';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

function App () {
    return (
        <div>
            <BrowserRouter>
                <div id='app'>
                    <Switch>
                        <Route path='/login' component={Login}/>
                        <Route path='/dashboard' component={Dashboard}/>
                        <Route path='/sign-up' component={Signup}/>
                        <Route path='/group-create' component={GroupCreate}/>
                        <Route path='/groups' component={Groups}/>
                        <Route path='/' component={Dashboard}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;