import React, {useState} from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Text } from 'react-native-elements'
import Slider from '@react-native-community/slider'; // React Native 用

const Warikan_main = ({route, navigation}) => {
    const email = route.params;
    const [own_members, setown_members] = useState('');
    const [opp_members, setopp_members] = useState('');
    const [prime, setprime] = useState(0);
    const [value, setValue] = useState(50);

    const [showText, setShowText] = useState(false);
    const [showSecondButton, setShowSecondButton] = useState(false);

    const [calculate_ownprime, setownText] = useState('')
    const [calculate_oppprime, setoppText] = useState('')
    const [calculate_modprime, setmodText] = useState('')

    const handleCalculate = async () => {
        if (opp_members == '' || own_members == '' || prime == ''){
            Alert.alert('入力欄を確認してください', '空欄になっている箇所があります。');
            setShowText(false);
            setShowSecondButton(false);  
        }else if (opp_members == 0 || own_members == 0 || prime == 0){
            setShowText(false);
            setShowSecondButton(false);  
            Alert.alert('入力欄を確認してください', '1以上の数字を入力してください。');
        }else if (own_members != '' && opp_members != '' && prime != ''){

            tmp_own_prime = (prime * ( value / 100 ) ) / own_members
            own_prime = Math.ceil(tmp_own_prime / 100) * 100
            tmp_opp_prime = ( prime - (own_prime * own_members) ) / opp_members
            opp_prime = Math.ceil(tmp_opp_prime / 100) * 100
            
            if(opp_prime < 0){
                opp_prime = 0
            }
            mod_prime = ( ( own_prime * own_members ) + ( opp_prime * opp_members)) - prime
            
            setownText(`自分側: ${own_prime} 円/人`);
            setoppText(`相手側: ${opp_prime} 円/人`);
            setmodText(`お釣り: ${mod_prime} 円`);
            setShowText(true);
            setShowSecondButton(true);  
        }
    };

    const handleJasPay = async () => {
        navigation.navigate('JasPayScreen', {own_prime, opp_prime})
    }

    const handleSaveResult = async() =>{
        if(showText && showSecondButton)
            navigation.navigate('SaveResultScreen', {email, own_members, opp_members, prime, value, own_prime, opp_prime, mod_prime})
    }

    const handleShowResult = async() => {
        navigation.navigate('ShowResultScreen', {email});
    }
    return(
        <View style={styles.container}>
            <View style={styles.rowview}>
                <Text style={styles.title}>自分の人数：</Text>
                <TextInput
                    keyboardType="number-pad"
                    style={styles.input}
                    placeholder="1~99の数値を入力"
                    lowerLimit={1}
                    maxLength={2}
                    upperLimit={99}
                    value={own_members}
                    onChangeText={setown_members}
                />
            </View>
            <View style={styles.rowview}>
                <Text style={styles.title}>相手の人数：</Text>
                <TextInput
                    keyboardType="number-pad"
                    style={styles.input}
                    placeholder="1~99の数値を入力"
                    value={opp_members}
                    lowerLimit={1}
                    maxLength={2}
                    upperLimit={99}
                    onChangeText={setopp_members}
                />
            </View>
            <View style={styles.rowview}>
                <Text style={styles.title}>金額：</Text>
                <TextInput
                    keyboardType="number-pad"
                    style={styles.input}
                    maxLength={6}
                    placeholder="1~999999の数値を入力"
                    value={prime}
                    lowerLimit={1}
                    upperLimit={999999}
                    onChangeText={setprime}
                />
            </View>
            <Text style={styles.subtitle}>支払い割合</Text>
            <View style={styles.rowview}>
                <Text>自分側</Text>
                <Slider
                    value={value}
                    onValueChange={setValue}
                    aria-labelledby="percent-slider"
                    valueLabelDisplay="auto"
                    step={10}
                    minimumTrackTintColor="#FD7E00"
                    maximumTrackTintColor="#BCE2E8"
                    minimumValue={0}
                    maximumValue={100}
                    lowerLimit={0}
                    upperLimit={100}
                    style={styles.slider}
                />
                <Text>相手側</Text>
            </View>
            <Text style={styles.label}>自分側の支払い割合: {value}%</Text>
            
            <TouchableOpacity style={styles.button} onPress={handleCalculate}>
                <Text style={styles.buttonText}>計算する</Text>
            </TouchableOpacity>
            
            {showText && <Text style={styles.text}>{calculate_ownprime}</Text>}
            {showText && <Text style={styles.text}>{calculate_oppprime}</Text>}
            {showText && <Text style={styles.text}>{calculate_modprime}</Text>}

            {showSecondButton && 
            <TouchableOpacity style={styles.button} onPress={handleJasPay}>
                <Text style={styles.buttonText}>PayPay link</Text>
            </TouchableOpacity>}
   

            <View style={styles.rowview}>
                <TouchableOpacity style={styles.button} onPress={handleSaveResult}>
                    <Text style={styles.buttonText}>結果を登録する</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleShowResult}>
                    <Text style={styles.buttonText}>履歴を表示する</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.65,
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
    title: {
        width:'20%',
        fontSize: 10,
        textAlign: 'right',
    },
    subtitle:{
        textAlign:'center'
    },
    input: {
        height: "35%",
        width: '80%',
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginHorizontal:10,
        marginTop: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
    },  
    label: {
        textAlign: 'center'
    },
    slider: {
        width: '96%',
    },
    text: {
        marginVertical:2,
        fontSize: 14,

    }
});
export default Warikan_main;