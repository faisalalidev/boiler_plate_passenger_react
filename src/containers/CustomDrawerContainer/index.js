// @flow
import _ from 'lodash';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {View, Image, FlatList, StatusBar, ScrollView} from 'react-native';
import {Text, ButtonView, Separator, DrawerCard} from '../../components';
import {ProfileImage} from '../../appComponents';
import styles from './styles';
import Utils from '../../util';
import {Metrics, Images, Colors, Fonts} from '../../theme';
import {drawerRoutes} from './Routes';
import {navigate, push, toggleDrawer} from '../../services/NavigationService';

class CustomDrawerContainer extends Component {
  constructor(props) {
    super(props);
    const userData = props.user.data;

    this.state = {
      image:
        userData && userData.image_url
          ? Utils.imageUrlConverter(userData.image_url)
          : '',
      name: userData && userData.name ? userData.name : '',
      email: userData && userData.email ? userData.email : '',
      errors: {},
    };
  }

  onPressDrawerItem = (route) => (ev) => {
    toggleDrawer();
    navigate(route);
  };
  //   componentWillReceiveProps(nextProps) {
  //     // drawer action state handler
  //     if (nextProps['items'][0]['routes'].length === 1) {
  //       this.setState({
  //         routes: this.state.routes.map((item, i) =>
  //           i == 0 ? {...item, IsActive: true} : {...item, IsActive: false},
  //         ),
  //       });
  //     }
  //   }
  //   shouldComponentUpdate(nextProps: Object, nextState: Object) {
  //     return (
  //       !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state)
  //     );
  //   }

  renderDrawerCell = ({item}) => {
    return (
      <DrawerCard
        count={this.props.user.data.balance}
        myText={item.title}
        onPress={this.onPressDrawerItem(item.route)}
        style={{
          backgroundColor:
            item.IsActive === true
              ? Colors.appbutton.primary
              : Colors.background.secondary,
        }}
      />
    );
  };

  drawerRoutes = (item, index) => {
    let action;
    let drawerImage;
    this.setState({
      routes: this.state.routes.map((item, i) =>
        i == index ? {...item, IsActive: true} : {...item, IsActive: false},
      ),
    });
    this.props.navigation.closeDrawer();
    this.props.navigation.navigate(item.route);
  };
  render() {
    const {navigation, user} = this.props;

    const {image, name, email, errors} = this.state;
    const userData = user.data;

    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{
          flex: 1,
        }}
        overScrollMode="always"
        keyboardShouldPersistTaps="never"
        showsVerticalScrollIndicator={false}
        ref={(ref) => {
          this.scrollView = ref;
        }}>
        <View
          style={{
            flex: 0.5,
            justifyContent: 'center',
          }}>
          <ProfileImage
            onPress={() => navigation.navigate('profile')}
            image={{uri: Utils.imageUrlConverter(userData.image_url)}}
            name={userData.name}
            email={email}
            imageValidation
          />
        </View>
        <FlatList
          data={drawerRoutes()}
          style={{flex: 2}}
          renderItem={this._renderItems}
          keyExtractor={(item) => item.route}
          renderItem={this.renderDrawerCell}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const actions = {};

export default connect(mapStateToProps, actions)(CustomDrawerContainer);
