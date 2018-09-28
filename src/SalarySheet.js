import React from 'react'
import {
  Platform,
  ToastAndroid,
  View,
  Alert,
  ScrollView
} from 'react-native'
import {
  FormInput,
  FormLabel,
  FormValidationMessage,
  Button,
  Header,
  List,
  ListItem,
  Text,
  Divider
} from 'react-native-elements'

import { find, findAll, save } from './Orm'

const alert = Alert.alert

let uniqueId = 0

export default class SalarySheet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      invalidSalary: false,
      salary: '',
      name: '',
      employees: []
    }
    this.onChangeSalary = this.onChangeSalary.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    findAll().then((res) => {
      this.setState({ employees: res })
    })
  }
  
  onChangeSalary(input) {
    let invalid = false
    if (input === '') {
      invalid = false
    } else {
      // invalid number format?
      invalid = isNaN(input) || isNaN(parseFloat(input)) ? true : false
    }
    this.setState(() => ({ invalidSalary: invalid, salary: input }))
  }

  onSubmit() {
    if (this.state.invalidSalary) {
      alert('Invalid Salary Input')
    } else if (this.state.salary === '' || this.state.name === '') {
      alert('Empty String Input')
    } else {
      uniqueId += 1
      save(uniqueId, this.state.name, this.state.salary).then(() => {
        this.setState((prev) => {
          let employees = prev.employees
          employees.push({ name: this.state.name, salary: this.state.salary, uniqueId })
          return { employees, name: '', salary: ''}
        })

        if (Platform.OS === 'android') {
          ToastAndroid.showWithGravity(
            'New item has been saved',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          )
        }
      })
    }
  }

  render() {
    const error_msg = this.state.invalidSalary ?
    <FormValidationMessage >{ 'Only number accepted' }</FormValidationMessage>
    : null

    return (
      <View style={{flex: 1}}>
        <Header
          centerComponent={{ text: 'Awesome Project', style: { color: '#fff', fontSize: 18 } }}
        />
        <View>
          <FormLabel>Name</FormLabel>
          <FormInput
            value={ this.state.name }
            onChangeText={ name => this.setState({ name }) }/>
          
          <FormLabel>Salary</FormLabel>
          <FormInput
            value={ this.state.salary }
            onChangeText={ this.onChangeSalary }
            keyboardType='numeric'/>

          { error_msg }
          
          <Button
            title='Submit'
            onPress={ this.onSubmit }
            rightIcon={{ name: 'done' }}
            backgroundColor='#09af00'/>
        </View>
        <Divider style={{ backgroundColor: '#FFF', height: 40 }} />
        <Text style={{ color: '#777', marginLeft: 10 }}>{ 'All Employees: ' }</Text>
        <ScrollView
          contentContainerStyle={{flexGrow:1}}>
          <View style={{flex: 1}}>
            <List>
              {
                this.state.employees.map((item)=>(
                  <ListItem
                    title={item.name}
                    subtitle={item.salary}
                    key={item.uniqueId.toString()}
                  />
                ))
              }
            </List>
          </View>
        </ScrollView>
      </View>
    )
  }
}