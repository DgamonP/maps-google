import React from 'react';
import { connect } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';
import { Redirect, Route, Switch } from 'react-router-dom';

import HomeScreen from '../screens/home/HomeScreen';

import OpportunitiesDetails from '../screens/opportunity/OpportunitiesDetails';
import OpportunitiesScreen from '../screens/opportunity/OpportunitiesScreen';

import OperationScreen from '../screens/operation/OperationScreen';
import OperationCreate from '../screens/operation/OperationCreate';
import OperationDetails from '../screens/operation/OperationDetails';
import OperationUpdate from '../screens/operation/OperationUpdate';

import OperatorScreen from '../screens/operator/OperatorScreen';
import OperatorRegister from '../screens/operator/OperatorCreate';
import OperatorUpdate from '../screens/operator/OperatorUpdate';
import OperatorRoles from '../screens/operator/OperatorRoles';

import BenefitScreen from '../screens/benefits/BenefitScreen';
import BenefitFrom from '../screens/benefits/BenefitFrom';

import CompanyScreen from '../screens/company/CompanyScreen';
import CompanyFrom from '../screens/company/CompanyFrom';

import NewScreen from '../screens/news/NewScreen';
import NewFrom from '../screens/news/NewFrom';

import RouteScreen from '../screens/routes/RouteScreen';
import RouteForm from '../screens/routes/RouteForm';

import ProfileScreen from '../screens/profile/ProfileScreen';
import ProfileUpdate from '../screens/profile/ProfileUpdate';

import ClientScreen from '../screens/client/ClientScreen';
import ClientUpdate from '../screens/client/ClientUpdate';
import ClientRoles from '../screens/client/ClientRoles';
import ClientRegister from '../screens/client/ClientCreate';

import LoadOrderDetails from '../screens/loadOrder/LoadOrderDetails';
import LoadOrderCreate from '../screens/loadOrder/LoadOrderCreate';
import LoadOrderUpdate from '../screens/loadOrder/LoadOrderUpdate';
import LoadingOrderCreate from '../screens/loadOrder/LoadingOrderCreate';

import FeaturesScreen from '../screens/features/featuresScreen';
import FeatureFrom from '../screens/features/featureFrom';

import PlaceScreen from '../screens/place/placeScreen';
import PlaceFrom from '../screens/place/placeFrom';

import CityScreen from '../screens/city/CityScreen';
import CityDetails from '../screens/city/CityDetails';

import TaskScreen from '../screens/task/TaskScreen';
import BrandScreen from '../screens/brand/BrandScreen';
import CategoryScreen from '../screens/category/CategoryScreen';
import TypeServicesScreen from '../screens/typeServices/typeServicesScreen';
import DispatchTypeScreen from '../screens/dispatchType/DispatchTypeScreen';
import BoardingModeScreen from '../screens/boardingMode/BoardingModeScreen';
import MeasurementUnitScreen from '../screens/measurementUnit/MeasurementUnitScreen';

import TypeTransportUnitScreen from '../screens/typeTransportUnit/TypeTransportUnitScreen';
import TypeTransportUnitDetails from '../screens/typeTransportUnit/TypeTransportUnitDetails';
import TypeTransportUnitCreate from '../screens/typeTransportUnit/TypeTransportUnitCreate';
import TypeTransportUnitUpdate from '../screens/typeTransportUnit/TypeTransportUnitUpdate';

import StagesTemplateScreen from '../screens/stagesTemplate/StagesTemplateScreen';
import StagesTemplateDetails from '../screens/stagesTemplate/StagesTemplateDetails';
import StagesTemplateCreate from '../screens/stagesTemplate/StagesTemplateCreate';
import StagesTemplateAddTasks from '../screens/stagesTemplate/StagesTemplateAddTasks';
import StagesTemplateUpdate from '../screens/stagesTemplate/StagesTemplateUpdate';

import BasicTypeTransportUnitScreen from '../screens/basicTypeTransportUnit/BasicTypeTransportUnitScreen';
import BasicTypeTransportUnit from '../screens/basicTypeTransportUnit/BasicTypeTransportUnit';

const HomeRoute = (props) => {
  const { loggedIn } = props;

  if (loggedIn) {
    return (
      <Switch>
        <Route exact path={'/'} render={(props) => <HomeScreen {...props} />} />
        {/* <Route exact path={'/clientRegister'} render={(props) => <ClientRegister {...props} />} /> */}

        <Route exact path={'/operation'} render={(props) => <OperationScreen {...props} />} />
        <Route
          exact
          path={'/operation/create'}
          render={(props) => <OperationCreate {...props} />}
        />
        <Route
          exact
          path={'/operation/show/:operationId'}
          render={(props) => <OperationDetails {...props} />}
        />
        <Route
          exact
          path={'/operation/update/:operationId'}
          render={(props) => <OperationUpdate {...props} />}
        />
        <Route
          exact
          path={'/operation/:operationId/loadOrder/create'}
          render={(props) => <LoadOrderCreate {...props} />}
        />

        <Route exact path={'/company'} render={(props) => <CompanyScreen {...props} />} />
        <Route exact path={'/company/create'} render={(props) => <CompanyFrom {...props} />} />
        <Route
          exact
          path={'/company/update/:companyId'}
          render={(props) => <CompanyFrom {...props} />}
        />

        <Route exact path={'/operator'} render={(props) => <OperatorScreen {...props} />} />
        <Route
          exact
          path={'/operator/create'}
          render={(props) => <OperatorRegister {...props} />}
        />
        <Route
          exact
          path={'/operator/update/:operatorId'}
          render={(props) => <OperatorUpdate {...props} />}
        />
        <Route
          exact
          path={'/operator/roles/:operatorId'}
          render={(props) => <OperatorRoles {...props} />}
        />

        <Route exact path={'/clients'} render={(props) => <ClientScreen {...props} />} />
        <Route exact path={'/clients/create'} render={(props) => <ClientRegister {...props} />} />
        <Route
          exact
          path={'/clients/edit/:clientId'}
          render={(props) => <ClientUpdate {...props} />}
        />
        <Route
          exact
          path={'/clients/roles/:clientId'}
          render={(props) => <ClientRoles {...props} />}
        />

        <Route
          exact
          path={'/opportunities'}
          render={(props) => <OpportunitiesScreen {...props} />}
        />
        <Route
          exact
          path={'/opportunities/:opportunitiesId'}
          render={(props) => <OpportunitiesDetails {...props} />}
        />

        <Route exact path={'/profile'} render={(props) => <ProfileScreen {...props} />} />
        <Route exact path={'/profileUpdate'} render={(props) => <ProfileUpdate {...props} />} />

        <Route
          exact
          path={'/loadOrder/show/:loadOrderId'}
          render={(props) => <LoadOrderDetails {...props} />}
        />
        <Route
          exact
          path={'/loadOrder/update/:loadOrderId'}
          render={(props) => <LoadOrderUpdate {...props} />}
        />
        <Route
          exact
          path={'/travel/:travelId/loadingOrder/create'}
          render={(props) => <LoadingOrderCreate {...props} />}
        />

        <Route exact path={'/task'} render={(props) => <TaskScreen {...props} />} />
        <Route exact path={'/brand'} render={(props) => <BrandScreen {...props} />} />
        <Route exact path={'/category'} render={(props) => <CategoryScreen {...props} />} />
        <Route exact path={'/typeServices'} render={(props) => <TypeServicesScreen {...props} />} />
        <Route exact path={'/dispatchType'} render={(props) => <DispatchTypeScreen {...props} />} />
        <Route exact path={'/boardingMode'} render={(props) => <BoardingModeScreen {...props} />} />
        <Route
          exact
          path={'/measurementUnit'}
          render={(props) => <MeasurementUnitScreen {...props} />}
        />

        <Route exact path={'/features'} render={(props) => <FeaturesScreen {...props} />} />
        <Route exact path={'/features/create'} render={(props) => <FeatureFrom {...props} />} />
        <Route
          exact
          path={'/features/update/:featureId'}
          render={(props) => <FeatureFrom {...props} />}
        />

        <Route exact path={'/places'} render={(props) => <PlaceScreen {...props} />} />
        <Route exact path={'/places/create'} render={(props) => <PlaceFrom {...props} />} />
        <Route
          exact
          path={'/places/update/:placeId'}
          render={(props) => <PlaceFrom {...props} />}
        />
        <Route exact path={'/city/create'} render={(props) => <CityDetails {...props} />} />
        <Route exact path={'/city'} render={(props) => <CityScreen {...props} />} />
        <Route exact path={'/city/show/:cityId'} render={(props) => <CityDetails {...props} />} />

        <Route
          exact
          path={'/typeTransportUnit'}
          render={(props) => <TypeTransportUnitScreen {...props} />}
        />
        <Route
          exact
          path={'/typeTransportUnit/show/:typeTransportUnitId'}
          render={(props) => <TypeTransportUnitDetails {...props} />}
        />
        <Route
          exact
          path={'/typeTransportUnit/create'}
          render={(props) => <TypeTransportUnitCreate {...props} />}
        />
        <Route
          exact
          path={'/typeTransportUnit/:typeTransportUnitId/update'}
          render={(props) => <TypeTransportUnitUpdate {...props} />}
        />

        <Route exact path={'/news'} render={(props) => <NewScreen {...props} />} />
        <Route exact path={'/news/create'} render={(props) => <NewFrom {...props} />} />
        <Route exact path={'/news/update/:newId'} render={(props) => <NewFrom {...props} />} />

        <Route exact path={'/routes'} render={(props) => <RouteScreen {...props} />} />
        <Route exact path={'/routes/create'} render={(props) => <RouteForm {...props} />} />
        <Route exact path={'/routes/update/:newId'} render={(props) => <RouteForm {...props} />} />

        <Route exact path={'/benefits'} render={(props) => <BenefitScreen {...props} />} />
        <Route exact path={'/benefits/create'} render={(props) => <BenefitFrom {...props} />} />
        <Route
          exact
          path={'/benefits/update/:benefitId'}
          render={(props) => <BenefitFrom {...props} />}
        />

        <Route
          exact
          path={'/stagesTemplate'}
          render={(props) => <StagesTemplateScreen {...props} />}
        />
        <Route
          exact
          path={'/stagesTemplate/show/:dispatchTypeId/:typeServiceId/:placeId'}
          render={(props) => <StagesTemplateDetails {...props} />}
        />
        <Route
          exact
          path={'/stagesTemplate/create'}
          render={(props) => <StagesTemplateCreate {...props} />}
        />
        <Route
          exact
          path={'/stagesTemplate/addTasks/:stageTemplateId'}
          render={(props) => <StagesTemplateAddTasks {...props} />}
        />
        <Route
          exact
          path={'/stagesTemplate/update/:dispatchTypeId/:typeServiceId/:placeId'}
          render={(props) => <StagesTemplateUpdate {...props} />}
        />

        <Route
          exact
          path={'/basicTypeTransportUnit'}
          render={(props) => <BasicTypeTransportUnitScreen {...props} />}
        />
        <Route
          exact
          path={'/basicTypeTransportUnit/create'}
          render={(props) => <BasicTypeTransportUnit {...props} />}
        />
        <Route
          exact
          path={'/basicTypeTransportUnit/update/:basicTypeTransportUnitId'}
          render={(props) => <BasicTypeTransportUnit {...props} />}
        />

        <Redirect to={'/login'} />
      </Switch>
    );
  } else {
    return (
      <Grid container justify='center' alignItems='center' style={{ height: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }
};

const mapStateToProps = (state) => {
  const { userType, loggedIn } = state.auth;
  return { userType, loggedIn };
};

export default connect(mapStateToProps, null)(HomeRoute);
