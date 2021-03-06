// Copyright (C) 2018 ConsenSys AG
//
// This file is part of uPort Mobile App.
//
// uPort Mobile App is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// uPort Mobile App is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with uPort Mobile App.  If not, see <http://www.gnu.org/licenses/>.
//
import React from 'react'
import PropTypes from 'prop-types'
import Svg, {Polygon, G, Path} from 'react-native-svg'
import { View } from 'react-native'
import { colors } from 'uPortMobile/lib/styles/globalStyles'

const IdVerificationIcon = (props) => (
  <View style={props.style}>
    <Svg 
      width={props.width} 
      height={props.height} 
      viewBox="0 0 130 163"
      >
      <G id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <Path d="M96.305,113.39 C97.602,111.399 99.708,110.404 101.815,110.404 C103.921,110.404 106.028,111.399 107.325,113.39 C108.807,115.664 111.535,116.793 114.192,116.235 C118.842,115.254 122.964,119.376 121.985,124.028 C121.424,126.683 122.555,129.411 124.829,130.893 C128.81,133.488 128.81,139.319 124.829,141.914 C122.555,143.397 121.424,146.124 121.985,148.781 C122.964,153.431 118.842,157.554 114.192,156.573 C111.535,156.014 108.807,157.144 107.325,159.419 C104.73,163.399 98.899,163.399 96.305,159.419 C94.821,157.144 92.094,156.014 89.438,156.573 C84.788,157.554 80.664,153.431 81.645,148.781 C82.205,146.124 81.076,143.397 78.801,141.914 C74.819,139.319 74.819,133.488 78.801,130.893 C81.076,129.411 82.205,126.683 81.645,124.028 C80.664,119.376 84.788,115.254 89.438,116.235 C92.094,116.793 94.821,115.664 96.305,113.39 Z" id="path-15-path" fill={colors.purple}/>
        <Polygon id="path-15" fill="#FFFFFF" points="109.922 127.585 98.787 138.72 93.708 133.641 90.456 136.893 98.787 145.223 113.172 130.836"/>
        <Path d="M78.8115,152.5002 L13.9995,152.5002 C9.0375,152.5002 4.9995,148.4632 4.9995,143.5002 L4.9995,13.0002 C4.9995,8.0382 9.0375,4.0002 13.9995,4.0002 L100.4995,4.0002 C105.4625,4.0002 109.4995,8.0382 109.4995,13.0002 L109.4995,111.2962 C109.6125,111.4492 109.7345,111.5922 109.8385,111.7512 C110.6365,112.9772 112.0615,113.5792 113.4995,113.3082 L113.4995,13.0002 C113.4995,5.8322 107.6685,0.0002 100.4995,0.0002 L13.9995,0.0002 C6.8315,0.0002 0.9995,5.8322 0.9995,13.0002 L0.9995,143.5002 C0.9995,150.6682 6.8315,156.5002 13.9995,156.5002 L80.9465,156.5002 C79.9095,155.3382 79.1855,153.9692 78.8115,152.5002" id="Fill-21" fill={colors.purple} fill-rule="nonzero"/>
        <Path d="M16.034,53.351 C16.034,53.422 16.117,54.198 16.318,54.763 C17.245,56.032 20.518,58.078 32.05,58.078 C43.652,58.078 47.166,56.002 47.923,54.692 C48.209,54.198 48.209,53.422 48.209,53.351 C48.209,47.073 41.018,41.994 32.121,41.994 C23.223,41.994 16.034,47.073 16.034,53.351 Z" id="path-11" fill={colors.purple}/>
        <Path d="M24.576,30 C24.576,34.144 27.933,37.5 32.076,37.5 C36.219,37.5 39.576,34.144 39.576,30 C39.576,25.857 36.219,22.5 32.076,22.5 C27.933,22.5 24.576,25.857 24.576,30 Z" id="path-9" fill={colors.purple}/>
        <Path d="M62.159,46.5 C59.076,46.5 56.576,49 56.576,52.082 C56.576,55.166 59.076,57.665 62.159,57.665 L92.884,57.665 C95.967,57.665 98.466,55.166 98.466,52.082 C98.466,49 95.967,46.5 92.884,46.5 L62.159,46.5 Z" id="path-7" fill={colors.purple}/>
        <Path d="M16.821,100.5 C15.279,100.5 14.03,101.75 14.03,103.292 C14.03,104.832 15.279,106.082 16.821,106.082 L97.679,106.082 C99.221,106.082 100.47,104.832 100.47,103.292 C100.47,101.75 99.221,100.5 97.679,100.5 L16.821,100.5 Z" id="path-5" fill={colors.purple}/>
        <Path d="M16.821,85.5 C15.279,85.5 14.03,86.75 14.03,88.291 C14.03,89.833 15.279,91.083 16.821,91.083 L97.679,91.083 C99.221,91.083 100.47,89.833 100.47,88.291 C100.47,86.75 99.221,85.5 97.679,85.5 L16.821,85.5 Z" id="path-1" fill={colors.purple}/>
        <Path d="M16.821,70.5 C15.279,70.5 14.03,71.749 14.03,73.291 C14.03,74.833 15.279,76.083 16.821,76.083 L97.679,76.083 C99.221,76.083 100.47,74.833 100.47,73.291 C100.47,71.749 99.221,70.5 97.679,70.5 L16.821,70.5 Z" id="path-3" fill={colors.purple}/>
        <Path d="M81.168,116.0573 L16.62,116.0573 C15.079,116.0573 13.829,117.3073 13.829,118.8483 C13.829,120.3903 15.079,121.6403 16.62,121.6403 L78.574,121.6403 C78.797,119.5673 79.686,117.6063 81.168,116.0573" id="Fill-19" fill={colors.purple} fill-rule="nonzero"/>
    </G>
  </Svg>
  </View>
)

IdVerificationIcon.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  style: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
}

export default IdVerificationIcon