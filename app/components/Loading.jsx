import { View, Text } from 'react-native'
import React from 'react'
import {Colors} from '../../constants/Colors'
import tailwind from 'twrnc'
const Loading = () => {
  return (
    <>
     <View style={tailwind`flex-1 justify-center items-center`}>       
        <Text style={tailwind`w-10 h-10 border-t-4 border-b-4 border-[${Colors.primary}] rounded-full animate-spin text-[${Colors.primary}] border-2`}></Text>
      </View>
          </>
  )
}

export default Loading