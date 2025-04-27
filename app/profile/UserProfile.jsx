import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import tailwind from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { addDoc, collection } from '@firebase/firestore';
import { db } from '../utils/firebase';
import {auth} from '../utils/firebase'

const UserProfile = () => {
  const authUser = auth.currentUser

      const [message, setMessage] = useState('');
    
      const handleSendMessage =async () => {
        try {
          await addDoc(collection(db,'UserMessage'),{
            text:message,
            createdAt:new Date().toISOString(),
            userId:authUser?.uid
                  })
                  Alert.alert('Success', 'Message sent successfully! 😍');
                  setMessage('');
          
        } catch (error) {
          Alert.alert( 'Err sending msg 😒!');

        }

        if (message.trim() === '') {
          Alert.alert( 'Message is required 😒!');
          return;
        }
    
      };
    
  return (
    <>
<Ionicons name="person-circle-outline" size={160} color={Colors.primary} />

<Text style={[tailwind`py-1 text-xl`, { color: Colors.primary }]}>
{authUser?.email}</Text>

<View style={tailwind`py-4`}>
  <TextInput
    placeholder="Leave a message to us"
    placeholderTextColor={Colors.primary}
    value={message}
    onChangeText={setMessage}
    style={[
      tailwind`w-80 rounded-lg border-2 p-4 text-base text-white`,
      {
        borderColor: Colors.primary,
        height: 120,
        textAlignVertical: 'top',
      },
    ]}
    multiline
  />

  <TouchableOpacity
    onPress={handleSendMessage}
    style={[
      tailwind`w-80 mt-4 p-3 rounded-xl`,
      { backgroundColor: Colors.primary },
    ]}
  >
    <Text style={tailwind`text-white text-center font-semibold`}>
      Send Message
    </Text>
  </TouchableOpacity>
</View>
    </>
  )
}

export default UserProfile
