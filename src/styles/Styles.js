import { StyleSheet, Dimensions } from 'react-native';
import values from './Values';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  //Splash Container styles:
  root: {
    backgroundColor: values.active_color
  },
  splashContainer: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
    //paddingBottom:53,
  },
  container: {
    flex: 12,
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  map: {
    position: 'absolute',
    top: 53,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 12
  },
  welcome_logo_container: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  welcome_logo: {
    height: (windowHeight * 1) / 5,
    resizeMode: 'contain'
  },
  form_head: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: values.active_color,
    paddingTop: 10,
    paddingBottom: 20
  },
  title: {
    justifyContent: 'center',
    fontSize: 20,
    color: '#fff'
  },
  container: {
    flex: 4,
    backgroundColor: '#ffffff',
    flexDirection: 'column'
  },
  header: {
    flex: 1,
    justifyContent: 'center'
  },
  headerText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    color: values.primary
  },
  body: {
    flex: 12,
    paddingTop: 25,
    paddingBottom: 100
  },
  status: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 0,
    borderWidth: 0
  },
  formRowText: {
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  formRow: {
    flex: 6,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.5)',
    borderWidth: 0.4,
    padding: 6,
    paddingLeft: 6,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    paddingBottom: 1,
    borderRadius: 5,
    borderBottomWidth: 0.2,
    borderRightWidth: 0.2,
    borderTopWidth: 0.2,
    borderColor: '#607d8b',
    bottom: 0.2,
    top: 0.2,
    right: 0.2
  },
  descriptionContainer: {
    flexDirection: 'row',
    paddingLeft: 0,
    borderWidth: 0.2,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    paddingTop: 3,
    borderColor: 'rgba(0,0,0,0.04)',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  description: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 0,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    paddingLeft: 15,
    minHeight: 120
  },
  formInputError: {
    flex: 6,
    //borderColor: 'rgba(0,0,0,0.5)',
    //borderWidth: 0.4,
    padding: 6,
    paddingLeft: 6,

    //paddingBottom: 1,
    //borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 0, 0, 1)',
    backgroundColor: 'rgba(0,0,0,0.04)',
    bottom: 0
  },
  formButtons: {
    alignItems: 'center',
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 26,
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: values.active_color
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  login: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  formRow: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 30,
    marginTop: 10,
    backgroundColor: '#fff',
    marginBottom: 5
  },
  formBlock: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    backgroundColor: 'rgba(25, 43, 62, 0.9)',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginLeft: 20
  },
  formHeader: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20
  },
  formInput: {
    flex: 5
  },
  formLabel: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
    //borderTopLeftRadius: 15,
    //borderBottomLeftRadius: 15,
    //backgroundColor: 'rgba(0,0,0,0.04)',
  },
  formLabelDescription: {
    flex: 0.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15
    // backgroundColor: 'rgba(0,0,0,0.04)',
  },
  labelText: {
    color: 'rgba(25, 43, 62, 0.9)'
  },
  formInputText: {
    //fontSize: 50,
    backgroundColor: '#fff',
    padding: 10
  }
});
export default styles;
