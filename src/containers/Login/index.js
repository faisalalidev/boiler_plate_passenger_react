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
  WebView,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
import {Images, Metrics, Fonts, Colors, Strings} from '../../theme';
import {
  Text,
  Loading,
  ButtonView,
  Button,
  Separator,
  TextFieldBorder,
  AppLogoText,
  BoldHeading,
  MenuDetailButton,
  AppButton,
} from '../../components';
import styles from './styles';
import Utils from '../../util';
import Notification from '../../services/Notification';
import {ERROR_NETWORK_NOT_AVAILABLE} from '../../config/WebService';
import {LoginContext} from '../../';
import {request as loginRequest} from '../../actions/Login';
import {push} from '../../services/NavigationService';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
  }
  componentDidMount() {
    if (Platform.OS === 'ios') {
      KeyboardManager.setToolbarPreviousNextButtonEnable(true);
    }
    Utils.keyboardDismiss();
  }

  onSubmit = (setLogin) => {
    const errors = {};
    let emailValid = true;
    let passwordValid = true;
    ['email', 'password'].forEach((name) => {
      const value = this.state[name];
      if (name === 'password') {
        if (value.length === 0) {
          passwordValid = false;
          errors[name] = Strings.VALIDATION.passwordField;
        } else if (value.length <= 5) {
          passwordValid = false;
          errors[name] = Strings.VALIDATION.password;
        }
      } else if (name === 'email') {
        if (value.length === 0) {
          emailValid = false;
          errors[name] = Strings.VALIDATION.email;
        } else if (!Utils.validateEmail(value)) {
          emailValid = false;
          errors[name] = Strings.VALIDATION.emailError;
        }
      }
    });

    this.setState({errors});

    const {email, password} = this.state;
    if (passwordValid && emailValid) {
      if (this.props.networkInfo) {
        Notification.fcmToken((token) => {
          console.log('FCM tocken =========', token);
          const payload = {
            email: email,
            password: password,
            role_id: 3,
            device_type: Platform.OS,
            device_token: token,
          };
          this.props.loginRequest(payload, (data) => {
            this.setState({email: '', password: ''});
            setLogin();
          });
        });
      } else {
        Utils.MessageAlertError(
          ERROR_NETWORK_NOT_AVAILABLE.title,
          ERROR_NETWORK_NOT_AVAILABLE.message,
        );
      }
    }
  };

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
  //   getSnapshotBeforeUpdate(prevProps) {
  //     if (
  //       prevProps.errorMessage !== this.props.errorMessage &&
  //       this.props.errorMessage === ""
  //     ) {
  //       this.setState({
  //         email: "",
  //         password: ""
  //       });
  //     }
  //   }
  componentDidUpdate(prevProps) {
    if (
      prevProps.errorMessage !== this.props.errorMessage &&
      this.props.errorMessage === ''
    ) {
      this.setState({
        email: '',
        password: '',
      });
    }
  }
  render() {
    const {email, password, errors} = this.state;

    return (
      <LoginContext.Consumer>
        {({setLogin}) => (
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={{
              alignItems: 'center',
              // backgroundColor: "red",
              // flex: 1
            }}
            overScrollMode="always"
            keyboardShouldPersistTaps="never"
            showsVerticalScrollIndicator={false}
            ref={(ref) => {
              this.scrollView = ref;
            }}>
            <StatusBar
              backgroundColor={Colors.statusBar.black}
              barStyle="light-content"
            />
            {/* <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
       > */}
            <View style={styles.container}>
              <View
                style={{
                  // backgroundColor: "red",
                  alignItems: 'center',
                  marginHorizontal: Metrics.doubleBaseMargin,
                  paddingTop: 100,
                  paddingBottom: 30,
                }}>
                <AppLogoText />
                <View>
                  <BoldHeading
                    title="Get your ride that matches your style & budget"
                    // style={{ alignItems: "flex-end" }}
                  />
                </View>
              </View>
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
                textFieldStyle={[
                  styles.emailAddressTextField,
                  {marginTop: Metrics.baseMargin},
                ]}
                autoCapitalize="none"
                // value="simth24@yopmail.com"
              />
              <TextFieldBorder
                textFieldImage={Images.key}
                placeholder={'Password'}
                value={password}
                onChangeText={(password) => this.setState({password})}
                returnKeyType="done"
                secureTextEntry
                onSubmitEditing={() => null}
                reference={(ref) => {
                  this.password = ref;
                }}
                onFocus={this._onFocus}
                error={errors.password}
                textFieldStyle={styles.emailAddressTextField}
                autoCapitalize="none"
                // value="123456"
              />

              <AppButton
                buttonTitle="Log In"
                onPress={() => {
                  this.onSubmit(setLogin);
                }}
                style={{marginTop: Metrics.xDoubleBaseMargin * 2}}
              />

              <ButtonView
                style={[styles.guestContainer, {marginTop: Metrics.baseMargin}]}
                onPress={() => push('forgotPassword')}>
                <Text type="regular" size="small">
                  Forgot your password?
                </Text>
              </ButtonView>
              <ButtonView
                style={styles.guestContainer}
                onPress={() => push('signup')}>
                <Text type="regular" size="small">
                  Don't have an account yet? Register
                </Text>
              </ButtonView>
              <Loading loading={this.props.isFetching} />
            </View>
            {/*</KeyboardAvoidingView> */}
          </ScrollView>
        )}
      </LoginContext.Consumer>
    );
  }
}

const mapStateToProps = (state) => ({
  networkInfo: state.networkInfo.isNetworkConnected,
  isFetching: state.user.isFetching,
  errorMessage: state.user.errorMessage,
});

const actions = {loginRequest};

export default connect(mapStateToProps, actions)(Login);
