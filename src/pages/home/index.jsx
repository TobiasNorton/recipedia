import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik'
import './style.scss'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAdvancedSearch: false,
    }
  }

  componentDidMount = () => {
    console.log('HAHAHAHAHAHA componentDidMount()')
  }

  simpleSearch = (values, { setStatus, setSubmitting, resetForm }) => {
    console.log('onSubmit has definitely been clicked.', values)
    // if (!this.state.isAdvancedSearch) {
    //   try {
    //     getRecipes(values)
    //   }
    // }
  }

  advancedSearch = () => {
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
                  <button className="search-button" onClick={() => this.simpleSearch()}>
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
                  <Field type="text" name="keyword"></Field>
                  <button className="search-button" type="submit" disabled={isSubmitting}>
                    Search
                  </button>
                  <button className="search-button" onClick={() => this.simpleSearch()}>
                    Advanced
                  </button>
                  {status && status.error ? <p>{status.error}</p> : null}
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
