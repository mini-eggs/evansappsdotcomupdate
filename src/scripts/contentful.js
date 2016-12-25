import * as contentful from 'contentful'
import credentials from '../keys/contentful'

const client = contentful.createClient(credentials)

const getItemByCategoryAndSlug = props => {

  return new Promise( (resolve, reject) => {

    const entries = client.getEntries()

    entries.then( entries => {

      entries.toPlainObject().items.forEach( item => {

        const id = item.sys.contentType.sys.id
        const slug = item.fields.slug

        if(id === props.category && slug === props.slug) {
          resolve(item.fields)
        }

      })

      reject()
    })
  })
}
export {getItemByCategoryAndSlug}

const getItemByCategory = props => {

  let items = []

  return new Promise( (resolve, reject) => {

    const entries = client.getEntries()

    entries.then( entries => {

      entries.toPlainObject().items.forEach( item => {

        const id = item.sys.contentType.sys.id

        if(id === props.category) {
          items.push(item.fields)
        }

      })

      if(items.length > 0) {
        resolve(items)
      }

      else {
        reject()
      }
    })

  })
}
export {getItemByCategory}