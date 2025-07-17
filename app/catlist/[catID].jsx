import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import tailwind from 'twrnc'
import { collection, getDocs, where ,query} from 'firebase/firestore'
import {db} from '../../utils/firebase'
import CardUi from '../components/CardUi'
const CatId = () => {
    const [Data, setData] = useState(null)
    const { catID } = useLocalSearchParams()

    const fetchCatData=async()=>{
        try {
            const q=query(collection(db,'events'),where('category','==',catID))
            const querySnapshot=await getDocs(q)
            const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setData(data)
            
        } catch (error) {
            console.log(error)
        }
    }

    console.log(catID)

    useEffect(()=>{
        fetchCatData()
    })

    const renderItem=({item})=>{
        return(
            <View style={tailwind`flex flex-col justify-center items-center`}>
                    <CardUi item={item} />
            </View>
        )
    }

  return (
    <View>
<FlatList data={Data }  renderItem={renderItem} horizontal={false}  />      
    </View>
  )
}

export default CatId