import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Text } from 'react-native-elements'
import  AsyncStorage from "@react-native-async-storage/async-storage";


const RegisterScreen = ({navigation}) => {
  const [titleText, setTitleText] = useState('Sign UP');
  const [ButtonText, setButtonText] = useState('Sign UP');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (email == '' && password == ''){
      Alert.alert("入力欄を確認してください。", "入力欄が空白です。");
    }else if(email == ''){
      Alert.alert("入力欄を確認してください。", "emailが空白です。");
    }else if (password == ''){
      Alert.alert("入力欄を確認してください。", "パスワードが空白です。")
    }
    // else if(!email.match(/.+@.+\..+/)){
    //   Alert.alert("emailを確認してください。", "メールアドレスを入力してください。")
    // }
    else{
      try {
        await AsyncStorage.setItem('DB_email', email);
        await AsyncStorage.setItem('DB_password', password);
      
        Alert.alert('Success', 'Account created successfully');
        navigation.navigate('LoginScreen'); // 新規登録成功後にログイン画面に遷移
      } catch (error) {
        Alert.alert('Sign Up Failed', error.message); // エラーメッセージを表示
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{titleText}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>{ButtonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
export default RegisterScreen;



