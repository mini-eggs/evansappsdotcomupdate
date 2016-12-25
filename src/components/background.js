import React from 'react'
import HeaderComp from './header'
import {getItemByCategory} from '../scripts/contentful'

const initialState = {
  image: null,
  hasLoaded: false
}

class BackgroundComp extends React.Component {

  constructor(props) {
    super(props)
    this.state = initialState
  }

  componentDidMount() {
    this.getImage()
  }

  getImage() {
    const image = getItemByCategory({category: 'about'})
    image.then( image => { this.setState({ image: image[0].logo }) })
  }

  showImage() {
    this.setState({ hasLoaded: true })
  }

  render() {

    const image = <div className="background" style={{ backgroundImage: `url(${this.state.image})` }} />
    const loader = <img role="presentation" onLoad={ () => this.showImage() } className="image-loader" src={this.state.image} />

    return (
      <div>
        {this.state.hasLoaded ? image : loader}
        <div className="wrap">
          <div className="max-width ">
            <HeaderComp/>
            {this.props.children}
            <footer/>
          </div> 
        </div>
      </div>
    )
  }

}

export default BackgroundComp
