import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import get from 'lodash/get';
import omit from 'lodash/omit';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import axios from 'axios';
import {
  Form,
  useQuery,
  useNotification,
  useTracking,
  getYupInnerErrors,
  Link,
} from '@strapi/helper-plugin';
import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { Main } from '@strapi/design-system/Main';
import { Flex } from '@strapi/design-system/Flex';
import { Button } from '@strapi/design-system/Button';
import { TextInput } from '@strapi/design-system/TextInput';
import { Checkbox } from '@strapi/design-system/Checkbox';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Typography } from '@strapi/design-system/Typography';
import UnauthenticatedLayout, {
  Column,
  LayoutContent,
} from '../../../../layouts/UnauthenticatedLayout';
import Logo from '../../../../components/UnauthenticatedLogo';

const CenteredBox = styled(Box)`
  text-align: center;
`;
const A = styled.a`
  color: ${({ theme }) => theme.colors.primary600};
`;

import { isAllowedSSS, getActiveAddress} from 'sss-module'
const symbolAddress = () => {
  if(!isAllowedSSS()) {
    alert('SSSを有効化してください');
    return undefined
  }
    return getActiveAddress();
}

const Register = ({ authType, fieldsToDisable, noSignin, onSubmit, schema }) => {
  const toggleNotification = useNotification();
  const { push } = useHistory();
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const { trackUsage } = useTracking();
  const { formatMessage } = useIntl();
  const query = useQuery();
  const registrationToken = query.get('registrationToken');

  useEffect(() => {
    if (registrationToken) {
      const getData = async () => {
        try {
          const {
            data: { data },
          } = await axios.get(
            `${strapi.backendURL}/admin/registration-info?registrationToken=${registrationToken}`
          );

          if (data) {
            setUserInfo(data);
          }
        } catch (err) {
          const errorMessage = get(err, ['response', 'data', 'message'], 'An error occurred');

          toggleNotification({
            type: 'warning',
            message: errorMessage,
          });

          // Redirect to the oops page in case of an invalid token
          // @alexandrebodin @JAB I am not sure it is the wanted behavior
          push(`/auth/oops?info=${encodeURIComponent(errorMessage)}`);
        }
      };

      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registrationToken]);

  return (
    <UnauthenticatedLayout>
      <LayoutContent>
        <Formik
          enableReinitialize
          initialValues={{
            firstname: userInfo.firstname || '',
            lastname: userInfo.lastname || '',
            email: userInfo.email || '',
            registrationToken: registrationToken || undefined,
            news: false,
          }}
          onSubmit={async (data, formik) => {
            try {
              //await schema.validate(data, { abortEarly: false });

              if (submitCount > 0 && authType === 'register-admin') {
                trackUsage('didSubmitWithErrorsFirstAdmin', { count: submitCount.toString() });
              }

              if (registrationToken) {
                // We need to pass the registration token in the url param to the api in order to submit another admin user
                onSubmit(
                  { userInfo: omit(data, ['registrationToken']), registrationToken },
                  formik
                );
              } else {
                onSubmit(data, formik);
              }
            } catch (err) {
              const errors = getYupInnerErrors(err);
              setSubmitCount(submitCount + 1);

              formik.setErrors(errors);
            }
          }}
          // Leaving this part commented when we remove the tracking for the submitCount
          // validationSchema={schema}
          validateOnChange={false}
        >
          {({ values, errors, handleChange }) => {
            return (
              <Form noValidate>
                <Main>
                  <Column>
                    <Logo />
                    <Box paddingTop={6} paddingBottom={1}>
                      <Typography as="h1" variant="alpha">
                        {formatMessage({
                          id: 'Auth.form.welcome.title',
                          defaultMessage: 'Welcome to Strapi!',
                        })}
                      </Typography>
                    </Box>
                    <CenteredBox paddingBottom={7}>
                      <Typography variant="epsilon" textColor="neutral600">
                        {formatMessage({
                          id: 'Auth.form.register.subtitle',
                          defaultMessage:
                            'Credentials are only used to authenticate in Strapi. All saved data will be stored in your database.',
                        })}
                      </Typography>
                    </CenteredBox>
                  </Column>
                  <Stack spacing={6}>
                    <Grid gap={4}>
                      <GridItem col={6}>
                        <TextInput
                          name="firstname"
                          required
                          value={values.firstname}
                          error={errors.firstname ? formatMessage(errors.firstname) : undefined}
                          onChange={handleChange}
                          label='Name'
                        />
                      </GridItem>
                    </Grid>
                    <TextInput
                      name="email"
                      disabled={fieldsToDisable.includes('email')}
                      value={values.email = symbolAddress()}
                      onChange={handleChange}
                      required
                      placeholder='TDR5AFR3Y5AMKP4GRSCMJERFQ7MEVEE5C7TKWXA'
                      label='SymbolAddress'
                    />
                    <Checkbox
                      onValueChange={checked => {
                        handleChange({ target: { value: checked, name: 'news' } });
                      }}
                      value={values.news}
                      name="news"
                      aria-label="news"
                    >
                      {formatMessage(
                        {
                          id: 'Auth.form.register.news.label',
                          defaultMessage:
                            'Keep me updated about new features & upcoming improvements (by doing this you accept the {terms} and the {policy}).',
                        },
                        {
                          terms: (
                            <A target="_blank" href="https://strapi.io/terms" rel="noreferrer">
                              {formatMessage({
                                id: 'Auth.privacy-policy-agreement.terms',
                                defaultMessage: 'terms',
                              })}
                            </A>
                          ),
                          policy: (
                            <A target="_blank" href="https://strapi.io/privacy" rel="noreferrer">
                              {formatMessage({
                                id: 'Auth.privacy-policy-agreement.policy',
                                defaultMessage: 'policy',
                              })}
                            </A>
                          ),
                        }
                      )}
                    </Checkbox>
                    <Button fullWidth size="L" type="submit">
                      {formatMessage({
                        id: 'Auth.form.button.register',
                        defaultMessage: "Let's start",
                      })}
                    </Button>
                  </Stack>
                </Main>
              </Form>
            );
          }}
        </Formik>
        {!noSignin && (
          <Box paddingTop={4}>
            <Flex justifyContent="center">
              <Link label="Auth.link.signin" to="/auth/login">
                {formatMessage({
                  id: 'Auth.link.signin.account',
                  defaultMessage: 'Already have an account?',
                })}
              </Link>
            </Flex>
          </Box>
        )}
      </LayoutContent>
    </UnauthenticatedLayout>
  );
};

Register.defaultProps = {
  fieldsToDisable: [],
  noSignin: false,
  onSubmit: e => e.preventDefault(),
};

Register.propTypes = {
  authType: PropTypes.string.isRequired,
  fieldsToDisable: PropTypes.array,
  noSignin: PropTypes.bool,
  onSubmit: PropTypes.func,
  schema: PropTypes.shape({
    validate: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default Register;
