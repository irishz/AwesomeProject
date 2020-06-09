import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet, Alert, Button} from 'react-native';
import Axios from 'axios';

export default class Body extends Component {
  constructor() {
    super();
    this.state = {
      data: 'No Data',
      loading: true,
      // eslint-disable-next-line prettier/prettier
      zone:['3','4','5','6','7','A','B','C','D','E','F','L','G','H','J','K'],
      // eslint-disable-next-line prettier/prettier
      zone2:['8','9','10','11','13','15','16','17','N','A','B','C','D','R','P'],
      block: [1, 2, 3, 4, 5, 6, 7, 8],
    };
  }

  componentDidMount() {
    var url = 'http://192.168.2.197:8082/whse/getitem/' + this.props.item;
    if (this.props.item != null) {
      try {
        Axios.get(url).then(res => {
          this.setState({
            data: res.data,
            loading: false,
          });
        });
      } catch (error) {
        console.log('DidMount');
        console.log('error:' + this.props.item);
        console.log(error);
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      if (this.props.item !== null) {
        var url = 'http://192.168.2.197:8082/whse/getitem/' + this.props.item;
        try {
          Axios.get(url).then(res => {
            console.log(res);
            this.setState({
              data: res.data,
              loading: false,
            });
          });
        } catch (error) {
          console.log('Update');
          console.log('error:' + this.props.item);
          console.log(error);
        }
      } else {
        var url = 'https://192.168.2.197:8082/whse/getitem/' + prevProps.item;
        try {
          Axios.get(url).then(res => {
            console.log(res);
            this.setState({
              data: res.data,
              loading: false,
            });
          });
        } catch (error) {
          console.log('Update');
          console.log('error:' + this.props.item);
          console.log(error);
        }
      }
    }
  }

  showLayout(loczone, locblock) {
    let header = [],
      checkzone = [];
    let floor = '';
    let correct = false;
    // Check zone of location(In Zone 1 or 2 )
    if (this.state.zone.includes(this.state.data.Zone)) {
      checkzone = this.state.zone;
      floor = 1;
    } else {
      checkzone = this.state.zone2;
      floor = 2;
    }

    if (this.state.loading === false) {
      checkzone.forEach((zone, index) => {
        if (loczone === zone) {
          correct = true;
          header.push(
            <View key={index}>
              <Text>{zone}</Text>
              <View style={styles.displayColumn}>
                {this.getBlock(locblock, correct)}
              </View>
            </View>,
          );
        } else {
          correct = false;
          header.push(
            <View key={index}>
              <Text>{zone}</Text>
              <View style={styles.displayColumn}>
                {this.getBlock(locblock, correct)}
              </View>
            </View>,
          );
        }
      });
    } else {
      return (
        <View style={styles.displayRow}>
          <Text>Waiting For Data...</Text>
        </View>
      );
    }

    return <View style={styles.displayRow}>{header}</View>;
  }

  getBlock(locblock, correct) {
    let arrayBlock = [];
    this.state.block.forEach((block, index) => {
      if (locblock == block && correct === true) {
        arrayBlock.push(
          <Text style={styles.correct} key={index}>
            {block}
          </Text>,
        );
      } else {
        arrayBlock.push(
          <Text style={styles.incorrect} key={index}>
            {block}
          </Text>,
        );
      }
    });

    return arrayBlock;
  }

  render() {
    console.log('---------------------');
    console.log('render');
    console.log('props: ' + this.props.item);
    console.log('data: ' + this.state.data);
    console.log('loading: ' + this.state.loading);
    return (
      <View>
        <Text>
          Location: {this.state.data.loc} | Zone: {this.state.data.Zone} |
          Block: {this.state.data.Block}
        </Text>
        {/* <Button onPress={this.reset()} title="Clear Data" /> */}
        {this.showLayout(this.state.data.Zone, this.state.data.Block)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  displayColumn: {
    flexDirection: 'column',
  },
  displayRow: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
  },
  correct: {
    color: 'white',
    backgroundColor: 'green',
  },
  incorrect: {
    color: 'black',
  },
});
