import React from 'react';
import { Text, View } from 'react-native';
import _ from 'lodash'

import Styles from './styles'
import Dictionary from '../../constants/dictionary'
import TagsGroup from '../../components/TagsGroup/TagsGroup'
import CardsList from '../../components/CardsList/CardsList'
import * as Screen from '../Screen'

const HomeScreen = props => {
  const tags = [
    {
      id: '1',
      name: 'אהבה',
      isSelected: false,
    },
    {
      id: '2',
      name: 'זוגיות',
      isSelected: false,
    },
    {
      id: '3',
      name: 'התפתחות',
      isSelected: false,
    },
    {
      id: '4',
      name: 'אושר',
      isSelected: false,
    },
    {
      id: '5',
      name: 'לימודים',
      isSelected: false,
    },
    {
      id: '6',
      name: 'טיולים',
      isSelected: false,
    },
    {
      id: '7',
      name: 'חלומות',
      isSelected: false,
    }
  ]
  const selectedTags = [
    {
      id: '1',
      name: 'אהבה',
      isSelected: true,
    },
    {
      id: '2',
      name: 'זוגיות',
      isSelected: true,
    },
    {
      id: '3',
      name: 'התפתחות',
      isSelected: true,
    },
  ]
  const items = [
    {
      id: '1',
      type: 'PHRASE',
      tags: ['1', '2', '3', '4', '5'],
      image: 'https://www.herobuddy.org/wp-content/uploads/2020/03/Super-hero-head-sm-1.jpg',
      content: 'איזהו גבור? - הכובש את יצרו',
      explanation: 'מיהו גיבור? – אדם שיודע להתאפק ולרסן את יצריו.',
      source: 'מסכת אבות, ד פסוק א ',
      example: 'למשל מי שיודע לשבת וללמוד ללא דחיינות הוא גיבור כי הוא כבש את יצריו',
    },
    {
      id: '2',
      type: 'QUOTE',
      tags: ['2', '3', '7'],
      image: 'https://www.herobuddy.org/wp-content/uploads/2020/03/Super-hero-head-sm-1.jpg',
      content: 'יום ללא צחוק הוא יום מבוזבז',
      explanation: '',
      source: "צ'ארלי צ'פלין",
      example: '',
    },
    {
      id: '3',
      type: 'PHRASE',
      tags: ['5', '6', '2'],
      image: 'https://www.herobuddy.org/wp-content/uploads/2020/03/Super-hero-head-sm-1.jpg',
      content: 'אִם אֵין אֲנִי לִי, מִי לִי? וּכְשֶׁאֲנִי לְעַצְמִי, מָה אֲנִי? וְאִם לֹא עַכְשָׁיו, אֵימָתַי?',
      explanation: 'אם אני לא אדאג לעצמי – מי יעשה זאת במקומי? אבל כשאני דואג רק לעצמי ולא לטובת אחרים – מה עֶרְכִּי? ואם איני עושה את חובתי עכשיו – מתי אעשה אותה? (אין לדחות דברים.)',
      source: 'אבות, א פסוק יג',
      example: '',
    },
    {
      id: '12',
      type: 'PHRASE',
      tags: ['1', '3', '4'],
      image: 'https://www.herobuddy.org/wp-content/uploads/2020/03/Super-hero-head-sm-1.jpg',
      content: 'איזהו גבור? - הכובש את יצרו',
      explanation: 'מיהו גיבור? – אדם שיודע להתאפק ולרסן את יצריו.',
      source: 'מסכת אבות, ד פסוק א ',
      example: 'למשל מי שיודע לשבת וללמוד ללא דחיינות הוא גיבור כי הוא כבש את יצריו',
    },
    {
      id: '22',
      type: 'QUOTE',
      tags: ['2', '3', '7'],
      image: 'https://www.herobuddy.org/wp-content/uploads/2020/03/Super-hero-head-sm-1.jpg',
      content: 'יום ללא צחוק הוא יום מבוזבז',
      explanation: '',
      source: "צ'ארלי צ'פלין",
      example: '',
    },
    {
      id: '32',
      type: 'PHRASE',
      tags: ['5', '6', '2'],
      image: 'https://www.herobuddy.org/wp-content/uploads/2020/03/Super-hero-head-sm-1.jpg',
      content: 'אִם אֵין אֲנִי לִי, מִי לִי? וּכְשֶׁאֲנִי לְעַצְמִי, מָה אֲנִי? וְאִם לֹא עַכְשָׁיו, אֵימָתַי?',
      explanation: 'אם אני לא אדאג לעצמי – מי יעשה זאת במקומי? אבל כשאני דואג רק לעצמי ולא לטובת אחרים – מה עֶרְכִּי? ואם איני עושה את חובתי עכשיו – מתי אעשה אותה? (אין לדחות דברים.)',
      source: 'אבות, א פסוק יג',
      example: '',
    }
  ]
  const enhancedItems = _.map(items, item => ({
    ...item,
    tags: _.map(item.tags, tagID => _.find(tags, { 'id': tagID }))
  }))
  return (
    <Screen.Screen>
      <Screen.Header title={Dictionary.FAVORITES_SCREEN.HEADER} />
      <Screen.Body>
        <View style={Styles.itemsList}>
          <CardsList items={enhancedItems} />
        </View>
      </Screen.Body>
    </Screen.Screen>
  )
}

export default HomeScreen