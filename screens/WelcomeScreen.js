import React from 'react';
import { StyleSheet, Text, View ,Image,TextInput,TouchableOpacity, Alert,Modal,ScrollView,KeyboardAvoidingView  } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import db from '../config';
import firebase from 'firebase'
export default class WelcomeScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            emailID:'',
            password:'',
            firstName:'',
            lastName:'',
            address:'',
            contact:'',
            confirmPassword:'',
            isModalVisible:false,
        }
    }
    userSignUp = (emailID,password,confirmPassword)=>{
        if(password !== confirmPassword){
            return Alert.alert('password does not matchCheck your password')
        }else{
            firebase.auth().createUserWithEmailAndPassword(emailID, password)
     .then(()=>{
       db.collection('users').add({
         first_name:this.state.firstName,
         last_name:this.state.lastName,
         contact:this.state.contact,
         email_id:this.state.emailID,
         address:this.state.address,
         
       })
       return  Alert.alert(
            'User Added Successfully',
            '',
            [
              {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
            ]
        );
     })
     .catch((error)=> {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       return Alert.alert(errorMessage)
     });
        }
    }
    userLogin = (emailID, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailID, password)
        .then(()=>{
          this.props.navigation.navigate('Home')
        })
        .catch((error)=> {
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage)
        })
      }
      showModal = ()=>{
        return(
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isModalVisible}
          >
          <View style={styles.modalContainer}>
            <ScrollView style={{width:'100%'}}>
              <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text
                style={styles.modalTitle}
                >Registration</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder ={"First Name"}
                maxLength ={8}
                onChangeText={(text)=>{
                  this.setState({
                    firstName: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Last Name"}
                maxLength ={8}
                onChangeText={(text)=>{
                  this.setState({
                    lastName: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Contact"}
                maxLength ={10}
                keyboardType={'numeric'}
                onChangeText={(text)=>{
                  this.setState({
                    contact: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Address"}
                multiline = {true}
                onChangeText={(text)=>{
                  this.setState({
                    address: text
                  })
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder ={"Email"}
                keyboardType ={'email-address'}
                onChangeText={(text)=>{
                  this.setState({
                    emailID: text
                  })
                }}
              /><TextInput
                style={styles.formTextInput}
                placeholder ={"Password"}
                secureTextEntry = {true}
                onChangeText={(text)=>{
                  this.setState({
                    password: text
                  })
                }}
              /><TextInput
                style={styles.formTextInput}
                placeholder ={"Confrim Password"}
                secureTextEntry = {true}
                onChangeText={(text)=>{
                  this.setState({
                    confirmPassword: text
                  })
                }}
              />
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={()=>
                    this.userSignUp(this.state.emailID, this.state.password, this.state.confirmPassword)
                  }
                >
                <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={()=>this.setState({"isModalVisible":false})}
                >
                <Text style={{color:'#ff5722'}}>Cancel</Text>
                </TouchableOpacity>
              </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </Modal>
      )
      }
    render(){
        return(
            <View style = {styles.container}>
                {this.showModal()}
                <View style = {{marginTop:'5%',marginBottom:'2%'}}>
                <Image
                    style = {{width:200,height:200}}
                    source = {require('../assets/logo.png')}

                />
                </View>
                <Text style = {styles.title}>Help Your Neighbour</Text>
                <View >
                    <TextInput
                        style = {styles.loginBox}
                        placeholder = {'abc@example.com'}
                        keyboardType ='email-address'
                        onChangeText = {(t)=>{
                            this.setState({
                                emailID:t
                            })
                        }}
                    />
                    <TextInput
                        style = {styles.loginBox}
                        placeholder = {'Password'}
                        secureTextEntry = {true}
                        onChangeText = {(t)=>{
                            this.setState({
                                password:t
                            })
                        }}
                    />
                </View>
                        <View>
                            <TouchableOpacity style = {styles.loginButton} onPress = {()=>{
                                this.userLogin(this.state.emailID,this.state.password)
                            }}>
                                <Text style = {styles.loginButtonText}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.loginButton} onPress = {()=>{
                                this.setState({
                                    isModalVisible:true
                                })
                            }}>
                                <Text style = {styles.loginButtonText}>Register</Text>
                            </TouchableOpacity>
                        </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        
        alignItems:'center',
        backgroundColor:'#ffffff'
    },  
    title:{
        fontWeight:'bold',
        textAlign:'center',
        fontSize:40,
        color:'#E8833A',
        fontFamily:'Times New Roman, Times, serif',
    },
    loginBox:{
        marginTop:30,
        width:250,
        height:35,
        borderWidth:1,
        borderRadius:10
    },
    loginButton:{
        width:70,
        height:40,
        marginTop:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#D3455B',
        borderRadius:10
    },
    loginButtonText:{
        fontWeight:'bold',
        justifyContent:'center'
        
    },
    modalTitle :{
        justifyContent:'center',
        alignSelf:'center',
        fontSize:30,
        color:'#ff5722',
        margin:50
      },
      modalContainer:{
        flex:1,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ffff",
        marginRight:30,
        marginLeft : 30,
        marginTop:80,
        marginBottom:80,
      },
      formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10,
        marginTop:RFValue(15),
      },
      registerButton:{
        width:'75%',
        height:RFValue(50),
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:RFValue(3),
        marginTop:RFValue(20),
        backgroundColor:'#32867d'
      },
      registerButtonText:{
        color:'#ff5722',
        fontSize:15,
        fontWeight:'bold'
      },
      cancelButton:{
        width:200,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
      },
     
      button:{
        width:300,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:"#ff9800",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        padding: 10
      },
      buttonText:{
        color:'#ffff',
        fontWeight:'200',
        fontSize:20
      }
})