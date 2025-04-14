'use client';

import { useRef, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Input, Textarea, Button } from '@nextui-org/react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoSendSharp } from 'react-icons/io5';
import { FiMail } from 'react-icons/fi';
import { Notebook, Phone, User } from 'lucide-react';

import { Title } from '../../ui/title';
import NavButtons from '../../ui/navButtons';

import ContactLeft from './contactLeft';

interface FormValues {
  username: string;
  phoneNumber: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    username: '',
    phoneNumber: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [sending, setSending] = useState<boolean>(false);
  const [fieldFocus, setFieldFocus] = useState<string | null>(null);

  const form = useRef<HTMLFormElement>(null);

  const emailValidation = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleFocus = (name: string) => {
    setFieldFocus(name);
  };

  const handleBlur = () => {
    setFieldFocus(null);
  };

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    const { username, email, message } = formValues;

    if (!username) {
      setErrMsg('Name is required!');
    } else if (!email) {
      setErrMsg('Please provide your email!');
    } else if (!emailValidation(email)) {
      setErrMsg('Please provide a valid email!');
    } else if (!message) {
      setErrMsg('Message is required!');
    } else {
      setErrMsg(null);
      setSending(true);

      // Use emailjs to send the form data
      emailjs
        .sendForm(
          'service_a83mwk4',
          'template_crw6xto',
          form.current as HTMLFormElement,
          'wTuP0_-qh1sVDIcjH'
        )
        .then(
          () => {
            setSending(false);
            setSuccessMsg(
              `Thank you, ${username}! Your message has been sent successfully.`
            );
            setFormValues({
              username: '',
              phoneNumber: '',
              email: '',
              subject: '',
              message: '',
            });

            // Clear success message after 5 seconds
            setTimeout(() => {
              setSuccessMsg(null);
            }, 5000);
          },
          () => {
            setSending(false);
            setErrMsg('Something went wrong. Please try again.');
          }
        );
    }
  };

  useEffect(() => {
    if (errMsg) {
      const timer = setTimeout(() => {
        setErrMsg(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [errMsg]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const pulse = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: 'reverse' as const,
    },
  };

  return (
    <section className="py-12 overflow-hidden" id="contact">
      <motion.div animate="visible" initial="hidden" variants={fadeInUp}>
        <Title title1="Contact" title2="Contact With Me" />

        <motion.div
          animate="visible"
          className="w-full flex flex-col lg:flex-row gap-8 mt-8"
          initial="hidden"
          variants={staggerContainer}
        >
          {/* Left Side Contact Info */}
          <motion.div className="w-full lg:w-[40%]" variants={fadeInUp}>
            <ContactLeft />
          </motion.div>

          {/* Contact Form */}
          <motion.div className="w-full lg:w-[60%]" variants={fadeInUp}>
            <motion.form
              ref={form}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col gap-5 border border-default-200 rounded-xl p-8 backdrop-blur shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onSubmit={handleSend}
            >
              <AnimatePresence>
                {errMsg && (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="py-3 px-4 bg-red-500/10 border border-red-200/10 rounded-lg text-center text-red-500"
                    exit={{ opacity: 0, y: -10 }}
                    initial={{ opacity: 0, y: -10 }}
                  >
                    <p>{errMsg}</p>
                  </motion.div>
                )}

                {successMsg && (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="py-3 px-4 bg-green-500/10 border border-green-200/10 rounded-lg text-center text-green-500"
                    exit={{ opacity: 0, y: -10 }}
                    initial={{ opacity: 0, y: -10 }}
                  >
                    <p>{successMsg}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <h3 className="text-xl font-bold text-default-800 mb-2">
                Send me a message
              </h3>
              <p className="text-default-500 mb-4">
                Feel free to reach out for any queries or collaborations
              </p>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                <motion.div
                  className="relative"
                  variants={fadeInUp}
                  whileFocus={fieldFocus === 'username' ? pulse : {}}
                >
                  <Input
                    fullWidth
                    className="hover:scale-[1.01] transition-transform"
                    color="warning"
                    label="Your Name"
                    name="username"
                    radius="lg"
                    startContent={<User className="text-warning size-4" />}
                    value={formValues.username}
                    variant="bordered"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onFocus={() => handleFocus('username')}
                  />
                </motion.div>

                <motion.div
                  className="relative"
                  variants={fadeInUp}
                  whileFocus={fieldFocus === 'email' ? pulse : {}}
                >
                  <Input
                    fullWidth
                    className="hover:scale-[1.01] transition-transform"
                    color="warning"
                    label="Email"
                    name="email"
                    radius="lg"
                    startContent={<FiMail className="text-warning size-4" />}
                    type="email"
                    value={formValues.email}
                    variant="bordered"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                  />
                </motion.div>

                <motion.div
                  className="relative"
                  variants={fadeInUp}
                  whileFocus={fieldFocus === 'phoneNumber' ? pulse : {}}
                >
                  <Input
                    fullWidth
                    className="hover:scale-[1.01] transition-transform"
                    color="warning"
                    label="Phone Number (Optional)"
                    name="phoneNumber"
                    radius="lg"
                    startContent={<Phone className="text-warning size-4" />}
                    value={formValues.phoneNumber}
                    variant="bordered"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onFocus={() => handleFocus('phoneNumber')}
                  />
                </motion.div>

                <motion.div
                  className="relative"
                  variants={fadeInUp}
                  whileFocus={fieldFocus === 'subject' ? pulse : {}}
                >
                  <Input
                    fullWidth
                    className="hover:scale-[1.01] transition-transform"
                    color="warning"
                    label="Subject"
                    name="subject"
                    radius="lg"
                    startContent={<Notebook className="text-warning size-4" />}
                    value={formValues.subject}
                    variant="bordered"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onFocus={() => handleFocus('subject')}
                  />
                </motion.div>
              </div>

              <motion.div
                className="relative mt-2"
                variants={fadeInUp}
                whileFocus={fieldFocus === 'message' ? pulse : {}}
              >
                <Textarea
                  fullWidth
                  className="hover:scale-[1.01] transition-transform"
                  color="warning"
                  label="Message"
                  name="message"
                  radius="lg"
                  rows={5}
                  value={formValues.message}
                  variant="bordered"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                />
              </motion.div>

              <motion.div
                className="flex items-center justify-center mt-4"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  fullWidth
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium shadow-md hover:shadow-lg max-w-xs"
                  endContent={
                    sending ? (
                      <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    ) : (
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <IoSendSharp />
                      </motion.div>
                    )
                  }
                  isDisabled={sending}
                  isLoading={sending}
                  radius="full"
                  size="lg"
                  type="submit"
                >
                  {sending ? 'Sending...' : 'Send Message'}
                </Button>
              </motion.div>

              {/* Navigation Buttons */}
              <motion.div
                className="mt-6 flex items-center justify-center w-full"
                variants={fadeInUp}
              >
                <NavButtons />
              </motion.div>

              <motion.div
                animate={{ opacity: 1 }}
                className="text-center text-default-400 text-sm mt-4"
                initial={{ opacity: 0 }}
                transition={{ delay: 0.8 }}
              >
                I will get back to you as soon as possible
              </motion.div>
            </motion.form>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
