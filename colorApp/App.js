/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet,ListView,AsyncStorage} from 'react-native';
import ColorButton from './components/ColorButton'
import ColorForm from './components/ColorForm'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component{

  constructor(){
    super();
    this.ds = new ListView.DataSource({
      rowHasChanged:(r1,r2) => r1 !== r2
    })
    const availableColors = []
    this.state ={
      backgroundColor:'blue',
      availableColors,
      dataSource:this.ds.cloneWithRows(availableColors)
    }
    this.changeColor = this.changeColor.bind(this)
    this.newColor = this.newColor.bind(this)
  }

  componentDidMount(){
    AsyncStorage.getItem(
      '@ColorListStore:Colors',
      (err,data)=>{
        if(err){
          console.error('Error Loading colors',err)
        }else{
          const availableColors = JSON.parse(data)
          this.setState({
            availableColors,
            dataSource:this.ds.cloneWithRows(availableColors)
          })
          }
        }
      )
    }
  saveColor(colors){
    AsyncStorage.setItem(
      '@ColorListStore:Colors',
      JSON.stringify(colors)
    )
  }

  changeColor(backgroundColor){
    this.setState({backgroundColor})
  }

  newColor(color){
    const availableColors =[
      ...this.state.availableColors,
      color
    ]
    this.setState({
      availableColors,
      dataSource:this.ds.cloneWithRows(availableColors)
    })
    this.saveColor(availableColors)
  }
 
  render() {
    const {backgroundColor,dataSource} = this.state
    return (
      
      <ListView style={[styles.container,{backgroundColor}]}
        dataSource ={dataSource}
        renderRow={(color)=>(
          <ColorButton backgroundColor ={color}
            onSelect = {this.changeColor}/>
        )}
        renderHeader = {()=>(
          <ColorForm  onNewColor ={this.newColor}/>
        )}>
        
      </ListView>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    backgroundColor:'lightgrey',
    paddingTop:20,
    fontSize:30,
    textAlign:'center'
  }
});
