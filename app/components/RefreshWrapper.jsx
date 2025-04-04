import { View, Text, ScrollView, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../constants/Colors';

const RefreshWrapper = ({children,onRefresh}) => {
    const [Refreshing, setRefreshing] = useState(false)
    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        await onRefresh(); // Your refresh logic
        setRefreshing(false);
      }, [onRefresh]);
    
  return (
    <>
<ScrollView
refreshControl={
    <RefreshControl 
    refreshing={Refreshing}
    onRefresh={handleRefresh}
    colors={Colors.primary} 
    tintColor="#000000" 

    />
    
}
contentContainerStyle={{
    flexGrow: 1
}}
>
{children}
</ScrollView>

    </>
  )
}

export default RefreshWrapper