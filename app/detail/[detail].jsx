import { View, Text, ScrollView, Image, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Dimensions } from 'react-native';
import tailwind from 'twrnc';
import { Colors } from '../../constants/Colors';
import { doc, getDoc } from '@firebase/firestore';
import { db } from '../utils/firebase';
import { Ionicons } from '@expo/vector-icons';
import { button, buttonContainer, buttonText } from '../../constants/button'; // Updated import
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailEvent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { width } = Dimensions.get('screen');
  const { detail } = useLocalSearchParams();

  const handleSave = async (item) => {
    try {
      const existingItems = await AsyncStorage.getItem('savedItems');
      let savedItems = existingItems ? JSON.parse(existingItems) : [];
      
      const exists = savedItems.some(savedItem => savedItem.id === item.id);
      
      if (!exists) {
        savedItems.push(item);
        await AsyncStorage.setItem('savedItems', JSON.stringify(savedItems));
        Alert.alert('Success', 'Event saved successfully');
      } else {
        Alert.alert('Info', 'Event is already saved');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save event');
      console.log('Error saving item:', error);
    }
  };

  const fetchSingleItem = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, 'events', detail);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setData({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log('No such document');
      }
    } catch (error) {
      console.log('Error fetching document:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleItem();
  }, [detail]);

  if (loading) {
    return (
      <View style={tailwind`flex-1 justify-center items-center -gray-100`}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={tailwind`flex-1 justify-center items-center -gray-100`}>
        <Text style={tailwind`text-lg text-gray-100`}>Event not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={tailwind`flex-1 -gray-100`}>
      <Image 
        source={{ uri: data?.image }} 
        style={[tailwind`w-full`, { height: width * 0.6 }]}
        resizeMode="cover"
      />

      <View style={tailwind`p-4 -white rounded-t-3xl mt-6`}>
        <Text 
          style={tailwind`text-2xl font-bold text-[${Colors.primary}] my-2`}
        >
          {data?.title}
        </Text>

        <Text 
          style={tailwind`text-gray-100 text-base mb-4 leading-6`}
        >
          {data?.description}
        </Text>

        <View style={tailwind`-gray-50 p-4 rounded-xl mb-4 flex-row gap-4 items-center justify-between`}>
          <View style={tailwind`flex-row items-center flex-1`}>
            <Ionicons name="location-outline" size={20} color={Colors.primary} />
            <Text style={tailwind`ml-2 text-gray-100 flex-1`} numberOfLines={1}>
              {data?.venue}
            </Text>
          </View>

          <View style={tailwind`flex-row items-center flex-1`}>
            <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
            <Text style={tailwind`ml-2 text-gray-100 flex-1`} numberOfLines={1}>
              {data?.date}
            </Text>
          </View>

          <View style={tailwind`flex-row items-center flex-1`}>
            <Ionicons name="time-outline" size={20} color={Colors.primary} />
            <Text style={tailwind`ml-2 text-gray-100 flex-1`} numberOfLines={1}>
              {data?.time}
            </Text>
          </View>
        </View>

        {/* Button */}
        <View>
          <TouchableOpacity 
            onPress={() => handleSave(data)} 
            style={[button, tailwind`rounded-xl flex-row items-center justify-center`]}
          >
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailEvent;