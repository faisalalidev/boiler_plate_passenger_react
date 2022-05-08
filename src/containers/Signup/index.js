// @flow
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  View,
  Image,
  PermissionsAndroid,
  Alert,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageBackground,
  StatusBar,
  Platform,
} from 'react-native';
import {request as requestSignUp} from './SignUpAction';
import firebase from 'react-native-firebase';
import Notification from '../../services/Notification';
import {Images, Metrics, Fonts, Colors, Strings} from '../../theme';
import {
  Text,
  Loading,
  TextFieldBorder,
  BoldHeading,
  AppButton,
  ButtonView,
  ValidationText,
} from '../../components';
import styles from './styles';
import Utils from '../../util';
import {ERROR_NETWORK_NOT_AVAILABLE} from '../../config/WebService';
import _ from 'lodash';
import {TERM_CONDITION, PRIVACY_POLICY} from '../../config/WebService';
import MediaPicker from '../../services/MediaPicker';
import {push} from '../../services/NavigationService';

const driverProfile = ['driverProfileImage'];
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
      errors: {},
      user_token: false,
      driverProfileImageResponse: {},
      driverProfileImage: '',
      driverProfileImageStatus: true,
    };
  }

  componentDidMount() {
    Utils.keyboardDismiss();
    firebase
      .messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          this.setState({user_token: fcmToken});
          // user has a device token
        } else {
          // user doesn't have a device token yet
        }
      });
  }

  //   componentWillReceiveProps(nextProps) {
  //     console.log("nextProps willRe", nextProps);
  //     const newstateData = !_.isEmpty(nextProps.stateData)
  //       ? nextProps.stateData
  //       : [];
  //     const newcityData = !_.isEmpty(nextProps.cityData)
  //       ? nextProps.cityData
  //       : [];
  //     this.setState({ stateDateModal: newstateData, cityDateModal: newcityData });
  //   }

  // componentDidMount() {
  //   Utils.keyboardDismiss();
  // }

  _onFocus = () => {
    const {errors = {}} = this.state;

    // eslint-disable-next-line
    for (const name in errors) {
      const ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }

    this.setState({errors});
  };

  _submitSignUpForm = () => {
    const {
      driverProfileImageResponse,
      driverProfileImage,
      driverProfileImageStatus,
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
    } = this.state;

    const errors = {};
    let driverProfileImageStatusValid = true;
    let firstNameValid = true;
    let lastNameValid = true;
    let phoneNumberValid = true;
    let emailValid = true;
    let passwordValid = true;

    ['firstName', 'lastName', 'phoneNumber', 'email', 'password'].forEach(
      (name) => {
        const value = this.state[name];

        if (name === 'password') {
          if (value.length === 0) {
            passwordValid = false;
            errors[name] = Strings.VALIDATION.passwordField;
          } else if (value.length <= 5) {
            passwordValid = false;
            errors[name] = Strings.VALIDATION.password;
          }
        } else if (name === 'phoneNumber') {
          if (value.length === 0) {
            phoneNumberValid = false;
            errors[name] = Strings.VALIDATION.phoneNumber;
          }
        } else if (name === 'email') {
          if (value.length === 0) {
            emailValid = false;
            errors[name] = Strings.VALIDATION.email;
          } else if (!Utils.validateEmail(value)) {
            emailValid = false;
            errors[name] = Strings.VALIDATION.emailError;
          }
        } else if (name === 'firstName') {
          if (value.length === 0) {
            firstNameValid = false;
            errors[name] = Strings.VALIDATION.firstName;
          }
        } else if (name === 'lastName') {
          if (value.length === 0) {
            lastNameValid = false;
            errors[name] = Strings.VALIDATION.lastName;
          }
        }
        if (_.isEmpty(driverProfileImage)) {
          this.setState({driverProfileImageStatus: false});
          driverProfileImageStatusValid = false;
        }
      },
    );

    this.setState({errors});
    if (
      driverProfileImageStatusValid &&
      firstNameValid &&
      lastNameValid &&
      phoneNumberValid &&
      emailValid &&
      passwordValid
    ) {
      if (this.props.networkInfo) {
        const formData = new FormData();
        Notification.fcmToken((token) => {
          formData.append('first_name', firstName);
          formData.append('last_name', lastName);
          formData.append('mobile_no', phoneNumber);
          formData.append('email', email);
          formData.append('password', password);
          formData.append('image_url', driverProfileImageResponse);
          formData.append('device_token', token);
          formData.append('device_type', Platform.OS);
          // const payload = {
          //   first_name: firstName,
          //   last_name: lastName,
          //   mobile_no: phoneNumber,
          //   email,
          //   password,
          //   device_token: token,
          //   device_type: Platform.OS,
          //   image_url:driverProfileImageResponse
          // };
          this.props.requestSignUp(formData);
        });
      } else {
        Utils.MessageAlertError(
          ERROR_NETWORK_NOT_AVAILABLE.title,
          ERROR_NETWORK_NOT_AVAILABLE.message,
        );
      }
    }
  };

  _submitCheck = () => {
    const payload = {
      first_name: 'firstName',
      last_name: 'lastName',
      mobile_no: '1234',
      email: 'p@p.com',
      password: '123456',
      device_token: 'abcd',
      device_type: Platform.OS,
    };
    this.props.requestSignUp(payload);
  };
  _imagePicker = (data) => {
    MediaPicker.showImagePicker((response) => {
      if (response.uri) {
        if (data == driverProfile[0]) {
          const driverProfile = {
            uri: 'data:image/jpeg;base64,' + response.data,
          };
          const driverFile = {
            type: 'image/jpeg', //response.type
            name: 'file.jpg',
            // name: response.fileName,
            uri: response.uri,
          };
          console.log('Driver File  : ', driverFile);
          this.setState({
            driverProfileImage: driverProfile,
            driverProfileImageResponse: driverFile,
            driverProfileImageStatus: false, // validation pursose
          });
        }
        // else if (data == drivingLicense[0]) {
        //   const drivingLicenseFrontImage = {
        //     uri: "data:image/jpeg;base64," + response.data
        //   };
        //   const drivingLicenseFrontImageFile = {
        //     type: "image/jpeg", //response.type
        //     name: "file.jpg",
        //     uri: response.uri
        //   };
        //   this.setState({
        //     drivingLicenseFront: drivingLicenseFrontImage,
        //     drivingLicenseFrontResponse: drivingLicenseFrontImageFile,
        //     drivingLicenseFrontStatus: false
        //   });
        // } else if (data == drivingLicense[1]) {
        //   const drivingLicenseBackImage = {
        //     uri: "data:image/jpeg;base64," + response.data
        //   };
        //   const drivingLicenseBackImageFile = {
        //     type: "image/jpeg", //response.type
        //     name: "file.jpg",
        //     // name: response.fileName,
        //     uri: response.uri
        //   };
        //   this.setState({
        //     drivingLicenseBack: drivingLicenseBackImage,
        //     drivingLicenseBackResponse: drivingLicenseBackImageFile,
        //     drivingLicenseBackStatus: false
        //   });
        // } else if (data == InsuranceCardImage[0]) {
        //   const InsuranceCardFrontImage = {
        //     uri: "data:image/jpeg;base64," + response.data
        //   };
        //   const InsuranceCardFrontImageFile = {
        //     type: "image/jpeg", //response.type
        //     name: "file.jpg",
        //     // name: response.fileName,
        //     uri: response.uri
        //   };

        //   this.setState({
        //     insuranceCardFront: InsuranceCardFrontImage,
        //     insuranceCardFrontResponse: InsuranceCardFrontImageFile,
        //     insuranceCardFrontStatus: false
        //   });
        // } else if (data == InsuranceCardImage[1]) {
        //   const InsuranceCardBackImage = {
        //     uri: "data:image/jpeg;base64," + response.data
        //   };

        //   const InsuranceCardBackImageFile = {
        //     type: "image/jpeg", //response.type
        //     name: "file.jpg",
        //     // name: response.fileName,
        //     uri: response.uri
        //   };

        //   this.setState({
        //     insuranceCardBack: InsuranceCardBackImage,
        //     insuranceCardBackResponse: InsuranceCardBackImageFile,
        //     insuranceCardBackStatus: false
        //   });
        // }
      }
    });
  };
  _renderDriverProfile = () => {
    const {driverProfileImage, driverProfileImageStatus} = this.state;
    const profileStyle = {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderColor: 'red',
      borderWidth: 3,
    };

    const imageValidation =
      _.isEmpty(driverProfileImage) && !driverProfileImageStatus
        ? 'Please insert image'
        : '';

    return (
      <ButtonView
        onPress={() => this._imagePicker(driverProfile[0])}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <Image
            source={
              !_.isEmpty(driverProfileImage)
                ? driverProfileImage
                : Images.image_holder
            }
            resizeMode="cover"
            style={{
              marginVertical: Metrics.smallMargin,
              width: 100,
              height: 100,
              borderRadius: 50,
            }}
          />
          <Image
            source={Images.plus}
            resizeMode="contain"
            style={{
              position: 'absolute',
              bottom: 5,
              right: 0,
            }}
          />
        </View>
        <Text
          style={{textAlign: 'center'}}
          type="medium"
          size="small"
          color="white">
          Your image
        </Text>

        {_.isEmpty(driverProfileImage) && !driverProfileImageStatus ? (
          <ValidationText text={Strings.VALIDATION.driverImage} />
        ) : null}
      </ButtonView>
    );
  };

  render() {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,

      password,

      errors,
    } = this.state;
    const {stateData} = this.props;

    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        overScrollMode="always"
        keyboardShouldPersistTaps="never"
        showsVerticalScrollIndicator={false}
        ref={(ref) => {
          this.scrollView = ref;
        }}
        // automaticallyAdjustContentInsets={true}
      >
        <StatusBar
          backgroundColor={Colors.statusBar.black}
          barStyle="light-content"
        />
        <View style={styles.container}>
          <View
            style={{
              paddingVertical: Metrics.baseMargin,
              marginTop: 40,
              // backgroundColor: "red"
            }}>
            <BoldHeading title="Sign Up" />
          </View>
          {this._renderDriverProfile()}
          <TextFieldBorder
            textFieldImage={Images.person}
            placeholder={Strings.PLACEHOLDER.firstName}
            value={firstName}
            onChangeText={(firstName) => this.setState({firstName})}
            returnKeyType="next"
            onSubmitEditing={() => this.lastName.focus()}
            reference={(ref) => {
              this.firstName = ref;
            }}
            onFocus={this._onFocus}
            error={errors.firstName}
            textFieldStyle={styles.textfield}
            autoCapitalize="none"
          />
          <TextFieldBorder
            textFieldImage={Images.person}
            placeholder={Strings.PLACEHOLDER.lastName}
            value={lastName}
            onChangeText={(lastName) => this.setState({lastName})}
            returnKeyType="next"
            onSubmitEditing={() => this.phoneNumber.focus()}
            reference={(ref) => {
              this.lastName = ref;
            }}
            onFocus={this._onFocus}
            error={errors.lastName}
            textFieldStyle={styles.textfield}
            autoCapitalize="none"
          />

          <TextFieldBorder
            textFieldImage={Images.phone}
            placeholder={Strings.PLACEHOLDER.phoneNumber}
            value={phoneNumber}
            onChangeText={(phoneNumber) => this.setState({phoneNumber})}
            returnKeyType="next"
            onSubmitEditing={() => this.email.focus()}
            reference={(ref) => {
              this.phoneNumber = ref;
            }}
            keyboardType="phone-pad"
            onFocus={this._onFocus}
            error={errors.phoneNumber}
            textFieldStyle={styles.textfield}
            autoCapitalize="none"
          />
          <TextFieldBorder
            textFieldImage={Images.email}
            placeholder={Strings.PLACEHOLDER.email}
            value={email}
            onChangeText={(email) => this.setState({email})}
            returnKeyType="next"
            onSubmitEditing={() => this.password.focus()}
            reference={(ref) => {
              this.email = ref;
            }}
            keyboardType="email-address"
            onFocus={this._onFocus}
            error={errors.email}
            textFieldStyle={styles.textfield}
            autoCapitalize="none"
          />

          <TextFieldBorder
            textFieldImage={Images.key}
            placeholder={Strings.PLACEHOLDER.password}
            value={password}
            onChangeText={(password) => this.setState({password})}
            returnKeyType="done"
            onSubmitEditing={() => this._submitSignUpForm()}
            reference={(ref) => {
              this.password = ref;
            }}
            secureTextEntry
            onFocus={this._onFocus}
            error={errors.password}
            textFieldStyle={styles.textfield}
            autoCapitalize="none"
          />
          <View
            style={{
              paddingVertical: Metrics.baseMargin,
              marginHorizontal: Metrics.xDoubleBaseMargin,
            }}
            onPress={() => null}>
            <Text
              type="regular"
              size="small"
              color="primary"
              onPress={() => {
                push('webView', {
                  websiteUrl: TERM_CONDITION,
                  title: 'Terms & Conditions',
                });
              }}>
              By creating an account you agree to the{' '}
              <Text
                onPress={() => {
                  push('webView', {
                    websiteUrl: TERM_CONDITION,
                    title: 'Terms & Conditions',
                  });
                }}
                style={{
                  textDecorationLine: 'underline',
                }}>
                {' '}
                terms of use
              </Text>{' '}
              &{' '}
              <Text
                onPress={() => {
                  push('webView', {
                    websiteUrl: PRIVACY_POLICY,
                    title: 'Privacy Policy',
                  });
                }}
                style={{
                  textDecorationLine: 'underline',
                }}>
                {' '}
                privacy policy.
              </Text>
            </Text>
          </View>
          <AppButton
            buttonTitle="Register"
            onPress={() => {
              this._submitSignUpForm();
            }}
            style={{marginTop: Metrics.xDoubleBaseMargin * 2}}
          />
          <ButtonView
            style={{paddingVertical: Metrics.baseMargin}}
            onPress={() => push('login')}>
            <Text type="regular" size="small">
              Already have an account? <Text>Log In</Text>
            </Text>
          </ButtonView>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  networkInfo: state.networkInfo.isNetworkConnected,
});

const actions = {requestSignUp};

export default connect(mapStateToProps, actions)(SignUp);
