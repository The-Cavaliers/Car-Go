import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage,
  TextInput
} from 'react-native';
import { StackNavigator } from 'react-navigation';


export default class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username: '',
            password: '',      
        };

        this._login = this._login.bind(this);
    }
    _login() {
        fetch('http://127.0.0.1:3000/mobile', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        })
        .then((response) => {
            return (response.json());          
        })
        .then((res) => {
         
            if(res.success === true) {
                let username = res.message;
                AsyncStorage.setItem('username', username);
                this.props.navigation.navigate("Profile");
            } else {
                alert('no user found');
            }
        })
        .catch((err)=> {
            alert(err);
            
        });
    }
    render() {
        return (
          <View style={styles.container}>
              <Image
                style={{width: 150, height: 150}}
                source={require('../assets/carpool.png')}
               />
               <Text style={styles.welcome}> Carpool Application</Text> 
               <View style={styles.inputContainer}>
               <TextInput underlineColorIos = 'transparent' style= {styles.input}
                  onChangeText={(username) => this.setState({username})}
                  value={this.state.username}
                  placeholder = 'username'>
               </TextInput> 
               <TextInput  secureTextEntry={true} underlineColorIos = 'transparent' style= {styles.input}
                  onChangeText={(password) => this.setState({password})}
                  value={this.state.password}
                 placeholder = 'password'>
               </TextInput>
               <TouchableOpacity onPress={this._login} style={styles.buttonContainer}>
                 <Text style={styles.buttonText}> Login</Text>
               </TouchableOpacity>  
               </View> 
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        flexGrow: 1,
        backgroundColor: '#1abc9c',
    },
    welcome: {
        textAlign: 'center',
        margin: 20,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color:'#fff',
        width: 160,
        opacity:0.6
    },
    inputContainer: {
        margin: 30,
        marginBottom: 0,
        padding: 10,
        paddingBottom: 10,
        alignSelf: 'stretch',
        width: 250,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'rgba(255,255,255,0.2)'

    },
    input: {
        fontSize: 16,
        height: 40,
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,1)'
    },
    buttonContainer: {
        alignSelf: 'stretch',
        margin: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#455A64',
    }
   
});