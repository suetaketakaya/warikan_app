import 'react-native-gesture-handler';

import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';


// Screens のインポート
import LoginScreen from './screens/LoginScreen';
import Warikan_main from './screens/Warikan_main';
import RegisterScreen from './screens/RegisterScreen';
import JasPayScreen from './screens/JasPayScreen';
import SaveResultScreen from './screens/SaveResultScreen';
import ShowResultScreen from './screens/ShowResultScreen';
import { enableScreens } from 'react-native-screens';

enableScreens();
const Stack = createNativeStackNavigator();

function CustomBackButton() {
  const navigation = useNavigation();
  return (
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
          <Text style={styles.buttonText}>←</Text>
      </TouchableOpacity>
  );
}


export default function App() {
  return (
    <NavigationContainer style={styles.container}> 
        <Stack.Navigator
          initialRouteName="LoginScreen" //最初の画面
          screenOptions={{
            title:'Warikan',
         }}
        >
            <Stack.Screen 
                name = "LoginScreen"
                component={LoginScreen} 
              />
            <Stack.Screen 
                name = "Warikan_main"
                component={Warikan_main} 
                options={{
                    title: 'Warikan ',
                    headerTitleAlign:'left',
                    headerLeft: () => <CustomBackButton />,
                }
              }
            />
            <Stack.Screen 
                name = "RegisterScreen" 
                component={RegisterScreen}
                options={{
                  title: 'Warikan ',
                  headerTitleAlign:'left',
                  headerLeft: () => <CustomBackButton />,
                }
              }
              />
            <Stack.Screen 
                name = "JasPayScreen" 
                component={JasPayScreen}
                options={{
                  title: 'Warikan ',
                  headerTitleAlign:'left',
                  headerLeft: () => <CustomBackButton />,
                }
              }
              />
              <Stack.Screen 
                  name = "SaveResultScreen" 
                  component={SaveResultScreen}
                  options={{
                    title: 'Warikan ',
                    headerTitleAlign:'left',
                    headerLeft: () => <CustomBackButton />,
                  }
                }
                />

              <Stack.Screen 
                  name = "ShowResultScreen" 
                  component={ShowResultScreen}
                  options={{
                    title: 'Warikan ',
                    headerTitleAlign:'left',
                    headerLeft: () => <CustomBackButton />,
                  }
                }
                />
        </Stack.Navigator>    
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 24,
    marginBottom: 20,

  },
  button: {
    backgroundColor: "#00CCFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#CCFFFF',
    fontSize: 18,
  },
});

