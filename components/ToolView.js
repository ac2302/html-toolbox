import React from 'react';
import { View } from 'react-native';
import { WebView as RNWebView } from 'react-native-webview';

const ToolView = ({ route }) => {
  const { html } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <RNWebView
        originWhitelist={['*']}
        source={{ html }}
      />
    </View>
  );
};

export default ToolView;
