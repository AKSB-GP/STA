import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList, Image, StyleSheet } from "react-native";

const stylesData = [
  { id: "1", label: "Mona Lisa", image: require("../Assets/mona_lisa.jpg") },
  { id: "2", label: "Starry Night", image: require("../Assets/starry_night.jpg") },
  { id: "3", label: "The Scream", image: require("../Assets/the_scream.jpg") },
  { id: "4", label: "Girl with a Pearl Earring", image: require("../Assets/girl_with_a_pearl_earring.jpg") },
];

const DropdownWithExpandableIcons = () => {
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [expandedImage, setExpandedImage] = useState(null); // State for expanded image

  return (
    <View style={styles.container}>

      {/* Dropdown Button */}
      <TouchableOpacity onPress={() => setDropdownVisible(true)} style={styles.dropdownButton}>
        <Text style={styles.dropdownButtonText}>
          {selectedStyle ? selectedStyle.label : "Style"}
        </Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      {/* GENERATE IMAGE-BUTTON */}
      <TouchableOpacity onPress={() => /*Vår funktion här senare*/(true)} style={styles.generateButton}>
        <Text style={styles.generateButtonText}>Generate</Text>
        <Image source={require("../Assets/wand.png")} style={styles.icon} />
      </TouchableOpacity>

      {/*MODAL: Dropdown Listan  */}
      <Modal visible={dropdownVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={() => setDropdownVisible(false)} // Close dropdown when tapping outside
        >
          <View style={styles.dropdownList}>
            <FlatList
              data={stylesData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.dropdownItem}>
                  {/* Select Style */}
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => {
                      setSelectedStyle(item);
                      setDropdownVisible(false);
                    }}
                  >
                    <Text style={styles.dropdownText}>{item.label}</Text>
                  </TouchableOpacity>

                  {/* Tap to Expand Image */}
                  <TouchableOpacity onPress={() => setExpandedImage(item.image)}>
                    <Image source={item.image} style={styles.iconPreview} />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* MODAL: kunna göra bilden större */}
      <Modal visible={!!expandedImage} transparent animationType="fade">
        <TouchableOpacity style={styles.fullscreenModal} onPress={() => setExpandedImage(null)}>
          <Image source={expandedImage} style={styles.fullscreenImage} />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

// Styles för layout
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownButton: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    alignSelf: "center",  // Center this button too
    width: "80%", // Match width with generateButton
    marginTop: 20, // Add spacing
  },
  dropdownButtonText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dropdownList: {
    backgroundColor: "#fff",
    marginHorizontal: 40,
    borderRadius: 8,
    paddingVertical: 10,
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 16,
  },
  iconPreview: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  fullscreenModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  fullscreenImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  generateButton: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#33b249",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: "#ccc",
    alignSelf: "center",  // Center button horizontally
    width: "80%",  
    marginTop: 40, 
  },
  generateButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  icon: {
    width: 20, // Icon size
    height: 20,
    marginLeft: 10, // Space between icon and text
    color: "#fffff",
  },
  divider: {
    width: "80%", // Matches button width
    height: 1, // 1 i height bara för att få en "divider"
    backgroundColor: "#ccc", // Light gray color
    marginVertical: 10, // Space above and below
  },
  
  
});

export default DropdownWithExpandableIcons;