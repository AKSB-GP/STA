import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Import image picker
import DropdownWithExpandableIcons from './Components/UIContainer';
import { ScrollView } from 'react-native';

export default function App() {
  const [contentImage, setContentImage] = useState(null); // variabel för att "lagra" content image

  // Funktion för att kunna välja en bild från sin dator
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled && result.assets.length > 0) {
      setContentImage(result.assets[0].uri);
    }
  };  


  return (
    <ScrollView contentContainerStyle={styles.container}> 
      <Text style={styles.serviceNameLabel}>"DATA COMPRESSION MACHINE"</Text>

      {/*Header för att välja bild*/}
      <Text style={styles.label}>Content image</Text>
      <TouchableOpacity onPress={pickImage} style={styles.imageUploadBox}>
        {contentImage ? (
          <Image source={{ uri: contentImage }} style={styles.uploadedImage} />
        ) : (
          <Text style={styles.uploadText}>Tap to upload an image</Text> //placeholder text för text INUTI "choose image rutan"
        )}
      </TouchableOpacity>
  
      {/*Header för att välja style*/}
      <Text style={styles.label}>Select a style</Text>
      {/*KOMPONENT: Style-image dropdownmenu */}
      <DropdownWithExpandableIcons />
  
      <StatusBar style="auto" />
    </ScrollView>
  );
  
}

// Styles
const styles = StyleSheet.create({
  container: {                //container är hela sidan atm
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  label: {          //style för headlines (t.ex. Content image, Style)
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imageUploadBox: {       //självförklarande
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  uploadText: {         //styling för texten inuti paste-rutan
    color: '#888',
    textAlign: 'center',
  },
  uploadedImage: {      //styling för när man valt bild
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  serviceNameLabel: {          //style för headlines (t.ex. Content image, Style)
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 150,
  },
});