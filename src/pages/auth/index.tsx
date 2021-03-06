import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { useHistory } from 'react-router-dom'

import { Field, Form } from 'react-final-form'
import { auth } from '@src/store/modules/auth'
import { account } from '@src/store/modules/account'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    margin: '0 auto',
    maxWidth: '760px',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

type TFormValues = {
  username: string
  password: string
}

export const Auth: React.FC = () => {
  const history = useHistory()

  const { signIn, signUp } = auth.useActions()
  const { getProfile } = account.useActions()

  const onFormSubmit = async ({ password, username }: TFormValues) => {
    try {
      await signIn(username, password)
      history.push('/')
      await getProfile()
    } catch {
      history.push('/login')
    }
  }

  const onSignUpClick = async (event: any) => {
    event.preventDefault()
    try {
      await signUp()
      history.push('/')
    } catch {}
  }

  const isFormFieldValid = (info: any) => info.error && info.touched

  const classes = useStyles()
  const [t] = useTranslation()
  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {t('sign in')}
        </Typography>
        <Form
          onSubmit={onFormSubmit}
          validate={(values: any) => {
            const errors: any = {}

            if (!values.username) {
              errors.username = t('required')
            }
            if (!values.password) {
              errors.password = t('required')
            }
            return errors
          }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form className={classes.form} onSubmit={handleSubmit}>
              <Field name="username">
                {({ input, meta }) => {
                  return (
                    <TextField
                      {...input}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label={t('email label')}
                      autoComplete="email"
                      autoFocus
                      error={isFormFieldValid(meta)}
                      helperText={isFormFieldValid(meta) && meta.error}
                    />
                  )
                }}
              </Field>
              <Field name="password">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label={t('pass label')}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={isFormFieldValid(meta)}
                    helperText={isFormFieldValid(meta) && meta.error}
                  />
                )}
              </Field>
              <Button
                disabled={pristine || submitting}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {t('sign in')}
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    component="button"
                    onClick={onSignUpClick}
                    variant="body2"
                  >
                    {t('form question')}
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        />
      </div>
    </React.Fragment>
  )
}
