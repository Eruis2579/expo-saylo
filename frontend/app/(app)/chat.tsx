// components/ChatScreen.tsx
import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hey! How are you?', sender: 'other', time: '10:02 AM' },
    { id: '2', text: "I'm good! You?", sender: 'me', time: '10:03 AM' },
  ]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

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
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        inverted
        contentContainerStyle={{ padding: 12 }}
        showsVerticalScrollIndicator={false}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
        style={styles.inputWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Send</Text>
        </TouchableOpacity>
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
    inputWrapper: {
      flexDirection: 'row',
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: '#ddd',
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      padding: 12,
      backgroundColor: '#f1f1f1',
      borderRadius: 20,
      fontSize: 16,
    },
    sendButton: {
      marginLeft: 8,
      paddingVertical: 10,
      paddingHorizontal: 16,
      backgroundColor: '#0b81ff',
      borderRadius: 20,
    },
  });
  
export default ChatScreen;
