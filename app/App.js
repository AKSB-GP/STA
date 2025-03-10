import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DropdownWithExpandableIcons from "./Components/UIContainer";

export default function App() {
  const [contentImage, setContentImage] = useState(null);
  const [styleImage, setStyleImage] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pick an image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, // Convert image to base64
    });

    if (!result.canceled && result.assets.length > 0) {
      setContentImage(result.assets[0].uri);
      console.log("content", result.assets[0]);
    }
  };
  // Pick an image
  const pickstyleImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, // Convert image to base64
    });
    if (!result.canceled && result.assets.length > 0) {
      setStyleImage(result.assets[0].uri);
      console.log("style", result.assets[0]);
    }
  };

  // Handle style selection
  // const handleStyleSelect = (selectedStyle) => {
  //   setStyleImage(selectedStyle);
  // };

  // Send image to backend
  const generateImage = async () => {
    if (!contentImage || !styleImage) {
      alert("Please select both a content image and a style.");
      return;
    }

    let requestData = {
      content: `data:image/jpeg;base64,${contentImage}`,
      style: `data:image/jpeg;base64,${styleImage}`,
    };

    console.log("Sending JSON Data:", requestData);

    try {
      setLoading(true);

      let response = await fetch("http://127.0.0.1:4040/generate", {
        method: "POST",
        mode:  'cors' ,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Failed to send image");
      }

      let data = await response.json();
      setGeneratedImage(data.generatedImage);
    } 
    catch (error) {
      console.error("Error:", error);
      alert("Failed to generate image.");
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.serviceNameLabel}>"DATA COMPRESSION MACHINE"</Text>

      <Text style={styles.label}>Content image</Text>
      <TouchableOpacity onPress={pickImage} style={styles.imageUploadBox}>
        {contentImage ? (
          <Image source={{ uri: contentImage }} style={styles.uploadedImage} />
        ) : (
          <Text style={styles.uploadText}>Tap to upload an image</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={pickstyleImage} style={styles.imageUploadBox}>
        {styleImage ? (
          <Image source={{ uri: styleImage }} style={styles.uploadedImage} />
        ) : (
          <Text style={styles.uploadText}>Tap to upload an style image</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={generateImage} style={styles.generateButton}>
        <Text style={styles.generateButtonText}>Generate</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {generatedImage && (
        <>
          <Text style={styles.label}>Generated Image</Text>
          <Image
            source={{ uri: generatedImage }}
            style={styles.generatedImage}
          />
        </>
      )}

      <StatusBar style="auto" />
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  imageUploadBox: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  uploadText: {
    color: "#888",
    textAlign: "center",
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  serviceNameLabel: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 150,
  },
  generateButton: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    width: "80%",
    marginTop: 20,
  },
  generateButtonText: {
    fontSize: 16,
  },
  generatedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 20,
  },
});
