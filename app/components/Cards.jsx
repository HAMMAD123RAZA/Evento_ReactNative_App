import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import CardUi from './CardUi'
import tailwind from 'twrnc'
import { Colors } from '@/constants/Colors'
import {collection, getDocs} from 'firebase/firestore'
import {db} from '../../utils/firebase'


const Cards = () => {
  const [Event, setEvent] = useState([])
  const getData=async()=>{
    try {
      const doc=await getDocs(collection(db,'events'))
      const data=doc.docs.map((doc)=>({id:doc.id,...doc.data()}))
      setEvent(data)
      console.log('data:',data)
    } catch (error) {
      console.log("error from fetching events:",error)
    }
  }
  
  useEffect(()=>{
    getData()
  },[])
  
  const renderItem=({item})=>{
    return(
      <View key={item.id}>
        <CardUi item={item} />
      </View>
    )
  }
  


  return (
    <View>
        <FlatList data={Event} renderItem={renderItem} horizontal showsHorizontalScrollIndicator={false} />
    </View>
  )
}

export default Cards