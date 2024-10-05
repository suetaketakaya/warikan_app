import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShowResultScreen = ({route, navigation}) => {
  const {email} = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [detailsshow, setdetailsshow] = useState(false);

  // 詳細画面に表示するようの詳細データ

  const [datetext, setdatetext] = useState('initial'); 
  const [timetext, settimetext] = useState('');
  const [own_members, setown_members] = useState('');
  const [opp_members, setopp_members] = useState(''); 
  const [prime, setprime] = useState(''); 
  const [percent, setpercent] = useState(''); 
  const [own_prime, setown_prime] = useState(''); 
  const [opp_prime, setopp_prime] = useState(''); 
  const [mod_prime, setmod_prime] = useState('');
  const [text, settext] = useState('');
  

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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlViewDetails = async(value) =>{
    value = JSON.parse(value);

    setdatetext(value['datetext']);
    settimetext(value['timetext']);
    setown_members(value['own_members']);
    setopp_members(value['opp_members']);
    setprime(value['prime']);
    setpercent(value['value']);
    setown_prime(value['own_prime']);
    setopp_prime(value['opp_prime']);
    setmod_prime(value['mod_prime']);
    settext(value['text']);
    setdetailsshow(true);
  }

  const renderItem = ({ item }) => {
    const [key, value] = item;
    const listitem = key.split('_');
    if (listitem[0] == email){
        return (
          <TouchableOpacity
            onPress={ () => handlViewDetails(value)}
          >
            <View style={styles.item}>
              <Text style={styles.key}>{listitem[1]}</Text>
              <Text style={styles.value}>{listitem[2]}</Text>
            </View>
          </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.listcontainer} >

      <View style={styles.item}>
        <Text style={styles.key}>日付</Text>
        <Text style={styles.value}>時間</Text>
      </View>
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
      </View>

      { detailsshow &&
        <View style={styles.detailscontainer}>
          <Text>自分側の人数：{own_members}人</Text>
          <Text>相手側の人数：{opp_members}人</Text>
          <Text>金額：{prime}円</Text>
          <Text>支払い割合</Text>
          <Text>  自分側  {percent}: {100 - percent}  相手側</Text>
          <Text>自分側：{own_prime} 円/人</Text>
          <Text>相手側：{opp_prime} 円/人</Text>
          <Text>お釣り：{mod_prime} 円</Text>
          <Text>備考：{text} </Text>

        </View>

      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'top',
    backgroundColor: '#f5f5f5',
    flexDirection:'row'
  },
  listcontainer:{
    width: '55%',
    borderRightColor: '#ccc',
    borderRightWidth: 3,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection:'row',

    paddingVertical:10,
    
  },
  key: {
    flex:1,
    width: "50%",
    left: '50%',
    justifyContent: 'center',
    alignItems:'center',
    alignSelf:'center',
    fontWeight: 'bold',
    fontSize: 14,

  },
  value: {
    flex:1,
    width:"50%",
    left: '70%',
    justifyContent: 'center',
    alignItems:'center',
    alignSelf:'center',
    fontSize: 16,
  },
  error: {
    color: 'red',
    margin: 20,
  },
  detailscontainer :{
    padding:5,
    justifyContent: 'center',
    alignItems:'right',
    alignSelf:'center',
  }
});

export default ShowResultScreen;
