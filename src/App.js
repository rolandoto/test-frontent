import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Login from './page/Login';
import Home from './page/Home';
import NoFound from './component/Nofound';
import { PrivateRoute } from './privateRoute/PrivateRoute';
import  AutoProvider  from './privateRoute/AutoProvider';
import {Provider} from 'react-redux'
import store from './store';
import DetailCheckin from './page/DetailCheckin';
import Header from './component/Header';
import Bictacoras from './page/Bitacoras';
import Formats from './page/Formats';
import Contact from './page/Contact';
import Forgetfulnes from './page/Forgetfulness';
import Booking from './page/Booking';
import Maintenance from './page/Maintenance';
import Store from './page/Store';
import MinImbox from './page/MinImbox';
import { useContext } from 'react';
import Hotels from './page/Hotels';
import DetailBedRoom from './page/DetailBedRoom';
import Stores from './page/StoresListAdmin';
import DetailStore from './page/DetailStore';
import Dashboard from './page-resesion/Dashboard';
import DetailDashboard from './page-resesion/DetailDashboard';
import DetailStoreRecepcion from './page-resesion/DetailStore';
import HeaderRecepcion from './component/Header/HeaderRepcion';

function App() {

    const {jwt} =useContext(AutoProvider)

    const val = jwt ?jwt.result.id_departamento : 2

    if(val ==1){
        return (
            <div>
                <Provider store={store} >
                            <BrowserRouter>
                                <Header />
                                    <Switch>
                                        <Route exact path='/' component={Login} /> 
                                        <PrivateRoute exact path='/Home' component={Home} />
                                        <PrivateRoute exact path='/Hotels' component={Hotels}  />
                                        <PrivateRoute exact path='/DetailBedRoom/:id' component={DetailBedRoom}  />
                                        <PrivateRoute exact path="/Detail/:id" component={DetailCheckin} />
                                        <PrivateRoute exact path="/Bictacoras"  component={Bictacoras}  />
                                        <PrivateRoute exact path="/Formatos" component={Formats}/>
                                        <PrivateRoute exact path="/Contact" component={Contact}/>
                                        <PrivateRoute exact path="/Forgetfulnes" component={Forgetfulnes}/>
                                        <PrivateRoute exact path="/Booking" component={Booking}/>
                                        <PrivateRoute exact path="/mantenimiento" component={Maintenance}/>
                                        <PrivateRoute exact path="/store" component={Store}/>
                                        <PrivateRoute exact path="/DetailStoreRecepcion/:id" component={DetailStoreRecepcion} />
                                        <PrivateRoute exact path="/Stores" component={Stores}/>
                                        <PrivateRoute exact path="/DetailStore/:id" component={DetailStore} />
                                        <PrivateRoute exact path="/imbox" component={MinImbox}/>
                                        <Route component={NoFound} />
                                    </Switch>   
                                </BrowserRouter>
                        </Provider>
                 </div>
    );
}   
if(val==14){
    return (
        <div>
            <Provider store={store} >
                    <BrowserRouter>
                        <Header />
                            <Switch>
                                <Route exact path='/' component={Login} /> 
                                <PrivateRoute exact path="/Detail/:id" component={DetailCheckin} />
                                <PrivateRoute exact path="/Bictacoras"  component={Bictacoras}  />
                                <PrivateRoute exact path="/Formatos" component={Formats}/>
                                <PrivateRoute exact path="/Contact" component={Contact}/>
                                <PrivateRoute exact path="/Forgetfulnes" component={Forgetfulnes}/>
                                <PrivateRoute exact path="/Booking" component={Booking}/>
                                <PrivateRoute exact path="/mantenimiento" component={Maintenance}/>
                                <PrivateRoute exact path="/store" component={Store}/>
                                <PrivateRoute exact path="/DetailStorerecepcion/:id" component={DetailStoreRecepcion} />
                                <PrivateRoute exact path="/imbox" component={MinImbox}/>
                                <Route component={NoFound} />
                            </Switch>   
                        </BrowserRouter>
            </Provider>
        </div>
    );
}

if(val==2){
    return (
        <div>
            <Provider store={store} >
                    <BrowserRouter>
                        <HeaderRecepcion />
                            <Switch>
                                <Route exact path='/' component={Login} /> 
                                <PrivateRoute exact path='/Dashboard' component={Dashboard} />
                                <PrivateRoute exact path="/DetailDashboard/:id" component={DetailDashboard} />  
                                <PrivateRoute exact path="/store" component={Store}/>
                                <PrivateRoute exact path="/DetailStoreRecepcion/:id" component={DetailStoreRecepcion} />
                                <PrivateRoute  exact path="Booking"     om  />
                                <PrivateRoute exact path="/Detail/:id" component={DetailCheckin} />
                                <PrivateRoute exact path="/Bictacoras"  component={Bictacoras}  />
                                <PrivateRoute exact path="/Formatos" component={Formats}/>
                                <PrivateRoute exact path="/Contact" component={Contact}/>
                                <PrivateRoute exact path="/Forgetfulnes" component={Forgetfulnes}/>
                                <PrivateRoute exact path="/mantenimiento" component={Maintenance}/>
                                <PrivateRoute exact path="/imbox" component={MinImbox}/>
                                <Route component={NoFound} />
                            </Switch>   
                    </BrowserRouter>
            </Provider>
        </div>
        );
    }
}
export default App;
