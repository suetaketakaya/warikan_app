import React, { useState, useEffect } from 'react';
import { View,  StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';

import { Text } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';


function StorageComfirmScreen({navigation}){
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [text, setText] = useState('');
  
  const handlePasswordComfirm = async() =>{
    const value = await AsyncStorage.getItem('login_password');
    // value = JSON.parse(value);
    Alert('パスワード確認 : ' , value)
    
  }
    // 特定のデータを削除
    const handleDelete = async () => {
        try {
          await AsyncStorage.removeItem(text);
        } catch (error) {
          console.log(eror);
        }
    }

    // 全データを削除する
    const handleAllDelete = async () => {
        try {
          await AsyncStorage.clear();
        } catch (error) {
          console.log(eror);
        }
      }

      useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            // AsyncStorageから全てのキーを取得
            const keys = await AsyncStorage.getAllKeys();
            if (keys.length > 0) {
              // 各キーに対してデータを取得
              const items = await AsyncStorage.multiGet(keys);
              setData(items);
            } else {
              setData([]);
            }
          } catch (err) {
            setError('データの取得に失敗しました。');
            console.error('Error fetching data from AsyncStorage:', err);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }, []);
    
      const renderItem = ({ item }) => {
        const [key, value] = item;
        return (
          <View style={styles.item}>
            <Text style={styles.key}>Key: {key}</Text>
            <Text style={styles.value}>Value: {value}</Text>
          </View>
        );
      };
    
      return (
        <View style={styles.container}>
          
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <Text style={styles.error}>{error}</Text>
          ) : (
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item[0]}
            />
          )}

        <TouchableOpacity style={styles.button} onPress={handleAllDelete}>
            <Text style={styles.buttonText}>全データ削除</Text>
        </TouchableOpacity>
        </View>
      );
};
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    key: {
        fontWeight: 'bold',
    },
    value: {
        color: '#666',
    },
    error: {
        color: 'red',
        margin: 20,
    },
});export default StorageComfirmScreen;