import React from 'react'
import {Link} from 'react-router'
import {getItemByCategory} from '../scripts/contentful'

const initialState = {
  tabs: []
}

class Tabs extends React.Component {

  constructor(props) {
    super(props)
    this.state = initialState
  }

  componentDidMount() {
    this.getTabs()
  }

  getTabs() {
    const tabs = getItemByCategory({category: 'tabs'})
    tabs.then( tabs => { this.setState({tabs:tabs}) })
  }

  getLink(tab, index) {

    const attribute = tab.slug.indexOf('http') > -1 ? { href: tab.slug } : { to: tab.slug }
    const link = { className: 'fade', key: index }
    const name = tab.name + ( index < (this.state.tabs.length - 1) ? ', ' : '' ) 

    return (<Link {...link} {...attribute}>{name}</Link>)
  }

  render() {
    return (
      <div>
        {
          this.state.tabs.map((tab, index) => this.getLink(tab, index))
        }
      </div>
    )
  }

}


const GetDescription = props => {
  return (
    <h2 className="fade">
      <Link to="/">
        Evan Jones,
        <br/>
        Web & App Developer
      </Link>
    </h2>
  )
}

const Mobile = props => {
  return (
    <div className="show-mobile">
      {props.children}
    </div>
  )
}

const Desktop = props => {
  return (
    <div className="hide-mobile">
      {props.children}
    </div>
  )
}

const HeaderComp = props => {

  return (
    <header>
      <Desktop>
        <div className="half inline text-left v-top">
          <GetDescription/>
        </div>
        <div className="half inline text-right v-top">
          <Tabs/>
        </div>
      </Desktop>
      <Mobile>
        <GetDescription/>
        <br/>
        <Tabs/>
      </Mobile>
    </header>
  )
}

export default HeaderComp