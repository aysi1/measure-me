import {
  Alert, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView,
  ActivityIndicator
} from 'react-native';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';

import Button from './components/Button';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';


const help = "\t\tYou can take a picture with your device's camera or choose an existing image to scan.\n";
const warning = "By clicking on the SCAN button you agree the to Terms of use.";

export default function App() {
  const [image, setImage] = useState(null);
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,});
      if (!result.cancelled) {
        setImage(result.uri);
      }
  }
  const takePicture = async () => {
      const result = await ImagePicker.launchCameraAsync({mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,});
      if (!result.cancelled) {
        setImage(result.uri);
      }
  }
  const processImage = async () => {
      const data = new FormData();
      data.append('q', {
        uri: image,
        type: 'image/jpeg',
        name: 'q.jpg'
      });
      try {
        var res = await fetch(
          'http://192.168.100.7/',
          {
            method: 'post',
            body: data,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        res = await res.json();
        if (res.success) {
          Alert.alert(res.message);
        } else {
          Alert.alert('Error: ' + res.message);
        }
      } catch (e) {
        Alert.alert('Network Error');
      }
      setShowActivityIndicator(false);
  }
  return (
    <View style={styles.container}>
      {/* <Item itemId={1001} /> */}
      <View style={styles.s_container}>
        {!image && <Image source={require('./assets/image-placeholder.png')} style={{width: 300, height: 300, alignSelf: 'center'}}></Image>}
        {image && <View style={styles.img}>
          <Image source={{uri: image}} style={{width: 180, height: 300}}></Image>
          {showActivityIndicator && <ActivityIndicator size={64} color="#FAFAFA" style={styles.spin} />}
          </View>
        }
        {!image && <Button iconName={'upload'}
                color={'#FF2E63'}
                onPress={pickImage}></Button>}
        {!image && <Button iconName={'camera'}
                color={'#252A34'}
                onPress={takePicture}></Button>}
        {image && <Button iconName={'scan1'}
                color={'#08D9D6'}
                onPress={async () => {
                  setShowActivityIndicator(true);
                  processImage();
                }}></Button>}
        {image && <Button iconName={'delete'}
                color={'#FF2E63'}
                onPress={() => {setImage(null); setShowActivityIndicator(false);}}></Button>}
      </View>
      <View style={styles.s_container}>
        {
          !image && <Text
          style={
            {
              fontSize: 12,
              margin: 8,
              textAlign: 'center'
            }
          }>
            <Entypo name="help-with-circle" size={12} color="#000" />
            {help}
          </Text>
        }
        {
          image && <Text
          style={
            {
              fontSize: 12,
              margin: 8,
              textAlign: 'center',
              color: '#D72323'
            }
          }>
            <AntDesign name="warning" size={12} color="#D72323" />
            {warning}
          </Text>
        }
        <Text
        style={
          {
            fontSize: 12,
            margin: 8,
            textAlign: 'center',
          }
        }>
          <AntDesign name="copyright" size={12} color="#000" />
          {"\t2022 Pfe Project All rights reserved."}
        </Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },
  s_container: {
    width: '80%',
    marginBottom: 32
  },
  img: {
    width: 182,
    height: 302,
    // borderWidth: 1,
    // borderColor: '#252A34',
    // borderRadius: 4,
    alignSelf: 'center',
    marginBottom: 8,
    position: 'relative',
    justifyContent: 'center',
    alignContent: 'center'
  },
  spin: {
    position: 'absolute',
    color: '#fff',
    left: '50%',
    top: '50%',
    transform: [
      {
        translateX: -32
      },
      {
        translateY: -32
      }
    ]
  }
});

// export default function App() {
//   return (
//     <View style={
//       {
//         backgroundColor: '#fff',
//         flex: 1,
//         flexDirection: 'column-reverse',
//         marginTop: 40,
//         position: 'relative',
//       }
//     }>
//       <View style={
//         {
//           backgroundColor: '#333',
//           position: 'absolute',
//           width: '100%',
//           height: '100%',
//           zIndex: -1
//         }
//       } />
//       <ScrollView>
//       <View style={
//         [
//           {
//             backgroundColor: 'tomato',
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//           },
//           styles.myViewStyle
//         ]
//       }>
//         <Text style={
//           {
//             fontSize: 32,
//             color: '#fff'
//           }
//         }>Tomato</Text>
//       </View>
//       <View style={
//         [
//           {
//             backgroundColor: 'dodgerblue',
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//           },
//           styles.myViewStyle
//         ]
//       }>
//         <Text style={
//           {
//             fontSize: 32,
//             color: '#fff'
//           }
//         }>Dodgerblue</Text>
//       </View>
//       <View style={
//         [
//           {
//             backgroundColor: 'cyan',
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//           },
//           styles.myViewStyle
//         ]
//       }>
//         <Text style={
//           {
//             fontSize: 32,
//             color: '#111'
//           }
//         }>Cyan</Text>
//       </View>
//       <View style={
//         [
//           {
//             backgroundColor: 'tomato',
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//           },
//           styles.myViewStyle
//         ]
//       }>
//         <Text style={
//           {
//             fontSize: 32,
//             color: '#fff'
//           }
//         }>Tomato</Text>
//       </View>
//       <View style={
//         [
//           {
//             backgroundColor: 'dodgerblue',
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//           },
//           styles.myViewStyle
//         ]
//       }>
//         <Text style={
//           {
//             fontSize: 32,
//             color: '#fff'
//           }
//         }>Dodgerblue</Text>
//       </View>
//       <View style={
//         [
//           {
//             backgroundColor: 'cyan',
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//           },
//           styles.myViewStyle
//         ]
//       }>
//         <Text style={
//           {
//             fontSize: 32,
//             color: '#111'
//           }
//         }>Cyan</Text>
//       </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   myText: {
//     color: '#111',
//     // textTransform: 'uppercase'
//     // fontSize: '24',
//   },
//   myImage: {
//     width: 64,
//     height: 64
//   },
//   myViewStyle: {
//     margin: 16,
//     borderRadius: 32,
//     minHeight: 200,
//   }
// });
