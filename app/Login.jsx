// screens/LoginScreen.js
import { Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Modal, TouchableOpacity } from 'react-native';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithCredential, 
  GoogleAuthProvider,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail
} from 'firebase/auth';
import { auth, db } from '../utils/firebase';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import tw from 'twrnc';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { addDoc, collection, query, where, getDocs } from '@firebase/firestore';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
// State management
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [resetEmail, setResetEmail] = useState('');
const [isLoginPressed, setIsLoginPressed] = useState(false);
const [isSignUpPressed, setIsSignUpPressed] = useState(false);
const [showForgotModal, setShowForgotModal] = useState(false);
const [resetStatus, setResetStatus] = useState('');
const [isLoading, setIsLoading] = useState(false);
const role = 'user';

const handleSignUp = async () => {
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = credential.user.uid;
    
    await addDoc(collection(db, "user"), {
      email: email.toLowerCase().trim(),
      role: role,
      createdAt: new Date().toISOString(),
      uid: uid
    });
  } catch (err) {
    alert(err.message);
  }
};

const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    alert(err.message);
  }
};

const checkUserExists = async (email) => {
  try {
    const normalizedEmail = email.toLowerCase().trim();
    const signInMethods = await fetchSignInMethodsForEmail(auth, normalizedEmail);
    return signInMethods.length > 0;
  } catch (error) {
    console.error("Error checking user:", error);
    return false;
  }
};

const handleForgotPassword = async () => {
  if (!resetEmail?.trim()) {
    setResetStatus('Please enter your email address');
    return;
  }

  setIsLoading(true);
  setResetStatus('');
  const normalizedEmail = resetEmail.toLowerCase().trim();

  try {
    const exists = await checkUserExists(normalizedEmail);
    
    if (!exists) {
      setResetStatus('No account found with this email address');
      setIsLoading(false);
      return;
    }

    await sendPasswordResetEmail(auth, normalizedEmail);
    setResetStatus(`Password reset sent to ${normalizedEmail}`);
    
    setTimeout(() => {
      setShowForgotModal(false);
      setResetEmail('');
      setResetStatus('');
    }, 2000);
    
  } catch (err) {
    setResetStatus(err.message.includes('user-not-found') 
      ? 'No account found with this email address'
      : `Error: ${err.message}`);
  } finally {
    setIsLoading(false);
  }
};

// Modal handlers
const handleOpenForgotModal = () => {
  setResetEmail('');
  setResetStatus('');
  setShowForgotModal(true);
};

const handleCloseForgotModal = () => {
  setShowForgotModal(false);
  setTimeout(() => {
    setResetStatus('');
    setResetEmail('');
  }, 300);
};

return (
    <LinearGradient
      colors={[' rgb(13, 2, 54)', 'rgb(109, 99, 99)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <View style={tw`flex-1 justify-center p-4 bg-transparent`}>
        <Text style={tw`text-4xl font-bold text-center mb-6 text-[${Colors.primary}]`}>Register</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={Colors.primary}
          autoCapitalize="none"
          keyboardType="email-address"
          style={[tw`border border-[${Colors.primary}] rounded-lg p-3 mb-4`, { color: 'white' }]}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={Colors.primary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={[tw`border border-[${Colors.primary}] rounded-lg p-3 mb-2`, { color: 'white' }]}
        />

        <TouchableOpacity 
          onPress={handleOpenForgotModal}
          style={tw`self-end mb-4`}
        >
          <Text style={tw`text-[${Colors.primary}] text-sm`}>Forgot Password?</Text>
        </TouchableOpacity>

        <Pressable
          onPress={handleLogin}
          onPressIn={() => setIsLoginPressed(true)}
          onPressOut={() => setIsLoginPressed(false)}
          style={[
            tw`px-4 py-2 rounded-lg border border-[${Colors.primary}]`,
            isLoginPressed ? { backgroundColor: `#f0c457` } : tw`bg-transparent`
          ]}
        >
          <Text style={tw`text-white text-center`}>Login</Text>
        </Pressable>

        <View style={tw`h-4`} />

        <Pressable
          onPress={handleSignUp}
          onPressIn={() => setIsSignUpPressed(true)}
          onPressOut={() => setIsSignUpPressed(false)}
          style={[
            tw`px-4 py-2 rounded-lg bg-[${Colors.primary}] border border-[${Colors.primary}]`,
            isSignUpPressed ? { backgroundColor: 'darkgoldenrod' } : null
          ]}
        >
          <Text style={tw`text-white text-center`}>Sign Up</Text>
        </Pressable>

        <View style={tw`h-8`} />
      </View>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={showForgotModal}
        onRequestClose={handleCloseForgotModal}
        backgroundColor={Colors.primary}
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-gray-900  rounded-lg p-6 w-4/5 max-w-sm`}>
            <Text style={tw`text-xl font-bold mb-4 text-gray-200`}>Reset Password</Text>
            
            {resetStatus ? (
              <Text style={tw`mb-4 ${
                resetStatus.includes('Error') || resetStatus.includes('No account') 
                  ? 'text-red-500' 
                  : 'text-pruple-600'
              }`}>
                {resetStatus}
              </Text>
            ) : null}
            
            <TextInput
              placeholder="Email"
              value={resetEmail}
              onChangeText={(text) => setResetEmail(text)}
              keyboardType="email-address"
              placeholderTextColor='white'
              autoCapitalize="none"
              style={tw`border border-gray-300 rounded-lg p-3 text-white mb-4`}
            />
            
            <View style={tw`flex-row justify-between`}>
              <Pressable
                onPress={handleCloseForgotModal}
                style={tw`px-4 py-2 rounded-lg border border-gray-300`}
              >
                <Text style={tw` text-center text-white`}>Cancel</Text>
              </Pressable>
              
              <Pressable
                onPress={handleForgotPassword}
                disabled={isLoading}
                style={tw`px-4 py-2 rounded-lg ${
                  isLoading ? 'bg-gray-400' : `bg-[${Colors.primary}]`
                } border ${isLoading ? 'border-gray-400' : `border-[${Colors.primary}]`}`}
              >
                <Text style={tw`text-white text-center`}>
                  {isLoading ? 'Checking...' : 'Reset'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}