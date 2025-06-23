// components/ChatScreen.tsx
import HeaderBar from '@/components/Chat/HeaderBar';
import { useAppState } from '@/context/AppStateContext';
import { useAuth } from '@/context/AuthContext';
import { useSocket } from '@/context/SocketContext';
import { showToast } from '@/utils/showToast';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Advice = ({ item }: any) => {
  const { scaleFont, user } = useAuth();
  const [collapse, setCollapse] = useState(false);
  return (
    <>
      <TouchableOpacity onPress={() => setCollapse(!collapse)}>
        <View style={{
          marginTop: scaleFont(2),
          height: collapse ? "auto" : scaleFont(44),
          flexDirection: "row",
          paddingHorizontal: scaleFont(8),
          paddingVertical: scaleFont(7),
          gap: scaleFont(8),
          backgroundColor: "#F7F7F7",
          borderRadius: scaleFont(10),
          maxWidth: scaleFont(298),
          overflow: "hidden",
          ...(!collapse ? { alignItems: "center" } : {})
        }}>
          <Image
            source={require('@/assets/images/aicoach/small_sphere.png')}
            style={{
              width: scaleFont(24),
              height: scaleFont(25)
            }}
          />
          <View style={{
            paddingVertical: scaleFont(7)
          }}>
            <Text style={{
              fontFamily: "SFProBold",
              fontSize: scaleFont(12),
              lineHeight: scaleFont(14.4),
              color: '#5F5F5F'
            }}>{item.adviceSummary || `${user?.realname} seems excited about you!`}</Text>
            <Text style={{
              fontFamily: "SFPro",
              fontSize: scaleFont(12),
              lineHeight: scaleFont(14.4),
              width: scaleFont(248),
              color: '#5F5F5F',
              flexWrap: "wrap",
            }}>{item.advice}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  )
}

const ChatScreen = () => {
  const { scaleFont, user } = useAuth();
  const { socket } = useSocket();
  const { isForeground } = useAppState();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [showSendBtn, setShowSendBtn] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const [partnerOnline, setPartnerOnline] = useState(false);
  const [partnerLastOnlineAt, setPartnerLastOnlineAt] = useState<any>(null);
  useEffect(() => {
    if (input.trim().length > 0) {
      if (!showSendBtn) setShowSendBtn(true);
    } else {
      if (showSendBtn) setShowSendBtn(false);
    }
  }, [input])

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 'me',
      time: dayjs().format('hh:mm A'),
    };
    if (socket) {
      socket.emit('partner-message', false, input.trim(), newMessage.id);
    }
    else {
      showToast('Socket is not connected');
      return;
    }
    setMessages((prev) => [newMessage, ...prev]);
    setInput('');
  };

  setTimeout(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, 100);

  useEffect(() => {
    if (socket) {
      socket.emit('partner-message-get-list');
      socket.on('partner-message-get-list', (messages: any[]) => {
        // showToast(JSON.stringify(messages))
        setMessages(messages.reverse().map(v => ({
          ...v,
          time: dayjs(v.time).format('hh:mm A')
        })));
      })
      socket.on('partner-message', (message: any, id: string) => {
        const newMessage = {
          ...message,
          time: dayjs(message.time).format('hh:mm A')
        };
        if (id) setMessages((prev) => [
          ...prev.slice(0, prev.findIndex((item) => item.id === id)),
          newMessage,
          ...prev.slice(prev.findIndex((item) => item.id === id) + 1)
        ]);
        else setMessages(prev => [newMessage, ...prev]);
      });
      socket.on('partner-message-error', (message: string) => {
        showToast(message);
      });
      socket.on('partner-message-online', (online: boolean, lastOnlineAt: any) => {
        setPartnerOnline(online)
        setPartnerLastOnlineAt(lastOnlineAt)
      })
      return () => {
        socket.removeAllListeners('partner-message');
        socket.removeAllListeners('partner-message-error');
        socket.removeAllListeners('partner-message-get-list');
        socket.removeAllListeners('partner-message-online');
      };
    }
  }, [socket]);
  useEffect(() => {
    if (socket) {
      if (isForeground) {
        socket.on('partner-message-read', (ids: string[]) => {
          setMessages((prev) => prev.map((item) => (ids.includes(item.id) ? { ...item, isReaded: 1 } : item)));
        });
      }
      socket.emit('partner-message-online', isForeground);
      return () => {
        socket.emit('partner-message-online', false);
        socket.removeAllListeners('partner-message-read');
      }
    }
  }, [socket, isForeground]);
  useEffect(() => {
    if (socket && isForeground) {
      socket.emit('partner-message-read', messages.filter(v => v.isReaded === 0 && v.sender !== 'me').map(v => v.id));
    }
  }, [socket, messages, isForeground])
  const renderItem = ({ item }: { item: any }) => {
    const isMe = item.sender === 'me';
    return (
      <>

        {item.advice && (
          <Advice item={item} />
        )}
        <View
          style={
            {
              maxWidth: scaleFont(298),
              borderRadius: scaleFont(16),
              padding: scaleFont(10),
              marginVertical: scaleFont(6),
              alignSelf: isMe ? 'flex-end' : 'flex-start',
              backgroundColor: isMe ? '#FCEFFB' : '#F7F7F7',
            }
          }
        >
          <Text style={{
            fontSize: scaleFont(17),
            color: '#181818',
            lineHeight: scaleFont(22)
          }}>{item.text}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: scaleFont(8),
              alignSelf: 'flex-end',
              marginTop: scaleFont(4),
            }}
          >
            <Text style={{
              fontSize: scaleFont(13),
              color: '#9C9CA3',
              alignSelf: 'flex-end',
              lineHeight: scaleFont(16),
              letterSpacing: scaleFont(-0.41)
            }}>{item.time}</Text>
            {isMe && <Image
              source={item.isReaded ? require('@/assets/images/chat/read.png') : require('@/assets/images/chat/notread.png')}
              style={{
                width: scaleFont(15),
                height: scaleFont(10),
              }}
            />}
          </View>
          {!!isMe && <View
            style={{
              width: scaleFont(15),
              height: scaleFont(20),
              backgroundColor: "transparent",
              position: "absolute",
              right: -scaleFont(5),
              bottom: 0,
              borderLeftWidth: scaleFont(10),
              borderLeftColor: "#FCEFFB",
              borderBottomLeftRadius: scaleFont(16),
            }}
          >
          </View>}
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#FFFFFF',
    }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // adjust this if needed
      >
        <View style={{ flex: 1 }}>
          <HeaderBar partnerOnline={partnerOnline} partnerLastOnlineAt={partnerLastOnlineAt} />
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
            <TouchableOpacity>
              <Image
                source={require('@/assets/images/chat/add.png')}
                style={{
                  width: scaleFont(22.2),
                  height: scaleFont(22.2),
                }}
              />
            </TouchableOpacity>
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

export default ChatScreen;
