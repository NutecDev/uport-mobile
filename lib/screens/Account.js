import React from 'react'
import {
  ScrollView,
  Platform,
  RefreshControl,
  Clipboard,
  Share,
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  Text,
  ActivityIndicator,
} from 'react-native'
import { connect } from 'react-redux'
import { wei2eth } from 'uPortMobile/lib/helpers/conversions'
import { colors, font } from 'uPortMobile/lib/styles/globalStyles'
import { SharedElementTransition } from 'react-native-navigation'
import Avatar from 'uPortMobile/lib/components/shared/Avatar'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { OnboardingButton } from 'uPortMobile/lib/components/shared/Button'
import { networksByName } from 'uPortMobile/lib/utilities/networks'
import { networkSettingsForAddress } from 'uPortMobile/lib/selectors/chains'
import { working } from 'uPortMobile/lib/selectors/processStatus'
import { refreshBalance } from 'uPortMobile/lib/actions/uportActions'

const { height, width } = Dimensions.get('window')
const isIos = Platform.OS === 'ios'
const SPACER_SIZE = 1000
const TOP_COLOR = colors.brand
const BOTTOM_COLOR = 'white'

class Account extends React.Component {
  static navigatorStyle = {
    largeTitle: false,
    navBarNoBorder: true,
    navBarBackgroundColor: colors.brand,
    navBarButtonColor: colors.white,
    navBarTextColor: colors.white,
  }

  constructor(props) {
    super(props)

    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  async componentDidMount() {
    const send = await FeatherIcon.getImageSource('share', 26, '#FFFFFF')

    // this.props.navigator.setButtons({
    //   rightButtons: [
    //     {
    //       id: 'share',
    //       icon: send,
    //     },
    //   ],
    // })
  }

  onNavigatorEvent(event) {
    // this is the onPress handler for the two buttons together
    if (event.type === 'NavBarButtonPress') {
      // this is the event type for button presses
      if (event.id === 'share') {
        const message =
          this.props.network === 'Mainnet'
            ? `My Ethereum address is ${this.props.hexaddress}`
            : `My address on the ${this.props.network} network is ${
                this.props.hexaddress
              }. WARNING!!! Do not send real ETH here or you will loose it!!!`
        Share.share(
          {
            message,
            url: `ethereum:${this.props.hexaddress}`,
            title: `Share ${this.props.network} address`,
          },
          {
            // Android only:
            dialogTitle: `Share ${this.props.network} address`,
          },
        )
      }
    }
  }

  showModal() {
    this.props.navigator.showModal({
      screen: 'uport.accountFunding',
      passProps: {
        address: this.props.address,
        accountProfile: this.props.accountProfile,
      },
      navigatorStyle: {
        navBarHidden: true,
      },
    })
  }

  refreshBalance() {
    this.props.refreshBalance(this.props.address)
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.bannerTop}>
          <Avatar
            size={50}
            source={
              this.props.accountProfile || {
                avatar: require('uPortMobile/assets/images/ethereum-white-icon.png'),
              }
            }
          />
          <Text style={styles.ethBalance}>{this.props.balance} ETH</Text>
          <Text style={styles.fiatBalance}>$ {this.props.usdBalance} </Text>
        </View>
        <View style={styles.buttonRow}>
          <OnboardingButton onPress={() => this.showModal()} style={{ borderColor: colors.brand }}>
            <Text style={{ fontFamily: 'Montserrat' }}>Fund Account</Text>
          </OnboardingButton>
        </View>
        <ScrollView
          refreshControl={<RefreshControl refreshing={this.props.working} onRefresh={this.refreshBalance.bind(this)} />}
        >
          <View style={styles.content}>
            <Text style={styles.titleText}>
              {this.props.accountProfile ? this.props.accountProfile.name : 'Ethereum Account'}
            </Text>
            <Text style={styles.subtitleText}>{this.props.network} network</Text>

            <View style={[styles.infoRow, { marginTop: 10 }]}>
              <Text style={styles.infoTitle}>ETHEREUM ADDRESS</Text>
              <Text style={styles.infoContent}>{this.props.hexaddress}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoTitle}>EXPLORER URL</Text>
              <Text style={styles.infoContent}>{this.props.explorerUrl}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerTop: {
    backgroundColor: colors.brand,
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
    paddingBottom: 5,
    color: '#333333',
  },
  subtitleText: {
    color: '#AAAAAA',
  },
  ethBalance: {
    marginLeft: 10,
    paddingTop: 10,
    fontFamily: 'Montserrat',
    fontSize: 30,
    color: '#FFFFFF',
  },
  fiatBalance: {
    fontFamily: 'Montserrat',
    fontSize: 18,
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
    color: '#AAAAAA',
    paddingVertical: 5,
    fontSize: 12,
  },
  infoContent: {
    color: '#333333',
    fontSize: 14,
  },
})

const mapStateToProps = (state, ownProps) => {
  const settings = networkSettingsForAddress(state, ownProps.address)
  const networkName = settings.network
    ? settings.network.charAt(0).toUpperCase() + settings.network.slice(1).toLowerCase()
    : null
  const ethBalance = settings.balance && settings.balance.ethBalance ? wei2eth(settings.balance.ethBalance) : 0
  const usdBalance = settings.balance && settings.balance.usdBalance ? settings.balance.usdBalance : 0
  const explorerUrl = (networksByName[settings.network] || {}).explorerUrl
  // const activities = toJs(activitiesForAddress(state, ownProps.address))
  return {
    ...ownProps,
    hexaddress: settings.hexaddress,
    balance: ethBalance,
    usdBalance: usdBalance,
    network: networkName,
    working: working(state, 'balance'),
    explorerUrl,
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    refreshBalance: address => dispatch(refreshBalance(address)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Account)
