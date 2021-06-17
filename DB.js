import AsyncStorage from '@react-native-async-storage/async-storage'
import * as firebase from 'firebase'
import * as Analytics from 'expo-firebase-analytics';
import 'firebase/firestore'
import _ from 'lodash'

let allTags
let allPhrases
let db
let favorites
let dailyPhraseSettings
let lastLogin
let user
const initDB = async () => {
  console.log("Init DB")

  var firebaseConfig = {
    apiKey: "AIzaSyBIeFGvB2PsUbCfp6YihqUZnYtxGr6-GYE",
    authDomain: "pitgamim-29280.firebaseapp.com",
    projectId: "pitgamim-29280",
    storageBucket: "pitgamim-29280.appspot.com",
    messagingSenderId: "261188976824",
    appId: "1:261188976824:web:a78e33bcbf6fee03c9f44d",
    measurementId: "G-N57YJCKVDL",
  }

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
  }
  db = firebase.firestore();

  firebase.auth().signInAnonymously()
    .then(() => {
      console.log('user is signed')
    })
    .catch((error) => {
      console.log(error)
    })

  firebase.auth().onAuthStateChanged((userProperties) => {
    if (userProperties) {
      user = userProperties
      Analytics.setClientId(user.uid)
    } else {
      console.log('User is signed out')
    }
  })
    
  
  const tagsCollection = await db.collection('database').doc('tags').get()
  const tags = tagsCollection.data().data
  allTags = _.orderBy(tags, tag => tag.usage ? parseInt(tag.usage) : 0, 'desc')
  const phrasesCollection = await db.collection('database').doc('phrases').get()
  allPhrases = phrasesCollection.data().data
  
  favorites = await AsyncStorage.getItem('favorites')
  if (favorites === null) {
    await AsyncStorage.setItem('favorites', JSON.stringify('[]'))
    favorites = []
  } else {
    favorites = JSON.parse(favorites)
  }
  dailyPhraseSettings = await AsyncStorage.getItem('dailyPhraseSettings')
  if (dailyPhraseSettings === null) {
    dailyPhraseSettings = { enabled: false }
    await AsyncStorage.setItem('dailyPhraseSettings', JSON.stringify(dailyPhraseSettings))
  } else {
    dailyPhraseSettings = JSON.parse(dailyPhraseSettings)
  }
  console.log('dailyPhraseSettings', dailyPhraseSettings)
  lastLogin = await AsyncStorage.getItem('lastLogin')
  if (lastLogin === null) {
    lastLogin = new Date()
  } else {
    lastLogin = new Date(lastLogin)
  }
  console.log('lastLogin', lastLogin)
  if (dailyPhraseSettings.enabled){
    const currentTime = new Date()
    const notificationTime = new Date(dailyPhraseSettings.time)
    const notificationToday = new Date()
    notificationToday.setSeconds(0)
    notificationToday.setMinutes(notificationTime.getMinutes())
    notificationToday.setHours(notificationTime.getHours())
    console.log('lastLogin', lastLogin, 'notificationToday', notificationToday, 'currentTime', currentTime)
    if (lastLogin.getTime() < notificationToday.getTime() && notificationToday.getTime() <= currentTime.getTime()){
      dailyPhraseSettings.shouldSeeDailyPhrase = true
      console.log('shouldSeeDailyPhrase')
    }
  }
  lastLogin = new Date()
  await AsyncStorage.setItem('lastLogin', lastLogin.toString())
  

  return true
}

const getTags = (searchStr) => {
  if (searchStr !== undefined && searchStr.length > 0) {
      return _.filter(allTags, tag => _.includes(_.toLower(tag.tag), _.toLower(searchStr)))
  }
  return allTags
}
const getDefaultTagsIDs = () => {
  return _.map(_.take(allTags, 5), 'id')
}
const resolveItem = (item) => {
  let image
  if (item.tags) {
    const { tags } = item
    const randTag = Math.floor(Math.random() * tags.length)
    const randTagIndex = _.findIndex(allTags, { tag: tags[randTag] })
    image = allTags[randTagIndex]?.url ? allTags[randTagIndex].url : undefined
  }
  return {
    ...item,
    image,
    isFavorite: _.includes(favorites, item.id)
  }
}
const getItemsByTags = async (tags) => {
  const requestedTags = _.map(
    _.filter(allTags, tag => _.includes(tags, tag.id)),
    'tag'
  )
  const results = _.filter(allPhrases, phrase => _.size(_.intersection(requestedTags, phrase.tags)) > 0)
  return _.shuffle(_.map(results, resolveItem))
}
const getRandomItem = async () => {
  console.log('getRandomItem')
  const phrasesOnly = await getItemsByTags(['40'])
  const rand = Math.floor(Math.random() * phrasesOnly.length)
  const item = phrasesOnly[rand]
  return resolveItem(item)
}
const addToFavorites = async (itemId) => {
  let action
  if (_.includes(favorites, itemId)){
    favorites = _.without(favorites, itemId)
    action = 'removed'
  } else {
    favorites = _.union(favorites, [itemId])
    action = 'added'
  }
  const dataStringified = JSON.stringify(favorites)
  await AsyncStorage.setItem('favorites', dataStringified)
  return action
}
const getFavoriteItems = async () => {
  const items = _.filter(allPhrases, phrase => _.includes(favorites, phrase.id))
  return _.map(items, resolveItem)
}
const getUser = () => firebase.auth().currentUser

const updateUserExpoNotificationsToken = (token, dailyPhraseTiming)  => firebase
  .database()
  .ref("users")
  .child(getUser().uid)
  .update({
    expoNotificationsToken: token,
    tokenLastUpdateTime: Date().toString(),
    dailyPhraseTiming
  })
const getDailyPhraseSettings = () => dailyPhraseSettings
const setDailyPhraseSettings = async (value) => {
  dailyPhraseSettings = value
  return AsyncStorage.setItem('dailyPhraseSettings', JSON.stringify(dailyPhraseSettings))
}
const sendAnalytics = async (eventName, additionalData) => {
  Analytics.logEvent(eventName, {
    user: getUser().uid,
    additionalData: additionalData || 'not provided'
  }).then(() => console.log('analytics sent', eventName))
}

export {
  initDB,
  getTags,
  getDefaultTagsIDs,
  getItemsByTags,
  getRandomItem,
  addToFavorites,
  getFavoriteItems,
  getUser,
  updateUserExpoNotificationsToken,
  getDailyPhraseSettings,
  setDailyPhraseSettings,
  sendAnalytics
}