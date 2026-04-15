import { StyleSheet } from 'react-native';
import { View, Image, ScrollView } from 'react-native';
// import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';

export default function HomeScreen() {
  return (
    <View style={styles.container}>

        {/* navbar */}
        <View style={styles.columns}>
            <View style={styles.column}>
                <View style={{...styles.navItem, ...styles.imageContainer}}>
                    <Image 
                    style={styles.image}
                    source={require('../../assets/images/camera.png')}/>
                </View>
                <View style={{...styles.navItem, ...styles.imageContainer}}>
                    <Image 
                    style={styles.image}
                    source={require('../../assets/images/www.png')}/>
                </View>
            </View>
            <View style={styles.column}>
                <View style={{...styles.navItem, ...styles.imageContainer}}>
                    <Image 
                    style={styles.image}
                    source={require('../../assets/images/phone.png')}/>
                </View>
                <View style={{...styles.navItem, ...styles.imageContainer}}>
                    <Image 
                    style={styles.image}
                    source={require('../../assets/images/map.png')}/>
                </View>
            </View>
        </View>
        
        <ScrollView
          showsVerticalScrollIndicator={false} // Скрывает полосу прокрутки (по желанию)
          contentContainerStyle={styles.scrollContent} // Стили для внутреннего контейнера
        >
        {/* gallery */}
          <View style={styles.content}>
              <View style={styles.contentColumn}>
                  <View style={styles.imageContainer}>
                      <Image 
                      style={styles.imageGallery}
                      source={require('../../assets/images/1.png')}/>
                  </View>
                  <View style={styles.imageContainer}>
                      <Image 
                      style={styles.imageGallery}
                      source={require('../../assets/images/1.png')}/>
                  </View>
                  <View style={styles.imageContainer}>
                      <Image 
                      style={styles.imageGallery}
                      source={require('../../assets/images/1.png')}/>
                  </View>
                  <View style={styles.imageContainer}>
                      <Image 
                      style={styles.imageGallery}
                      source={require('../../assets/images/1.png')}/>
                  </View>
                  <View style={styles.imageContainer}>
                      <Image 
                      style={styles.imageGallery}
                      source={require('../../assets/images/1.png')}/>
                  </View>
                  <View style={styles.imageContainer}>
                      <Image 
                      style={styles.imageGallery}
                      source={require('../../assets/images/1.png')}/>
                  </View>
              </View>
              <View style={styles.contentColumn}>
                  <View style={styles.imageContainer}>
                      <Image 
                      style={styles.imageGallery}
                      source={require('../../assets/images/1.png')}/>
                  </View>
                  <View style={styles.imageContainer}>
                      <Image 
                      style={styles.imageGallery}
                      source={require('../../assets/images/1.png')}/>
                  </View>
                  <View style={styles.imageContainer}>
                      <Image 
                      style={styles.imageGallery}
                      source={require('../../assets/images/1.png')}/>
                  </View>
                  <View style={styles.imageContainer}>
                      <Image 
                      style={styles.imageGallery}
                      source={require('../../assets/images/1.png')}/>
                  </View>
                  <View style={styles.imageContainer}>
                      <Image 
                      style={styles.imageGallery}
                      source={require('../../assets/images/1.png')}/>
                  </View>
                  <View style={styles.imageContainer}>
                      <Image 
                      style={styles.imageGallery}
                      source={require('../../assets/images/1.png')}/>
                  </View>
                  <View style={styles.imageContainer}>
                      <Image 
                      style={styles.imageGallery}
                      source={require('../../assets/images/1.png')}/>
                  </View>
                  <View style={styles.imageContainer}>
                      <Image 
                      style={styles.imageGallery}
                      source={require('../../assets/images/1.png')}/>
                  </View>
                  <View style={styles.imageContainer}>
                      <Image 
                      style={styles.imageGallery}
                      source={require('../../assets/images/1.png')}/>
                  </View>
              </View>
          </View>
        </ScrollView>
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
    flexDirection: 'row',
    gap: 40,
    marginTop: 40
  },
  contentColumn: {
    width: 150,
    gap: 20
  },
  scrollContent: {
    alignItems: 'center', // Центрируем элементы внутри скролла
    paddingTop: 50,       // Тот самый отступ вместо marginTop
    paddingBottom: 40,    // Отступ снизу, чтобы последний элемент не прилипал
  },
});
