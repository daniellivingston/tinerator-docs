import { useState } from 'react';
import Header from 'components/Header';
import HeadMatter from 'components/HeadMatter';
import { useStaticKit } from '@statickit/react';
import { sendSupportEmail } from '@statickit/functions';

function ContactForm() {
  const client = useStaticKit();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    const resp = await sendSupportEmail(client, {
      subject: `${email} has a support request`,
      replyTo: email,
      fields: { email, message }
    });

    if (resp.status === 'ok') setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <p>
          <span style={{ fontSize: '80px' }}>👍</span>
        </p>
        <p className="font-bold text-gray-900 text-xl">
          Thanks for getting in touch!
        </p>
        <p className="text-gray-700 text-lg">We'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="pb-6">
        <label htmlFor="email" className="pb-1 block font-bold">
          What's your email address?
        </label>
        <input
          type="email"
          name="email"
          className="input-field w-full"
          placeholder="me@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoFocus
          required
        />
      </div>

      <div className="pb-4">
        <label htmlFor="message" className="pb-1 block font-bold">
          How can we help?
        </label>
        <textarea
          name="message"
          className="input-field leading-normal w-full h-32 resize-none"
          value={message}
          onChange={e => setMessage(e.target.value)}
          required
        ></textarea>
      </div>

      <button type="submit" className="btn" disabled={isSubmitting}>
        Send Message
      </button>
    </form>
  );
}

function SupportPage() {
  const title = 'Support';
  const description = 'Get in touch with support.';

  return (
    <div>
      <main>
        <HeadMatter title={title} description={description} path="/support" />
        <Header pageTitle={title} />

        <div className="mx-auto px-6 pt-12 container">
          <div className="pt-6 md:pt-10 pb-12 md:pb-16">
            <h1 className="pb-2 text-5xl font-bold leading-tight tracking-tight text-center">
              {title}
            </h1>
            <p className="text-lg text-gray-700 text-center">{description}</p>
          </div>
        </div>

        <div className="px-6 pb-24 max-w-lg mx-auto">
          <ContactForm />
        </div>
      </main>
    </div>
  );
}

export default SupportPage;
