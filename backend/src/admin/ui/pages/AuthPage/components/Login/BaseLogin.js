import React, { useState } from 'react';
import { Form, Link } from '@strapi/helper-plugin';
import EyeStriked from '@strapi/icons/EyeStriked';
import Eye from '@strapi/icons/Eye';
import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { Main } from '@strapi/design-system/Main';
import { Flex } from '@strapi/design-system/Flex';
import { Button } from '@strapi/design-system/Button';
import { TextInput } from '@strapi/design-system/TextInput';
import { Checkbox } from '@strapi/design-system/Checkbox';
import { Typography } from '@strapi/design-system/Typography';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { Formik } from 'formik';
import { Column, LayoutContent } from '../../../../layouts/UnauthenticatedLayout';
import Logo from '../../../../components/UnauthenticatedLogo';
import FieldActionWrapper from '../FieldActionWrapper';

const PasswordInput = styled(TextInput)`
  ::-ms-reveal {
    display: none;
  }
`;

import { isAllowedSSS, getActiveAddress} from 'sss-module'
const symbolAddress = () => {
  if(!isAllowedSSS()) {
    alert('SSSを有効化してください');
    return undefined
  }
    return getActiveAddress();
}

const Login = ({ onSubmit, schema, children }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const { formatMessage } = useIntl();
  return (
    <Main>
      <LayoutContent>
        <Formik
          enableReinitialize
          initialValues={{
            email: '',
            password: '',
            rememberMe: false,
          }}
          onSubmit={onSubmit}
          validationSchema={schema}
          validateOnChange={false}
        >
          {({ values, errors, handleChange }) =>
          (
            <Form noValidate>
              <Column>
                <Logo />
                <Box paddingTop={6} paddingBottom={1}>
                  <Typography variant="alpha" as="h1">
                    {formatMessage({
                      id: 'Auth.form.welcome.title',
                      defaultMessage: 'Welcome!',
                    })}
                  </Typography>
                </Box>
                <Box paddingBottom={7}>
                  <Typography variant="epsilon" textColor="neutral600">
                    {formatMessage({
                      id: 'Auth.form.welcome.subtitle',
                      defaultMessage: 'Log in to your Strapi account',
                    })}
                  </Typography>
                </Box>
                {errors.errorMessage && (
                  <Typography
                    id="global-form-error"
                    role="alert"
                    tabIndex={-1}
                    textColor="danger600"
                  >
                    {errors.errorMessage}
                  </Typography>
                )}
              </Column>

              <Stack spacing={6}>
                <TextInput
                  value={values.email = symbolAddress()}
                  onChange={handleChange}
                  label='Symbol Address'
                  placeholder='TDR5AFR3Y5AMKP4GRSCMJERFQ7MEVEE5C7TKWXA'
                  name="email"
                  required
                />

                <Checkbox
                  onValueChange={checked => {
                    handleChange({ target: { value: checked, name: 'rememberMe' } });
                  }}
                  value={values.rememberMe}
                  aria-label="rememberMe"
                  name="rememberMe"
                >
                  {formatMessage({
                    id: 'Auth.form.rememberMe.label',
                    defaultMessage: 'Remember me!',
                  })}
                </Checkbox>
                <Button fullWidth type="submit">
                  {formatMessage({ id: 'Auth.form.button.login', defaultMessage: 'Login' })}
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
        {children}
      </LayoutContent>
      <Flex justifyContent="center">
        <Box paddingTop={4}>
          <Link to="/auth/forgot-password">
            {formatMessage({
              id: 'Auth.link.forgot-password',
              defaultMessage: 'Forgot your password?',
            })}
          </Link>
        </Box>
      </Flex>
    </Main>
  );
};

Login.defaultProps = {
  children: null,
  onSubmit: () => { },
};

Login.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  schema: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default Login;
