import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import { authReducer } from './authReducer';
import { basicTypeTransportUnitReducer } from './basicTypeTransportUnitReducer';
import { benefitReducer } from './benefitReducer';
import { boardingModeReducer } from './boardingModeReducer';
import { brandReducer } from './brandReducer';
import { categoryReducer } from './categoryReducer';
import { cityReducer } from './cityReducer';
import { clientReducer } from './clientReducer';
import { companyReducer } from './companyReducer';
import { dispatchTypeReducer } from './dispatchTypeReducer';
import { loadOrderReducer } from './loadOrderReducer';
import { loadOrderStatusReducer } from './loadOrderStatusReducer';
import { measurementUnitReducer } from './measurementUnitReducer';
import { moduleReducer } from './moduleReducer';
import { newReducer } from './newReducer';
import { notificationReducer } from './notificationReducer';
import { operationReducer } from './operationReducer';
import { operationStatusReducer } from './operationStatusReducer';
import { operatorReducer } from './operatorReducer';
import { placeReducer } from './placeReducer';
import { postulationReducer } from './postulationReducer';
import { profileReducer } from './profileReducer';
import { stageReducer } from './stageReducer';
import { stagesTemplateReducer } from './stagesTemplateReducer';
import { taskReducer } from './taskReducer';
import { transportUnitReducer } from './transportUnitReducer';
import { typeServiceReducer } from './typeServiceReducer';
import { featureReducer } from './featureReducer';
import { typeTransportUnitReducer } from './typeTransportUnitReducer';
import { mapsReducer } from './mapsReducer';
import { routesReducer } from './routesReducer';

import { authConstants } from '../constants';

const appReducer = combineReducers({
  auth: authReducer,
  basicTypeTransportUnit: basicTypeTransportUnitReducer,
  benefit: benefitReducer,
  boardingMode: boardingModeReducer,
  brand: brandReducer,
  category: categoryReducer,
  city: cityReducer,
  client: clientReducer,
  company: companyReducer,
  dispatchType: dispatchTypeReducer,
  feature: featureReducer,
  loadOrder: loadOrderReducer,
  loadOrderStatus: loadOrderStatusReducer,
  module: moduleReducer,
  measurementUnit: measurementUnitReducer,
  new: newReducer,
  notification: notificationReducer,
  operation: operationReducer,
  operationStatus: operationStatusReducer,
  operator: operatorReducer,
  place: placeReducer,
  postulation: postulationReducer,
  profile: profileReducer,
  stage: stageReducer,
  stagesTemplate: stagesTemplateReducer,
  task: taskReducer,
  transportUnit: transportUnitReducer,
  typeService: typeServiceReducer,
  typeTransportUnit: typeTransportUnitReducer,
  maps: mapsReducer,
  routes: routesReducer,
  form: reduxFormReducer, // mounted under "form"
});

/* los reductores devuelven el estado inicial cuando se los llama con undefinedel primer argumento,
 sin importar la acción */
export const rootReducer = (state, action) => {
  if (action.type === authConstants.LOGOUT) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
