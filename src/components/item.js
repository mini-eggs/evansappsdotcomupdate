import React from 'react'
import {browserHistory} from 'react-router'
import {getItemByCategoryAndSlug} from '../scripts/contentful'

const getStateFromProps = props => {
  return {
    slug: props.params.page || props.params.post,
    type: props.route.type,
    page: null
  }
}

class Item extends React.Component {

  constructor(props) {
    super(props)
    this.state = getStateFromProps(props)
  }

  componentDidMount() {
    this.getItem()
  }

  componentWillReceiveProps(props) {
    const state = getStateFromProps(props)
    this.setState(state, this.getItem)
  }

  getItem() {
    const page = getItemByCategoryAndSlug({category: this.state.type, slug: this.state.slug})
    page.then( page => { this.setState({page:page}) })
  }

  getContent() {
    return (
      <div className="fade">
        <br/>
        <h1>
          <b>{this.state.page.name}</b>
        </h1>
        <br/>
        <div 
          className="content" 
          dangerouslySetInnerHTML={{ __html: this.state.page.description }}
        />
      </div>
    )
  }

  render() {
    return this.state.page ? this.getContent() : <div/>
  }

}

export default Item