// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, Image, ImageBackground, FlatList} from 'react-native';
import {Text} from '../';
import styles from './styles';
import {connect} from 'react-redux';
import {Colors, Metrics, Images} from '../../theme';
import Stripe from '../../services/Stripe';
import {
  request as AddStripeRequest,
  success as AddStripeSuccess,
  failure as AddStripeFailure,
} from '../../actions/AddStripeAction';
import {
  request as GetStripeRequest,
  success as GetStripeSuccess,
  failure as GetStripeFailure,
} from '../../actions/GetStripeAction';
import {
  request as DefaultRequest,
  success as DefaultSuccess,
  failure as DefaultFailure,
} from '../../actions/DefaultCardAction';
import {Loading, ButtonView, AppButton} from '../../components';

import {requestNegativePayment} from '../../actions/Paynow';
import {success as userProfileUpdatedSuccess} from '../../actions/DriverProfileUpdate';
import FlatListHandler from '../../components/FlatListHandler';
import {push} from '../../services/NavigationService';

class AddPaymentMethod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
    };
  }
  componentDidMount() {
    this.props.GetStripeRequest();
  }
  static propTypes = {};

  static defaultProps = {};

  onPaynowPress = () => {
    const {user} = this.props;

    this.setState({
      isFetching: true,
    });

    data = {
      total_charge_amount: user.data.balance,
    };
    this.props.requestNegativePayment(
      data,
      (response) => {
        this.setState({
          isFetching: false,
        });
        // this.props.stateChange(true, SHOW_RIDE_RATING_CONTENT_VIEWS);
        // this.setCarsOnMap("all");
        console.log('check uaer object : ', response);
        this.props.userProfileUpdatedSuccess(response);
        console.log('requestNegativePayment', response);
      },
      (error) => {
        this.setState({
          isFetching: false,
        });
        console.log('requestPaynow-error', error);
      },
    );
  };

  _renderItem = ({item}, index) => {
    return (
      <ButtonView
        onPress={() =>
          item.is_default != 1 && this.props.DefaultRequest({id: item.id})
        }
        style={{
          height: 64,
          backgroundColor: '#ffffff',
          marginVertical: 5,
          borderRadius: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{
              alignSelf: 'center',
              margin: 20,
            }}
            source={
              item.is_default ? Images.selectedRadio : Images.unselectedRadio
            }
          />
          <Image
            source={
              item.card_type == 'Visa'
                ? Images.visaCard
                : item.card_type == 'Mastercard'
                ? Images.masterCard
                : Images.defCard
            }
            style={{marginLeft: 20}}
          />
          <Text
            color="aztec"
            size="xSmall"
            type="medium"
            style={{marginLeft: 20}}>
            {`***${item.last_4_digit}`}
          </Text>
        </View>
        <ButtonView
          onPress={() => push('addAnotherCard', {item})}
          style={{
            alignSelf: 'center',
          }}>
          <Image
            source={Images.angelRightThin}
            style={{
              margin: 25,
            }}
          />
        </ButtonView>
      </ButtonView>
    );
  };

  render() {
    const {GetStripe, DefaultCard, AddStripe, user} = this.props;
    console.log('GetStripe.data', GetStripe.data);
    return (
      <View style={styles.container}>
        <Text
          color="aztec"
          size="xSmall"
          type="medium"
          style={{marginHorizontal: 20, marginVertical: 24}}>
          Manage Your Cards
        </Text>
        {user.data && user.data.balance < 0 ? (
          <AppButton
            onPress={this.onPaynowPress}
            buttonTitle={`Pay Previous Ride Bill ${user.data.balance}`}
            style={{
              backgroundColor: Colors.red,
              alignSelf: 'center',
            }}
            isFetching={this.state.isFetching}
          />
        ) : null}
        <ButtonView
          style={styles.addCon}
          onPress={() => push('addAnotherCard')}>
          <ImageBackground
            resizeMode="contain"
            source={Images.rectangleBorder}
            style={styles.addSub}>
            <View style={styles.addTextView}>
              <Image source={Images.addIcon} />
              <Text color="grey" size="xSmall" type="medium">
                Add another card
              </Text>
            </View>
          </ImageBackground>
        </ButtonView>
        <FlatListHandler
          data={GetStripe.data.length && GetStripe.data}
          renderItem={this._renderItem}
          style={{marginHorizontal: 20, flex: 1}}
        />

        <Loading
          loading={
            GetStripe.isFetching ||
            AddStripe.isFetching ||
            DefaultCard.isFetching
          }
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  networkInfo: state.networkInfo,
  AddStripe: state.addStripe,
  GetStripe: state.getStripe,
  DefaultCard: state.defaultCard,
  user: state.user,
  tripReducer: state.tripReducer,
});

const actions = {
  AddStripeRequest,
  AddStripeSuccess,
  AddStripeFailure,
  GetStripeRequest,
  GetStripeSuccess,
  GetStripeFailure,
  DefaultRequest,
  DefaultSuccess,
  DefaultFailure,
  requestNegativePayment,
  userProfileUpdatedSuccess,
};

export default connect(mapStateToProps, actions)(AddPaymentMethod);
