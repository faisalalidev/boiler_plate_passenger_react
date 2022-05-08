import _ from 'lodash';
import moment from 'moment';
import {Platform, Share, Linking, Alert, Keyboard} from 'react-native';
import {MessageBarManager} from 'react-native-message-bar';
import {TIME_ZONE, DAY_DATE_FORMAT, DATE_FORMAT} from '../constants';
import {BASE_URL} from '../config/WebService';
import haversine from 'haversine';

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

let deviceToken;
let userToken;
let socketAccessToken;
let user_id;
let socketRef;
class Util {
  isEmpty = value => _.isEmpty(value);
  keyExtractor = (item, index) => index;
  getPlatform = () => Platform.OS;
  isPlatformAndroid = () => Platform.OS === 'android';

  setSocketRef(ref) {
    socketRef = ref;
  }
  getSocketRef() {
    return socketRef;
  }

  keyboardDismiss() {
    return Keyboard.dismiss();
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  setDeviceToken(token: String) {
    deviceToken = token;
  }
  getDeviceToken() {
    return deviceToken;
  }

  setSocketAccessToken(accessToken) {
    socketAccessToken = accessToken;
  }
  getSocketAccessToken() {
    return socketAccessToken;
  }
  setUserIDFromSocket(UserIDFromSocket) {
    user_id = UserIDFromSocket;
  }
  getUserIDFromSocket() {
    return user_id;
  }

  onShare = (title, message) => {
    Share.share({
      title,
      message,
    });
  };

  noInternetMessage = () => {
    MessageBarManager.showAlert({
      title: 'No Internet Connection Found',
      message: 'Make sure wi-fi or celluar data is turned on',
      alertType: 'error',
    });
  };

  MessageAlertError = (title, message) => {
    MessageBarManager.showAlert({
      title,
      message,
      alertType: 'error',
      viewTopInset: 15,
    });
  };

  MessageAlertSuccess = (title, message) => {
    MessageBarManager.showAlert({
      title,
      message,
      alertType: 'success',
    });
  };

  removeWhiteSpaces(value) {
    return value.replace(/^\s+|\s+$/gm, '');
  }
  lineCounter(value = '') {
    return value.split(/\r\n|\r|\n/).length;
  }
  getCurrentDayDate() {
    return moment(Date.now()).format(DATE_FORMAT);
  }

  getCurrentDate() {
    return moment(Date.now()).format(DAY_DATE_FORMAT);
  }

  getDateFrom(givenDate) {
    return moment(givenDate)
      .add(TIME_ZONE, 'hours')
      .fromNow();
  }
  // dateFormatHandler(date) {
  //   console.log("DATATATATATATATATAT", date)
  //   let getDate = moment(date).calendar();
  //   if (getDate.indexOf("Today") != -1) {
  //     return "Today";
  //   } else if (getDate.indexOf("Yesterday") != -1) {
  //     return "Yesterday";
  //   } else {
  //     return moment(date).format("DD MMM YYYY");
  //   }
  // }

  dateFormatHandler(date) {
    var GetDate = new Date(date).toDateString();
    var NewDate = new Date().toDateString();
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() - 1);
    tomorrow = new Date(tomorrow).toDateString();
    if (GetDate === NewDate) {
      return 'Today';
    } else if (GetDate === tomorrow) {
      return 'Yesterday';
    } else {
      return date;
    }
  }

  howLongAgo(milliseconds) {
    let ago = moment(milliseconds).fromNow();
    if (ago.indexOf('seconds') !== -1) {
      return ago.replace('seconds', 's');
    } else if (ago.indexOf('minutes') !== -1) {
      return ago.replace(' minutes', 'm');
    } else if (ago.indexOf('hours') !== -1) {
      return ago.replace(' hours', 'h');
    } else if (ago.indexOf('days') !== -1) {
      return ago.replace(' days', 'd');
    } else if (ago.indexOf('weeks') !== -1) {
      return ago.replace(' weeks', 'w');
    } else if (ago.indexOf('months') !== -1) {
      return ago.replace(' months', 'M');
    } else if (ago.indexOf('years') !== -1) {
      return ago.replace(' years', 'y');
    }
  }
  COUNTRIES = [
    {
      value: 1,
      label: 'Afghanistan',
    },
    {
      value: 2,
      label: 'Albania',
    },
    {
      value: 3,
      label: 'Algeria',
    },
    {
      value: 4,
      label: 'American Samoa',
    },
    {
      value: 5,
      label: 'Andorra',
    },
    {
      value: 6,
      label: 'Angola',
    },
    {
      value: 7,
      label: 'Anguilla',
    },
    {
      value: 8,
      label: 'Antarctica',
    },
    {
      value: 9,
      label: 'Antigua and Barbuda',
    },
    {
      value: 10,
      label: 'Argentina',
    },
    {
      value: 11,
      label: 'Armenia',
    },
    {
      value: 12,
      label: 'Aruba',
    },
    {
      value: 13,
      label: 'Ashmore and Cartier',
    },
    {
      value: 14,
      label: 'Australia',
    },
    {
      value: 15,
      label: 'Austria',
    },
    {
      value: 16,
      label: 'Azerbaijan',
    },
    {
      value: 17,
      label: 'The Bahamas',
    },
    {
      value: 18,
      label: 'Bahrain',
    },
    {
      value: 19,
      label: 'Baker Island',
    },
    {
      value: 20,
      label: 'Bangladesh',
    },
    {
      value: 21,
      label: 'Barbados',
    },
    {
      value: 22,
      label: 'Bassas da India',
    },
    {
      value: 23,
      label: 'Belarus',
    },
    {
      value: 24,
      label: 'Belgium',
    },
    {
      value: 25,
      label: 'Belize',
    },
    {
      value: 26,
      label: 'Benin',
    },
    {
      value: 27,
      label: 'Bermuda',
    },
    {
      value: 28,
      label: 'Bhutan',
    },
    {
      value: 29,
      label: 'Bolivia',
    },
    {
      value: 30,
      label: 'Bosnia and Herzegovina',
    },
    {
      value: 31,
      label: 'Botswana',
    },
    {
      value: 32,
      label: 'Bouvet Island',
    },
    {
      value: 33,
      label: 'Brazil',
    },
    {
      value: 34,
      label: 'British Indian Ocean Territory',
    },
    {
      value: 35,
      label: 'British Virgin Islands',
    },
    {
      value: 36,
      label: 'Brunei Darussalam',
    },
    {
      value: 37,
      label: 'Bulgaria',
    },
    {
      value: 38,
      label: 'Burkina Faso',
    },
    {
      value: 39,
      label: 'Burma',
    },
    {
      value: 40,
      label: 'Burundi',
    },
    {
      value: 41,
      label: 'Cambodia',
    },
    {
      value: 42,
      label: 'Cameroon',
    },
    {
      value: 43,
      label: 'Canada',
    },
    {
      value: 44,
      label: 'Cape Verde',
    },
    {
      value: 45,
      label: 'Cayman Islands',
    },
    {
      value: 46,
      label: 'Central African Republic',
    },
    {
      value: 47,
      label: 'Chad',
    },
    {
      value: 48,
      label: 'Chile',
    },
    {
      value: 49,
      label: 'China',
    },
    {
      value: 50,
      label: 'Christmas Island',
    },
    {
      value: 51,
      label: 'Clipperton Island',
    },
    {
      value: 52,
      label: 'Cocos (Keeling) Islands',
    },
    {
      value: 53,
      label: 'Colombia',
    },
    {
      value: 54,
      label: 'Comoros',
    },
    {
      value: 55,
      label: 'Congo, Democratic Republic of the',
    },
    {
      value: 56,
      label: 'Congo, Republic of the',
    },
    {
      value: 57,
      label: 'Cook Islands',
    },
    {
      value: 58,
      label: 'Coral Sea Islands',
    },
    {
      value: 59,
      label: 'Costa Rica',
    },
    {
      value: 60,
      label: "Cote d'Ivoire",
    },
    {
      value: 61,
      label: 'Croatia',
    },
    {
      value: 62,
      label: 'Cuba',
    },
    {
      value: 63,
      label: 'Cyprus',
    },
    {
      value: 64,
      label: 'Czech Republic',
    },
    {
      value: 65,
      label: 'Denmark',
    },
    {
      value: 66,
      label: 'Djibouti',
    },
    {
      value: 67,
      label: 'Dominica',
    },
    {
      value: 68,
      label: 'Dominican Republic',
    },
    {
      value: 69,
      label: 'East Timor',
    },
    {
      value: 70,
      label: 'Ecuador',
    },
    {
      value: 71,
      label: 'Egypt',
    },
    {
      value: 72,
      label: 'El Salvador',
    },
    {
      value: 73,
      label: 'Equatorial Guinea',
    },
    {
      value: 74,
      label: 'Eritrea',
    },
    {
      value: 75,
      label: 'Estonia',
    },
    {
      value: 76,
      label: 'Ethiopia',
    },
    {
      value: 77,
      label: 'Europa Island',
    },
    {
      value: 78,
      label: 'Falkland Islands (Islas Malvinas)',
    },
    {
      value: 79,
      label: 'Faroe Islands',
    },
    {
      value: 80,
      label: 'Fiji',
    },
    {
      value: 81,
      label: 'Finland',
    },
    {
      value: 82,
      label: 'France',
    },
    {
      value: 83,
      label: 'France, Metropolitan',
    },
    {
      value: 84,
      label: 'French Guiana',
    },
    {
      value: 85,
      label: 'French Polynesia',
    },
    {
      value: 86,
      label: 'French Southern and Antarctic Lands',
    },
    {
      value: 87,
      label: 'Gabon',
    },
    {
      value: 88,
      label: 'The Gambia',
    },
    {
      value: 89,
      label: 'Gaza Strip',
    },
    {
      value: 90,
      label: 'Georgia',
    },
    {
      value: 91,
      label: 'Germany',
    },
    {
      value: 92,
      label: 'Ghana',
    },
    {
      value: 93,
      label: 'Gibraltar',
    },
    {
      value: 94,
      label: 'Glorioso Islands',
    },
    {
      value: 95,
      label: 'Greece',
    },
    {
      value: 96,
      label: 'Greenland',
    },
    {
      value: 97,
      label: 'Grenada',
    },
    {
      value: 98,
      label: 'Guadeloupe',
    },
    {
      value: 99,
      label: 'Guam',
    },
    {
      value: 100,
      label: 'Guatemala',
    },
    {
      value: 101,
      label: 'Guernsey',
    },
    {
      value: 102,
      label: 'Guinea',
    },
    {
      value: 103,
      label: 'Guinea-Bissau',
    },
    {
      value: 104,
      label: 'Guyana',
    },
    {
      value: 105,
      label: 'Haiti',
    },
    {
      value: 106,
      label: 'Heard Island and McDonald Islands',
    },
    {
      value: 107,
      label: 'Holy See (Vatican City)',
    },
    {
      value: 108,
      label: 'Honduras',
    },
    {
      value: 109,
      label: 'Hong Kong (SAR)',
    },
    {
      value: 110,
      label: 'Howland Island',
    },
    {
      value: 111,
      label: 'Hungary',
    },
    {
      value: 112,
      label: 'Iceland',
    },
    {
      value: 113,
      label: 'India',
    },
    {
      value: 114,
      label: 'Indonesia',
    },
    {
      value: 115,
      label: 'Iran',
    },
    {
      value: 116,
      label: 'Iraq',
    },
    {
      value: 117,
      label: 'Ireland',
    },
    {
      value: 118,
      label: 'Israel',
    },
    {
      value: 119,
      label: 'Italy',
    },
    {
      value: 120,
      label: 'Jamaica',
    },
    {
      value: 121,
      label: 'Jan Mayen',
    },
    {
      value: 122,
      label: 'Japan',
    },
    {
      value: 123,
      label: 'Jarvis Island',
    },
    {
      value: 124,
      label: 'Jersey',
    },
    {
      value: 125,
      label: 'Johnston Atoll',
    },
    {
      value: 126,
      label: 'Jordan',
    },
    {
      value: 127,
      label: 'Juan de Nova Island',
    },
    {
      value: 128,
      label: 'Kazakhstan',
    },
    {
      value: 129,
      label: 'Kenya',
    },
    {
      value: 130,
      label: 'Kingman Reef',
    },
    {
      value: 131,
      label: 'Kiribati',
    },
    {
      value: 132,
      label: 'Korea, North',
    },
    {
      value: 133,
      label: 'Korea, South',
    },
    {
      value: 134,
      label: 'Kuwait',
    },
    {
      value: 135,
      label: 'Kyrgyzstan',
    },
    {
      value: 136,
      label: 'Laos',
    },
    {
      value: 137,
      label: 'Latvia',
    },
    {
      value: 138,
      label: 'Lebanon',
    },
    {
      value: 139,
      label: 'Lesotho',
    },
    {
      value: 140,
      label: 'Liberia',
    },
    {
      value: 141,
      label: 'Libya',
    },
    {
      value: 142,
      label: 'Liechtenstein',
    },
    {
      value: 143,
      label: 'Lithuania',
    },
    {
      value: 144,
      label: 'Luxembourg',
    },
    {
      value: 145,
      label: 'Macao',
    },
    {
      value: 146,
      label: 'Macedonia, The Former Yugoslav Republic of',
    },
    {
      value: 147,
      label: 'Madagascar',
    },
    {
      value: 148,
      label: 'Malawi',
    },
    {
      value: 149,
      label: 'Malaysia',
    },
    {
      value: 150,
      label: 'Maldives',
    },
    {
      value: 151,
      label: 'Mali',
    },
    {
      value: 152,
      label: 'Malta',
    },
    {
      value: 153,
      label: 'Man, Isle of',
    },
    {
      value: 154,
      label: 'Marshall Islands',
    },
    {
      value: 155,
      label: 'Martinique',
    },
    {
      value: 156,
      label: 'Mauritania',
    },
    {
      value: 157,
      label: 'Mauritius',
    },
    {
      value: 158,
      label: 'Mayotte',
    },
    {
      value: 159,
      label: 'Mexico',
    },
    {
      value: 160,
      label: 'Micronesia, Federated States of',
    },
    {
      value: 161,
      label: 'Midway Islands',
    },
    {
      value: 162,
      label: 'Miscellaneous (French)',
    },
    {
      value: 163,
      label: 'Moldova',
    },
    {
      value: 164,
      label: 'Monaco',
    },
    {
      value: 165,
      label: 'Mongolia',
    },
    {
      value: 166,
      label: 'Montenegro',
    },
    {
      value: 167,
      label: 'Montserrat',
    },
    {
      value: 168,
      label: 'Morocco',
    },
    {
      value: 169,
      label: 'Mozambique',
    },
    {
      value: 170,
      label: 'Myanmar',
    },
    {
      value: 171,
      label: 'Namibia',
    },
    {
      value: 172,
      label: 'Nauru',
    },
    {
      value: 173,
      label: 'Navassa Island',
    },
    {
      value: 174,
      label: 'Nepal',
    },
    {
      value: 175,
      label: 'Netherlands',
    },
    {
      value: 176,
      label: 'Netherlands Antilles',
    },
    {
      value: 177,
      label: 'New Caledonia',
    },
    {
      value: 178,
      label: 'New Zealand',
    },
    {
      value: 179,
      label: 'Nicaragua',
    },
    {
      value: 180,
      label: 'Niger',
    },
    {
      value: 181,
      label: 'Nigeria',
    },
    {
      value: 182,
      label: 'Niue',
    },
    {
      value: 183,
      label: 'Norfolk Island',
    },
    {
      value: 184,
      label: 'Northern Mariana Islands',
    },
    {
      value: 185,
      label: 'Norway',
    },
    {
      value: 186,
      label: 'Oman',
    },
    {
      value: 187,
      label: 'Pakistan',
    },
    {
      value: 188,
      label: 'Palau',
    },
    {
      value: 189,
      label: 'Palmyra Atoll',
    },
    {
      value: 190,
      label: 'Panama',
    },
    {
      value: 191,
      label: 'Papua New Guinea',
    },
    {
      value: 192,
      label: 'Paracel Islands',
    },
    {
      value: 193,
      label: 'Paraguay',
    },
    {
      value: 194,
      label: 'Peru',
    },
    {
      value: 195,
      label: 'Philippines',
    },
    {
      value: 196,
      label: 'Pitcairn Islands',
    },
    {
      value: 197,
      label: 'Poland',
    },
    {
      value: 198,
      label: 'Portugal',
    },
    {
      value: 199,
      label: 'Puerto Rico',
    },
    {
      value: 200,
      label: 'Qatar',
    },
    {
      value: 201,
      label: 'Réunion',
    },
    {
      value: 202,
      label: 'Romania',
    },
    {
      value: 203,
      label: 'Russia',
    },
    {
      value: 204,
      label: 'Rwanda',
    },
    {
      value: 205,
      label: 'Saint Helena',
    },
    {
      value: 206,
      label: 'Saint Kitts and Nevis',
    },
    {
      value: 207,
      label: 'Saint Lucia',
    },
    {
      value: 208,
      label: 'Saint Pierre and Miquelon',
    },
    {
      value: 209,
      label: 'Saint Vincent and the Grenadines',
    },
    {
      value: 210,
      label: 'Samoa',
    },
    {
      value: 211,
      label: 'San Marino',
    },
    {
      value: 212,
      label: 'São Tomé and Príncipe',
    },
    {
      value: 213,
      label: 'Saudi Arabia',
    },
    {
      value: 214,
      label: 'Senegal',
    },
    {
      value: 215,
      label: 'Serbia',
    },
    {
      value: 216,
      label: 'Serbia and Montenegro',
    },
    {
      value: 217,
      label: 'Seychelles',
    },
    {
      value: 218,
      label: 'Sierra Leone',
    },
    {
      value: 219,
      label: 'Singapore',
    },
    {
      value: 220,
      label: 'Slovakia',
    },
    {
      value: 221,
      label: 'Slovenia',
    },
    {
      value: 222,
      label: 'Solomon Islands',
    },
    {
      value: 223,
      label: 'Somalia',
    },
    {
      value: 224,
      label: 'South Africa',
    },
    {
      value: 225,
      label: 'South Georgia and the South Sandwich Islands',
    },
    {
      value: 226,
      label: 'Spain',
    },
    {
      value: 227,
      label: 'Spratly Islands',
    },
    {
      value: 228,
      label: 'Sri Lanka',
    },
    {
      value: 229,
      label: 'Sudan',
    },
    {
      value: 230,
      label: 'Suriname',
    },
    {
      value: 231,
      label: 'Svalbard',
    },
    {
      value: 232,
      label: 'Swaziland',
    },
    {
      value: 233,
      label: 'Sweden',
    },
    {
      value: 234,
      label: 'Switzerland',
    },
    {
      value: 235,
      label: 'Syria',
    },
    {
      value: 236,
      label: 'Taiwan',
    },
    {
      value: 237,
      label: 'Tajikistan',
    },
    {
      value: 238,
      label: 'Tanzania',
    },
    {
      value: 239,
      label: 'Thailand',
    },
    {
      value: 240,
      label: 'Togo',
    },
    {
      value: 241,
      label: 'Tokelau',
    },
    {
      value: 242,
      label: 'Tonga',
    },
    {
      value: 243,
      label: 'Trinidad and Tobago',
    },
    {
      value: 244,
      label: 'Tromelin Island',
    },
    {
      value: 245,
      label: 'Tunisia',
    },
    {
      value: 246,
      label: 'Turkey',
    },
    {
      value: 247,
      label: 'Turkmenistan',
    },
    {
      value: 248,
      label: 'Turks and Caicos Islands',
    },
    {
      value: 249,
      label: 'Tuvalu',
    },
    {
      value: 250,
      label: 'Uganda',
    },
    {
      value: 251,
      label: 'Ukraine',
    },
    {
      value: 252,
      label: 'United Arab Emirates',
    },
    {
      value: 253,
      label: 'United Kingdom',
    },
    {
      value: 254,
      label: 'United States',
    },
    {
      value: 256,
      label: 'Uruguay',
    },
    {
      value: 257,
      label: 'Uzbekistan',
    },
    {
      value: 258,
      label: 'Vanuatu',
    },
    {
      value: 259,
      label: 'Venezuela',
    },
    {
      value: 260,
      label: 'Vietnam',
    },
    {
      value: 261,
      label: 'Virgin Islands',
    },
    {
      value: 262,
      label: 'Virgin Islands (UK)',
    },
    {
      value: 263,
      label: 'Virgin Islands (US)',
    },
    {
      value: 264,
      label: 'Wake Island',
    },
    {
      value: 265,
      label: 'Wallis and Futuna',
    },
    {
      value: 266,
      label: 'West Bank',
    },
    {
      value: 267,
      label: 'Western Sahara',
    },
    {
      value: 268,
      label: 'Western Samoa',
    },
    {
      value: 269,
      label: 'World',
    },
    {
      value: 270,
      label: 'Yemen',
    },
    {
      value: 271,
      label: 'Yugoslavia',
    },
    {
      value: 272,
      label: 'Zaire',
    },
    {
      value: 273,
      label: 'Zambia',
    },
    {
      value: 274,
      label: 'Zimbabwe',
    },
    {
      value: 275,
      label: 'Palestinian Territory, Occupied',
    },
  ];
  getLinking(googleUrl) {
    return Linking.canOpenURL(googleUrl).then(supported => {
      if (supported) {
        Linking.openURL(googleUrl);
      }
    });
  }

  setUserToken(token) {
    userToken = token;
  }
  getUserToken() {
    return userToken;
  }

  imageUrlConverter(image_url) {
    return `${BASE_URL}${image_url}`;
  }

  openCall(url) {
    return Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error('An error occurred', err));
  }
  // Converts from degrees to radians.
  toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  // Converts from radians to degrees.
  toDegrees(radians) {
    return (radians * 180) / Math.PI;
  }

  bearing(startLat, startLng, destLat, destLng) {
    startLat = this.toRadians(startLat);
    startLng = this.toRadians(startLng);
    destLat = this.toRadians(destLat);
    destLng = this.toRadians(destLng);

    y = Math.sin(destLng - startLng) * Math.cos(destLat);
    x =
      Math.cos(startLat) * Math.sin(destLat) -
      Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);

    brng = Math.atan2(y, x);
    brng = this.toDegrees(brng);
    return (brng + 360) % 360;
  }
  calcDistance = (prevLatLng, newLatLng) => {
    return haversine(prevLatLng, newLatLng) || 0;
  };
  millSeconds() {
    return moment().milliseconds();
  }
  data(data) {
    return data !== null || data !== undefined ? data : false;
  }
  EdgePadding = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  focusOnMapCoordinates(map, markers, edgePadding = this.EdgePadding) {
    options = {
      edgePadding: edgePadding,
      animated: true,
    };
    map.fitToCoordinates(markers, options);
  }
  animateToFirstLocationCentered = (map, points, duration = 2000) => {
    var minX, maxX, minY, maxY;
    // init first point
    (point => {
      minX = point.latitude;
      maxX = point.latitude;
      minY = point.longitude;
      maxY = point.longitude;
    })(points[0]);

    // calculate rect
    points.map(point => {
      minX = Math.min(minX, point.latitude);
      maxX = Math.max(maxX, point.latitude);
      minY = Math.min(minY, point.longitude);
      maxY = Math.max(maxY, point.longitude);
    });

    var midX = (minX + maxX) / 2;
    var midY = (minY + maxY) / 2;
    var midPoint = [midX, midY];

    var deltaX = maxX - minX;
    var deltaY = maxY - minY;
    map.animateToRegion(
      {
        latitude: points[0].latitude,
        longitude: points[0].longitude,
        latitudeDelta: deltaX * 2.5,
        longitudeDelta: deltaY * 2.5,
      },
      duration,
    );
  };
}

export default new Util();
