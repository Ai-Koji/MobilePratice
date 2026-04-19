import { Image } from 'expo-image';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { useState } from 'react';

const operations = ['%', 'C', '÷', 'x','-', '+', '.', '+-', ','];

export default function HomeScreen() {
  const [expression, setExpression] = useState('');
  
  const pressNumber = (num : string) => {
    setExpression((prev)=> prev+num);
  }  

  const pressOperation = (op : string) => {
    if (op === 'C') {
      setExpression('');
    }

    console.log(expression[expression.length-1], operations, operations.find(el => el === expression[expression.length-1]))
    if (operations.find(el => el === expression[expression.length-1])?.length) {
      setExpression((prev : string)=> {
        return prev.slice(0, -1) + op;
      });
    } else 
      setExpression((prev : string)=> prev+op);
  }

  const pressClean = () => {
    setExpression('');
  }

  const pressEqual = () => {
    let tempExpression = expression;
    tempExpression = tempExpression.replace(',', '.');
    tempExpression = tempExpression.replace('x', '*');
    tempExpression = tempExpression.replace('÷', '/');

    console.log(tempExpression);

    setExpression(eval(tempExpression).toString());
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}>
        <ThemedView>
          <ThemedText style={styles.displayPanel}>{expression}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.inputPanel}>
          {/* row */}
          <ThemedView style={styles.inputRow}>
            <TouchableOpacity style={styles.button} onPress={() => pressClean()}>
              <ThemedText style={styles.buttonText}>AC</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => pressNumber('1')}>
              <ThemedText style={styles.buttonText}>+/-</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => pressNumber('%')}>
              <ThemedText style={styles.buttonText}>%</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.button, ...styles.buttonOperation}} onPress={() => pressOperation('÷')}>
              <ThemedText style={styles.buttonText}>÷</ThemedText>
            </TouchableOpacity>
          </ThemedView>
          {/* row */}
          <ThemedView style={styles.inputRow}>
            <TouchableOpacity style={styles.button} onPress={() => pressNumber('7')}>
              <ThemedText style={styles.buttonText}>7</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => pressNumber('8')}>
              <ThemedText style={styles.buttonText}>8</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => pressNumber('9')}>
              <ThemedText style={styles.buttonText}>9</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.button, ...styles.buttonOperation}} onPress={() => pressOperation('x')}>
              <ThemedText style={styles.buttonText}>X</ThemedText>
            </TouchableOpacity>
          </ThemedView>
          {/* row */}
          <ThemedView style={styles.inputRow}>
            <TouchableOpacity style={styles.button} onPress={() => pressNumber('4')}>
              <ThemedText style={styles.buttonText}>4</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => pressNumber('5')}>
              <ThemedText style={styles.buttonText}>5</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => pressNumber('6')}>
              <ThemedText style={styles.buttonText}>6</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.button, ...styles.buttonOperation}} onPress={() => pressOperation('-')}>
              <ThemedText style={styles.buttonText}>-</ThemedText>
            </TouchableOpacity>
          </ThemedView>
          {/* row */}
          <ThemedView style={styles.inputRow}>
            <TouchableOpacity style={styles.button} onPress={() => pressNumber('1')}>
              <ThemedText style={styles.buttonText}>1</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => pressNumber('2')}>
              <ThemedText style={styles.buttonText}>2</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => pressNumber('3')}>
              <ThemedText style={styles.buttonText}>3</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.button, ...styles.buttonOperation}} onPress={() => pressOperation('+')}>
              <ThemedText style={styles.buttonText}>+</ThemedText>
            </TouchableOpacity>
          </ThemedView>
          {/* row */}
          <ThemedView style={styles.inputRow}>
            <TouchableOpacity style={{...styles.button, ...styles.buttonZero}} onPress={() => pressNumber('0')}>
              <ThemedText style={styles.buttonText}>0</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => pressOperation(',')}>
              <ThemedText style={styles.buttonText}>,</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.button, ...styles.buttonOperation}} onPress={() => pressEqual()}>
              <ThemedText style={styles.buttonText}>=</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
    justifyContent:'flex-end',
  },
  scrollContent: {
    flexGrow:1,
    flexDirection:'column',
    justifyContent:'flex-end',
    paddingBottom:100,
    gap:15
  },
  displayPanel: {
    textAlign: 'right',
    fontSize: 50,
    fontWeight:'bold',
    paddingTop:30,
    width:270,
    margin: 0,
    marginHorizontal: 'auto'
  },
  inputPanel: {
    gap:10

  },
  inputRow: {
    justifyContent: 'center',
    flexDirection:'row',
    gap:10
  },
  button: {
    backgroundColor: '#7894aa',
    width:60,
    height:60,
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize:25,
    fontWeight: 'bold',
  },
  buttonZero: {
    width: 130
  },
  buttonOperation: {
    backgroundColor: '#fd8103'
  }
});
