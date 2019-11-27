import CodeBlock from '../code_block';

const code = `
import { useForm } from '@statickit/react';

function ContactForm() {
  const [state, submit] = useForm({
    site: '0858b1a135b0',
    form: 'contact'
  });

  if (state.succeeded) {
    return (
      <div>Thank you for signing up!</div>
    )
  }

  return (
    <form onSubmit={submit}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" required />

      <label htmlFor="message">Message</label>
      <textarea id="message" name="message" required></textarea>

      <button type="submit" disabled={state.submitting}>Send</button>
    </form>
  );
}
`;

export default () => (
  <CodeBlock className="language-jsx">{code.trim()}</CodeBlock>
);
