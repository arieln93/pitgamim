import React, { useRef, useState, useEffect } from 'react'
import { Text, View, ScrollView, FlatList, Image, TouchableOpacity, I18nManager } from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import * as ImagePicker from 'expo-image-picker'
try { 
  I18nManager.forceRTL(false)
  I18nManager.allowRTL(false)
}
catch (e) {
  console.log(e)
}
import ViewShot from "react-native-view-shot";
import * as Sharing from 'expo-sharing';
import _ from 'lodash'

import Styles from './styles'
import Dictionary from '../../constants/dictionary'
import Colors from '../../constants/colors'
import Icons from '../../icons/icons'

import * as DB from '../../DB'
import * as Screen from '../Screen'

const FilterButton = props => {
  const { icon, handleClick } = props
  return(
    <TouchableOpacity
      onPress={handleClick}
      style={Styles.filterButton.wrapper}>
      <Image
        style={Styles.filterButton.icon}
        source={icon}
      />
    </TouchableOpacity>
  )
}

const Filter = props => {
  const { title, children } = props
  return (
    <View style={Styles.filter.wrapper}>
      <Text style={Styles.filter.title}>{title}</Text>
      { children }
    </View>
  )
}

const SliderFilter = props => {
  const { value, minimum, maximum, step, onChange } = props
  return (
    <View style={Styles.sliderFilter.wrapper}>
      <MultiSlider
        containerStyle={Styles.sliderFilter.slider}
        values={[value]}
        min={minimum}
        max={maximum}
        step={step}
        onValuesChange={(values) => onChange(values[0])}
      />
    </View>
  )
}

const ColorFilter = props => {
  const { value, minimum, maximum, step, onChange } = props
  return (
    <View style={Styles.sliderFilter.wrapper}>
      <MultiSlider
        containerStyle={Styles.sliderFilter.slider}
        values={[value]}
        min={minimum}
        max={maximum}
        step={step}
        onValuesChange={(values) => onChange(values[0])}
      />
    </View>
  )
}

const FontsFilter = props => {
  const { value, options, onChange } = props
  return (
    <FlatList
      inverted={true}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={options}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={Styles.fontsFilter.option.wrapper(item === value)}
          onPress={() => onChange(item)}
        >
          <Text style={[Styles.fontsFilter.option.text(item === value), { fontFamily: item }]}>אבג</Text>
        </TouchableOpacity>
      )}
    />
  )
}

const BackgroundFilter = props => {
  const { value, options, onChange, pickImageHandler } = props
  return (
    <View
      style={{
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      { options.map(option => (
        <TouchableOpacity
          key={option}
          style={Styles.backgroundFilter(option, option === value)}
          onPress={() => onChange(option)}
        />
      ))}
      <FilterButton
        icon={Icons.addImage}
        handleClick={pickImageHandler}
      />
    </View>
  )
}

const ExportScreen = ({ navigation, route }) => {
  const getInitialFilters = () => ({
    opacity: {
      title: Dictionary.EXPORT_SCREEN.FILTERS.OPACITY,
      value: 0.3,
      minimum: 0,
      maximum: 1,
      step: 0.05
    },
    blur: {
      title: Dictionary.EXPORT_SCREEN.FILTERS.BLUR,
      value: 0,
      minimum: 0,
      maximum: 5,
      step: 0.5
    },
    borderWidth: {
      title: Dictionary.EXPORT_SCREEN.FILTERS.BORDER_WIDTH,
      value: 5,
      minimum: 0,
      maximum: 30,
      step: 5
    },
    borderColor: {
      title: Dictionary.EXPORT_SCREEN.FILTERS.BORDER_COLOR,
      value: 0,
      minimum: 0,
      maximum: 255,
      step: 1
    },
    fontSize: {
      title: Dictionary.EXPORT_SCREEN.FILTERS.FONT_SIZE,
      value: 25,
      minimum: 15,
      maximum: 40,
      step: 1
    },
    fontColor: {
      title: Dictionary.EXPORT_SCREEN.FILTERS.FONT_COLOR,
      value: 0,
      minimum: 0,
      maximum: 255,
      step: 1
    },
    fontStyle: {
      title: Dictionary.EXPORT_SCREEN.FILTERS.FONT_STYLE,
      value: 'Heebo-Regular',
      options: ['Heebo-SemiBold', 'AmaticSC-Bold', 'SecularOne-Regular', 'Heebo-Regular', 'Rubik-Regular', 'Tinos-Regular', 'VarelaRound-Regular']
    },
    background: {
      title: Dictionary.EXPORT_SCREEN.FILTERS.BACKGROUND,
      value: null,
      options: Colors.BACKGROUND_OPTIONS
    }
  })
  const [item, setItem] = useState(undefined)
  const [image, setImage] = useState()
  const [filters, setFilters] = useState(getInitialFilters())
  const [currentFilter, setCurrentFilter] = useState(null)
  const [showInstructions, setShowInstructions] = useState(true)
  const shot = useRef(null)
  
  useEffect(() => {
    if(route?.params?.item) {
      setItem(route.params.item)
      DB.sendAnalytics('navigated_to_export_screen_with_item', route.params.item.id)
    }
  }, [route])

  useEffect(() => {
    if (item) {
      setImage(item.image)
      setFilters(getInitialFilters())
      setCurrentFilter(null)
      setShowInstructions(false)
    }
  }, [item])

  const exportImage =  () => {
    DB.sendAnalytics('export_btn_clicked')
    if (!showInstructions) {
      shot.current.capture().then(uri => {
        Sharing.shareAsync(uri)
      })
    }
  }
  const pickImageHandler = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('יש לאשר הגדרות מדיה');
      }
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri)
      setFilters({
        ...filters,
        background: {
          ...filters.background,
          value: null
        }
      })
    }
  }
  const renderFilter = () => {
    DB.sendAnalytics('filter_used', currentFilter)
    switch (currentFilter) {
      case 'background':
        return (
          <ScrollView style={Styles.filtersGroup}>
            <Filter title={filters.background.title}>
              <BackgroundFilter
                {...filters.background}
                pickImageHandler={pickImageHandler}
                onChange={value => setFilters({
                  ...filters,
                  background: {
                    ...filters.background,
                    value
                  },
                  opacity: {
                    ...filters.opacity,
                    value: 0.6
                  }
                })}
              />
            </Filter>
          </ScrollView>
        )
      case 'opacity':
        return (
          <ScrollView style={Styles.filtersGroup}>
            <Filter title={filters.opacity.title}>
              <SliderFilter
                {...filters.opacity}
                onChange={value => setFilters({
                  ...filters,
                  opacity: {
                    ...filters.opacity,
                    value
                  }
                })}
              />
            </Filter>
          </ScrollView>
        )
      case 'blur':
        return (
          <ScrollView style={Styles.filtersGroup}>
            <Filter title={filters.blur.title}>
              <SliderFilter
                {...filters.blur}
                onChange={value => setFilters({
                  ...filters,
                  blur: {
                    ...filters.blur,
                    value
                  }
                })}
              />
            </Filter>
          </ScrollView>
        )
      case 'border':
        return (
          <ScrollView style={Styles.filtersGroup}>
            <Filter key="borderWidth" title={filters.borderWidth.title}>
              <SliderFilter
                {...filters.borderWidth}
                onChange={value => setFilters({
                  ...filters,
                  borderWidth: {
                    ...filters.borderWidth,
                    value
                  }
                })}
              />
            </Filter>
            <Filter key="borderColor" title={filters.borderColor.title}>
              <ColorFilter
                {...filters.borderColor}
                onChange={value => setFilters({
                  ...filters,
                  borderColor: {
                    ...filters.borderColor,
                    value
                  }
                })}
              />
            </Filter>
          </ScrollView>
        )
      case 'font':
        return (
          <ScrollView style={Styles.filtersGroup}>
            <Filter key="fontSize" title={filters.fontSize.title}>
              <SliderFilter
                {...filters.fontSize}
                onChange={value => setFilters({
                  ...filters,
                  fontSize: {
                    ...filters.fontSize,
                    value
                  }
                })}
              />
            </Filter>
            <Filter key="fontStyle" title={filters.fontStyle.title}>
              <FontsFilter
                {...filters.fontStyle}
                onChange={value => setFilters({
                  ...filters,
                  fontStyle: {
                    ...filters.fontStyle,
                    value
                  }
                })}
              />
            </Filter>
            <Filter key="fontColor" title={filters.fontColor.title}>
              <ColorFilter
                {...filters.fontColor}
                onChange={value => setFilters({
                  ...filters,
                  fontColor: {
                    ...filters.fontColor,
                    value
                  }
                })}
              />
            </Filter>
          </ScrollView>
        )
    }
  }
  return (
    <Screen.Screen>
      <Screen.Header title={Dictionary.EXPORT_SCREEN.HEADER} />
      <Screen.Body>
    <View style={{ marginBottom: 20 }}>
      <ViewShot
        ref={shot}
        options={{
          format: 'png',
          quality: 1.0
        }}
        style={{
          backgroundColor: 'white',
        }}>
        { showInstructions
          ? <View style={Styles.instructions.wrapper}>
              <Text adjustsFontSizeToFit style={Styles.instructions.title}>{Dictionary.EXPORT_SCREEN.INSTRUCTIONS.WELCOME}</Text>
              <Text adjustsFontSizeToFit style={Styles.instructions.content}>{Dictionary.EXPORT_SCREEN.INSTRUCTIONS.CONTENT_PART_ONE} (<Image style={Styles.instructions.icon} source={Icons.share} />) {Dictionary.EXPORT_SCREEN.INSTRUCTIONS.CONTENT_PART_TWO}</Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={Styles.instructions.buttonWrapper} onPress={() => {
                  DB.sendAnalytics('user_navigated_to_search_phrase_from_exports')
                  navigation.jumpTo(Dictionary.EXPLORE_SCREEN.NAME)
                }}>
                  <Text style={Styles.instructions.buttonText}>
                    חפש
                  </Text>
                  <Image style={Styles.instructions.buttonIcon} source={Icons.search} />
                </TouchableOpacity>
                <TouchableOpacity style={Styles.instructions.buttonWrapper} onPress={() => {
                  DB.sendAnalytics('user_loaded_random_phrase_to_exports')
                  DB.getRandomItem().then(item => setItem(item))
                }}>
                  <Text style={Styles.instructions.buttonText}>
                    טען
                  </Text>
                  <Image style={Styles.instructions.buttonIcon} source={Icons.refresh} />
                </TouchableOpacity>
              </View>
            </View>
          : <View
              style={{
                width: '100%',
                height: 300,
                borderWidth: filters.borderWidth.value,
                borderColor: `rgb(${filters.borderColor.value},${filters.borderColor.value},${filters.borderColor.value})`,
                flexDirection: 'column'
              }}>
              { filters.background.value === null
                ? <Image
                    source={{ uri: image}}
                    blurRadius={filters.blur.value}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      opacity: filters.opacity.value,
                    }}
                    resizeMode="cover"
                  />
                : <View
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backgroundColor: filters.background.value,
                      opacity: filters.opacity.value,
                    }}
                  />
              }
              <View
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
              <Text
                adjustsFontSizeToFit
                style={{
                  padding: 5,
                  fontFamily: filters.fontStyle.value,
                  fontSize: filters.fontSize.value,
                  color: `rgb(${filters.fontColor.value},${filters.fontColor.value},${filters.fontColor.value})`,
                  textAlign: 'center'
                }}>
                  {item.phrase}
                </Text>
              </View>
            </View>
        }
      </ViewShot>
    </View>
    { currentFilter !== null && !showInstructions
      ? (
          <>
            {renderFilter()}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center'
              }}
            >
              <TouchableOpacity
                onPress={() => setCurrentFilter(null)}
                style={{
                  margin: 5
                }}>
                <Image
                  style={{
                    tintColor: Colors.PRIMARY,
                    width: 20,
                    height: 20,
                  }}
                  source={Icons.exit}
                />
              </TouchableOpacity>
            </View>
          </>
        )
      : (
          <>
            <View style={Styles.filtersSection}>
              <FilterButton icon={Icons.background} handleClick={() => setCurrentFilter('background')} />
              <FilterButton icon={Icons.border} handleClick={() => setCurrentFilter('border')} />
              <FilterButton icon={Icons.brightness} handleClick={() => setCurrentFilter('opacity')} />
              <FilterButton icon={Icons.blur} handleClick={() => setCurrentFilter('blur')} />
              <FilterButton icon={Icons.textSize} handleClick={() => setCurrentFilter('font')} />
            </View>
            <View style={Styles.exportSection.wrapper}>
              <View style={Styles.exportSection.sharingSentence.wrapper}>
                <Text adjustsFontSizeToFit style={Styles.exportSection.sharingSentence.button}>{Dictionary.EXPORT_SCREEN.SHARING_SENTENCE.BUTTON}</Text>
              </View>
              <TouchableOpacity
                onPress={exportImage}
                style={Styles.exportSection.exportButton.wrapper}>
                <Image
                  style={Styles.exportSection.exportButton.icon}
                  source={Icons.export}
                />
              </TouchableOpacity>
            </View>
          </>
      )}
      </Screen.Body>
    </Screen.Screen>
  )
}

export default ExportScreen