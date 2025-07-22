import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';

const WORDS = [
  'ARABA',
  'KAHVE',
  'SABAH',
  'KIRAZ',
  'CEVAP'
];

const randomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

export default function App() {
  const [word, setWord] = useState(randomWord);
  const [input, setInput] = useState('');
  const [guesses, setGuesses] = useState([]);

  const handleSubmit = () => {
    if (input.length === 5) {
      setGuesses([...guesses, input.toUpperCase()]);
      setInput('');
    }
  };

  useEffect(() => {
    if (guesses[guesses.length - 1] === word) {
      // Word guessed correctly
    }
  }, [guesses]);

  const getColor = (guessChar, index) => {
    const char = word[index];
    if (guessChar === char) return styles.green;
    if (word.includes(guessChar)) return styles.yellow;
    return styles.gray;
  };

  const renderGuess = ({ item }) => (
    <View style={styles.row}>
      {item.split('').map((char, idx) => (
        <View key={idx} style={[styles.box, getColor(char, idx)]}>
          <Text style={styles.letter}>{char}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={guesses}
        renderItem={renderGuess}
        keyExtractor={(item, index) => `${item}-${index}`}
      />
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        maxLength={5}
        onSubmitEditing={handleSubmit}
        autoCapitalize="characters"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5
  },
  box: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  letter: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10
  },
  green: {
    backgroundColor: 'green'
  },
  yellow: {
    backgroundColor: 'gold'
  },
  gray: {
    backgroundColor: 'lightgray'
  }
});
