import { combineReducers } from "redux";

import menuReducer from "./menu/reducer";
import damsReducer from "./dam/reducer";
import stationsReducer from "./station/reducer";
import thingsReducer from './thing/reducer';
import observationReducer from './observation/reducer';
import markersReducer from './marker/reducer';
import devicesReducer from './device/reducer';
import sensorReducer from './sensor/reducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  menu: menuReducer,
  dam: damsReducer,
  thing:thingsReducer,
  station: stationsReducer,
  marker:markersReducer,
  observation:observationReducer,
  device:devicesReducer,
  sensor:sensorReducer,
});
export default reducer;
