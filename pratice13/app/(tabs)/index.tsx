import { StyleSheet } from 'react-native';
import { View, Text, Image } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>

        {/* navbar */}
        <View style={styles.navbar}>
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
                    source={require('../../assets/images/phone.svg')}/>
                </View>
                <View style={{...styles.navItem, ...styles.imageContainer}}>
                    <Image 
                    style={styles.image}
                    source={require('../../assets/images/map.png')}/>
                </View>
            </View>
        </View>
        

        {/* gallery */}


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
    width: 60,
    height: 60
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  column: {
    width: 150,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  navbar: {
    flexDirection: 'row',
    gap: 40
  },
  navItem: {
    width: 70,
    height: 70,
    backgroundColor: '#d9d9d9'
  }
});
