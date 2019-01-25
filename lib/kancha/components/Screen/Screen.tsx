/***
 *  Copyright (C) 2018 ConsenSys AG
 *
 *  This file is part of uPort Mobile App
 *  uPort Mobile App is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.

 *  uPort Mobile App is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  ERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 * 
 *  You should have received a copy of the GNU General Public License
 *  along with uPort Mobile App.  If not, see <http://www.gnu.org/licenses/>.
 * 
 ***/

import * as React from 'react'
import { SafeAreaView, ScrollView, ViewStyle } from 'react-native'
import { Container, Theme, Device, BrandOptions } from '@kancha'

/** Temporary spacer size */
const SPACER_SIZE = 1000

/***
 * 1 - SafeAreaView with scrolling
 * 2 - SafeAreaView without scrolling
 * 3 - No SafeAreaView with scrolling
 * 4 - No SafeAreaView without scrolling
 * */
const ScreenConfigs: Kancha.ScreenConfigsStatic = {
  SafeScroll: 'safeScroll',
  SafeNoScroll: 'safeNoScroll',
  Scroll: 'scroll',
  NoScroll: 'noScroll',
}

const ScreenBrandOptions: Kancha.BrandTypeStatic = {
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
  Accent: 'accent',
  Warning: 'warning',
  Confirm: 'confirm',
  Custom: 'custom',
}

interface ScreenProps {
  /**
   * Configure the screen: Eg. Screen.Config.SafeScroll
   */
  config?: 'safeScroll' | 'safeNoScroll' | 'scroll' | 'noScroll' | undefined
  /**
   * Type of screen. This sets the background color-- May change
   */
  type?: Kancha.BrandPropOptions
  /**
   * Type of header. This sets the header background color -- May change
   */
  expandingHeaderType?: Kancha.BrandPropOptions
  /**
   * The content to show in the expanding header zone. A config with a scrollView must be enabled.
   */
  expandingHeaderContent?: React.ReactNode
}

const Screen: React.FunctionComponent<ScreenProps> & {
  Config: Kancha.ScreenConfigsStatic
  Types: Kancha.BrandTypeStatic
} = props => {
  const scrollViewStyle: ViewStyle = {
    backgroundColor: props.type && Theme.colors[props.type].background,
  }
  const scrollViewContentStyle = {
    ...(props.expandingHeaderType ? { backgroundColor: Theme.colors[props.expandingHeaderType].background } : {}),
  }
  const scrollViewContentInset = {
    ...(props.expandingHeaderContent ? { top: -SPACER_SIZE } : {}),
  }
  const scrollViewContentOffset = {
    ...(props.expandingHeaderContent ? { y: SPACER_SIZE, x: 0 } : { y: 0, x: 0 }),
  }

  /**
   * Main content to be rendered
   */
  const mainContent = (
    <Container flex={1} paddingBottom background={props.type}>
      {props.children}
    </Container>
  )
  /**
   * Main content to be rendered within a ScrollView
   */
  const scrollViewContent = (
    <ScrollView
      contentInset={scrollViewContentInset}
      contentOffset={scrollViewContentOffset}
      style={scrollViewStyle}
      contentContainerStyle={scrollViewContentStyle}
    >
      {props.expandingHeaderContent && (
        <React.Fragment>
          {Device.isIOS && <Container h={1000} />}
          <Container background={props.expandingHeaderType}>{props.expandingHeaderContent}</Container>
        </React.Fragment>
      )}
      {mainContent}
    </ScrollView>
  )
  /**
   * Main content to be rendered within a SafeAreaView
   */
  const safeAreaView = (
    <SafeAreaView style={{ flex: 1, backgroundColor: props.type && Theme.colors[props.type].background }}>
      {props.config === ScreenConfigs.SafeNoScroll ? mainContent : scrollViewContent}
    </SafeAreaView>
  )

  return props.config === ScreenConfigs.NoScroll
    ? mainContent
    : props.config === ScreenConfigs.Scroll
    ? scrollViewContent
    : safeAreaView
}

Screen.defaultProps = {
  config: ScreenConfigs.SafeScroll,
  type: ScreenBrandOptions.Secondary,
}

/**
 * Appending statics
 */
Screen.Config = ScreenConfigs
Screen.Types = ScreenBrandOptions

export default Screen