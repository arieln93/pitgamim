import React, { useRef, useState, useEffect } from 'react';
import { Text, View, ScrollView, FlatList, Button, Image, TouchableOpacity, ImageBackground } from 'react-native';
import Slider from '@react-native-community/slider';
import * as ImagePicker from 'expo-image-picker';

import ViewShot from "react-native-view-shot";
import * as Sharing from 'expo-sharing';
import _ from 'lodash'

import Styles from './styles'
import Dictionary from '../../constants/dictionary'
import Colors from '../../constants/colors'
import Icons from '../../icons/icons'

import * as DB from '../../DB'
import * as Screen from '../Screen'

import Loading from '../../components/Loading/Loading'

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
      <Slider
        style={Styles.sliderFilter.slider}
        value={value}
        minimumValue={minimum}
        maximumValue={maximum}
        step={step}
        onValueChange={onChange}
      />
    </View>
  )
}

const ColorFilter = props => {
  const { value, minimum, maximum, step, onChange } = props
  return (
    <View style={Styles.sliderFilter.wrapper}>
      <Slider
        style={Styles.sliderFilter.slider}
        value={value}
        minimumValue={minimum}
        maximumValue={maximum}
        step={step}
        onValueChange={onChange}
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

const ExportScreen = ({ navigation, route }) => {
  const getInitialFilters = () => ({
    opacity: {
      title: Dictionary.EXPORT_SCREEN.FILTERS.OPACITY,
      value: 0.3,
      minimum: 1,
      maximum: 0,
      step: -0.05
    },
    blur: {
      title: Dictionary.EXPORT_SCREEN.FILTERS.BLUR,
      value: 0,
      minimum: 0,
      maximum: 10,
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
    }
  })
  const [item, setItem] = useState(undefined)
  const [image, setImage] = useState()
  const [filters, setFilters] = useState(getInitialFilters())
  const [currentFilter, setCurrentFilter] = useState(null)
  const shot = useRef(null)
  const renderFilter = () => {
    switch (currentFilter) {
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
          </ScrollView>
        )
    }
  }
  useEffect(() => {
    if(route?.params?.item) {
      setItem(route.params.item)
    } else {
      DB.getRandomItem().then(item => setItem(item))
    }
  }, [route])

  useEffect(() => {
    if (item) {
      setImage(item.image)
      setFilters(getInitialFilters())
      setCurrentFilter(null)
    }
  }, [item])

  const exportImage =  () => {
    console.log(shot.current)
    shot.current.capture().then(uri => {
      Sharing.shareAsync(uri)
    })
  }
  const pickImage = async () => {
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
      setImage(result.uri);
    }
  }
  return (
    <Screen.Screen>
      <Screen.Header title={Dictionary.EXPORT_SCREEN.HEADER} />
      <Screen.Body>
        { item ? <>
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
        <View
          style={{
            width: '100%',
            height: 300,
            borderWidth: filters.borderWidth.value,
            borderColor: `rgb(${filters.borderColor.value},${filters.borderColor.value},${filters.borderColor.value})`,
            flexDirection: 'column'
          }}>
          <Image
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
            style={{
              padding: 5,
              fontFamily: filters.fontStyle.value,
              fontSize: filters.fontSize.value,
              color: `rgb(${filters.fontColor.value},${filters.fontColor.value},${filters.fontColor.value})`,
              textAlign: 'center'
            }}>
              {item.content}
            </Text>
          </View>
        </View>
      </ViewShot>
    </View>
    { currentFilter !== null
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
              <FilterButton icon={Icons.brightness} handleClick={() => setCurrentFilter('opacity')} />
              <FilterButton icon={Icons.blur} handleClick={() => setCurrentFilter('blur')} />
              <FilterButton icon={Icons.border} handleClick={() => setCurrentFilter('border')} />
              <FilterButton icon={Icons.textSize} handleClick={() => setCurrentFilter('font')} />
              <FilterButton icon={Icons.addImage} handleClick={pickImage} isSelected={false} />
            </View>
            <View style={Styles.exportSection.wrapper}>
              <View style={Styles.exportSection.sharingSentence.wrapper}>
                <Text style={Styles.exportSection.sharingSentence.phrase}>"{Dictionary.EXPORT_SCREEN.SHARING_SENTENCE.PHRASE}"</Text>
                <Text style={Styles.exportSection.sharingSentence.source}>{Dictionary.EXPORT_SCREEN.SHARING_SENTENCE.SOURCE}</Text>
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
    </> : <Loading />}
      </Screen.Body>
    </Screen.Screen>
  )
}

export default ExportScreen