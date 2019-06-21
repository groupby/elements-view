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
