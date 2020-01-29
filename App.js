/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Pushy from 'pushy-react-native';

// Please place this code in App.js,
// After the import statements, and before the Component class

Pushy.setNotificationListener(async data => {
  // Print notification payload data
  console.log('Received notification: ' + JSON.stringify(data));

  // Notification title
  let notificationTitle = 'MyApp';

  // Attempt to extract the "message" property from the payload: {"message":"Hello World!"}
  let notificationText = data.message || 'Test notification';

  // Display basic system notification
  Pushy.notify(notificationTitle, notificationText, data);
});

Pushy.setNotificationClickListener(async data => {
  // Display basic alert
  Alert.alert('Clicked notification: ' + data.message);

  // Navigate the user to another page or
  // execute other logic on notification click
});

class App extends Component {
  componentDidMount() {
    // Start the Pushy service
    Pushy.listen();
    // Only necessary for Android
    if (Platform.OS === 'android') {
      // Check whether the user has granted the app the WRITE_EXTERNAL_STORAGE permission
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ).then(granted => {
        if (!granted) {
          // Request the WRITE_EXTERNAL_STORAGE permission so that the Pushy SDK will be able to persist the device token in the external storage
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          ).then(result => {
            // User denied permission?
            if (result !== PermissionsAndroid.RESULTS.GRANTED) {
              // Possibly ask the user to grant the permission
            }
          });
        }
      });
    }

    // Register the device for push notifications
    Pushy.register()
      .then(async deviceToken => {
        // Display an alert with device token
        //alert('Pushy device token: ' + deviceToken);
        console.log('registered device token ' + deviceToken);
        // Send the token to your backend server via an HTTP GET request
        //await fetch('https://your.api.hostname/register/device?token=' + deviceToken);

        // Succeeded, optionally do something to alert the user
      })
      .catch(err => {
        // Handle registration errors
        console.error(err);
      });
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
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

export default App;
