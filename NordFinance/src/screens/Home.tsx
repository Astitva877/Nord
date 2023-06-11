import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Slider from '@react-native-community/slider';
import axios from 'axios';
const Home = () => {
  const [amount, setAmount] = useState(0);
  const [mainAmount, setMainAmount] = useState(0);
  const [check, setCheck] = useState('Week');
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(7);
  const [ratio, setRatio] = useState('');
  const [investedAMount, setInvestedAmount] = useState('');
  const [returns, setReturns] = useState('');
  const calculate = () => {
    if (check === 'Week') {
      setDuration(7);
    } else if (check === 'Month') {
      setDuration(30);
    } else if (check === 'Year') {
      setDuration(365);
    }
    if (amount === 0) {
      Alert.alert('Investment Amount should not be zero');
    } else if (time === 0) {
      Alert.alert('Investment Timeline should be greater than zero');
    } else {
      axios
        .post('https://api.nordl.io/api/product/calculator-for-pool', {
          poolId: 11,
          frqInDays: duration,
          investmentCount: time,
          sipAmount: JSON.stringify(mainAmount),
        })
        .then(function (response) {
          console.log(response.data.data.result.absoluteReturns);
          console.log(response.data.data.result.resultData[time - 1]);
          setRatio(response.data.data.result.absoluteReturns);
          setInvestedAmount(
            response.data.data.result.resultData[time - 1].investedAmountInUSD,
          );
          setReturns(
            response.data.data.result.resultData[time - 1].worthNowInUSD,
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    setMainAmount(amount * 1000);
    console.log(mainAmount);
  }, [amount]);
  return (
    <View style={styles.container}>
      <View style={styles.upperFlex}>
        <View style={styles.innerFlex}>
          <Text style={styles.textStyle}>Invested Amount(In USD)</Text>
          <Slider
            style={{width: '90%', height: '30%'}}
            minimumValue={0}
            maximumValue={21}
            minimumTrackTintColor="#9EACDB"
            maximumTrackTintColor="#304FFE"
            value={amount}
            onValueChange={setAmount}
            thumbTintColor="#304FFE"
            step={1}
          />
          <Text style={styles.textStyle}>Amount Selected: ${amount}k</Text>
        </View>
      </View>
      <View style={styles.middleFlex}>
        <View style={styles.innerFlex}>
          <View
            style={{
              height: '30%',
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.textStyle}>Invested In:</Text>
            <TouchableOpacity
              style={{
                height: '30%',
                width: '70%',
                backgroundColor: '#F3F3F3',
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#000000', fontSize: 12}}>
                Grayscale Bitcoin Trust
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: '30%',
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.textStyle}>Frequency</Text>
            <TouchableOpacity
              style={
                check === 'Week' ? styles.tapButtonStyle : styles.buttonStyle
              }
              onPress={() => setCheck('Week')}>
              <Text
                style={check === 'Week' ? styles.tapContent : styles.content}>
                Every Week
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                check === 'Month' ? styles.tapButtonStyle : styles.buttonStyle
              }
              onPress={() => setCheck('Month')}>
              <Text
                style={check === 'Month' ? styles.tapContent : styles.content}>
                Every Month
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                check === 'Year' ? styles.tapButtonStyle : styles.buttonStyle
              }
              onPress={() => setCheck('Year')}>
              <Text
                style={check === 'Year' ? styles.tapContent : styles.content}>
                Every Year
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: '30%',
              width: '100%',
            }}>
            <Text style={styles.textStyle}>Investment Timeline</Text>
            <Slider
              style={{width: '90%', height: '60%'}}
              minimumValue={0}
              maximumValue={10}
              minimumTrackTintColor="#9EACDB"
              maximumTrackTintColor="#304FFE"
              value={time}
              onValueChange={setTime}
              thumbTintColor="#304FFE"
              step={1}
            />
            <Text style={styles.textStyle}>Time Period: {time} Years</Text>
          </View>
        </View>
      </View>
      <View style={{flex: 0.4, alignItems: 'center'}}>
        <View style={{height: '100%', width: '90%'}}>
          <TouchableOpacity
            style={{
              height: '20%',
              width: '100%',
              backgroundColor: '#304FFE',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => calculate()}>
            <Text style={{color: '#FFFFFF', fontSize: 15, fontWeight: '500'}}>
              Calculate
            </Text>
          </TouchableOpacity>
          <Text style={styles.textStyle}>Absolute Return: {ratio}</Text>
          <Text style={styles.textStyle}>
            Invested Amount: {investedAMount}
          </Text>
          <Text style={styles.textStyle}>
            Money you would have now: {returns}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  upperFlex: {flex: 0.2, alignItems: 'center'},
  innerFlex: {width: '90%', height: '100%', justifyContent: 'center'},
  textStyle: {color: '#000000', fontSize: 14},
  middleFlex: {flex: 0.4, alignItems: 'center'},
  content: {color: '#000000', fontSize: 12},
  tapContent: {color: '#FFFFFF', fontSize: 12},
  buttonStyle: {
    height: '30%',
    width: '23%',
    backgroundColor: '#F3F3F3',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tapButtonStyle: {
    height: '30%',
    width: '23%',
    backgroundColor: '#304FFE',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
