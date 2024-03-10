import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import emailjs from '@emailjs/browser';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

const SERVICE_ID = 'service_096y1mn';
const TEMPLATE_ID = 'template_v1ctwus';
const USER_ID = 'user_lBkWUG1XdnTeZWL2QnHi6';

const Contact = () => {
  const toast = useToast();

  const [error, setError] = useState('');

  const validationSchema = Yup.object({
    name: Yup.string().required('Please enter your name'),
    email: Yup.string().email('Invalid email address').required('Required'),
    message: Yup.string().required('Please enter your comments'),
  });

  const formik = useFormik({
    initialValues: { name: '', email: '', message: '' },
    onSubmit: (values, { resetForm }) => {
      emailjs
        .send(SERVICE_ID, TEMPLATE_ID, values, USER_ID)
        .then(() => {
          toast({
            title: 'Email sent',
            description: 'We will get back to you soon',
            status: 'success',
          });
          resetForm();
        })
        .catch((e) => setError(e.text));
    },
    validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            name="name"
            placeholder="Name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="message">Message</FormLabel>
          <Textarea
            placeholder="Comments..."
            name="message"
            onChange={formik.handleChange}
            value={formik.values.message}
            minH={200}
          />
        </FormControl>
        <Button type="submit" alignSelf="end" colorScheme="teal">
          Send
        </Button>
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </Stack>
    </form>
  );
};

export default Contact;
