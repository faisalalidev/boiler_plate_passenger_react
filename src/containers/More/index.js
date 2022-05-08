// @flow
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {View, FlatList, Alert, Image} from 'react-native';
import {Text, Separator, ButtonView, ListItem} from '../../components';
import {Modal} from '../../appComponents';
import {
  HELP,
  ABOUT_US,
  TERM_CONDITION,
  PRIVACY_POLICY,
  FAQ,
} from '../../config/WebService';
import styles from './styles';
import {Images, Metrics} from '../../theme';
import Utils from '../../util';
import _ from 'lodash';
import {logout} from '../../actions/Login';
import {LoginContext} from '../../';
import {push} from '../../services/NavigationService';

class More extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moreItems: [
        {
          title: 'Help & FAQ',
          onPress: () => {
            push('webView', {
              websiteUrl: FAQ,
              title: 'Help & FAQ',
            });
          },
          // navigate: "faq",
          rightImage: Images.faq,
          descriptionInputText: false,
        },
        {
          title: 'About Rydr',
          //navigate: "about",
          onPress: () =>
            push('webView', {
              websiteUrl: ABOUT_US,
              title: 'About Rydr',
            }),
          rightImage: Images.about,
          descriptionInputText: false,
        },
        {
          title: 'Privacy Policy',
          onPress: () =>
            push('webView', {
              websiteUrl: PRIVACY_POLICY,
              title: 'Privacy Policy',
            }),

          rightImage: Images.privacy,
          descriptionInputText: false,
        },
        {
          title: 'Terms and Conditions',
          onPress: () =>
            push('webView', {
              websiteUrl: TERM_CONDITION,
              title: 'Terms and Conditions',
            }),

          rightImage: Images.term,
          descriptionInputText: false,
        },
        {
          title: 'Logout',
          rightImage: Images.logout,
          descriptionInputText: false,
          onPress: () => {
            this.logoutModal.show();
          },
        },
      ],
    }; // end of state
  }

  static propTypes = {};

  shouldComponentUpdate(nextProps: Object) {
    return !_.isEqual(nextProps, this.props);
  }

  _renderLogoutModal = () => {
    return (
      <LoginContext.Consumer>
        {({setLogin}) => (
          <Modal.Dialogue
            ref={(ref) => {
              this.logoutModal = ref;
            }}
            description="Do you really want to logout ?"
            title="Logout"
            leftButton="No"
            rightButton="Yes"
            isButton
            onPress={() => {
              this.props.logout();
              Utils.setUserToken('');
              this.logoutModal.hide();
              setLogin(false);
            }}
          />
        )}
      </LoginContext.Consumer>
    );
  };

  _renderItems = ({item, index}) => {
    return <ListItem item={item} />;
  };

  render() {
    const {moreItems} = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={moreItems}
          style={styles.listStyle}
          renderItem={this._renderItems}
          ItemSeparatorComponent={() => (
            <Separator style={styles.sepratorStyle} />
          )}
        />
        {this._renderLogoutModal()}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  networkInfo: state.networkInfo,
});
const actions = {logout};

export default connect(mapStateToProps, actions)(More);
