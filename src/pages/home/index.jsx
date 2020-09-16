import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import './style.scss'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAdvancedSearch: false,
      recipes: [],
    }
  }

  componentDidMount = () => {}

  onSubmit = (values, { setStatus, setSubmitting, resetForm }) => {
    console.log('onSubmit has definitely been clicked.', values)
    const apiKey = '7115e309409d4387a6369108cd7185fd'
    try {
      this.search(values, apiKey)
    } catch (error) {
      setStatus({ error: error.message })
    }
  }

  search = (values, apiKey) => {
    // TODO: Create all of the query param strings to be concatenated in the url
    console.log('search values', values)
    const keyword = values && values.keyword
    const recipesSearchUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${keyword}&addRecipeInformation=true&number=50`
    console.log('keywordddd', keyword)
    axios
      .get(recipesSearchUrl)
      .then((response) => console.log('response', response && response.data && response.data))
  }

  setToAdvancedSearch = () => {
    this.setState({
      isAdvancedSearch: true,
    })
  }

  // Have a form for advanced vs simple
  // If its a simple search, show the buttons, else show the whole form
  render() {
    return (
      <div>
        <h3>What are you hungry for?</h3>

        {!this.state.isAdvancedSearch ? (
          <Formik initialValues={{ keyword: '' }} onSubmit={this.onSubmit}>
            {({ status, isSubmitting }) => {
              return (
                <Form>
                  <Field type="text" name="keyword"></Field>
                  <button className="search-button" type="submit" disabled={isSubmitting}>
                    Search
                  </button>
                  <button className="search-button" onClick={() => this.setToAdvancedSearch()}>
                    Advanced
                  </button>
                  {status && status.error ? <p>{status.error}</p> : null}
                </Form>
              )
            }}
          </Formik>
        ) : (
          <Formik
            initialValues={{ keyword: '', ingredients: [], cuisine: '' }}
            onSubmit={this.advancedSearch}
          >
            {({ status, isSubmitting }) => {
              return (
                <Form>
                  <p>This is the Advanced search form.</p>
                </Form>
              )
            }}
          </Formik>
        )}
      </div>
    )
  }
}

export default Home
