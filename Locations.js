import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class Locations extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.route.params.item);
    return (
      <View>
        <Text> textInComponent </Text>
        <Text> ItemFromScanner: {this.props.route.params.item} </Text>
      </View>
    );
  }
}
