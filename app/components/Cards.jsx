import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import CardUi from './CardUi'
import tailwind from 'twrnc'
import { Colors } from '@/constants/Colors'
import {collection, getDocs} from 'firebase/firestore'
import {db} from '../utils/firebase'

// const cardData=[
//     {
//       id:1,
//     title:'Concert',
//     Venue:'New York',
//     description:'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
//     image:'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     date:'2025-09-01',
//     time:'10:00'
  
//   },
//   {
//     id:2,
//     title:'Concert',
//     Venue:'New York',
//     description:'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
//     image:'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     date:'2025-09-01',
//     time:'10:00'
  
//   }
//   ,
//   {
//     id:3,
//     title:'Concert',
//     Venue:'New York',
//     description:'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
//     image:'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     date:'2025-09-01',
//     time:'10:00'
  
//   }
//   ,  {
//     id:4,
//     title:'Concert',
//     Venue:'New York',
//     description:'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
//     image:'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     date:'2025-09-01',
//     time:'10:00'
  
//   }
  
//   ]

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