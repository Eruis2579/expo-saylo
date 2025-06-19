// components/ChatScreen.tsx
import HeaderBar from '@/components/Chat/HeaderBar';
import { useAuth } from '@/context/AuthContext';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatScreen = () => {
  const { scaleFont } = useAuth();
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hey! How are you?', sender: 'other', time: '10:02 AM' },
    { id: '2', text: "I'm good! You?", sender: 'me', time: '10:03 AM' },
  ]);
  const [input, setInput] = useState('');
  const [showSendBtn, setShowSendBtn] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(()=>{
    if(input.trim().length>0){
      if(!showSendBtn) setShowSendBtn(true);
    }else{
      if(showSendBtn) setShowSendBtn(false);
    }
  },[input])
  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'me',
      time: dayjs().format('hh:mm A'),
    };
    setMessages((prev) => [newMessage, ...prev]);
    setInput('');
  };
  setTimeout(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, 100);

  const renderItem = ({ item }: { item: any }) => {
    const isMe = item.sender === 'me';
    return (
      <View
        style={[
          styles.messageContainer,
          isMe ? styles.sentMessage : styles.receivedMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timestamp}>{item.time}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // adjust this if needed
      >
        <View style={{ flex: 1 }}>
          <HeaderBar />
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            inverted
            contentContainerStyle={{ padding: 12 }}
            showsVerticalScrollIndicator={false}
          />
          <View style={{
            flexDirection: 'row',
            paddingHorizontal: scaleFont(10),
            backgroundColor: '#fff',
            alignItems: 'center',
            height: scaleFont(44),
            gap: scaleFont(11)
          }}>
            <Image
              source={require('@/assets/images/chat/add.png')}
              style={{
                width: scaleFont(22.2),
                height: scaleFont(22.2),
              }}
            />
            <TextInput
              style={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                borderRadius: scaleFont(15),
                fontSize: scaleFont(16),
                height: scaleFont(27),
                borderWidth: scaleFont(0.4),
                borderColor: '#C9C4BB',
                paddingHorizontal: scaleFont(10),
                paddingVertical: scaleFont(5),
              }}
              value={input}
              onChangeText={setInput}
              onSubmitEditing={sendMessage}
            />
            {
              !showSendBtn ?
                <View style={{
                  paddingLeft: scaleFont(5),
                  paddingRight: scaleFont(12),
                  flexDirection: "row",
                  gap: scaleFont(12)
                }}>
                  <TouchableOpacity>
                    <Image
                      source={require('@/assets/images/chat/photo.png')}
                      style={{
                        width: scaleFont(22.2),
                        height: scaleFont(22.2),
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={require('@/assets/images/chat/voice.png')}
                      style={{
                        width: scaleFont(23.17),
                        height: scaleFont(23.17),
                      }}
                    />
                  </TouchableOpacity>
                </View> :
                <TouchableOpacity onPress={sendMessage}>
                  <Image
                    source={require('@/assets/images/chat/send.png')}
                    style={{
                      width: scaleFont(33),
                      height: scaleFont(32),
                    }}
                  />
                </TouchableOpacity>
            }
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  messageContainer: {
    maxWidth: '80%',
    borderRadius: 16,
    padding: 10,
    marginVertical: 6,
  },
  sentMessage: {
    backgroundColor: '#FCEFFB',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#F7F7F7',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#181818',
  },
  timestamp: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
});

export default ChatScreen;
