import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import Headers from '../components/Headers'
import Slider from '../components/Slider'
import Cards from '../components/Cards'
import Upcoming from '../components/Upcoming'
import Category from '../components/Category'

const Home = () => {
  return (
    <ScrollView>
      <Headers/>
      <Slider/>
      <Category/>
      <Cards/>
      <Upcoming/>
    </ScrollView>
  )
}

export default Home