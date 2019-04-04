import React from 'react'
import {
  ScrollView,
  RefreshControl,
  Clipboard,
  Share,
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  Text,
  Alert,
} from 'react-native'
import { toJs, get } from 'mori'
import { connect } from 'react-redux'
import { externalIdentities } from 'uPortMobile/lib/selectors/identities'
import moment from 'moment'
import NestedInfo from 'uPortMobile/lib/components/shared/NestedInfo'
import { sha3_256 } from 'js-sha3'
import { removeAttestation } from 'uPortMobile/lib/actions/uportActions'

import FeatherIcon from 'react-native-vector-icons/Feather'
import { Navigation } from 'react-native-navigation'

const { height, width } = Dimensions.get('window')

class Verification extends React.Component {
  constructor(props) {
    super(props)

    this.deleteVerification = this.deleteVerification.bind(this)

    Navigation.events().bindComponent(this)
  }

  componentDidMount() {
    this.setDefaultNavButtons()
  }

  async setDefaultNavButtons() {
    const trashicon = await FeatherIcon.getImageSource('trash', 26, '#FFFFFF')

    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        rightButtons: [
          {
            id: 'trashButton',
            icon: trashicon,
          },
        ],
      },
    })
  }

  /** Method from Navigator */
  navigationButtonPressed(event) {
    if (event.buttonId === 'trashButton') {
      Alert.alert(
        'Delete verification',
        'Are you sure you want to delete this verification? This cannot be undone.',
        [
          { text: 'Delete', onPress: () => this.deleteVerification() },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        { cancelable: true },
      )
    }
  }

  deleteVerification() {
    const tokenHash = sha3_256(this.props.verification.token)
    this.props.removeAttestation(this.props.address, tokenHash)

    Navigation.pop(this.props.componentId)
  }
  expirationItem(exp) {
    let expirationDate = exp && exp >= 1000000000000 ? moment.unix(Math.floor(exp / 1000)) : moment.unix(exp)

    return expirationDate.isValid() ? moment(expirationDate).format('LLL') : 'No Expiration'
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <NestedInfo
          data={this.props.verification.claim}
          verification={this.props.verification}
          componentId={this.props.componentId}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerTop: {
    backgroundColor: '#3A8BC6',
    alignItems: 'center',
    justifyContent: 'center',
    height: height / 4,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
  },
  titleText: {
    fontFamily: 'Montserrat',
    fontSize: 25,
    color: '#333333',
    paddingBottom: 5,
  },
  subtitleText: {
    color: '#AAAAAA',
    paddingBottom: 5,
  },
  bannerTitle: {
    paddingTop: 10,
    fontFamily: 'Montserrat',
    fontSize: 30,
    color: '#FFFFFF',
  },
  bannerSubTitle: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    color: '#FFFFFF',
  },
  bannerMeta: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    color: '#FFFFFF',
  },
  buttonRow: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#AAAAAA',
  },
  infoRow: {
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#AAAAAA',
  },
  infoTitle: {
    color: '#3A8BC6',
    fontSize: 12,
    paddingBottom: 5,
  },
  infoContent: {
    color: '#333333',
    fontSize: 14,
  },
})

const mapStateToProps = (state, ownProps) => {
  return {
    address: ownProps.verification.sub,
    issuer: toJs(get(externalIdentities(state), ownProps.verification.iss)) || {},
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeAttestation: (address, token) => dispatch(removeAttestation(address, token)),
    authorizeRequest: activity => dispatch(authorizeRequest(activity.id)),
    cancelRequest: activity => dispatch(cancelRequest(activity.id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Verification)
