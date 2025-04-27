import { FlatList, StyleSheet, Text, TextInput, View, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import { Colors } from '@/constants/Colors'
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../utils/firebase';
import CardUi from '../components/CardUi';
import tailwind from 'twrnc';
import LoadingSpinner from '../components/Loading';

const Explore = () => {
  const [Data, setData] = useState([])
  const [Search, setSearch] = useState('')
  const [Loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      const docData = await getDocs(collection(db, 'events'))
      const snap = docData.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setData(snap)
      console.log(snap)
    } catch (error) {
      console.log('error occurred in explore while fetching data:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onRefresh = () => {
    setRefreshing(true)
    fetchData()
  }


  if (Loading && !refreshing) {
    return (
<LoadingSpinner/>
    )
  }
  const renderItem = ({ item }) => {
    return (
      <View style={tailwind`mx-5`}>
        <CardUi item={item} />
      </View>
    )
  }

  const filteredData = Data.filter((item) => 
    item.title.toLowerCase().includes(Search.toLowerCase())
  )

  return (
    <>
      <View style={tailwind`mt-20 mb-6`}>
        <TextInput
          value={Search}
          onChangeText={(text) => setSearch(text)}
          placeholder='search here..'
          placeholderTextColor='white'
          style={tailwind`p-4 mx-12 rounded-xl text-white bg-[${Colors.primary}]`}
        />
      </View>
      <FlatList 
        data={filteredData} 
        renderItem={renderItem} 
        horizontal={false}
        refreshControl={<RefreshControl
          onRefresh={onRefresh}
          refreshing={refreshing}
          colors={['purple']}
          tintColor={'purple'}
          progressBackgroundColor={Colors.primary}
          />}
        />
    </>
  )
}

export default Explore