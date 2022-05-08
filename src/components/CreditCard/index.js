// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  Dimensions,
  Image,
  Button,
  Alert,
  StatusBar,
} from 'react-native';
import {Text, TextFieldBorder, FloatingLabel, AppButton} from '../';
import styles from './styles';
import {CreditCardInput} from './react-native-credit-card-input';
import {Colors, Strings, Images, Metrics, Fonts} from '../../theme';
import ModalSelector from 'react-native-modal-selector';
import CreditCard from 'react-native-credit-card';
import Utils from '../../util';
import {connect} from 'react-redux';
import stripe from 'tipsi-stripe';
import {Loading} from '../../components';
import {Publishable_key} from '../../constants';
import {
  request as AddStripeRequest,
  success as AddStripeSuccess,
  failure as AddStripeFailure,
} from '../../actions/AddStripeAction';
import {
  request as DeleteStripeRequest,
  success as DeleteStripeSuccess,
  failure as DeleteStripeFailure,
} from '../../actions/DeleteStripeAction';
import {ERROR_NETWORK_NOT_AVAILABLE} from '../../config/WebService';

class CreditCardD extends React.PureComponent {
  static propTypes = {};
  state = {
    number: '',
    expiry: '',
    cvc: '',
    validation: false,
    type: '', // will be one of [null, "visa", "master-card", "american-express", "diners-club", "discover", "jcb", "unionpay", "maestro"]
    statusNumber: '',
    statusExpiry: '',
    statusCvc: '',
    params: false,
    isLoading: false,
    // textInputCountryValue: "",
    // textInputCountryId: ""
  };
  static defaultProps = {};

  _onChange = (event) => {
    let getValue = {
      number: event.values.number,
      expiry: event.values.expiry,
      cvc: event.values.cvc,
      type: event.values.type, // will be one of [null, "visa", "master-card", "american-express", "diners-club", "discover", "jcb", "unionpay", "maestro"]
      statusNumber: event.status.number,
      statusExpiry: event.status.expiry,
      statusCvc: event.status.cvc,
    };
    this.setState(getValue);
  };
  componentDidMount() {
    const {route} = this.props;

    let get = route.params;
    if (get) {
      this.CCInput.setValues({
        expiry: `${get.item.expiry_month}/${get.item.expiry_year.substr(-2)}`,
      });
      this.CCInput.setValues({
        number: `0000 0000 0000 ${get.item.last_4_digit}`,
      });
      this.setState({
        number: `**** **** **** ${get.item.last_4_digit}`,
        expiry: `${get.item.expiry_month}/${get.item.expiry_year.substr(-2)}`,
        cvc: '***',
        params: true,
      });
    }
  }

  _card = (value) => {
    this.CCInput.focus('number');
    this.CCInput.setValues({number: value});
  };
  _expiry = (value) => {
    this.CCInput.focus('expiry');
    this.CCInput.setValues({expiry: value});
  };
  _cvc = (value) => {
    this.CCInput.focus('cvc');
    this.CCInput.setValues({cvc: value});
  };
  onSubmit = async () => {
    this.setState({isLoading: true});
    const {
      number,
      expiry,
      cvc,
      type,
      statusNumber,
      statusExpiry,
      statusCvc,
    } = this.state;
    await stripe.setOptions({
      publishableKey: Publishable_key, //not a client key
    });
    if (
      statusNumber == 'valid' &&
      statusExpiry == 'valid' &&
      statusCvc == 'valid'
    ) {
      const params = {
        // mandatory
        number: number,
        expMonth: Number(expiry.split('/')[0]),
        expYear: Number(expiry.split('/')[1]),
        cvc: cvc,
      };

      //   const token = await stripe.createTokenWithCard(params)
      const token = await stripe.createTokenWithCard(params).catch((err) => {
        this.setState({isLoading: false});
        Utils.MessageAlertError('Error', 'Your card has been declined');
        console.log('createTokenWithCard catch : ', err);
      });
      if (token.tokenId) {
        console.log('token  : ', token, 'user object : ', this.props.user);
        this.props.AddStripeRequest({
          card_token: token.tokenId,
          user_id: this.props.user.data.id,
        });
        this.setState({isLoading: false});
      }
    } else {
      this.setState({validation: true, isLoading: false});
    }
  };

  onRemove = () => {
    const {route} = this.props;

    // Works on both iOS and Android
    Alert.alert(
      'Delete Card',
      'Are you sure you want to delete this card',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            let get = route.params;
            this.props.DeleteStripeRequest({id: get.item.id});
          },
        },
      ],
      {cancelable: false},
    );
  };
  _errorHandler(value) {
    if (this.state.validation) {
      switch (value) {
        case '':
          return 'require';
        case 'valid':
          return '';
        default:
          return value;
      }
    }
  }

  render() {
    const {
      number,
      expiry,
      cvc,
      validation,
      type, // will be one of [null, "visa", "master-card", "american-express", "diners-club", "discover", "jcb", "unionpay", "maestro"]
      statusNumber,
      statusExpiry,
      statusCvc,
      params,
      isLoading,
      // textInputCountryValue,
      // textInputCountryId
    } = this.state;
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
        }}>
        <StatusBar
          backgroundColor={Colors.statusBar.black}
          barStyle="light-content"
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 20,
            }}>
            <CreditCardInput
              onChange={this._onChange}
              ref={(c) => (this.CCInput = c)}
            />
          </View>
          <View
            style={{
              // backgroundColor: "brown",
              height: 300,
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                width: Metrics.screenWidth - 40,
                // backgroundColor: "red"
              }}>
              <Text color="grey" size="xxSmall" type="regular">
                {!params && 'Choose Desired Payment Method to add'}
              </Text>
            </View>
            <View
              style={[
                styles.formInput,
                {
                  width: Metrics.screenWidth - 40,
                  flexDirection: 'row',
                },
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  bottom: 5,
                  left: 10,
                }}>
                <Image source={Images.cCardPlaceholder} />
                <View
                  style={{
                    backgroundColor: Colors.textfieldBorder,
                    height: 26,
                    width: 1,
                    marginHorizontal: 13,
                  }}
                />
              </View>
              <FloatingLabel
                onChangeText={(value) => this._card(value)}
                labelStyle={styles.labelInput}
                value={number}
                inputStyle={styles.input}
                style={{width: '80%', marginLeft: 55}}
                onBlur={this.onBlur}
                cardNumber={true}
                maxLength={19}
                editable={!params}
                error={this._errorHandler(statusNumber)}>
                Card Number
              </FloatingLabel>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: Metrics.screenWidth - 40,
                // backgroundColor: "yellow"
              }}>
              <FloatingLabel
                onChangeText={(value) => this._expiry(value)}
                value={expiry}
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                style={[styles.formInput, {width: '45%'}]}
                onBlur={this.onBlur}
                cardNumber={false}
                editable={!params}
                maxLength={5}
                error={this._errorHandler(statusExpiry)}>
                Exp Date
              </FloatingLabel>
              <FloatingLabel
                onChangeText={(value) => this._cvc(value)}
                value={cvc}
                editable={!params}
                labelStyle={styles.labelInput}
                inputStyle={styles.input}
                style={[styles.formInput, {width: '45%'}]}
                maxLength={3}
                error={this._errorHandler(statusCvc)}>
                CVV Code
              </FloatingLabel>
            </View>
          </View>
          <AppButton
            style={{backgroundColor: Colors.appbutton.primary}}
            buttonTitle={params ? 'Remove' : 'Add Card'}
            onPress={() => {
              if (this.props.networkInfo) {
                params ? this.onRemove() : this.onSubmit();
              } else {
                Utils.MessageAlertError(
                  ERROR_NETWORK_NOT_AVAILABLE.title,
                  ERROR_NETWORK_NOT_AVAILABLE.message,
                );
              }
            }}
          />
        </View>
        <Loading
          loading={
            isLoading ||
            this.props.AddStripe.isFetching ||
            this.props.DeleteStripe.isFetching
          }
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  networkInfo: state.networkInfo.isNetworkConnected,
  AddStripe: state.addStripe,
  DeleteStripe: state.deleteStripe,
  user: state.user,
});

const actions = {
  AddStripeRequest,
  AddStripeSuccess,
  AddStripeFailure,
  DeleteStripeRequest,
  DeleteStripeSuccess,
  DeleteStripeFailure,
};

export default connect(mapStateToProps, actions)(CreditCardD);
