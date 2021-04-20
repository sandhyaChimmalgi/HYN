import React from 'react';
import {View,Text,Image,TouchableOpacity} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import MyHeader from '../components/MyHeader';
import RequestForHelp from './RequestForHelpScreen'
export default class HomeScreen extends React.Component{
    constructor(){
        super();
    }
        
    render(){
        return(
            <View style = {{flex:1, alignItems:'center'}}>
                <MyHeader
                    title = {'Help Your Neighbour'}
                    navigation = {this.props.navigation}
                />
                
                <Image
                    style = {{width:200,height:200,marginBottom:100}}
                    source = {require('../assets/logo.png')}
                />
                <TouchableOpacity style = {{   width:'55%',
                        height:'10%',
                        alignItems:'center',
                        justifyContent:'center',
                        borderWidth:1,
                        borderRadius:RFValue(3),
                        marginTop:60,
                        
                        backgroundColor:'#32867d'}}
                        onPress ={()=>{
                            this.props.navigation.navigate('Volenteer')
                        }}
                        >
                    <Text style = {{fontSize:20,fontWeight:'bold',color:'white'}}>
                        Volunteer
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style = {{   width:'55%',
                        height:'8%',
                        alignItems:'center',
                        justifyContent:'center',
                        borderWidth:1,
                        borderRadius:RFValue(3),
                        marginTop:80,
                        
                        backgroundColor:'#32867d'}}
                            onPress ={()=>{
                                this.props.navigation.navigate('Help')
                            }}
                        >
                    <Text style = {{fontSize:20,fontWeight:'bold',color:'white'}}>
                    Ask for Help
                     </Text>
                </TouchableOpacity>
                </View>
            
        )
    }
}