import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    flexGrow: 1,
    backgroundColor: '#1abc9c',
  },
  welcome: {
    textAlign: 'center',
    margin: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#fff',
    width: 160,
    opacity: 0.6,
  },
  inputContainer: {
    margin: 30,
    marginBottom: 0,
    padding: 10,
    paddingBottom: 10,
    alignSelf: 'stretch',
    width: 250,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  input: {
    fontSize: 16,
    height: 40,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  buttonContainer: {
    alignSelf: 'stretch',
    margin: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#455A64',
  },
});

export default styles;
