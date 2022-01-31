import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Login from './page/Login/Login';
import { UseContextPorvider } from './context/UseContext';
import Home from './page/Home/Home';
import NoFound from './component/Nofound/Nofound';
import { PrivateRoute } from './privateRoute/PrivateRoute';
import { AutoProvider } from './privateRoute/AutoProvider';
import {Provider} from 'react-redux'
import store from './store/store';

function App() {

    return (
      <div >
          <Provider store={store} >
            <AutoProvider >
                    <BrowserRouter>
                        <Switch>
                            <Route exact path='/' component={Login} />
                            <PrivateRoute exact path='/home' component={Home} />
                            <Route component={NoFound} />
                        </Switch>   
                    </BrowserRouter>
            </AutoProvider>
         </Provider>
      </div>
    );
}

export default App;
