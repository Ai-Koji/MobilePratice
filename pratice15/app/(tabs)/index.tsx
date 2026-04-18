import { StyleSheet, ScrollView, RefreshControl, View, Text, Image } from 'react-native';
import { ThemedText } from '@/components/themed-text';

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


interface WeatherCurrent {
  cloud: number;
  condition: {
    code: number;
    icon: string;
    text: string;
  };
  dewpoint_c: number;
  dewpoint_f: number;
  diff_rad: number;
  dni: number;
  feelslike_c: number;
  feelslike_f: number;
  gti: number;
  gust_kph: number;
  gust_mph: number;
  heatindex_c: number;
  heatindex_f: number;
  humidity: number;
  is_day: number;
  last_updated: string;
  last_updated_epoch: number;
  precip_in: number;
  precip_mm: number;
  pressure_in: number;
  pressure_mb: number;
  short_rad: number;
  temp_c: number;
  temp_f: number;
  uv: number;
  vis_km: number;
  vis_miles: number;
  wind_degree: number;
  wind_dir: string;
  wind_kph: number;
  wind_mph: number;
  windchill_c: number;
  windchill_f: number;
}

interface WeatherInfo {
  current: WeatherCurrent;
}

async function getCurrentWeather(city : string, lang : string) : Promise<WeatherInfo| null> {
  let url = `https://api.weatherapi.com/v1/current.json?key=${process.env.EXPO_PUBLIC_API_KEY}&q=${city}&lang=${lang}&aqi=no`
  console.log('url: ', url);

  let res;
  try {
    res = (await fetch(url));
    res = res.json()
  }
  catch(error) {
    console.log(error);
    res = null;
  }

  return res;
}

function WeatherMainInfo({content}: {content: WeatherCurrent | null}) {
  if (content)
    return(
        <View style={styles.mainStatus}>
          <View style={styles.iconContainer}>
            <Image 
              source={{uri: `https:${
                content.condition ? content.condition.icon ? content.condition.icon : '' : ''           
              }`}} 
              style={styles.mainWeatherIcon}/>
          </View>

          <ThemedText style={{...styles.mainInfo, ...styles.mainInfoHeader}}>
            <Text>{content.temp_c}</Text> ℃
          </ThemedText>
          <ThemedText style={{...styles.mainInfo, ...styles.featureInfoHeader}}>
            <Text>{content.condition ? content.condition.text : '.'}</Text>
          </ThemedText>

          <ThemedText style={styles.mainInfo}>
            по ощущениям как <Text>{content.feelslike_c}</Text> ℃
          </ThemedText>
          <ThemedText style={styles.mainInfo}>
            влажность <Text>{content.humidity}</Text>%
          </ThemedText>
        </View>
    )
  

    return (
      <View style={styles.mainStatus}>
      </View>
    )
}


export default function HomeScreen() {
  const [city, setCity] = useState<string>('Москва');
  const [weather, setWeather] = useState<WeatherCurrent | null>(null);
  const [refreshing, setRefreshing] = useState<Boolean>(false);

  useEffect(() => {
    const getCity = async () => {
      let location : Location = await getLoc();
      let city : string | null = await getCityByCoords(location);
      if (city)
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
      const weatherInfo = await getCurrentWeather(city, 'ru');
      if (weatherInfo && weatherInfo.current)
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
      style={styles.container}>
        <WeatherMainInfo content={weather}/>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },

  mainStatus: {
    paddingTop: 80,
    paddingHorizontal: 32,
    textAlign: 'center',
    color: '#000',
  },
  mainWeatherIcon: {
    width: 130,
    height: 130
  },

  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainInfoHeader: {
    paddingTop: 10,
    fontSize: 32,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#000'
  },
  featureInfoHeader: {
    paddingTop: 10,
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#000'
  },
  mainInfo: {
    height: 'auto',
    paddingHorizontal: 32,
    textAlign: 'center',
    color: '#000'
  },

})