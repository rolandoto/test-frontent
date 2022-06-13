import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Login from './page/Login';
import Home from './page/Home';
import NoFound from './component/Nofound';
import { PrivateRoute } from './privateRoute/PrivateRoute';
import { AutoProvider } from './privateRoute/AutoProvider';
import {Provider} from 'react-redux'
import store from './store';
import DetailCheckin from './page/DetailCheckin';
import Header from './component/Header';
import Bictacoras from './page/Bitacoras';
import Checkout from './page/Checkout';
import Qr from './page/Qr';
import CheckingPage from './page/CheckingPage/CheckingPage';
import CheckingProcessOne from './page/CheckingPage/CheckingProcessOne';
import CheckingProcessTwo from './page/CheckingPage/CheckingProcessTwo';
import CheckingProcessThree from './page/CheckingPage/CheckingProcessThree';
import Formats from './page/Formats';
import Contact from './page/Contact';
import Forgetfulnes from './page/Forgetfulness';
import Booking from './page/Booking';
import Maintenance from './page/Maintenance';
import Store from './page/Store';


function App() {
    
    return (
      <div>
        <Provider store={store} >
            <AutoProvider >
                    <BrowserRouter>
                        <Header />
                            <Switch>
                                <Route exact path='/' component={Login} /> 
                                <PrivateRoute exact path='/Home' component={Home} />
                                <PrivateRoute exact path="/Detail/:id" component={DetailCheckin} />
                                <PrivateRoute exact path="/Checkout/:id" component={Checkout} />
                                <PrivateRoute exact path="/Bictacoras"  component={Bictacoras}  />
                                <PrivateRoute exact path="/Qr" component={Qr}  />
                                <PrivateRoute exact path="/CheckingPage" component={CheckingPage}/>
                                <PrivateRoute exact path="/CheckingProcessOne" component={CheckingProcessOne}/>
                                <PrivateRoute exact path="/CheckingProcessTwo" component={CheckingProcessTwo}/>
                                <PrivateRoute exact path="/CheckingProcessThree" component={CheckingProcessThree}/>
                                <PrivateRoute exact path="/Formatos" component={Formats}/>
                                <PrivateRoute exact path="/Contact" component={Contact}/>
                                <PrivateRoute exact path="/Forgetfulnes" component={Forgetfulnes}/>
                                <PrivateRoute exact path="/Booking" component={Booking}/>
                                <PrivateRoute exact path="/mantenimiento" component={Maintenance}/>
                                <PrivateRoute exact path="/store" component={Store}/>
                                <Route component={NoFound} />
                            </Switch>   
                        </BrowserRouter>
            </AutoProvider>
         </Provider>
      </div>
    );
}

export default App;
