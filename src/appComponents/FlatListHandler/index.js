import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import PropTypes from "prop-types";
import ListEmpty from "./ListEmpty";
import ListFooter from "./ListFooter";
import Loader from "../../components/Loading";

class FlatListHandler extends Component {
  static propTypes = {
    data: PropTypes.array,
    isFetching: PropTypes.bool,
    loader: PropTypes.object,
    fetchRequest: PropTypes.func
  };
  static defaultProps = { data: [], isFetching: false };

  keyExtractor = (item, index) => `item_${index}`;

  onEndReached = () => {
    this.props.fetchRequest &&
      this.props.data.length % 10 === 0 &&
      this.props.fetchRequest(true, this.props.data.length / 10 + 1);
  };

  onRefresh = () =>
    this.props.fetchRequest && this.props.fetchRequest(false, 1);

  renderItem = ({ index }) => (
    <View>
      <Text>{`item ${index}`}</Text>
    </View>
  );

  renderListEmpty = () => (!this.props.data.length ? <ListEmpty /> : null);

  renderListFooter = () => {
    return this.props.isFetching && this.props.data.length % 10 === 0 ? (
      <ListFooter />
    ) : null;
  };

  render() {
    if (this.props.isFetching && !this.props.data.length) {
      return this.props.loader ? this.props.loader : <Loader />;
    }
    /* Rendering contains all the basic stuff list needs to render it self what ever extra props is passed to is overridden */
    return (
      <FlatList
        data={this.props.data}
        renderItem={this.renderItem}
        refreshing={this.props.isFetching}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
        keyExtractor={this.keyExtractor}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={this.renderListEmpty}
        ListFooterComponent={this.renderListFooter}
        contentContainerStyle={
          this.props.data.length ? {} : styles.contentContainerStyle
        }
        {...this.props}
      />
    );
  }
}

const styles = {
  contentContainerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
};

export default FlatListHandler;
