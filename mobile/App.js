import React, {Component} from 'react';
import {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {io} from 'socket.io-client';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatmessage: "",
      chatmessages:[]
    };
  }

  componentDidMount() {
    this.socket = io('http://192.168.56.1:3000/');
    this.socket.on("chat message",msg=>{
      this.setState({chatmessages:[...this.state.chatmessages,msg]});
    })
  }
  submitchatmessage(){
this.socket.emit("chat message",this.state.chatmessage)
this.setState({chatmessage:""})

  }

  render() {

    const chatmessages=this.state.chatmessages.map(chatmessage=>
      <Text key={chatmessage}>
{chatmessage}
      </Text>
      )
    return (
      <View style={{alignSelf: 'center', alignItems: 'center'}}>
        <Text>helloo welcome to react native</Text>
        <TextInput
        value={this.state.chatmessage}
          onSubmitEditing={()=>this.submitchatmessage()}
          autoCorrect={false}
          onChangeText={chatmessage => {
            this.setState({chatmessage});
          }}
          style={{
            borderWidth: 2,
            borderColor: 'black',
            width: 250,
            borderRadius: 20,
            height: 50,
            alignSelf: 'center',
            marginTop: 50,
          }}
        ></TextInput>

        {chatmessages}

       
      </View>
    );
  }
}
