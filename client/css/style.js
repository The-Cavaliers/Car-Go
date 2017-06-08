import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    flexGrow: 1,
    backgroundColor: '#fff',
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
    width: null,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#E4F2FA',
    alignItems: 'center',
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
  group: {
    borderRadius: 2,
    borderWidth: 1,
    marginLeft: 30,
    marginRight: 30,
    borderColor: '#66bfff',
    marginTop: 3,
    marginBottom: 3,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  joinButton: {
    height:28,
    width: 28,
    borderRadius: 14,
    backgroundColor: '#66bfff',
    position: 'absolute',
    bottom: 2,
    right: 2,
  },
  joinbuttonText: {
    fontSize: 10,
    marginTop: 8,
    marginLeft: 4,
    width: 22,
    color: '#fff',
  },
  removeButton: {
    height:28,
    width: 28,
    borderRadius: 14,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 2,
    left: 2,
  },
  removebuttonText: {
    fontSize: 10,
    marginTop: 8,
    marginLeft: 4,
    width: 22,
    color: '#fff',
  },
  error: {
    marginBottom: 4,
    color: 'red'
  },
  icon: {
    height:36,
    width: 36,
    borderRadius: 16,
  },

});

export default styles;
