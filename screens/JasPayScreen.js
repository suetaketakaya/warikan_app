import React, {useState} from "react";
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements'
import QRCode from 'react-native-qrcode-svg';

// アプリケーションのメインコンポーネント
const JasPayScreen = () => {
  const [qrCodeText, setQrCodeText] = useState('PayPayのアプリ link');
  return (
    <View style={styles.container}>
        <View style={styles.qrCodeContainer}>
          <Text style={styles.qrCodeText}>{qrCodeText}</Text>
          <QRCode value={'https://apps.apple.com/jp/app/paypay-ペイペイ/id1435783608'} size={200} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  qrCodeContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  qrCodeText: {
    marginTop: 10,
    marginBottom:10,
    textShadowColor:'Blue',
    fontSize: 16,
  },
});

export default JasPayScreen;
