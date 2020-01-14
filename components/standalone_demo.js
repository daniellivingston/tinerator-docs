import CodeBlock from 'components/CodeBlock';

const code = `
<script>
  window.sk=window.sk||function(){(sk.q=sk.q||[]).push(arguments)};

  sk('form', 'init', {
    id: '0858b1a135b0',
    element: '#my-form'
  });
</script>

<form id="my-form">
  <label for="email">Email</label>
  <input id="email" type="email" name="email" value="" required />
  <button type="submit">Notify Me</button>
</form>

<script defer src="https://js.statickit.com/statickit.js"></script>
`;

export default () => (
  <CodeBlock className="language-markup">{code.trim()}</CodeBlock>
);
