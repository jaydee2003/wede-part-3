import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (!name.trim() || !description.trim() || !course.trim() || !price || Number(price) <= 0) return;
    setItems([...items, {name, description, course, price: Number(price)}]);
    setName(''); setDescription(''); setCourse(''); setPrice('');
  };

  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>Chef's Table</Text><Text style={styles.subtitle}>Menu Manager</Text>
    <View style={styles.panel}><Text style={styles.heading}>Add a menu item</Text>
      <TextInput style={styles.input} placeholder="Dish name" value={name} onChangeText={setName}/>
      <TextInput style={[styles.input, styles.multiline]} placeholder="Description" value={description} onChangeText={setDescription} multiline/>
      <TextInput style={styles.input} placeholder="Course" value={course} onChangeText={setCourse}/>
      <TextInput style={styles.input} placeholder="Price (R)" value={price} onChangeText={setPrice} keyboardType="decimal-pad"/>
      <TouchableOpacity style={styles.button} onPress={addItem}><Text style={styles.buttonText}>+ Add menu item</Text></TouchableOpacity>
    </View>
    <Text style={styles.heading}>Current menu ({items.length})</Text>
    {items.length === 0 ? <Text style={styles.empty}>No menu items added yet.</Text> : items.map((item, index) => <View style={styles.card} key={`${item.name}-${index}`}><Text style={styles.tag}>{item.course}</Text><Text style={styles.cardTitle}>{item.name}</Text><Text style={styles.description}>{item.description}</Text><Text style={styles.price}>R{item.price.toFixed(2)}</Text></View>)}
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({safe:{flex:1,backgroundColor:'#fffaf3'},container:{padding:24},title:{fontSize:34,fontWeight:'800',color:'#1f2933'},subtitle:{color:'#b45309',fontWeight:'700',marginBottom:25},panel:{backgroundColor:'#fff',padding:18,borderRadius:18,marginBottom:28},heading:{fontSize:24,fontWeight:'800',color:'#1f2933',marginBottom:16},input:{borderWidth:1,borderColor:'#d9d0c5',borderRadius:10,padding:13,marginBottom:12,backgroundColor:'#fffdf9'},multiline:{minHeight:90,textAlignVertical:'top'},button:{backgroundColor:'#b45309',padding:15,borderRadius:10,alignItems:'center'},buttonText:{color:'#fff',fontWeight:'800'},empty:{color:'#6b7280',marginBottom:20},card:{backgroundColor:'#fff',borderRadius:15,padding:18,marginBottom:14},tag:{color:'#92400e',fontWeight:'800',marginBottom:8},cardTitle:{fontSize:20,fontWeight:'800'},description:{color:'#6b7280',marginVertical:8},price:{color:'#92400e',fontSize:18,fontWeight:'900'}});
