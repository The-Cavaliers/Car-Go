import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    resizeMode: 'cover',
    width: null,
    height: null,
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
    borderColor: '#D8D9DD',
  },
  bioinput: {
    fontSize: 16,
    height: 80,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,1)',
    borderWidth: 1,
    borderColor: '#D8D9DD',
  },
  buttonContainer: {
    alignSelf: 'stretch',
    margin: 20,
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#2E4CE5',
  },
  buttonText: {
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
    height: 28,
    width: 28,
    borderRadius: 14,
    backgroundColor: '#66bfff',
    position: 'absolute',
    bottom: 2,
    right: 2,
  },
  joinbuttonText: {
    fontSize: 8,
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
    height: 28,
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

  mapbuttonText: {
    fontSize: 8,
    marginTop: 8,
    marginLeft: 5,
    width: 20,
    color: '#fff',
  },
  error: {
    marginBottom: 4,
    color: 'red',
  },
  loading: {
    height:50,
    width: 50,
  },
  icon: {
    height:36,
    width: 36,
    borderRadius: 16,
    position: 'absolute',
    top: 2,
    left: 2,
  },

  scrollContainer: {
    backgroundColor: '#fff',
    padding: 10,
    flex: 1,
    borderRadius: 3,
    borderColor: '#dae5ed',
    borderWidth: 10,
  alignSelf: 'stretch',
  },
  piker: {
    width: 50,
  },
  seatsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    marginBottom: 5
  },
  seatsButton: {
    width: 100,
    height: 50,
    padding: 15,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#2E4CE5',
  },
  seatsTextHolder: {
    width: 100,
    padding: 10,
  },
  seatsText: {
    fontSize: 20,
    paddingLeft: 40
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    resizeMode: 'cover',
    width: null,
    height: null,
  },
  margin: {
    marginLeft: 2,
    marginRight: 2,
    padding: 10,
  },
  small: {
    marginLeft: 20
  }
});

export default styles;
