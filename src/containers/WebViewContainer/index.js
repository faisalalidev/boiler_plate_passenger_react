// @flow
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
import {Text, Loading, NoInternetConnection} from '../../components';
import styles from './styles';
import {Metrics, Colors} from '../../theme';
import _ from 'lodash';
import {HELP} from '../../config/WebService';
// import { noInternetText } from "../../constants";

class WebViewContainer extends Component {
  state = {
    loading: true,
  };
  render() {
    const {route} = this.props;
    const url = route.name == 'getHelp' ? HELP : route.params.websiteUrl;

    return (
      <View style={styles.container}>
        <WebView
          source={{uri: url}}
          renderLoading={true}
          // onLoad={() => {
          //   // alert("onload");
          //   this.setState({ loading: false });
          // }}
          onLoadEnd={() => {
            this.setState({loading: false});
          }}
          // renderError={error => {
          //   console.log("error : ", error);
          //   return (
          //     <View
          //       style={{
          //         flex: 1,
          //         justifyContent: "center",
          //         alignItems: "center",
          //         marginHorizontal: Metrics.baseMargin
          //       }}
          //     >
          //       <Text type="regular" size="large" color="black">
          //         {noInternetText}
          //       </Text>
          //     </View>
          //   );
          // }}

          ref={(ref) => {
            this.WebView = ref;
          }}
          renderError={(error) => {
            console.log('error : ', error);
            return <NoInternetConnection />;
          }}
        />
        <Loading loading={this.state.loading} />
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(WebViewContainer);
