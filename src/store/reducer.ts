import { combineReducers } from "redux";
import menuReducer from "./menu/reducer";
import damsReducer from "./dam/reducer";
import stationsReducer from "./station/reducer";
import camerasReducer from "./camera/reducer";
import thingsReducer from './thing/reducer';
import observationReducer from './observation/reducer';
import markersReducer from './marker/reducer';
import devicesReducer from './device/reducer';
import sensorReducer from './sensor/reducer';

// API old
import domainReducer_old from './old/domains/reducer';
import stationReducer_old from './old/stations/reducer';
import sensorReducer_old from './old/sensors/reducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  menu: menuReducer,
  dam: damsReducer,
  
  thing:thingsReducer,
  camera: camerasReducer,
  station: stationsReducer,
  marker:markersReducer,
  observation:observationReducer,
  device:devicesReducer,
  sensor:sensorReducer,

  domains_old:domainReducer_old,
  station_old: stationReducer_old,
  sensors_old:sensorReducer_old,
});
export default reducer;
