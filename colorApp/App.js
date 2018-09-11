/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Alert, } from 'react-native';
import ColorList from './components/ColorList';
import { StackNavigator } from 'react-navigation'
import ColorInfo from './components/ColorInfo'

const Appi = StackNavigator({
  Home: { screen: ColorList },
  Details: { screen: ColorInfo }
})

export default class App extends Component {


  render() {
    return (
      <Appi />
    )
  }
}