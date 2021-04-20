import React from 'react';
import firebase from 'firebase';
import {View,Text,TouchableOpacity,TextInput} from 'react-native';
import MyHeader from '../components/MyHeader';
import CalendarPicker from 'react-native-calendar-picker'
import db from '../config';
import DropDownPicker from 'react-native-dropdown-picker'
export default class RequestForHelp extends React.Component{
    constructor(){
        super();
        this.state = {
            city:'',
            helpRequired:'',
            userId:firebase.auth().currentUser.email,
            date:'',
            calenderIsVisible:false,
            selectedStartDate:'',
            finalDate:'',
        }
    }
    sendRequest= ()=>{
        db.collection('requests').add({
            user_id:this.state.userId,
            city:this.state.city,
            helpRequired:this.state.helpRequired,
            date:this.state.date,
        })
    }
    onDateChange=(date)=>{
        this.setState({
            selectedStartDate: date, 
            calenderIsVisible: false
          });
          
          var startDate =this.state.selectedStartDate ? this.state.selectedStartDate.toString() : '';
          console.log(startDate);
      
          this.state.month = startDate.substring(4,8).trim();
          console.log(this.state.month);
          this.state.year = startDate.substring(11,15);
          console.log(this.state.year);
          this.state.date = startDate.substring(8,10);
          console.log(this.state.date);
      
          var month = this.state.month;
          var monthNumber = ''
      
          switch(month){
            case 'Jan': 
              monthNumber='01'; break;
      
            case 'Feb': 
              monthNumber='02';break;
            case 'Mar': 
              monthNumber='03'; break;
      
            case 'Apr': 
              monthNumber='04';break;
            
            case 'May': 
              monthNumber='05';break;
      
            case 'Jun': 
              monthNumber='06';break;
      
            case 'July': 
              monthNumber='07';break;
      
            case 'Aug': 
              monthNumber='08';break;
      
            case 'Sep': 
              monthNumber='09';break;
      
            case 'Oct': 
              monthNumber='10';break;
      
            case 'Nov': 
              monthNumber='11';break;
              
            case 'Dec': 
              monthNumber='12';break;
      
            default:break;
          }
          console.log(monthNumber);
          
          var finalDate = monthNumber? (this.state.date+'/'+ monthNumber+'/'+this.state.year ): ''
      
          
          this.setState({ 
            finalDate: finalDate,
            
          });
      
          
    }
    render(){
        return(
            <View style = {{flex:1,alignItems:'center'}}>
            <MyHeader
                    title = {'Request For Help'}
                    navigation = {this.props.navigation}
                />
                

                
                <View>
                <DropDownPicker
                        items={[
                            {label: 'Bangalore', value: 'Bangalore', },
                            {label: 'Mysore', value: 'Mysore' },
                            {label: 'Mumbai', value: 'Mumbai' },
                        ]}
                        defaultValue={this.state.city}
                        containerStyle={{height: 40}}
                        style={{backgroundColor: '#fafafa',paddingBottom:-30,alignItems:'center',alignSelf:'center'}}
                        itemStyle={{
                            justifyContent: 'center'
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={item => this.setState({
                            city: item.value
                        })}
                    />
                    <TextInput
                        style = {{ width:"85%",
                        height:35,
                        alignSelf:'center',
                        borderColor:'#ffab91',
                        borderRadius:10,
                        borderWidth:1,
                        marginTop:50,
                        padding:10,}}
                        placeholder = {'Enter Date'}
                        onChangeText = {(t)=>{
                           this.setState({
                               calenderIsVisible:true,
                           })
                        }}
                        value = {this.state.finalDate}
                    />
                    <View>
                        {
                        this.state.calenderIsVisible ?
                        (
                            <CalendarPicker
                         onDateChange={this.onDateChange}
                                />
                                )
                                :
                                null
                        }
        </View>
                    
                    <TextInput
                        style = {{ width:"85%",
                        height:300,
                        alignSelf:'center',
                        borderColor:'#ffab91',
                        borderRadius:10,
                        borderWidth:1,
                        marginTop:30,
                        padding:10,}}
                        placeholder = {'Help Required'}
                        multiline
                        numberOfLines ={8}
                        onChangeText = {(t)=>{
                            this.setState({
                                helpRequired:t
                            })
                        }}
                    />

                </View> 
                <TouchableOpacity style = {{   width:'55%',
                        height:'8%',
                        alignItems:'center',
                        justifyContent:'center',
                        borderWidth:1,
                        borderRadius:4,
                        marginTop:90,
                        
                        backgroundColor:'#32867d'}}
                        onPress = {()=>{
                            this.sendRequest();
                        }}
                        >
                    <Text>Ask</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {{   width:'55%',
                        height:'8%',
                        alignItems:'center',
                        justifyContent:'center',
                        borderWidth:1,
                        borderRadius:4,
                        marginTop:70,
                        
                        backgroundColor:'#32867d'}}
                        
                        onPress  = {()=>{
                            this.setState({
                                city:'',
                                helpRequired:'',
                                finalDate:''
                            })
                        }}
                        >
                    <Text>Clear</Text>
                </TouchableOpacity>
            </View>
            
            
        )
    }
}