import React, {useState} from "react";
import { View, TouchableOpacity, StyleSheet, TextInput, Platform, Alert } from "react-native";
import { Text } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

function SaveResultScreen({ route, navigation }) {

    // 割り勘決算情報の受け取り
    const {email, own_members, opp_members, prime, value, own_prime, opp_prime, mod_prime} = route.params;
    
    // 備考欄入力用のフォーム
    const [Bt1_text, setBt1Text] = useState('開催日');
    const [Bt2_text, setBt2Text] = useState('開催時刻');
    const [Bt3_text, setBt3Text] = useState('自分側の人数:'+own_members);
    const [Bt4_text, setBt4Text] = useState('相手側の人数:'+opp_members);
    const [Bt5_text, setBt5Text] = useState('金額:'+prime);

    const [Bt6_text, setBt6Text] = useState('自分側: '+value+' : '+(100-value)+' 相手側');
    const [Bt7_text, setBt7Text] = useState('自分側: '+own_prime+'円/人');
    const [Bt8_text, setBt8Text] = useState('相手側: '+opp_prime+'円/人');
    const [Bt9_text, setBt9Text] = useState('お釣り: '+mod_prime+'円');


    const [text, setText] = useState("");

    // 時刻データを入力するようのフォーム
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    
    let insert_date = year + '-' + month + '-' + day + 'T09:00:00.000Z';
    const [date, setDate] = useState(new Date(insert_date));
    const [datePickerVisible, setDatePickerVisible] = useState(Platform.OS === 'ios');
    const [timePickerVisible, setTimePickerVisible] = useState(Platform.OS === 'ios');
    
    const [data, setData] = useState(null);

    // 時分の表示フォーマット
    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };
  
    // 年月日変更時に呼ばれる
    const onDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setDatePickerVisible(Platform.OS === 'ios');
      setDate(currentDate);
    };
  
    // 時分変更時に呼ばれる
    const onTimeChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setTimePickerVisible(Platform.OS === 'ios');
      setDate(currentDate);
    };  

    const handleSave = async() =>{
        const save_prime = {
            'datetext': date.toLocaleDateString(),
            'timetext': date.toLocaleTimeString('ja-JP', timeOptions),
            'own_members':own_members,
            'opp_members': opp_members,
            'prime': prime,
            'value':value,
            'own_prime': own_prime,
            'opp_prime': opp_prime,
            'mod_prime': mod_prime,
            'text':text
        }
        setData(save_prime);    

        try {
            let today = new Date();
            // 入力値をAsyncStorageに保存
            key = email +'_'+ date.toLocaleDateString()+'_' + date.toLocaleTimeString('ja-JP', timeOptions)+'_'+today;
            await AsyncStorage.setItem(key, JSON.stringify(save_prime));
            Alert.alert('保存しました', )
            navigation.navigate('Warikan_main', email);

        } catch (error) {
                console.error('Failed to save data to AsyncStorage:', error);
        }
    }

    return(
        <View style={styles.container}> 
            <View style={styles.rowview}>
                <Text style={styles.text}>{Bt1_text}</Text>
                    {datePickerVisible &&
                        <DateTimePicker
                        value={date}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onDateChange}
                        locale="ja-JP"
                        style={{marginBottom: 10}}
                        />
                    }
            </View>
            
                <View style={styles.rowview}> 
                    <Text style={styles.text}>{Bt2_text}</Text>
                        {timePickerVisible &&
                            <DateTimePicker
                                value={date}
                                mode="time"
                                is24Hour={true}
                                display="default"
                                onChange={onTimeChange}
                                locale="ja-JP"
                                style={{marginBottom: 10}}
                                minuteInterval={30}
                            />
                        }
                </View> 
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {Platform.OS === 'android' &&
                        <TouchableOpacity 
                        onPress={() => setDatePickerVisible(true)} 
                        style={{ borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 20, borderRadius: 5 }}
                        >
                        <Text style={{ fontSize: 16 }}>{date.toLocaleDateString()}</Text>
                        </TouchableOpacity>
                    }
                    {Platform.OS === 'android' &&
                        <TouchableOpacity 
                        onPress={() => setTimePickerVisible(true)} 
                        style={{ borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 20, borderRadius: 5 }}
                        >
                        <Text style={{ fontSize: 16 }}>{date.toLocaleTimeString('ja-JP', timeOptions)}</Text>
                        </TouchableOpacity>
                    }
                </View>

                
                <Text style={styles.text}>{Bt3_text}</Text> 
                <Text style={styles.text}>{Bt4_text}</Text> 

                <Text style={styles.text}>{Bt5_text}</Text>

                <Text style={styles.text}>{Bt6_text} </Text> 

                <Text style={styles.text}>{Bt7_text}</Text> 
                <Text style={styles.text}>{Bt8_text}</Text>
                <Text style={styles.text}>{Bt9_text}</Text>
                <Text style={styles.text}>{text}</Text>

                <View style={styles.rowview}>
                    <Text>備考</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="備考を入力"
                        value={text}
                        onChangeText={setText}
                        maxLength={400}
                    ></TextInput>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>登録</Text>
                </TouchableOpacity>
        </View>
    );   
}
    const styles = StyleSheet.create({
        container: {
            flex: 0.7,
            justifyContent: 'center',
            padding: 20,
        },
        rowview:{
            flex:1,
            flexDirection:'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal:"5%"
        },
        input: {
            height: 30,
            width: '80%',
            borderColor: '#ccc',
            borderWidth: 1,
            paddingHorizontal: 10,
        },
        text: {
            textAlign:'left',
            fontSize: 18
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
        datePicker: {
          width: 200,
          marginTop: 20,
        },
    })

export default SaveResultScreen;

