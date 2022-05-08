// @flow
import _ from "lodash";
import Util from "../../util";
import React from "react";
import PropTypes from "prop-types";
import { Separator } from "../../components";
import { FlatList as FlatListRN, View } from "react-native";
import NoInternetView from "./NoInternetView";
import NoInternetViewBottom from "./NoInternetViewBottom";
import Loading from "./Loading";
import EmptyView from "./EmptyView";
import LoadingFooter from "./LoadingFooter";

export default class FlatList extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    page: PropTypes.object.isRequired,
    renderItem: PropTypes.func.isRequired,
    keyExtractor: PropTypes.func,
    ItemSeparatorComponent: PropTypes.func,
    isFetching: PropTypes.bool.isRequired,
    isPullToRefresh: PropTypes.bool.isRequired,
    isInternetConnected: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired
  };

  static defaultProps = {
    keyExtractor: Util.keyExtractor,
    ItemSeparatorComponent: () => <Separator />
  };
  state = {
    isInternetConnected: this.props.isInternetConnected
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.isInternetConnected && !nextProps.isInternetConnected) {
      this.state.isInternetConnected = false;
    }

    if (!this.props.isFetching && nextProps.isFetching) {
      this.state.isInternetConnected = true;
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state)
    );
  }

  _onRetryPress(reset = false) {
    if (this.props.isInternetConnected) {
      this.props.fetchData(reset, reset ? 0 : this.props.data.length);
    } else {
      alert("Please connect to working");
    }
  }

  _renderListFooter() {
    const { isInternetConnected } = this.state;

    const { data, isFetching, isPullToRefresh, page } = this.props;

    if (
      (page &&
        page.total_records &&
        data.length < page.total_records &&
        !isInternetConnected) ||
      (isFetching && !isPullToRefresh)
    ) {
      return (
        <View style={{ flex: 1, height: 80 }}>
          {page &&
            page.total_records &&
            data.length < page.total_records &&
            !isInternetConnected && (
              <NoInternetViewBottom onRetryPress={() => this._onRetryPress()} />
            )}

          {isFetching && !isPullToRefresh && <LoadingFooter />}
        </View>
      );
    }

    return null;
  }

  _onEndReach = () => {
    const {
      isFetching,
      isInternetConnected,
      data,
      page,
      fetchData
    } = this.props;
    if (
      !isFetching &&
      isInternetConnected &&
      page &&
      data &&
      page.total_records &&
      data.length < page.total_records
      // data.length % page.limit === 0
    ) {
      fetchData(false, data.length);
    }
  };
  render() {
    const { isInternetConnected } = this.state;
    const { isFetching, isPullToRefresh, data, fetchData } = this.props;
    const { ...rest } = this.props;

    if (isFetching && !data.length) {
      return <Loading />;
    }

    if (isInternetConnected && !data.length) {
      return <NoInternetView onRetryPress={() => this._onRetryPress(true)} />;
    }

    // if (!isFetching && data.length) {
    //   return <EmptyView />;
    // }

    return (
      <FlatListRN
        onEndReachedThreshold={0.4}
        refreshing={isPullToRefresh}
        onRefresh={() => fetchData(true)}
        onEndReached={this._onEndReach}
        ListFooterComponent={() => this._renderListFooter()}
        {...rest}
      />
    );
  }
}
