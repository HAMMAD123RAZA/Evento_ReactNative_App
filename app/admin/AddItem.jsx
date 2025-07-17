import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection } from '@firebase/firestore';
import { db } from '../../utils/firebase';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';

const AddEvent = () => {
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/diblqbuco/upload';
  const CLOUDINARY_UPLOAD_PRESET = 'evento_app';

  const [event, setEvent] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    description: '',
    flag: '',
    image: '',
    category: 'Social'
  });

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('');

  const categories = [
    'Music',
    'Career',
    'Entertainment',
    'Sports',
    'Game',
    'Tech',
    'Religious'
  ];

  const showAlert = (title, message, type) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      showAlert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!', 'error');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!imageUri) return null;
    
    setUploading(true);
    try {
      const formData = new FormData();
      
      const uriParts = imageUri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      
      formData.append('file', {
        uri: imageUri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
      
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      
      const response = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const data = await response.json();
      
      if (data.secure_url) {
        console.log("Upload successful:", data.secure_url);
        setUploading(false);
        return data.secure_url;
      } else {
        console.log("Upload response without URL:", data);
        throw new Error('Upload failed - no secure URL returned');
      }
    } catch (error) {
      console.error('Error uploading image: ', error);
      setUploading(false);
      showAlert('Upload Failed', 'Failed to upload image. Please try again.', 'error');
      return null;
    }
  };

  const handleChange = (name, value) => {
    setEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addToFirebase = async () => {
    try {
      if (!event.title || !event.date || !event.venue) {
        showAlert('Error', 'Please fill in all required fields', 'error');
        return;
      }
      
      let imageUrl = '';
      if (imageUri) {
        imageUrl = await uploadImage();
        if (!imageUrl) return;
      }
      
      await addDoc(collection(db, 'events'), {
        ...event,
        image: imageUrl
      });
      
      showAlert('Success', 'Event added successfully!', 'success');
      
      setEvent({
        title: '',
        date: '',
        time: '',
        venue: '',
        description: '',
        image: '',
        category: 'Social',
        flag: ''
      });
      setImageUri(null);
      
    } catch (error) {
      console.error('Error adding document: ', error);
      showAlert('Error', 'Failed to add event. Please try again.', 'error');
    }
  };

  return (
    <ScrollView style={tw`py-3 px-4 flex-1 bg-transparent`}>
      <Text style={tw`text-2xl font-bold text-[${Colors.primary}] text-center my-4`}>
        Add New Event
      </Text>

      <TouchableOpacity onPress={pickImage} style={tw`items-center mb-4`}>
        {imageUri ? (
          <Image 
            source={{ uri: imageUri }} 
            style={tw`w-32 h-32 rounded-lg`} 
          />
        ) : (
          <View style={tw`items-center justify-center`}>
            <Ionicons name='images-outline' size={100} color='gray' />
            <Text style={tw`text-gray-400 mt-2`}>Add Event Image</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={tw`mb-4`}>
        <Text style={tw`text-white mb-1`}>Title*</Text>
        <TextInput
          style={tw`bg-gray-400 text-white p-3 rounded`}
          placeholder="Enter event title"
          placeholderTextColor="gray"
          value={event.title}
          onChangeText={(text) => handleChange('title', text)}
        />
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`text-white mb-1`}>Date*</Text>
        <TextInput
          style={tw`bg-gray-400 text-white p-3 rounded`}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="gray"
          value={event.date}
          onChangeText={(text) => handleChange('date', text)}
        />
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`text-white mb-1`}>Time</Text>
        <TextInput
          style={tw`bg-gray-400 text-white p-3 rounded`}
          placeholder="HH:MM AM/PM"
          placeholderTextColor="gray"
          value={event.time}
          onChangeText={(text) => handleChange('time', text)}
        />
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`text-white mb-1`}>Venue*</Text>
        <TextInput
          style={tw`bg-gray-400 text-white p-3 rounded`}
          placeholder="Enter venue"
          placeholderTextColor="gray"
          value={event.venue}
          onChangeText={(text) => handleChange('venue', text)}
        />
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`text-white mb-1`}>Description</Text>
        <TextInput
          style={tw`bg-gray-400 text-white p-3 rounded h-32`}
          placeholder="Enter description"
          placeholderTextColor="gray"
          multiline
          value={event.description}
          onChangeText={(text) => handleChange('description', text)}
        />
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`text-white mb-1`}>Category</Text>
        <TouchableOpacity 
          style={tw`bg-gray-400 text-white p-3 rounded flex-row justify-between items-center`}
          onPress={() => setShowCategoryModal(true)}
        >
          <Text style={tw`text-white`}>
            {event.category || 'Select a category'}
          </Text>
          <Ionicons name="chevron-down" size={16} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={tw`mb-6`}>
        <Text style={tw`text-white mb-1`}>Flag</Text>
        <TextInput
          style={tw`bg-gray-400 text-white p-3 rounded`}
          placeholder="Enter Flag"
          placeholderTextColor="gray"
          value={event.flag}
          onChangeText={(text) => handleChange('flag', text)}
        />
      </View>

      <TouchableOpacity
        style={tw`bg-[${Colors.primary}] p-4 rounded-md items-center mb-8`}
        onPress={addToFirebase}
        disabled={uploading}
      >
        <Text style={tw`text-white font-bold`}>
          {uploading ? 'Uploading...' : 'Add Event'}
        </Text>
      </TouchableOpacity>

      <Modal
        isVisible={showCategoryModal}
        onBackdropPress={() => setShowCategoryModal(false)}
        backdropOpacity={0.7}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <View style={tw`bg-gray-800 rounded-lg overflow-hidden`}>
          <Text style={tw`text-[${Colors.primary}] text-center p-4 font-bold text-lg border-b border-gray-700`}>
            Select Category
          </Text>
          <FlatList
            data={categories}
            keyExtractor={(item) => item}
            style={tw`max-h-64`}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={tw`p-4 border-b border-gray-700 ${event.category === item ? 'bg-gray-400' : ''}`}
                onPress={() => {
                  handleChange('category', item);
                  setShowCategoryModal(false);
                }}
              >
                <Text style={tw`text-white text-center`}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity 
            style={tw`p-4 bg-gray-900`}
            onPress={() => setShowCategoryModal(false)}
          >
            <Text style={tw`text-[${Colors.primary}] text-center font-bold`}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal 
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        backdropOpacity={0.7}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <LinearGradient
          colors={modalType === 'success' 
            ? ['#9e9191', '#463296']

            : ['#9e9191', '#D32F2F']}
          style={tw`p-6 rounded-lg`}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={tw`text-white text-xl font-bold text-center mb-3`}>
            {modalTitle}
          </Text>
          <Text style={tw`text-white text-base text-center mb-6`}>
            {modalMessage}
          </Text>
          
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={tw.style(
                'px-6 py-3 rounded bg-white',
                // modalType === 'success' ? 'bg-white' : 'bg-white'
              )}
          >
            <Text style={tw.style(
              'font-bold text-center',
              modalType === 'success' ? 'text-yellow-500' : 'text-red-700'
            )}
            >
              OK
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </Modal>
    </ScrollView>
  );
};

export default AddEvent;