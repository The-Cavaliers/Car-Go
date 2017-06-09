import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
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
    margin: 5,
    marginBottom: 0,
    padding: 10,
    paddingBottom: 10,
    alignSelf: 'stretch',
    width: null,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    height: 40,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,1)',
    borderWidth: 1,
    borderColor: '#D8D9DD'
  },
  buttonContainer: {
    alignSelf: 'stretch',
    margin: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#2E4CE5',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  group: {
    borderWidth: 1,
    borderColor: '#D8D9DD',
    marginTop: 3,
    marginBottom: 3,
    width: 300,
    height: 60,
    padding: 20,
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
    fontSize: 8,
    marginTop: 8,
    marginLeft: 5,
    width: 22,
    color: '#fff',
  },
  chatbuttonText: {
    fontSize: 8,
    marginTop: 8,
    marginLeft: 5,
    width: 21,
    color: '#fff',
  },
  messagebuttonText: {
    fontSize: 8,
    marginTop: 8,
    marginLeft: 1,
    width: 25,
    color: '#fff',
  },
  removeBtnHolder: {
    position: 'absolute',
    bottom: 2,
    right: 100,
  },
  removeButton: {
    height:28,
    width: 28,
    borderRadius: 14,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 2,
    left: 20,
  },
  removebuttonText: {
    fontSize: 8,
    marginTop: 8,
    marginLeft: 1,
    width: 25,
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
    position: 'absolute',
    top: 2,
    left: 2,
  },
  name: {
    fontSize: 12,
    position: 'absolute',
    bottom: 2,
    left: 1,
    color: 'gray'
  },
  from: {
    fontSize: 12,
    position: 'absolute',
    top: 1,
    left: 45,
    color: 'gray'
  },
  to: {
    fontSize: 12,
    position: 'absolute',
    top: 20,
    left: 45,
    color: 'gray'
  },
  date: {
    fontSize: 12,
    position: 'absolute',
    top: 1,
    right: 5,
    color: 'gray'
  },
  scrollContainer: {
    backgroundColor: '#fff',
    padding: 10,
  },
});

export default styles;
