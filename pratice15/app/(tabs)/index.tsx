import { StyleSheet, ScrollView, RefreshControl, View, Text } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import * as Location from 'expo-location';
import { useEffect, useState, useCallback } from 'react';


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
    return 'Москва';
  }

  let response = await Location.reverseGeocodeAsync({
      latitude,
      longitude
    });
  
  if (response.length === 0) {
    return 'Москва';
  }

  return response[0].city;
}

async function getWeather(city : string, lang : string) {
  let url = `https://api.weatherapi.com/v1/current.json?key=${process.env.EXPO_PUBLIC_API_KEY}&q=${city}&lang=${lang}&aqi=no`
  console.log('url: ', url);

  let res;
  try {
    res = (await fetch(url));
    console.log(res)
    res = res.json()
  }
  catch(error) {
    console.log(error);
    res = {};
  }

  return res;
}


export default function HomeScreen() {
  const [city, setCity] = useState('Москва');
  const [weather, setWeather] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const getCity = async () => {
      let location = await getLoc();
      let city = await getCityByCoords(location);
      setCity(city);
    }
    getCity();
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  }, []);

  useEffect(() => {
    const weather = async () => {
      const weatherInfo = await getWeather(city, 'ru');
      setWeather(weatherInfo.current);
    }
    weather();
  }, [city])

  console.log('weather: ', weather);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.mainStatus}>
        <ThemedText style={{...styles.mainInfo, ...styles.mainInfoHeader}}>
          <Text>{weather.temp_c}</Text> ℃
        </ThemedText>
        <ThemedText style={{...styles.mainInfo, ...styles.featureInfoHeader}}>
          <Text>{weather.condition ? weather.condition.text : '.'}</Text>
        </ThemedText>

        <ThemedText style={styles.mainInfo}>
          по ощущениям как <Text>{weather.feelslike_c}</Text> ℃
        </ThemedText>
        <ThemedText style={styles.mainInfo}>
          влажность <Text>{weather.humidity}</Text>%
        </ThemedText>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  mainStatus: {
    paddingTop: 80,
    paddingHorizontal: 32,
    textAlign: 'center',
  },
  mainInfoHeader: {
    paddingTop: 10,
    fontSize: 32,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  featureInfoHeader: {
    paddingTop: 10,
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  mainInfo: {
    height: 'auto',
    paddingHorizontal: 32,
    textAlign: 'center',
  },

})