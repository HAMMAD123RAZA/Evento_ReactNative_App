import { View, Text, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import tailwind from 'twrnc'
import Headers from '../components/Headers'
import Slider from '../components/Slider'
import Cards from '../components/Cards'
import Upcoming from '../components/Upcoming'
import Category from '../components/Category'
import { Colors } from '@/constants/Colors'
import tw from 'twrnc'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase'
import Login from '../Login'
import Loading from '../components/Loading'

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [user, setUser] = useState(null)

  // Simulate data loading
  const loadData = useCallback(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
      setRefreshing(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    loadData()
  }, [loadData])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser)
    })
    return unsubscribe
  }, [])

  if (loading && !refreshing) {
    return (
<Loading/>
    )
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}  
          onRefresh={onRefresh}
          colors={['purple']} 
          tintColor={'purple'} 
          progressBackgroundColor={Colors.primary}
        />
      }
    >
      {!user ? (
        <Login/>
      ) : ( 
        <>
          <Headers/>
          <Slider/>
          <Category/>
          <Cards/>
          <Upcoming/>
        </>
      )}
    </ScrollView>
  )
}

export default Home