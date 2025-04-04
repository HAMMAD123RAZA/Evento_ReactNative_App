import { View, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import tailwind from 'twrnc';
import { useRouter } from 'expo-router';

const router =useRouter()
const icons = [
  {
    id: 1,
    name: 'musical-notes', // For "Music"
    cat:'music'
  },
  {
    id: 2,
    name: 'school', 
    cat:'career'
    // For "Education"
  },
  {
    id: 3,
    name: 'hardware-chip', // For "Tech"
    cat:'tech'

  },
  {
    id: 4,
    name: 'football', // For "Sports"
    cat:'sports'

  },
  {
    id: 5,
    name: 'game-controller', // For "Gaming"
    cat:'game'

  },
  {
    id: 6,
    name: 'heart', // For "Religious"
    cat:'religious'

  },
];

const renderItem = ({ item }) => (
  <TouchableOpacity onPress={() => router.push(`/catlist/${item.cat}`)} style={tailwind`mr-6 `}> 
    <Ionicons name={item.name} size={64} color={Colors.primary} />
  </TouchableOpacity>
);

const Category = () => {
  return (
    <View style={tailwind`flex flex-row items-center mb-4 mt-16`}>
      <FlatList
        data={icons}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} 
      />
    </View>
  );
};

export default Category;