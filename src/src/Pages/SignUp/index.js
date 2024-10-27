/* eslint-disable react/no-unknown-property */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
/* eslint-disable no-useless-escape */
/* eslint-disable prefer-const */
import { Box, Button, CircularProgress, Container, Divider, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
// import PhoneInput from 'react-phone-input-2';
import RegisterImg from '../../assets/register.png';
import LogoImg from '../../assets/logonew.png';
import 'react-phone-input-2/lib/style.css';
// import { RegisterUser, ResendVerification } from 'src/Redux/slice/user';
// import { useDispatch } from 'react-redux';
// import { baseURL } from 'src/utils/service';
import { useNavigate } from 'react-router-dom';
import { signup } from 'src/Redux/api/users';
import { toast } from 'react-toastify';

const initialValues = {
  username: '',
  // businessCategory: '',
  email: '',
  password: '',
  role: 'user',
  image: '',
  // whatsappNo: '',
};

const SignUp = () => {
  const [value, setValue] = useState();
  const [Values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // const [isResend, setIsResend] = useState(false);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleResend = async () => {
  //   try {
  //     // const res =  await dispatch(ResendVerification({ email: Values.email }));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (validations()) {
      try {
        const res = await signup(Values);
        setIsLoading(false);
        toast.success('User Signup Successfully');
        navigate('/login', { state: { email: Values?.email } });
        // const res = await dispatch();
        // RegisterUser(JSON.stringify({ ...Values, whatsappNo: value, path: `${baseURL}/verifyEmail` }))
        console.log('Submit', res);
        // if (res.payload.success === true) {
        //   // setValues(initialValues);
        //   // setValue();
        //   setIsResend(true);
        // }
      } catch (error) {
        console.log(error);
        toast.error('User Signup Failed');
      }
      // console.log('Submit', { ...Values, whatsappNo: value });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...Values,
      [name]: value,
    });
    validations({ [name]: value });
  };
  const validations = (fieldValue = Values) => {
    let temp = { ...errors };
    if ('businessName' in fieldValue) temp.businessName = fieldValue.businessName ? '' : 'This field requires';
    if ('businessCategory' in fieldValue)
      temp.businessCategory = fieldValue.businessCategory ? '' : 'This field requires';
    if ('email' in fieldValue)
      temp.email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(fieldValue.email) ? '' : 'Email is not valid';
    if ('password' in fieldValue) temp.password = fieldValue.password ? '' : 'This field requires';
    if ('whatsappNo' in fieldValue) temp.whatsappNo = value ? '' : 'This field requires';
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === '');
  };

  // console.log('isResend', isResend);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'bgColors.primary',
      }}
    >
      <Container maxWidth="lg">
        <Grid width={'100%'} sx={{ boxShadow: 4 }} container>
          <Grid
            sx={{
              width: '100%',
              height: '90vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
            }}
            item
            xs={12}
            md={6}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                // padding: 6,
              }}
            >
              <img width={'70%'} src={LogoImg} alt="" />
              <Typography fontSize={'22px'} fontWeight={700}>
                Create Your Account
              </Typography>
              {/* <Typography fontSize={'15px'} fontWeight={400}>
                No credit card required!
              </Typography> */}
              <Box
                component={'form'}
                onSubmit={handleSubmit}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '80%',
                  // padding: 6,
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 2,
                  }}
                >
                  <TextField
                    helperText={errors.username}
                    fullWidth
                    name="username"
                    type="text"
                    label="NAME:"
                    onChange={handleChange}
                    value={Values.username}
                    error={errors.username}
                    variant="outlined"
                  />
                  {/* <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-standard-label">Business Type</InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      name="businessCategory"
                      value={Values.businessCategory}
                      onChange={handleChange}
                      error={errors.businessCategory}
                      label="Business Type"
                    >
                      {businesses &&
                        businesses?.map((item) => (
                          <MenuItem value={item.businessName} key={item.id}>
                            {item.businessName}
                          </MenuItem>
                        ))}
                    </Select>
                    {errors.businessCategory && (
                      <p
                        style={{
                          color: 'red',
                          fontSize: '12px',
                          paddingLeft: '5%',
                        }}
                      >
                        {errors.businessCategory}
                      </p>
                    )}
                  </FormControl> */}
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 2,
                  }}
                >
                  <TextField
                    helperText={errors.email}
                    name="email"
                    value={Values.email}
                    onChange={handleChange}
                    error={errors.email}
                    fullWidth
                    label="EMAIL ADDRESS"
                    variant="outlined"
                  />
                  <TextField
                    helperText={errors.password}
                    name="password"
                    value={Values.password}
                    onChange={handleChange}
                    error={errors.password}
                    type="password"
                    fullWidth
                    label="PASSWORD"
                    variant="outlined"
                  />
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* <PhoneInput
                    inputStyle={{ width: '100%' }}
                    // containerStyle={{ width: "50vw" }}
                    country={'pk'}
                    value={value}
                    onChange={setValue}
                  />
                  {errors.whatsappNo && (
                    <p
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        paddingLeft: '5%',
                      }}
                    >
                      {errors.whatsappNo}
                    </p>
                  )} */}
                  <TextField
                    type="file"
                    placeholder="Select Image"
                    fullWidth
                    onChange={(e) => setValues({ ...Values, image: e.target.file })}
                  />
                </Box>
                <Button type="submit" variant="registor" disabled={isLoading}>
                  {isLoading ? <CircularProgress size="30px" /> : 'Create Account Now'}
                </Button>
                {/* {isResend && (
                  <Button type="button" variant="registor" onClick={handleResend}>
                    Resend Verify Link
                  </Button>
                )} */}

                <Divider sx={{ color: 'black' }} />
                <Typography>
                  Already have an account?
                  <Typography
                    sx={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                    component={'button'}
                    color="blue"
                    onClick={() => navigate('/login')}
                  >
                    Sign in
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            sx={{
              height: '90vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'bgColors.primary',
            }}
            item
            xs={12}
            md={6}
          >
            <img width={'100%'} src={RegisterImg} alt="" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignUp;
