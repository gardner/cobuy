import PropTypes from 'prop-types'
import React from 'react'
import { connect as connectFela } from 'react-fela'
import { Field, reduxForm as connectForm } from 'redux-form'
import { mapObjIndexed, merge, pipe } from 'ramda'
import { TextField } from 'redux-form-material-ui'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'

import { FormattedMessage } from '../../lib/Intl'
import styles from '../styles/SignIn'
import RemoteAuthenticationMethods from './RemoteAuthenticationButtons'

// https://blog.codinghorror.com/the-god-login/

function LocalAuthenticationForm (props) {
  const { styles, handleSubmit, signIn, navigateToRegister } = props

  return (
    <form onSubmit={handleSubmit(localAuth)} className={styles.form}>
      <Field
        name='email'
        floatingLabelText={
          <FormattedMessage
            id='agents.email'
            className={styles.labelText}
          />
        }
        fullWidth={true}
        component={TextField}
      />
      <Field
        name='password'
        type='password'
        floatingLabelText={
          <FormattedMessage
            id='agents.password'
            className={styles.labelText}
          />
        }
        fullWidth={true}
        component={TextField}
      />
      <div className={styles.actions}>
        <RaisedButton
          type='submit'
          label={
            <FormattedMessage
              id='agents.signIn'
              className={styles.labelText}
            />
          }
          primary={true}
          className={styles.signInAction}
        />
        <FlatButton
          label={
            <FormattedMessage
              id='agents.createAccount'
              className={styles.labelText}
            />
          }
          className={styles.registerAction}
          onClick={navigateToRegister}
        />
      </div>
    </form>
  )

  function localAuth (payload) {
    signIn(merge(payload, { strategy: 'local' }))
  }
}

LocalAuthenticationForm = pipe(
  connectForm({
    form: 'localAuthenticationForm'
  })
)(LocalAuthenticationForm)

function SignIn (props) {
  const { styles, error, actions } = props

  return (
    <div className={styles.container}>
      <p className={styles.intro}>
        <FormattedMessage
          id='agents.signInWith'
          className={styles.labelText}
        />
      </p>
      <div className={styles.remotes}>
        <RemoteAuthenticationMethods
          styles={styles}
          signIn={actions.authentication.signIn}
        />
      </div>
      {error && (
        <div className={styles.error}>
          {error.message}
        </div>
      )}
      <LocalAuthenticationForm
        styles={styles}
        signIn={actions.authentication.signIn}
        navigateToRegister={navigateToRegister}
      />
    </div>
  )

  function navigateToRegister () {
    actions.router.push('/register')
  }
}

SignIn.propTypes = {
}

SignIn.defaultProps = {
}

export default pipe(
  connectFela(styles)
)(SignIn)
