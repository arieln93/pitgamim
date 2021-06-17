var firebase = require('firebase')
var firestore = require('firebase/firestore')
var _ = require('lodash')
var fs = require('fs')
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

const pullDataFromFireStore = async () => {
  const tagsCollection = await db.collection('database').doc('tags').get()
  const tags = tagsCollection.data().data
  allTags = _.orderBy(tags, tag => tag.usage ? parseInt(tag.usage) : 0, 'desc')
  const phrasesCollection = await db.collection('database').doc('phrases').get()
  allPhrases = phrasesCollection.data().data
  fs.writeFileSync('./data.json', JSON.stringify({ tags: allTags, phrases: allPhrases}, null, 2))
}

const fetchLocalDataFile = () => {
    const { tags, phrases } = JSON.parse(fs.readFileSync('./data.json'))
    const updatedTags = _.filter(tags, tag => !tag.url || tag.url === "")
    console.log(updatedTags)
    //fs.writeFileSync('./data.json', JSON.stringify({ tags: updatedTags, phrases }, null, 2))
}

(async () => {
    console.log('ds')
    fetchLocalDataFile()
})()