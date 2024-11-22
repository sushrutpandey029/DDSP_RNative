import { View, Text, SafeAreaView, Image } from 'react-native'
import React,{useEffect} from 'react'
import HomeFarmerImage from '../commons/HomeFarmerImage'
import ButtonTabSlider from '../commons/ButtonTabSlider'
import { useDispatch, useSelector } from 'react-redux'

const UserFilePage = () => {

  // const userDetails = useSelector((state) => state.user.user);

  //   useEffect(() => {
  //     console.warn('file-userdetails',userDetails);
  // },[])
  return (
    <SafeAreaView>
      <Text>user file page</Text>
    </SafeAreaView>
  )
}

export default UserFilePage


// below is the repeater form
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Alert,
// } from "react-native";

// const RepeaterForm = () => {
//   const [fields, setFields] = useState([
//     { id: Date.now(), name: "", email: "" }, // Initial field set
//   ]);

//   // Add a new field set
//   const addField = () => {
//     setFields([...fields, { id: Date.now(), name: "", email: "" }]);
//   };

//   // Remove a field set
//   const removeField = (id) => {
//     setFields(fields.filter((field) => field.id !== id));
//   };

//   // Update field values
//   const updateField = (id, key, value) => {
//     setFields(
//       fields.map((field) =>
//         field.id === id ? { ...field, [key]: value } : field
//       )
//     );
//   };

//   // Handle form submission
//   const handleSubmit = () => {
//     Alert.alert("Form Data", JSON.stringify(fields, null, 2));
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Repeater Form</Text>

//       {fields.map((field, index) => (
//         <View key={field.id} style={styles.fieldSet}>
//           <Text style={styles.label}>Name:</Text>
//           <TextInput
//             style={styles.input}
//             value={field.name}
//             placeholder="Enter name"
//             onChangeText={(text) => updateField(field.id, "name", text)}
//           />

//           <Text style={styles.label}>Email:</Text>
//           <TextInput
//             style={styles.input}
//             value={field.email}
//             placeholder="Enter email"
//             keyboardType="email-address"
//             onChangeText={(text) => updateField(field.id, "email", text)}
//           />

//           {fields.length > 1 && (
//             <TouchableOpacity
//               style={styles.removeButton}
//               onPress={() => removeField(field.id)}
//             >
//               <Text style={styles.removeButtonText}>Remove</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       ))}

//       <TouchableOpacity style={styles.addButton} onPress={addField}>
//         <Text style={styles.addButtonText}>Add New</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//         <Text style={styles.submitButtonText}>Submit</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default RepeaterForm;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   fieldSet: {
//     marginBottom: 20,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   input: {
//     height: 40,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 16,
//   },
//   addButton: {
//     backgroundColor: "#4CAF50",
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   addButtonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
//   removeButton: {
//     backgroundColor: "#FF5733",
//     padding: 8,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   removeButtonText: {
//     color: "#fff",
//     fontSize: 14,
//   },
//   submitButton: {
//     backgroundColor: "#007BFF",
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   submitButtonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
// });
