// @flow
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {Text, TextFieldBorder, AppButton} from '../../components';
import styles from './styles';
import {Strings, Metrics, Colors, Images} from '../../theme';

import {request as requestChangePassword} from '../../actions/ChangePassword';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      errors: {},
    };
  }
  _onFocus = () => {
    const {errors = {}} = this.state;

    // eslint-disable-next-line
    for (const name in errors) {
      const ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }
  };

  _submitChangePassword = () => {
    const {currentPassword, newPassword, confirmPassword, errors} = this.state;
    let currentPasswordValid = true;
    let newPasswordValid = true;
    let confirmPasswordValid = true;

    ['currentPassword', 'newPassword', 'confirmPassword'].forEach((name) => {
      const value = this.state[name];

      if (name === 'currentPassword') {
        if (value.length == 0) {
          currentPasswordValid = false;
          errors[name] = Strings.VALIDATION.currentPassword;
        }
      } else if (name === 'newPassword') {
        if (value.length === 0) {
          newPasswordValid = false;
          errors[name] = Strings.VALIDATION.newPassword;
        } else if (value.length <= 5) {
          newPasswordValid = false;
          errors[name] = Strings.VALIDATION.password;
        }
      } else if (name === 'confirmPassword') {
        if (value.length === 0) {
          confirmPasswordValid = false;
          errors[name] = Strings.VALIDATION.confirmPass;
        } else if (value.length <= 5) {
          confirmPasswordValid = false;
          errors[name] = Strings.VALIDATION.password;
        } else if (newPassword !== confirmPassword) {
          confirmPasswordValid = false;
          errors[name] = Strings.VALIDATION.passmatach;
        }
      }
    });

    this.setState({errors});

    if (currentPasswordValid && newPasswordValid && confirmPasswordValid) {
      const payload = {
        old_password: currentPassword,
        new_password: confirmPassword,
      };
      this.props.requestChangePassword(payload);
      // alert("api hiit");
    }
  };
  render() {
    const {currentPassword, newPassword, confirmPassword, errors} = this.state;
    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{
          alignItems: 'center',

          // backgroundColor: "green"
        }}
        overScrollMode="always"
        keyboardShouldPersistTaps="never"
        showsVerticalScrollIndicator={false}
        ref={(ref) => {
          this.scrollView = ref;
        }}
        // automaticallyAdjustContentInsets={true}
      >
        <View
          style={{
            // backgroundColor: "red",
            height: 20,
            width: Metrics.screenWidth,
          }}
        />
        <View style={styles.container}>
          <TextFieldBorder
            textFieldImage={Images.key}
            placeholder={Strings.PLACEHOLDER.currentPass}
            value={currentPassword}
            onChangeText={(currentPassword) => this.setState({currentPassword})}
            returnKeyType="next"
            onSubmitEditing={() => this.newPassword.focus()}
            reference={(ref) => {
              this.currentPassword = ref;
            }}
            secureTextEntry
            onFocus={this._onFocus}
            error={errors.currentPassword}
            textFieldStyle={styles.textfield}
            autoCapitalize="none"
          />
          <TextFieldBorder
            textFieldImage={Images.key}
            placeholder={Strings.PLACEHOLDER.oldPass}
            value={newPassword}
            onChangeText={(newPassword) => this.setState({newPassword})}
            returnKeyType="next"
            onSubmitEditing={() => this.confirmPassword.focus()}
            reference={(ref) => {
              this.newPassword = ref;
            }}
            secureTextEntry
            onFocus={this._onFocus}
            error={errors.newPassword}
            textFieldStyle={styles.textfield}
            autoCapitalize="none"
          />
          <TextFieldBorder
            textFieldImage={Images.key}
            placeholder={Strings.PLACEHOLDER.confirmPass}
            value={confirmPassword}
            onChangeText={(confirmPassword) => this.setState({confirmPassword})}
            returnKeyType="done"
            onSubmitEditing={() => null}
            reference={(ref) => {
              this.confirmPassword = ref;
            }}
            secureTextEntry
            onFocus={this._onFocus}
            error={errors.confirmPassword}
            textFieldStyle={styles.textfield}
            autoCapitalize="none"
          />
        </View>

        <AppButton
          buttonTitle="Reset"
          style={{
            // marginBottom: Metrics.doubleBaseMargin * 2,
            // position: "absolute",
            // bottom: 0
            marginTop: 70,
          }}
          onPress={() => {
            this._submitChangePassword();
          }}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  networkInfo: state.networkInfo,
});

const actions = {requestChangePassword};

export default connect(mapStateToProps, actions)(ChangePassword);
