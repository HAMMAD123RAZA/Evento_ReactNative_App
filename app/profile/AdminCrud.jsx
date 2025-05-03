import { View, Text, TouchableOpacity, Alert, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import tailwind from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { auth, db } from '../utils/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FontAwesome } from '@expo/vector-icons';

const data = [
    {
        id: 1,
        name: 'create-outline',
        path: '/profile/AddEvent',
        title: 'Create'
    },
    {
        id: 2,
        name: "apps-outline",
        path: '/profile/MyEvents',
        title: 'Lists'
    }
];

const AdminCrud = () => {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                const currentUser = auth.currentUser;
                
                if (currentUser) {
                    const q = query(
                        collection(db, 'user'),
                        where('uid', '==', currentUser.uid),
                        where('role', '==', 'admin')
                    );
                    
                    const querySnapshot = await getDocs(q);
                    
                    // If we get any results, the user is an admin
                    setIsAdmin(!querySnapshot.empty);
                } else {
                    console.log('No current user');
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error("Error checking admin status:", error);
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };
        
        checkAdminStatus();
    }, []);
    
    const handleNavigation = (path) => {
        if (isAdmin) {
            router.push(path);
        } else {
            setVisible(true)
      }
    };
    
    if (loading) {
        return <Text style={tailwind`text-center py-4`}>Loading...</Text>;
    }
    
    return (
        <>
        <View style={tailwind`flex flex-row justify-between gap-24 items-center`}>
            {data.map((item) => (
                <TouchableOpacity 
                    key={item.id} 
                    style={tailwind`flex flex-col items-center justify-center`} 
                    onPress={() => handleNavigation(item.path)}
                >
                    {isAdmin ?(<Ionicons 
                        name={item.name} 
                        size={40} 
                        color={ Colors.primary } 
                    />):(
                        <View style={tailwind`relative`}>
                        <Ionicons
                            name={item.name}
                            size={52}
                            color={Colors.primary}

                        />
<FontAwesome
  name="lock"
                            style={tailwind`absolute bottom-7  -right-2`}
                            size={22}
                            color={Colors.primary}
                            // color='gray'

                        />
                    </View>
                    )}
                    
                    <Text
                    
                    style={tailwind`text-[${Colors.primary}]`}
                    
                    // style={tailwind`text-gray-500`}
                    >
                        {item.title}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
        <Modal transparent visible={visible}>
        <View style={tailwind`flex-1 justify-center items-center bg-black/50`}>
          <View style={tailwind`bg-gray-700 p-6 rounded-lg w-80`}>
            <Text style={tailwind`text-yellow-400 text-lg font-bold`}>Access Denied</Text>
            <Text style={tailwind`text-yellow-300 mt-2`}>
              Only administrators can access this feature.
            </Text>
            <TouchableOpacity 
              style={tailwind`bg-yellow-500 mt-4 p-2 rounded`}
              onPress={() => setVisible(false)}
            >
              <Text style={tailwind`text-gray-900 text-center font-bold`}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>  
      </>
    );
};

export default AdminCrud;

