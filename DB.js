import _ from 'lodash'

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
    },
    {
      id: '8',
      name: 'test1',
      isSelected: false,
    },
    {
      id: '81',
      name: 'test2 hdsj',
      isSelected: false,
    },
    {
      id: '82',
      name: 'rarar',
      isSelected: false,
    },
    {
      id: '83',
      name: 'some issue',
      isSelected: false,
    },
    {
      id: '84',
      name: 'lili',
      isSelected: false,
    },
    {
      id: '85',
      name: 'english',
      isSelected: false,
    },
    {
      id: '86',
      name: 'phrasess',
      isSelected: false,
    },
    {
      id: '21',
      name: '2אהבה',
      isSelected: false,
    },
    {
      id: '22',
      name: '2זוגיות',
      isSelected: false,
    },
    {
      id: '23',
      name: '2התפתחות',
      isSelected: false,
    },
    {
      id: '24',
      name: '2אושר',
      isSelected: false,
    },
    {
      id: '25',
      name: '2לימודים',
      isSelected: false,
    },
    {
      id: '26',
      name: '2טיולים',
      isSelected: false,
    },
    {
      id: '27',
      name: '2חלומות',
      isSelected: false,
    },
]
const defaultTagsIDs = ['1', '5', '7', '3', '4',]
const items = [
    {
      id: '1',
      type: 'PHRASE',
      tags: ['1', '2', '3', '4', '5'],
      image: 'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f',
      content: 'איזהו גבור? - הכובש את יצרו',
      explanation: 'מיהו גיבור? – אדם שיודע להתאפק ולרסן את יצריו.',
      example: 'למשל מי שיודע לשבת וללמוד ללא דחיינות  הוא גיבור הוא גיבור הוא גיבור הוא גיבור הוא גיבור הוא גיבור הוא גיבור הוא גיבור כי הוא וא גיבור הוא גיבור הוא גיבור הוא גיבור הוא גיבור הוא גיבור הוא גיבור כי הוא וא גיבור הוא גיבור הוא גיבור הוא גיבור הוא גיבור הוא גיבור הוא גיבור כי הוא וא גיבור הוא גיבור הוא גיבור הוא גיבור הוא גיבור הוא גיבור הוא גיבור כי הוא כבש את יצריו',
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
      isFavorite: true
    },
    {
      id: '3',
      type: 'PHRASE',
      tags: ['6', '2'],
      image: 'https://www.herobuddy.org/wp-content/uploads/2020/03/Super-hero-head-sm-1.jpg',
      content: 'אִם אֵין אֲנִי לִי, מִי לִי? וּכְשֶׁאֲנִי לְעַצְמִי, מָה אֲנִי? וְאִם לֹא עַכְשָׁיו, אֵימָתַי?',
      explanation: 'אם אני לא אדאג לעצמי – מי יעשה זאת במקומי? אבל כשאני דואג רק לעצמי ולא לטובת אחרים – מה עֶרְכִּי? ואם איני עושה את חובתי עכשיו – מתי אעשה אותה? (אין לדחות דברים.)',
      source: 'אבות, א פסוק יג',
      example: '',
      isFavorite: true
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
      isFavorite: true
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
      isFavorite: true
    }
]
const enhancedItems = _.map(items, item => ({
    ...item,
    tagNames: _.map(item.tags, tagID => _.find(tags, { 'id': tagID }).name)
}))

const getItems = (searchStr) => {
    if (searchStr !== undefined && searchStr.length > 0) {
        return _.filter(enhancedItems, item => _.includes(_.toLower(item.content), _.toLower(searchStr)))
    }
    return enhancedItems
}

const getRandomItem = () => {
    const rand = Math.floor(Math.random() * enhancedItems.length)
    return enhancedItems[rand]
}

const getFavoriteItems = (searchStr) => {
  const favoriteItems = _.filter(enhancedItems, item => item.isFavorite)
    if (searchStr !== undefined && searchStr.length > 0) {
        return _.filter(favoriteItems, item => _.includes(_.toLower(item.content), _.toLower(searchStr)))
    }
    return favoriteItems
}

const getTags = (searchStr) => {
    if (searchStr !== undefined && searchStr.length > 0) {
        return _.filter(tags, tag => _.includes(_.toLower(tag.name), _.toLower(searchStr)))
    }
    return tags
}

const getDefaultTagsIDs = () => {
    return defaultTagsIDs
}

export {
    getItems,
    getTags,
    getDefaultTagsIDs,
    getRandomItem,
    getFavoriteItems
}