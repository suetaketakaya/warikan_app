import React, {useEffect, useState} from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckBox } from 'react-native-elements'
import { Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

function LoginScreen({ navigation }) {
  // baseText 
  const [titleText, setTitleTet] = useState('Login');
  const [Bt1_text, setBt1Text] = useState('Login');
  const [Bt2_text, setBt2Text] = useState('新規登録');
  const [check_text, setCheckText] = useState('アカウント情報を記録する');

  const [initial_password, setinitial_password] = useState('');
  const [checked, setCheck] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [eval_email, setevalEmail] = useState();
  const [eval_password, setevalPassword] = useState();

  // 自動的に実行する関数
  const performanceAction = async() => {
    try{
      const value = await AsyncStorage.getItem('login_password');
      setinitial_password(value);   
      if(value){
        setCheck(true);
        setPassword(value);
      }else{
        setCheck(false);
      }
    }catch (error) {
      console.error(error);
      setCheck(false);
    }
  }

  const GrepLoginID = async() =>{
    try{
      const DB_email = await AsyncStorage.getItem('DB_email');
      setevalEmail(DB_email);
      
      const DB_password = await AsyncStorage.getItem('DB_password');
      setevalPassword(DB_password);
    }catch (error) {
      console.error(error);
    }
  }
  
  const handleLogin = async () => {
    if (email !== '' && password !== ''){      
      if (email === eval_email && password === eval_password){
          if (checked === true){
            // 入力値をAsyncStorageに保存
            await AsyncStorage.setItem('login_password', password);
          }else if(checked === false){
              await AsyncStorage.removeItem('login_password');
          }
          navigation.navigate('Warikan_main', email); // ログイン成功後にホーム画面に遷移
        }else{
          Alert.alert('入力欄を確認してください', '入力したデータが一致しません');
        }
      }else{
        Alert.alert('Login Failed', '入力するべきデータを入力してください'); // エラーメッセージを表示
      }
    };

    const handleRegister = () => {
        navigation.navigate('RegisterScreen'); // 新規登録画面に遷移
    };

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        // The screen is focused
        // Call any action
        performanceAction();
        GrepLoginID();
      });
  
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;      
    }, [navigation]);

    useFocusEffect(
      React.useCallback(() => {
        performanceAction();
        GrepLoginID();
      }, [])
    );
  
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

        <CheckBox
          title={check_text}
          checked={checked}
          onPress={() => setCheck(!checked)}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>{Bt1_text}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>{Bt2_text}</Text>
        </TouchableOpacity>

      </View>
    );
  };
  
  const styles = StyleSheet.create({
    baseText: {
      fontFamily: 'Cochin',
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
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
      marginTop: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
  });

export default LoginScreen;
