export const BASE_URL = 'https://360cubes.com/ryder_staging/public/'; // developer

// export const BASE_URL = 'http://3.14.28.243/admin_panel/public/'; // live after backend correct

// export const BASE_URL = "http://192.168.2.49:8000";
export const IMAGE_BASE_URL = `${BASE_URL}/uploads/user/`;
export const API_USER_NAME = '';
export const API_PASSWORD = '';
export const API_TIMEOUT = 30000;

export const APPLICATION_TOKEN = 'api.Pd*!(5675';

export const API = '/api/';

export const API_LOGIN = `${API}passenger/login`;
// export const FAQ = `${BASE_URL}api/driver/helps`;
export const API_SIGNUP = `${API}passenger/create`;
export const API_FORGOT_PASSWORD = `${API}passenger/forgot/password`;
export const API_PROFILE = `${API}passenger/detail`;
export const API_PROFILE_UPDATE = `${API}passenger/update`;
export const API_CHANGE_PASSWORD = `${API}passenger/change/password`;

export const SCHEDULED = `${BASE_URL}api/passenger/trips`;
export const ADD_STRIPE = `${BASE_URL}api/user/add-stripe-card`;
export const GET_STRIPE = `${BASE_URL}api/user/get-user-card`;
export const DELETE_STRIPE = `${BASE_URL}api/user/delete-user-card`; // demo
export const DEFAULT_CARD = `${BASE_URL}api/user/make-default-card`;
// export const HISTORY = `${BASE_URL}api/user/trips`;
export const HISTORY = `${BASE_URL}api/passenger/trips`;
// export const HISTORY = `${BASE_URL}api/passenger/trips?range_from=2019-06-19`;
export const NOTIFICATION = `${BASE_URL}api/notification/list`;
export const API_PAYNOW = `${API}user/charge`;
export const API_PAY_NEGATIVE_CHARGE = `${API}user/negative_charge`;

export const PRIVACY_POLICY = `${BASE_URL}getContents?id=9`;
export const TERM_CONDITION = `${BASE_URL}getContents?id=8`;
export const HELP = `${BASE_URL}getContents?id=3`;
export const ABOUT_US = `${BASE_URL}getContents?id=5`;
export const FAQ = `${BASE_URL}getContents?id=10`;
export const TRIP_DETAILS = `${BASE_URL}api/driver/tripDetail`;
// Socket URL

// export const SOCKET_URL = "http://192.168.2.99"; //local
export const SOCKET_URL = 'http://192.34.60.217'; // developer
// export const SOCKET_URL = 'http://3.14.28.243'; // live ;
export const SOCKET_PORT = '8007';

export const BASE_URL_SOCKET = `${SOCKET_URL}:${SOCKET_PORT}`;
export const API_DRIVER_SOKECT_LOGIN = 'GetAccessToken';
// export const  = `${BASE_URL}terms-conditions`;
export const API_GETPASSENGERLOCATION = 'RecentLocations';
export const API_GETALLVEHICLETYPES = 'GetAllVehicleTypes';
export const API_NEARBYWITHVEHICLETYPE = 'NearByWithVehicleType';
export const API_PAYNOW_SOCKET = 'PayNow';

export const API_CALCULATEESTIMATEFARE = 'CalculateEstimateFare';
export const API_REQUESTRIDE = 'RequestRide';
export const API_PASSENGER_CANCEL_RIDE = 'PassengerRejectDrive';
export const API_RIDE_RATING = 'AddRate';

//SOCKETS ON's ONLY from driver side
export const API_DRIVER_COMPLETED_RIDE = 'CompleteRide';
export const API_DRIVER_STARTED_RIDE = 'StartRide';
export const API_DRIVER_CANCEL_RIDE = 'DriverCancelRide';
export const API_LOG = false;
export const API_APP_STATUS = 'app_status';

//Google API Requests
export const GOOGLE_MAP_BASE_URL = 'https://maps.googleapis.com/maps/api/';
export const API_AUTOCOMPLETE = 'place/autocomplete/json';
export const API_GEOCODE = 'geocode/json';
export const API_NEARBY = 'place/nearbysearch/json';
export const API_DIRECTION = 'directions/json';
export const API_DISTANCEMATRIX = 'distancematrix/json';

export const ERROR_REQUEST_TIMEOUT = {
  error: 1,
  title: 'Request taking too much time',
  message:
    'We are sorry. It seems like something went wrong with your Internet connection',
};
export const ERROR_SERVER_CONNECTION = {
  error: 1,
  title: 'Connection Error',
  message: 'Server not available, bad dns.',
};
export const ERROR_REQUEST_CANCEL = {
  error: 1,
  title: 'Request Canceled',
  message: 'You have canceled request.',
};
export const ERROR_NETWORK_NOT_AVAILABLE = {
  error: 1,
  title: 'Network not available',
  message: 'Make sure wi-fi or celluar data is turned on',
};
export const ERROR_SOMETHING_WENT_WRONG = {
  error: 1,
  title: 'Whoops',
  message: 'Looks like something went wrong.',
};
export const ERROR_CLIENT = {
  error: 1,
  title: 'Whoops',
  message: 'Looks like we did something went wrong.',
};

// Google Api Error

export const REQUEST_DENIED = {
  error: 1,
  title: 'Whoops',
  message: 'Looks like we did something went wrong.',
};

export const UNKNOWN_ERROR = {
  error: 1,
  title: 'Whoops',
  message: 'Looks like we did something went wrong.',
};

export const INVALID_REQUEST = {
  error: 1,
  title: 'Whoops',
  message: 'Looks like we did something went wrong.',
};
