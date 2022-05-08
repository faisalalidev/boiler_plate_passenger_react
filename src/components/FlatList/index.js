// @flow

import Util from "../../util";
import React from "react";
import PropTypes from "prop-types";
import { Separator } from "../../components";
import { FlatList as FlatListRN } from "react-native";

export default class FlatList extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
    keyExtractor: PropTypes.func,
    ItemSeparatorComponent: PropTypes.func
  };

  static defaultProps = {
    keyExtractor: Util.keyExtractor,
    ItemSeparatorComponent: () => <Separator />
  };

  render() {
    const { ...rest } = this.props;
    return <FlatListRN {...rest} />;
  }
}
