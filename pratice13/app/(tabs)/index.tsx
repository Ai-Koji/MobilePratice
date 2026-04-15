import { StyleSheet } from 'react-native';
import { View, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useState } from 'react';

// события для нажания
async function Camera() {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();

  if (status !== 'granted') {
    alert('Извините, нам нужны разрешения на камеру, чтобы это работало!');
    return;
  }
  
  await ImagePicker.launchCameraAsync();
}

function Web() {
  Linking.openURL('https://www.google.com');
}

function Phone() {
  Linking.openURL('tel:+79133792906');
}

function Map() {
  Linking.openURL('https://maps.apple.com/?q=Novosibirsk');
}

export default function HomeScreen() {
  const [data, setData] = useState([]);

  // пасим фотки
  useEffect(() => {
      MediaLibrary.requestPermissionsAsync().then(({status}) => {
        MediaLibrary.getAssetsAsync({
          first: 50,
          sortBy: ['creationTime'],
          mediaType: ['photo'],
        }).then(async (photos) => {
          const assetsWithLocalUri = await Promise.all(
            photos.assets.map(async (asset) => {
              const info = await MediaLibrary.getAssetInfoAsync(asset);
              return {
                ...asset,
                uri: info.localUri
              };
            })
          );

        setData(assetsWithLocalUri);
        console.log(assetsWithLocalUri);
        })
      })
  }, [])

  return (
    <View style={styles.container}>

        {/* navbar */}
        <View style={styles.columns}>
            <View style={styles.column}>
                <TouchableOpacity onPress={Camera} style={{...styles.navItem, ...styles.imageContainer}}>
                    <Image 
                    style={styles.image}
                    source={require('../../assets/images/camera.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={Web} style={{...styles.navItem, ...styles.imageContainer}}>
                    <Image 
                    style={styles.image}
                    source={require('../../assets/images/www.png')}/>
                </TouchableOpacity>
            </View>
            <View style={styles.column}>
                <TouchableOpacity onPress={Phone} style={{...styles.navItem, ...styles.imageContainer}}>
                    <Image 
                    style={styles.image}
                    source={require('../../assets/images/phone.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={Map} style={{...styles.navItem, ...styles.imageContainer}}>
                    <Image 
                    style={styles.image}
                    source={require('../../assets/images/map.png')}/>
                </TouchableOpacity>
            </View>
        </View>
        {/* gallery */}
        <View style={styles.content}>
          <FlatList
            data={data}
            numColumns={2}
            contentContainerStyle={styles.flatRows}
            columnWrapperStyle={styles.flatCols}
            style={{ width: '100%' }}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                  <Image 
                    style={styles.imageGallery}
                    source={{ uri: item.uri }}/>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50
  },
  text: {
    color: 'white',
    fontSize: 20
  },
  image: {
    width: 50,
    height: 50
  },
  imageGallery: {
    width: 150,
    height: 150  
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  column: {
    width: 150,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  columnImg: {
    width: 300
  },
  columns: {
    flexDirection: 'row',
    gap: 40,
    marginBottom: 10
  },
  navItem: {
    width: 70,
    height: 70,
    backgroundColor: '#d9d9d9'
  },
  content: {
    justifyContent: 'center',
    gap: 40,
    marginTop: 40
  },
  contentColumn: {
    width: 150,
    gap: 20
  },
  flatRows: {
    alignItems: 'center', // Центрируем элементы внутри скролла
    paddingTop: 50,       // Тот самый отступ вместо marginTop
    paddingBottom: 40,    // Отступ снизу, чтобы последний элемент не прилипал
    gap: 20
  },
  flatCols: {
    gap: 40    
  }
});
