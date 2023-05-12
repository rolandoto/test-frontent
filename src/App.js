import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./page/Login";
import Home from "./page/Home";
import NoFound from "./component/Nofound";
import { PrivateRoute } from "./privateRoute/PrivateRoute";
import AutoProvider from "./privateRoute/AutoProvider";
import { Provider } from "react-redux";
import store from "./store";
import DetailCheckin from "./page/DetailCheckin";
import Header from "./component/Header";
import Bictacoras from "./page/Bitacoras";
import Formats from "./page/Formats";
import Contact from "./page/Contact";
import Forgetfulnes from "./page/Forgetfulness";
import Booking from "./page/Booking";
import Maintenance from "./page/Maintenance";
import Store from "./page/Store";
import MinImbox from "./page/MinImbox";
import React, { useContext, Suspense } from "react";
import Hotels from "./page/Hotels";
import DetailBedRoom from "./page/DetailBedRoom";
import Stores from "./page/StoresListAdmin";
import DetailStore from "./page/DetailStore";
import Dashboard from "./page-resesion/Dashboard";
import DetailDashboard from "./page-resesion/DetailDashboard";
import DetailStoreRecepcion from "./page-resesion/DetailStore";
import HeaderRecepcion from "./component/Header/HeaderRepcion";
import Search from "./page-resesion/Search";
import Checking from "./organisms/Checking/Checking";
import CreateReservaction from "./page-resesion/CreateReservaction/CreateReservaction";
import DetailChecking from "./page-resesion/DetailChecking";
import Nochecking from "./page-resesion/no-checking";
import CheckingEditar from "./page-resesion/CheckingEditar";
import EditarPersonas from "./page-resesion/EditarPersonas";
import Checkingn2 from "./page-resesion/Checkingn2";
import Contracto from "./page-resesion/Contracto";
import Checkout from "./page-resesion/Checkout";
import Comunicate from "./page/Comunicate";
import HeaderComunicate from "./component/Header/HeaderComunicate";
import InformeConsolidado from "./page-resesion/InformeConsolidado";
import UpdateRservation from "./page-resesion/EditarPersonas/EditarUpdateReserva";
import InformeAuditoria from "./page-resesion/Informes";
import InformeCamareria from "./page-resesion/Informes/InformesCamareria";
import InformeRoomToSell from "./page-resesion/Informes/InformeRoomToSell";
import ReporteCamarera from "./page-resesion/Informes/ReporteCamareras";
import InformeStore from "./page/InformeStore";
import Checkingn3 from "./page-resesion/checking3";
import DetailnformeStore from "./page/InformeStore/DetailnformeStore";
import InformeAccountEarrings from "./page-resesion/Informes/InformeAccount";
import InformeAccount from "./page-resesion/Informes/InformeAccount";
import TableStore from "./component/DetailStore/TableStore";
import DetailStoreById from "./component/DetailStore/DetailStoreById";
import InformeMovimiento from "./page-resesion/Informes/InformeMovimiento";
import CustomNav from "./Ui/CustomNav";

function App() {
  const { jwt } = useContext(AutoProvider);

  const val = jwt ?jwt.result.id_permissions : 1
    
  if (val == 1) {
    return (
      <div>
        <Provider store={store}>
          <BrowserRouter>
          <CustomNav />
            <Switch>
              <Route exact path="/" component={Login} />
              <PrivateRoute exact path="/Home" component={Home} />
              <PrivateRoute exact path="/Hotels" component={Hotels} />
              <PrivateRoute
                exact
                path="/DetailBedRoom/:id"
                component={DetailBedRoom}
              />
              <PrivateRoute
                exact
                path="/Detail/:id"
                component={DetailCheckin}
              />
              <PrivateRoute exact path="/Bictacoras" component={Bictacoras} />
              <PrivateRoute exact path="/Formatos" component={Formats} />
              <PrivateRoute exact path="/Contact" component={Contact} />
              <PrivateRoute
                exact
                path="/Forgetfulnes"
                component={Forgetfulnes}
              />
              <PrivateRoute exact path="/Booking" component={Booking} />
              <PrivateRoute
                exact
                path="/mantenimiento"
                component={Maintenance}
              />
              <PrivateRoute exact path="/store" component={Store} />
              <PrivateRoute
                exact
                path="/DetailStoreRecepcion/:id"
                component={DetailStoreRecepcion}
              />
              <PrivateRoute exact path="/Stores" component={Stores} />
              <PrivateRoute
                exact
                path="/DetailStore/:id"
                component={DetailStore}
              />
              <PrivateRoute
                exact
                path="/informeStore/:id"
                component={InformeStore}
              />
              <PrivateRoute
                exact
                path="/checkingin3/:id"
                component={Checkingn3}
              />

              <PrivateRoute
                exact
                path="/detailById/:id"
                component={DetailStoreById}
              />
              <PrivateRoute exact path="/imbox" component={MinImbox} />
              <PrivateRoute exact path="/Detailinforme/:id" component={DetailnformeStore} />
              <Route component={NoFound} />
            </Switch>
          </BrowserRouter>
        </Provider>
      </div>
    );
  } else if (val == 7) {
    return (
      <div>
        
        <Provider store={store}>
          <BrowserRouter>
           
            <CustomNav />
            <Switch>
              <Route exact path="/" component={Login} />
              <PrivateRoute exact path="/Home" component={Dashboard} />
              <PrivateRoute
                exact
                path="/DetailDashboard/:id"
                component={DetailDashboard}
              />
              <PrivateRoute exact path="/store" component={Store} />
              <PrivateRoute
                exact
                path="/DetailStoreRecepcion/:id"
                component={DetailStoreRecepcion}
              />
              <PrivateRoute exact path="Booking" />
              <PrivateRoute
                exact
                path="/Detail/:id"
                component={DetailCheckin}
              />
              <PrivateRoute exact path="/Bictacoras" component={Bictacoras} />
              <PrivateRoute exact path="/Formatos" component={Formats} />
              <PrivateRoute exact path="/Contact" component={Contact} />
              <PrivateRoute
                exact
                path="/Forgetfulnes"
                component={Forgetfulnes}
              />
              <PrivateRoute
                exact
                path="/mantenimiento"
                component={Maintenance}
              />
              <PrivateRoute exact path="/imbox" component={MinImbox} />
              <PrivateRoute exact path="/search" component={Search} />
              <PrivateRoute exact path="/checking" component={Checking} />
              <PrivateRoute
                exact
                path="/Createreservaction"
                component={CreateReservaction}
              />
              <PrivateRoute
                exact
                path="/detailchecking/:id"
                component={DetailChecking}
              />
              <PrivateRoute exact path="/nochecking" component={Nochecking} />
              <PrivateRoute
                exact
                path="/checkingediatar/:id"
                component={CheckingEditar}
              />
              <PrivateRoute
                exact
                path="/editarpersonas/:id"
                component={EditarPersonas}
              />
              <PrivateRoute
                exact
                path="/editarpersonasreservas/:id"
                component={UpdateRservation}
              />
              <PrivateRoute
                exact
                path="/checkingin2/:id"
                component={Checkingn2}
              />
              <PrivateRoute exact path="/contracto" component={Contracto} />
              <PrivateRoute exact path="/Checkout/:id" component={Checkout} />
              <PrivateRoute
                exact
                path="/informeconsolidado"
                component={InformeConsolidado}
              />
              <PrivateRoute
                exact
                path="/informeauditoria"
                component={InformeAuditoria}
              />
              <PrivateRoute
                exact
                path="/informecamareria"
                component={InformeCamareria}
              />
              <PrivateRoute
                exact
                path="/informeroomtosell"
                component={InformeRoomToSell}
              />

              <PrivateRoute
                exact
                path="/informeStore/:id"
                component={InformeStore}
              />
               <PrivateRoute
                exact
                path="/checkingin3/:id"
                component={Checkingn3}
              />


                <PrivateRoute
                exact
                path="/informeAccount"
                component={InformeAccount}
              />
               <PrivateRoute
                exact
                path="/informeMovimiento"
                component={InformeMovimiento}
              />
               <PrivateRoute exact path="/Detailinforme/:id" component={DetailnformeStore} />
              <Route component={NoFound} />
            </Switch>
          </BrowserRouter>
        </Provider>
      </div>
    );
  } else if (val == 2) {
    return (
      <div>
            
        <Provider store={store}>
          <BrowserRouter>
          <CustomNav />
            <Switch>
              <Route exact path="/" component={Login} />
              <PrivateRoute exact path="/Home" component={Dashboard} />
              <PrivateRoute
                exact
                path="/DetailDashboard/:id"
                component={DetailDashboard}
              />
              <PrivateRoute exact path="/store" component={Store} />
              <PrivateRoute
                exact
                path="/DetailStorerecepcion/:id"
                component={DetailStoreRecepcion}
              />
              <PrivateRoute exact path="Booking" />
              <PrivateRoute
                exact
                path="/Detail/:id"
                component={DetailCheckin}
              />
              <PrivateRoute exact path="/Bictacoras" component={Bictacoras} />
              <PrivateRoute exact path="/Formatos" component={Formats} />
              <PrivateRoute exact path="/Contact" component={Contact} />
              <PrivateRoute
                exact
                path="/Forgetfulnes"
                component={Forgetfulnes}
              />
              <PrivateRoute
                exact
                path="/mantenimiento"
                component={Maintenance}
              />
              <PrivateRoute exact path="/imbox" component={MinImbox} />
              <PrivateRoute exact path="/search" component={Search} />
              <PrivateRoute exact path="/checking" component={Checking} />
              <PrivateRoute
                exact
                path="/Createreservaction"
                component={CreateReservaction}
              />
              <PrivateRoute
                exact
                path="/detailchecking/:id"
                component={DetailChecking}
              />
              <PrivateRoute exact path="/nochecking" component={Nochecking} />
              <PrivateRoute
                exact
                path="/checkingediatar/:id"
                component={CheckingEditar}
              />
              <PrivateRoute
                exact
                path="/editarpersonas/:id"
                component={EditarPersonas}
              />
              <PrivateRoute
                exact
                path="/editarpersonasreservas/:id"
                component={UpdateRservation}
              />
              <PrivateRoute
                exact
                path="/checkingin2/:id"
                component={Checkingn2}
              />
              <PrivateRoute exact path="/contracto" component={Contracto} />
              <PrivateRoute exact path="/Checkout/:id" component={Checkout} />
              <PrivateRoute
                exact
                path="/informeconsolidado"
                component={InformeConsolidado}
              />
              <PrivateRoute
                exact
                path="/informeauditoria"
                component={InformeAuditoria}
              />
              <PrivateRoute
                exact
                path="/informecamareria"
                component={InformeCamareria}
              />
              <PrivateRoute
                exact
                path="/informeroomtosell"
                component={InformeRoomToSell}
              />
              <PrivateRoute
                exact
                path="/reportecamarera"
                component={ReporteCamarera}
              />
              <PrivateRoute
                exact
                path="/informeStore/:id"
                component={InformeStore}
              />
               <PrivateRoute
                exact
                path="/checkingin3/:id"
                component={Checkingn3}
              />

              <PrivateRoute
                exact
                path="/informeAccount"
                component={InformeAccount}
              />
              <PrivateRoute
                exact
                path="/informeMovimiento"
                component={InformeMovimiento}
              />
                 <PrivateRoute exact path="/Detailinforme/:id" component={DetailnformeStore} />
              <Route component={NoFound} />
            </Switch>
          </BrowserRouter>
        </Provider>
      </div>
    );
  } else {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <HeaderComunicate />
          <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute exact path="/Home" component={Comunicate} />
            <Route component={NoFound} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
