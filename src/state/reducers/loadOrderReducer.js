import { loadOrderConstants } from '../constants';

const initialState = {
  loading: false,
  loadOrders: [],
  travel: null,
  res: null,
  loadingAction: false,
  success: false,
  checkpoints: [],
  data: null,
};

export const loadOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case loadOrderConstants.LOAD:
      return {
        ...state,
        data: {
          dates: {
            loadingDate: '2021-07-16T19:10:00.000Z',
            deliveryDate: '2021-07-21T19:10:00.000Z',
          },
          volumeUnitValue: '50',
          volumeUnit: {
            account: {
              enable: true,
              createDate: '2021-07-15T19:10:49.960Z',
            },
            _id: '60b4fb7bb1fca90008ffb55e',
            name: 'Metros cúbicos',
            abbreviation: 'm3',
            type: 'Volumen',
            companyId: '60ad411f1e97db0008a2e606',
          },
          weightUnitValue: '12',
          weightUnit: {
            account: {
              enable: true,
              createDate: '2021-07-15T19:10:49.960Z',
            },
            _id: '60b4fb8fb1fca90008ffb55f',
            name: 'Tonelada',
            abbreviation: 'Tn',
            type: 'Peso',
            companyId: '60ad411f1e97db0008a2e606',
          },
          categoryLoad: {
            account: {
              enable: true,
              createDate: '2021-07-14T14:04:48.280Z',
            },
            _id: '60eeef00d18a5a0008d62509',
            name: 'Equipo Petrolero',
            companyId: '60ad411f1e97db0008a2e606',
          },
          boardingMode: {
            account: {
              enable: false,
              disableDate: '2021-07-14T17:10:25.000Z',
              createDate: '2021-07-15T19:10:50.328Z',
            },
            _id: '60b112e6b071630009330f0c',
            name: 'Consolidado',
            companyId: '60ad411f1e97db0008a2e606',
          },
          freightValues: {
            clientFreight: {
              freightValue: '3500',
              typeCurrencyFreightId: '60ba32da3b89740008211b53',
              invoice: true,
            },
            freightOffered: {
              value: '3000',
              typeCurrencyOfferedId: '60ba32da3b89740008211b53',
              invoice: true,
            },
          },
          typeTransportUnitLabel: 'Camion abierto',
          origin: {
            _id: '60ef77e7619d0400083b8382',
            name: 'Santa Cruz',
            itemValue: 'Santa Cruz, Bolivia',
            cities: [
              {
                _id: '60ef77e7619d0400083b8383',
                name: 'Santa Cruz de la Sierra',
              },
              {
                _id: '60ef77e7619d0400083b8384',
                name: 'Montero',
              },
              {
                _id: '60ef77e7619d0400083b8385',
                name: 'La Guardia',
              },
              {
                _id: '60ef77e7619d0400083b8386',
                name: 'Warnes',
              },
            ],
            PlaceId: '60ef77e7619d0400083b8381',
          },
          directionOrigin: 'Av. Brasil',
          originCity: {
            _id: '60ef77e7619d0400083b8383',
            name: 'Santa Cruz de la Sierra',
          },
          destination: {
            _id: '60ef77e7619d0400083b8382',
            name: 'Santa Cruz',
            cities: [
              {
                _id: '60ef77e7619d0400083b8383',
                name: 'Santa Cruz de la Sierra',
              },
              {
                _id: '60ef77e7619d0400083b8384',
                name: 'Montero',
              },
              {
                _id: '60ef77e7619d0400083b8385',
                name: 'La Guardia',
              },
              {
                _id: '60ef77e7619d0400083b8386',
                name: 'Warnes',
              },
            ],
            PlaceId: '60ef77e7619d0400083b8381',
          },
          directionDestination: 'Av Buenos Aires',
          destinationCity: {
            _id: '60ef77e7619d0400083b8383',
            name: 'Santa Cruz de la Sierra',
          },
        },
      };
    case loadOrderConstants.LOAD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case loadOrderConstants.LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: null,
      };
    case loadOrderConstants.LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.error,
      };
    case loadOrderConstants.LIST_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        data: null,
      };
    case loadOrderConstants.LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loadOrders: action.loadOrders,
        error: null,
      };
    case loadOrderConstants.LIST_FAILURE:
      return {
        ...state,
        loading: false,
        loadOrders: [],
        error: action.error,
      };
    case loadOrderConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case loadOrderConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        travel: action.travel,
        error: null,
      };
    case loadOrderConstants.GETBYID_FAILURE:
      return {
        ...state,
        loading: false,
        travel: null,
        error: action.error,
      };
    case loadOrderConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case loadOrderConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case loadOrderConstants.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case loadOrderConstants.PUBLISH_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case loadOrderConstants.PUBLISH_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        success: true,
        res: action.res,
        error: null,
      };
    case loadOrderConstants.PUBLISH_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case loadOrderConstants.LOADING_ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case loadOrderConstants.LOADING_ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case loadOrderConstants.LOADING_ORDER_CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case loadOrderConstants.LIQUIDATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case loadOrderConstants.LIQUIDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case loadOrderConstants.LIQUIDATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case loadOrderConstants.CHECKPOINTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case loadOrderConstants.CHECKPOINTS_SUCCESS:
      return {
        ...state,
        loading: false,
        checkpoints: action.checkpoints,
        error: null,
      };
    case loadOrderConstants.CHECKPOINTS_FAILURE:
      return {
        ...state,
        loading: false,
        checkpoints: null,
        error: action.error,
      };
    case loadOrderConstants.OFF_SUCCESS:
      return {
        ...state,
        success: false,
      };
    case loadOrderConstants.LOADING_ORDER_CREATE_DIRECT_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case loadOrderConstants.LOADING_ORDER_CREATE_DIRECT_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case loadOrderConstants.LOADING_ORDER_CREATE_DIRECT_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    default:
      return state;
  }
};
