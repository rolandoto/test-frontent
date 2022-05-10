import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Login from './page/Login/Login';
import { UseContextPorvider } from './context/UseContext';
import Home from './page/Home/Home';
import NoFound from './component/Nofound/Nofound';
import { PrivateRoute } from './privateRoute/PrivateRoute';
import { AutoProvider } from './privateRoute/AutoProvider';
import {Provider} from 'react-redux'
import store from './store';
import DetailCheckin from './page/DetailCheckin/DetailCheckin';
import Header from './component/Header/Header';
import Bictacoras from './page/Bitacoras/Bitacoras';
import Checkout from './page/Checkout/Checkout';
import Qr from './page/Qr/Qr';
import CheckingPage from './page/CheckingPage/CheckingPage';
import CheckingProcessOne from './page/CheckingPage/CheckingProcessOne';
import CheckingProcessTwo from './page/CheckingPage/CheckingProcessTwo';
import CheckingProcessThree from './page/CheckingPage/CheckingProcessThree';

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
                                <PrivateRoute exact path="/Qr"  component={Qr}  />
                                <PrivateRoute exact path="/CheckingPage" component={CheckingPage}  />
                                <PrivateRoute exact path="/CheckingProcessOne" component={CheckingProcessOne}  />
                                <PrivateRoute exact path="/CheckingProcessTwo" component={CheckingProcessTwo}  />
                                <PrivateRoute exact path="/CheckingProcessThree" component={CheckingProcessThree}  />
                                <Route component={NoFound} />
                            </Switch>   
                        </BrowserRouter>
            </AutoProvider>
         </Provider>
      </div>
    );
}

export default App;
