import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import tailwind from 'twrnc';
import { useRouter } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';

const CardUi = ({ item }) => {
  const router = useRouter();
  
  if (!item) return null;

  return (
    <TouchableOpacity
      onPress={() => router.push(`/detail/${item.id}`)}
      style={tailwind`bg-gray-500 p-4 w-72 m-4 rounded-xl shadow-md`}
    >
      <View style={tailwind`flex flex-row`}>
        <Image
          source={{ uri: item.image || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} // Fallback image
          style={tailwind`w-24 h-36 rounded-xl`}
        />
        
        <View style={tailwind`flex-1 ml-3`}>
          <Text style={[tailwind`font-bold text-base`, { color: Colors.primary }]}>
            {item.title || 'Untitled'}
          </Text>
          
          <Text
            style={[tailwind`text-sm mt-1`, { color: Colors.primary }]}
            numberOfLines={3}
          >
            {item.description ? item.description.substring(0, 120) : 'No description available'}
          </Text>
        </View>
      </View>
      
      <View style={tailwind`flex flex-row justify-between items-center mt-4`}>
        <View style={tailwind`flex flex-row items-center`}>
          <Feather name="calendar" size={16} color={Colors.primary} />
          <Text style={[tailwind`ml-2 text-sm`, { color: Colors.primary }]}>
            {item.date || 'TBD'}
          </Text>
        </View>
        
        <View style={tailwind`flex flex-row items-center`}>
          <Feather name="clock" size={16} color={Colors.primary} />
          <Text style={[tailwind`ml-2 text-sm`, { color: Colors.primary }]}>
            {item.time || 'TBD'}
          </Text>
        </View>
        
        <View style={tailwind`flex flex-row items-center`}>
          <Ionicons name="location-outline" size={16} color={Colors.primary} />
          <Text style={[tailwind`ml-2 text-sm`, { color: Colors.primary }]}>
            {item.venue || 'TBD'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardUi;