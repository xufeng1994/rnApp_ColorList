import React, { Component } from 'react'
import {
  AppRegistry,
  Navigator
} from 'react-native'

import { StackNavigator } from 'react-navigation'

import ColorList from './components/ColorList'
import ColorInfo from './components/ColorInfo'

const Appi = StackNavigator({
  Home: { screen: ColorList },
  Details: { screen: ColorInfo }
})

export default class App extends Component{
  render(){
    return(
      <Navigator 
      initialRoute ={{name:'Color List'}}
      renderScene ={(route,navigator)=>{
        switch (route.name){
          default:
            return <ColorList/>
        }
      }}
      />
    )
  }
}