// ChatScreen.js
import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Morning beautiful! Dreamed about you all night 💓 How's your day starting?",
      time: '14:40',
      fromMe: true,
    },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() === '') return;
    setMessages([...messages, {
      id: Date.now().toString(),
      text: input,
      time: new Date().toLocaleTimeString().slice(0, 5),
      fromMe: true,
    }]);
    setInput('');
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={[styles.messageContainer, item.fromMe ? styles.sent : styles.received]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.messagesList}
        inverted
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendText}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fce9f1',
    },
    messagesList: {
      padding: 16,
      flexGrow: 1,
      justifyContent: 'flex-end',
    },
    messageContainer: {
      maxWidth: '80%',
      padding: 10,
      borderRadius: 12,
      marginBottom: 10,
    },
    sent: {
      backgroundColor: '#fdd9ec',
      alignSelf: 'flex-end',
    },
    received: {
      backgroundColor: '#e6e6e6',
      alignSelf: 'flex-start',
    },
    messageText: {
      fontSize: 16,
      color: '#333',
    },
    messageTime: {
      fontSize: 10,
      color: '#666',
      alignSelf: 'flex-end',
      marginTop: 4,
    },
    inputContainer: {
      flexDirection: 'row',
      padding: 10,
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderColor: '#ddd',
    },
    input: {
      flex: 1,
      borderRadius: 20,
      backgroundColor: '#f0f0f0',
      paddingHorizontal: 15,
      fontSize: 16,
    },
    sendButton: {
      marginLeft: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendText: {
      fontSize: 24,
      color: '#d63384',
    },
  });
  