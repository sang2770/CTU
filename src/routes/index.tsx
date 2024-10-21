
import { Routes as RouterRoutes, Route, useParams } from 'react-router-dom';
import { lazy } from "react";
import Loadable from "../components/loader/Loadable";
import DashboardLayout from '../components/layout/DashboardLayout';
import DashboardPage from '../views/pages/dashboard';
import BlankLayout from '../components/layout/BlankLayout';

const FarmPage = Loadable(lazy(() => import("../views/pages/farm/FarmPage")));
const PondPage = Loadable(lazy(() => import("../views/pages/farm/PondPage")));
const DeviceControlPage = Loadable(lazy(() => import("../views/pages/device-control")));
const AboutPage = Loadable(lazy(() => import("../views/pages/about")));
const StationPage = Loadable(lazy(() => import("../views/pages/station")));
const LoginPage = Loadable(lazy(() => import("../views/pages/login")));
const StationManagementPage = Loadable(lazy(() => import("../views/pages/station-management")));
const FieldPondManagementPage = Loadable(lazy(() => import("../views/pages/field-pond-management")));
const DeviceManagementPage = Loadable(lazy(() => import("../views/pages/device-management")));
const SensorManagementPage = Loadable(lazy(() => import("../views/pages/sensor-management")));
const FarmManagementPage = Loadable(lazy(() => import("../views/pages/farm-management")));
const MicroControllerManagementPage = Loadable(lazy(() => import("../views/pages/microcontroller-management")));
// const HomePage = Loadable(lazy(() => import("../views/pages/home")));

const StationWrapper: React.FC = () => {
  const params = useParams<{ id: string,thingId:string }>();
  return <StationPage id={params.id!}/>;
};

export default function Routes() {
  return (
    <RouterRoutes>
      {/* Guest */}
      <Route path="/" element={<BlankLayout />} >

        {/* <Route index element={<HomePage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/home" element={<HomePage />} /> */}
      </Route>
      <Route path="/" element={<DashboardLayout />} >
        <Route index element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/thing/:thingId/station/:id" element={<StationWrapper />} />
        <Route path="/about-us" element={<AboutPage />} />

        {/* Logined */}
        <Route path="/device-control" element={<DeviceControlPage />} />
        <Route path="/farm" element={<FarmPage />} />
        <Route path="/farm/pond" element={<PondPage />} />

        {/* Logined admin*/}
        <Route path="/farm-management" element={<FarmManagementPage />} />
        <Route path="/field-pond-management" element={<FieldPondManagementPage />} />
        <Route path="/station-management" element={<StationManagementPage />} />
        <Route path="/sensor-management" element={<SensorManagementPage />} />
        <Route path="/device-management" element={<DeviceManagementPage />} />
        <Route path="/microcontroller-management" element={<MicroControllerManagementPage />} />
      </Route>
    </RouterRoutes>
  )
}
