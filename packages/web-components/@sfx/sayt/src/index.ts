/**
 * This test comment _supports_ [Markdown and other fun stuff](https://typedoc.org/guides/doccomments/)
 */
const testObj = {
  label: 'test text',
}

const testFunc = (text: TestInterface) => {
  console.log(`I am logging out ${ text.label }`);
}

testFunc(testObj);

interface TestInterface {
  label: string;
}
