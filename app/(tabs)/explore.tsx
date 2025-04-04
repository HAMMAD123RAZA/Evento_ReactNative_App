import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import { Colors } from '@/constants/Colors'
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../utils/firebase';
import CardUi from '../components/CardUi';
import tailwind from 'twrnc';

const explore = () => {
const [Data, setData] = useState([])
const [Search, setSearch] = useState('')

const fetchData=async()=>{
  try {
    const docData=await getDocs(collection(db,'events'))
    const snap=docData.docs.map((doc)=>({id:doc.id,...doc.data()}))
    setData(snap)
    console.log(snap)
  } catch (error) {
    console.log('error occured in explore while fetching data:',error)
  }
}

useEffect(()=>{
  fetchData()
},[])

const renderItem=({item})=>{
  return (
    <View style={tailwind`mx-5`} >
<CardUi item={item} />
    </View>
  )
}

  const filteredData=Data.filter((item)=>item.title.toLowerCase().includes(Search.toLowerCase()))
  return (
    <>
    <View style={tailwind`mt-20 mb-6`} >
    <TextInput
  value={Search}
  onChangeText={(text) => setSearch(text)}
  placeholder='search here..'
  style={tailwind`p-4 mx-12 rounded-xl text-white bg-[${Colors.primary}]`}
/>
    </View>
<FlatList data={filteredData} renderItem={renderItem} horizontal={false}/>
    </>
  );
};

export default explore;
