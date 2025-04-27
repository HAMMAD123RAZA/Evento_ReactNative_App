import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import tailwind from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import AdminCrud from '../profile/AdminCrud';
import UserProfile from '../profile/UserProfile';

const Profile = () => {

  return (
    <ScrollView
      contentContainerStyle={tailwind`items-center pt-20 pb-10`}
      showsVerticalScrollIndicator={false}
    >
      
<UserProfile/>
<AdminCrud/>

    </ScrollView>
  );
};

export default Profile;
