import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useState } from 'react'
import tailwind from 'twrnc'
import { Colors } from '../../constants/Colors'
import CardUi from './CardUi'

const cardData=[
    {
      id:1,
    title:'Concert',
    Venue:'New York',
    description:'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    image:'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date:'2025-09-01',
    time:'10:00'
  
  },
  {
    id:2,
    title:'Concert',
    Venue:'New York',
    description:'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    image:'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date:'2025-09-01',
    time:'10:00'
  
  }
  ,
  {
    id:3,
    title:'Concert',
    Venue:'New York',
    description:'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    image:'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date:'2025-09-01',
    time:'10:00'
  
  }
  ,  {
    id:4,
    title:'Concert',
    Venue:'New York',
    description:'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    image:'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date:'2025-09-01',
    time:'10:00'
  
  }
  
  ]


const Upcoming = () => {
    const [Event, setEvent] = useState([])

  const renderItem=({item})=>{
    return(
      <View key={item.id}>
        <CardUi item={item} />
      </View>
    )
  }
  

  return (
    <View>
        <Text style={tailwind`text ml-5 font-bold text-2xl text-[${Colors.primary}] `}>Upcoming</Text>
        <FlatList data={cardData} renderItem={renderItem} horizontal={true} showsHorizontalScrollIndicator={false} />
    </View>
  )
}

export default Upcoming