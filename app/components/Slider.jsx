import { View, Text, FlatList, Dimensions, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Image } from 'react-native'
import tailwind from 'twrnc';
const data = [
  {
    id: 1,
 Rob: true, // Ensure IDs are strings or unique numbers
    imageUrl:
      'https://media.istockphoto.com/id/2080779787/photo/singer-of-music-band-performing-on-stage-light-and-smoke-effects.jpg?s=1024x1024&w=is&k=20&c=w8BaZywQC6FE4-HkJsUAIyIFoqUVt8ZiWvI2qCgSnQ8=',
  },
  {
    id: 2,
    imageUrl:
      'https://media.istockphoto.com/id/2080779787/photo/singer-of-music-band-performing-on-stage-light-and-smoke-effects.jpg?s=1024x1024&w=is&k=20&c=w8BaZywQC6FE4-HkJsUAIyIFoqUVt8ZiWvI2qCgSnQ8=',
  },
  {
    id: 3,
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1682497887035-c5412e60d1e4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    imageUrl:
      'https://media.istockphoto.com/id/1080830898/photo/band-of-two.jpg?s=1024x1024&w=is&k=20&c=TL3RhsJHBX6M5hTd37RS_h_sR84nfGZOxQRgapFLiCY=',
  },
  {
    id: 5,
    imageUrl:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const Slider = () => {
    const flatListRef = useRef(null);
const [currentIndex, setCurrentIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
    flatListRef.current.scrollToIndex({
      index: currentIndex === data.length - 1 ? 0 : currentIndex + 1,
      animated: true,
    });
  }, 2000);

  return () => clearInterval(interval);
}, [currentIndex]);

    const renderItem=({item})=>{
  
  return (
      <View key={item.id} style={tailwind`px-3 `} >
          <Image source={{uri:item.imageUrl}}  style={tailwind`opacity-50 bg-gray-100 rounded-lg`}  height={150} width={Dimensions.get('screen').width-20} />
      </View>
  )
}



return (
<View>
<FlatList ref={flatListRef} data={data} 
renderItem={renderItem}
keyExtractor={(item)=>item.id.toString()}
horizontal
pagingEnabled
showsHorizontalScrollIndicator={false} />
</View>
)
}

export default Slider

