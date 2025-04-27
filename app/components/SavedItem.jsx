  import { useEffect, useState } from 'react';
  import { View, Text, FlatList, RefreshControl } from 'react-native';
  import React from 'react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import CardUi from './CardUi';
  import tailwind from 'twrnc';
  import { Colors } from '../../constants/Colors';
  import { TouchableOpacity } from 'react-native';
  import * as MailComposer from 'expo-mail-composer';
  import LoadingSpinner from './Loading';

  const SavedItem = () => {
    const [savedItems, setSavedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setrefresh] = useState(false)

    const fetchSavedItems = async () => {
      try {
        setLoading(true);
        const items = await AsyncStorage.getItem('savedItems');
        if (items) {
          const parsedItems = JSON.parse(items);
          setSavedItems(parsedItems);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
        setrefresh(false)
      }
    };

    useEffect(() => {
      fetchSavedItems();
    }, []);

    const onRefresh = () => {
      setrefresh(true)
      fetchSavedItems()
    }

    const renderItem = ({ item }) => {
      return (
        <>
        <View >
            <CardUi item={item} />;
            </View>
        </>
      )
    };

    const formatSavedItems = (items) => {
      if (!items || items.length === 0) {
        return 'No saved items to display.';
      }
      return items
        .map((item, index) => {
          return `Item ${index + 1}:\n` +
                `Title: ${item.title}\n` +
                `Description: ${item.description}\n` +
                `Date: ${item.date}\n` +
                `Time: ${item.time}\n` +
                `Venue: ${item.venue}\n` +
                `-------------------`;
        })
        .join('\n');
    };

    const sendEmail = async () => {
      try {
        const isAvailable = await MailComposer.isAvailableAsync();
        if (!isAvailable) {
          alert('No email client is available on this device.');
          return;
        }

        const emailOptions = {
          recipients: ['01hammadraza@gmail.com'],
          subject: 'Saved Events Request',
          body: `Here are my Events Request:\n\n${formatSavedItems(savedItems)}`,
        };

        // Open email composer
        await MailComposer.composeAsync(emailOptions);
      } catch (error) {
        console.error('Error sending email:', error);
        alert('Failed to open email composer.');
      }
    };

    return (
      <>
      <View style={tailwind`flex flex-col justify-center items-center` }  >
        <Text
          style={tailwind`text-[${Colors.primary}] font-bold  mt-20 mb-6 text-3xl text-transform: uppercase;
  `}
        >
          Saved Items
        </Text>
        <FlatList

                data={savedItems}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={<RefreshControl
                onRefresh={onRefresh}
                refreshing={refresh}
                colors={['purple']}
                tintColor={'purple'}
                progressBackgroundColor={Colors.primary}
                />}
        renderItem={renderItem} 
        />
        <TouchableOpacity
          style={tailwind`bg-[${Colors.primary}] p-3 rounded-xl w-72 m-4`}
          onPress={sendEmail}
        >
          <Text style={tailwind`text-white text-center font-semibold`}>
            Send Request
          </Text>
        </TouchableOpacity>
        <Text style={tailwind`text-[${Colors.primary}] text-lg text-center font-semibold`}>
            DEVELOPED BY HAMMAD RAZA
          </Text>
        </View>
      </>
    );
  };

  export default SavedItem;