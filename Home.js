import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  RefreshControl,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Body from './Body';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrRes: 'No QR Result',
      array: [],
      refreshing: false,
    };
  }

  onRead = e => {
    this.setState({
      qrRes: e.data,
    });

    this.getData();
  };

  getData() {
    this.setState({
      array: this.state.qrRes.split('+'),
    });
  }

  render() {
    // const array = this.state.qrRes.split('+');
    // console.log('qr-full: ' + this.state.qrRes);
    // console.log('item: ' + this.state.array[1]);
    return (
      <View>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <QRCodeScanner
              onRead={this.onRead}
              fadeIn={true}
              reactivate={true}
              // bottomContent={
              //   <Button
              //     title="Go to Details"
              //     onPress={() =>
              //       this.props.navigation.navigate('Locations', {
              //         item: this.state.array[1],
              //       })
              //     }
              //   />
              // }
            />
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.body}>
                  QR Result: {this.state.array[1]}
                </Text>
              </View>
              <Body item={this.state.array[1]} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default Home;
