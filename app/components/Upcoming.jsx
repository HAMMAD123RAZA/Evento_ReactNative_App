import { collection, getDocs, query, where } from '@firebase/firestore'
import React, { useEffect } from 'react'
import { db } from '../../utils/firebase'
import { FlatList } from 'react-native'
import CardUi from '../components/CardUi'

function Upcoming() {
  const [Event, setEvents] = React.useState([])

  const fetchData = async () => {
    const eventsRef = collection(db, "events")
    const q = query(eventsRef, where("flag", "==", "upcoming"))
    
    const querySnapshot = await getDocs(q)
    const events = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
    setEvents(events)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const renderItem = ({item}) => {
    return (
      <>
        <CardUi item={item} />
      </>
    )
  }
  
  return (
    <>
      <FlatList 
        data={Event}
        renderItem={renderItem}
        horizontal={true} 
      />
    </>
  )
}

export default Upcoming 

