import { collection, deleteDoc, doc, getDocs } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native'
import { db } from '../../utils/firebase'
import CardListUi from './CardListUi'
import Modal from 'react-native-modal'
import tw from 'twrnc'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors'
import LoadingSpinner from '../components/Loading'

function MyEvents() {
  const [events, setEvents] = useState([])
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [eventToDelete, setEventToDelete] = useState(null)
  const [Loading, setLoading] = useState(false)
  const [refresh, setrefresh] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    const q = await getDocs(collection(db, "events"))
    const eventsData = q.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    setEvents(eventsData)
    setLoading(false)
    setrefresh(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onRefresh=()=>{
    setrefresh(true)
    fetchData()
  }

if (Loading) {
    return (
      <LoadingSpinner/>
    )
  }

  const showDeleteConfirmation = (id) => {
    setEventToDelete(id)
    setIsDeleteModalVisible(true)
  }

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "events", eventToDelete))
      setEvents(events.filter((item) => item.id !== eventToDelete))
      console.log('Deleted successfully')
    } catch (error) {
      console.log('Error in deletion: ', error)
    } finally {
      setIsDeleteModalVisible(false)
    }
  }

  const renderItem = ({ item }) => {
    return <CardListUi item={item} onDelete={() => showDeleteConfirmation(item.id)} />
  }

  return (
    <View style={tw`flex-1`}>
      <FlatList 
        data={events} 
        renderItem={renderItem} 
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`pb-4`}
        refreshControl={<RefreshControl
        onRefresh={onRefresh}
        refreshing={refresh}
        colors={['purple']}
        tintColor={'purple'}
        progressBackgroundColor={Colors.primary}
        />}
      />

      <Modal isVisible={isDeleteModalVisible}>
        <LinearGradient
          colors={['#9e9191', '#463296']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={tw`p-6 rounded-lg`}
        >
          
          <Text style={tw`text-white text-xl font-bold text-center mb-3`}>
            Delete Event
          </Text>
          <Text style={tw`text-white text-base text-center mb-6`}>
            Are you sure you want to delete this?
          </Text>

          <View style={tw`flex-row justify-between`}>
            <TouchableOpacity
              onPress={() => setIsDeleteModalVisible(false)}
              style={tw`bg-gray-200 px-6 py-3 rounded flex-1 mr-2`}
            >
              <Text style={tw`text-purple-700 font-bold text-center`}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDelete}
              style={tw`bg-[${Colors.primary}]   px-6 py-3 rounded flex-1 ml-2`}
            >
              <Text style={tw`text-white font-bold text-center`}>Delete</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>
    </View>
  )
}

export default MyEvents

