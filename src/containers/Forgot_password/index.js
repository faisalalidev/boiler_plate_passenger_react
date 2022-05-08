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
} from 'react-native';

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
  AppButton,
} from '../../components';
import styles from './styles';
import Utils from '../../util';

import {request as requestForgotPassword} from './ForgotPasswordAction';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errors: {},
    };
  }
  componentWillMount() {
    Utils.keyboardDismiss();
  }

  componentDidMount() {
    Utils.keyboardDismiss();
  }

  onSubmit = () => {
    const {email} = this.state;
    const errors = {};
    let emailValid = true;
    ['email'].forEach((name) => {
      const value = this.state[name];
      if (name === 'email') {
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
    if (emailValid) {
      // this.props.onPress();
      const payload = {
        email,
      };
      this.props.requestForgotPassword(payload);
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

  render() {
    const {email, errors} = this.state;
    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        overScrollMode="always"
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        ref={(ref) => {
          this.scrollView = ref;
        }}>
        <StatusBar
          backgroundColor={Colors.statusBar.black}
          barStyle="light-content"
        />
        <View
          style={{
            height: 60,
            width: Metrics.screenWidth,
          }}
        />
        <View style={styles.container}>
          <BoldHeading title="Forgot Password" style={{}} />

          <TextFieldBorder
            textFieldImage={Images.email}
            placeholder={Strings.PLACEHOLDER.forgotEmail}
            value={email}
            onChangeText={(email) => this.setState({email})}
            returnKeyType="done"
            onSubmitEditing={() => this.onSubmit()}
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
          />
          <AppButton buttonTitle="Confirm" onPress={() => this.onSubmit()} />
        </View>
        <Loading loading={this.props.isFetching} />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  networkInfo: state.networkInfo,
  isFetching: state.ForgotPasswordReducer.isFetching,
});

const actions = {requestForgotPassword};
export default connect(mapStateToProps, actions)(ForgotPassword);
