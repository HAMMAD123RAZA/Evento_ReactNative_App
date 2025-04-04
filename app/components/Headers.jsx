import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, Stack, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import tailwind from 'twrnc'
import { Colors } from '@/constants/Colors'

const Headers = () => {
  const router=useRouter()
  return (
    <View  style={tailwind`flex flex-row justify-between items-center p-4 my-10`} >
      <Text style={tailwind`font-bold text-3xl text-[${Colors.primary}]`}>Evento</Text>
      <TouchableOpacity onPress={()=>router.push('/Saved')}>
      <Ionicons name="bookmark-outline" color={Colors.primary} size={32} /> 

      </TouchableOpacity>
      </View>
  )
}

export default Headers
