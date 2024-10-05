import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from 'react-native-elements'

function OpeningScreen({ navigation }) {
    const [titleText, setTitleText] = useState('OpeningScreen');
    const [ButtonText, setButtonText] = useState('ようこそ');

    const handleClick = () => {
        navigation.navigate("LoginScreen");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{titleText}</Text>
            <TouchableOpacity style={styles.button} onPress={handleClick}>
                <Text style={styles.buttonText}>{ButtonText}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        marginBottom: 20,
    },
    button: {
        padding: 10,
        backgroundColor: 'Green',
        borderRadius: 5,
    },
    buttonText: {
        color: '#00F',
        fontSize: 18,
    },
});

export default OpeningScreen;
