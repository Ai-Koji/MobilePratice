import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import * as Location from 'expo-location';
import { useEffect, useState } from 'react';


interface Location {
  latitude: number | undefined;
  longitude: number | undefined;
}

//TODO: update
async function getLoc (): Promise<Location> {
  let { status } = await Location.requestForegroundPermissionsAsync();
    
  if (status !== 'granted') {
    alert('Доступ к местоположению отклонен');
    return {latitude: undefined, longitude: undefined};
  }

  let currentLocation = await Location.getCurrentPositionAsync({});

  return {latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude};
}

async function getCityByCoords (coordObj: Location) : Promise<string |null> {
  let latitude = coordObj.latitude;
  let longitude = coordObj.longitude;


  if (latitude === undefined || longitude === undefined) {
    return 'Moscow';
  }

  let response = await Location.reverseGeocodeAsync({
      latitude,
      longitude
    });
  
  if (response.length === 0) {
    return 'Moscow';
  }

  return response[0].city;
}

export default function HomeScreen() {
  const [city, setCity] = useState('Moscow');
  useEffect(() => {
    const getCity = async () => {
      let location = await getLoc();
      let city = await getCityByCoords(location);
      setCity(city);
    }
    getCity();
  }, [])

  alert(city);

  return (
    <ScrollView>
      <View style={styles.mainStatus}>
        <ThemedText style={styles.mainInfo}>
          <Text>32</Text>℃
        </ThemedText>

        <ThemedText>
          fdsafdsa
        </ThemedText>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  mainStatus: {
    paddingTop: 40,
    paddingHorizontal: 32,
    textAlign: 'center',
  },
  mainInfo: {
    paddingTop: 40,
    fontSize: 32,
    fontWeight: 'bold',
    paddingHorizontal: 32,
    textAlign: 'center',
  }

})