// @flow
import _ from 'lodash';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component, PureComponent} from 'react';
import {View, StatusBar, Image, ScrollView} from 'react-native';
import {HELP} from '../../config/WebService';
import {
  Text,
  TextFieldBorder,
  AppButton,
  ButtonView,
  Loading,
} from '../../components';
import {ProfileImage} from '../../appComponents';
import styles from './styles';
import MediaPicker from '../../services/MediaPicker';
import {Colors, Metrics, Strings, Images} from '../../theme';
// import { Rating, AirbnbRating } from "react-native-ratings";
import StarRating from 'react-native-star-rating';

import {request as requestDriverProfile} from '../../actions/UserProfile';
import {request as requestDriverProfileUpdate} from '../../actions/DriverProfileUpdate';
import Utils from '../../util';
import {push} from '../../services/NavigationService';

const driverProfile = ['driverProfileImage'];
class Profile extends Component {
  constructor(props) {
    super(props);
    const driverData = props.driverProfile.data;
    this.state = {
      driverProfileImage: Utils.imageUrlConverter(driverData.image_url),

      driverProfileImageResponse: '',
      driverProfileImageStatus: true,
      name: driverData && driverData.name ? driverData.name : '',
      phoneNumber:
        driverData && driverData.mobile_no ? driverData.mobile_no : '',
      password: 'Password',
      email: driverData && driverData.email ? driverData.email : '',
      starCount: 2.5,
      errors: {},
    };
  }
  shouldComponentUpdate(nextProps: Object, nextState: Object) {
    console.log(
      'shouldComponentUpdate : ',
      !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state),
    );
    return (
      !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state)
    );
  }

  componentDidMount() {
    // const payload = {
    //   email: "zain@mailinator.com"
    // };
    // this.props.requestDriverProfile(payload);
  }

  _imagePicker = (data) => {
    MediaPicker.showImagePicker((response) => {
      console.log(' showImagePicker response : ', response);
      const {drivingLicenseFront, drivingLicenseBack} = this.state;
      if (response.uri) {
        // const driverProfile = {
        //   uri: "data:image/jpeg;base64," + response.data
        // };
        const driverProfile = 'data:image/jpeg;base64,' + response.data;

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
      } // end of response uri if
    });
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
  ratingCompleted = (rating) => {
    console.log('Rating is: ' + rating);
  };

  _submitProfile = () => {
    const {
      driverProfileImage,
      driverProfileImageResponse,
      driverProfileImageStatus,
      name,
      phoneNumber,
      password,
    } = this.state;

    const errors = {};
    let nameValid = true;
    let phoneNumberValid = true;
    let driverProfileValid = true;
    ['name', 'phoneNumber'].forEach((name) => {
      const value = this.state[name];

      if (name === 'name') {
        if (value.length == 0) {
          nameValid = false;
          errors[name] = Strings.VALIDATION.name;
        }
      } else if (name === 'phoneNumber') {
        if (value.length === 0) {
          phoneNumberValid = false;
          errors[name] = Strings.VALIDATION.phoneNumber;
        }
      }
    });
    if (_.isEmpty(driverProfileImage)) {
      driverProfileValid = false;
      this.setState({driverProfileImageStatus: false});
    }
    this.setState({errors});
    if (nameValid && phoneNumberValid && driverProfileValid) {
      const formData = new FormData();
      if (!_.isEmpty(driverProfileImageResponse)) {
        formData.append('image_url', driverProfileImageResponse);
      }
      formData.append('name', name);
      formData.append('mobile_no', phoneNumber);

      this.props.requestDriverProfileUpdate(formData);
    }
  };
  render() {
    const {
      driverProfileImage,
      driverProfileImageResponse,
      driverProfileImageStatus,
      name,
      phoneNumber,
      password,

      email,
      errors,
    } = this.state;

    const {driverProfile} = this.props;
    const driverData = driverProfile.data;
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
        <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
        <View style={styles.container}>
          <ProfileImage
            onPress={() => this._imagePicker(driverProfile[0])}
            image={{uri: driverProfileImage}}
            name={driverData.name}
            email={email}
            emailColor={Colors.text.grey}
            plus
            imageValidation
            borderRadius={55}
            imageSize={{width: 110, height: 110, borderRadius: 41}}
          />
          {/* <StarRating
            disabled
            emptyStar={"ios-star-outline"}
            fullStar={"ios-star"}
            halfStar={"ios-star-half"}
            iconSet={"Ionicons"}
            maxStars={5}
            rating={this.state.starCount}
            selectedStar={rating => this.onStarRatingPress(rating)}
            fullStarColor={"#ffa800"}
          />
         */}
          <TextFieldBorder
            textFieldImage={Images.person}
            placeholder={Strings.PLACEHOLDER.name}
            value={name}
            onChangeText={(name) => this.setState({name})}
            returnKeyType="next"
            onSubmitEditing={() => this.phoneNumber.focus()}
            reference={(ref) => {
              this.name = ref;
            }}
            onFocus={this._onFocus}
            error={errors.name}
            textFieldStyle={styles.textfield}
            autoCapitalize="none"
          />
          <TextFieldBorder
            textFieldImage={Images.phone}
            placeholder={Strings.PLACEHOLDER.phoneNumber}
            value={phoneNumber}
            onChangeText={(phoneNumber) => this.setState({phoneNumber})}
            returnKeyType="done"
            onSubmitEditing={() => null}
            reference={(ref) => {
              this.phoneNumber = ref;
            }}
            keyboardType="phone-pad"
            onFocus={this._onFocus}
            error={errors.phoneNumber}
            textFieldStyle={styles.textfield}
            autoCapitalize="none"
          />
          <ButtonView onPress={() => push('changePassword')}>
            <TextFieldBorder
              pointerEvents="none"
              placeholder={Strings.PLACEHOLDER.password}
              // value={password}
              editable={false}
              onSubmitEditing={() => null}
              reference={(ref) => {
                this.password = ref;
              }}
              textFieldStyle={styles.textfield}
              rightTextFieldImage={Images.rightArrow}
            />
          </ButtonView>
          <ButtonView onPress={() => push('PaymentInfo')}>
            <TextFieldBorder
              pointerEvents="none"
              placeholder={Strings.PLACEHOLDER.payment}
              // value={password}
              editable={false}
              onSubmitEditing={() => null}
              reference={(ref) => {
                this.password = ref;
              }}
              textFieldStyle={styles.textfield}
              rightTextFieldImage={Images.rightArrow}
            />
          </ButtonView>
          <ButtonView
            onPress={() =>
              push('webView', {
                websiteUrl: HELP,
                title: 'Help Center',
              })
            }
            style={{
              paddingVertical: Metrics.baseMargin,
              flexDirection: 'row',
              width: Metrics.screenWidth - Metrics.ratio(50),
            }}>
            <View style={{marginRight: Metrics.baseMargin}}>
              <Text type="medium" size="small">
                Help Center
              </Text>
              <Text
                type="regular"
                size="xxSmall"
                color="grey"
                style={{width: 198}}>
                Having troubles? Feel free to pop us a question or two
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Image
                resizeMode="contain"
                source={Images.rightArrow}
                // style={{
                //   width: Metrics.images.small,
                //   height: Metrics.images.small
                // }}
              />
            </View>
          </ButtonView>

          <AppButton
            buttonTitle="Save"
            onPress={() => {
              this._submitProfile();
            }}
          />
        </View>
        <Loading loading={this.props.isFetching} />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  networkInfo: state.networkInfo,
  driverProfile: state.user,
  isFetching: state.user.isFetching,
});

const actions = {requestDriverProfile, requestDriverProfileUpdate};

export default connect(mapStateToProps, actions)(Profile);
