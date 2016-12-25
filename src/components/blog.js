import React from 'react'
import {Link} from 'react-router'
import {getItemByCategory} from '../scripts/contentful'

const initialState = {
  blogs: []
}

class Blog extends React.Component {

  constructor(props) {
    super(props)
    this.state = initialState
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    const posts = getItemByCategory({category: 'blogPost'})
    posts.then( posts => { this.setState({ blogs:posts }) })
  }

  componentWillReceiveProps(props) {
    this.setState(initialState, this.getData)
  }

  render() {
    return (
      <div>
        <br/>
        <h1 className="fade">
          <b>Blog</b>
        </h1>
        <br/>
        {
          this.state.blogs.map( (post, index) => {
            return (
              <div className="fade" key={index}>
                <Link to={'/post/' + post.slug}>{index + 1}. {post.name}</Link>
              </div>
            )
          })
        }
        <br/>
      </div>
    )
  }

}

export default Blog