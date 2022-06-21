const result = fetch('../MOCK_DATA.json');

let adress;

const hello = async () => {
  const res = await result;
  const data = await res.json();
  adress = await data;
  console.log(data);
};

hello();
console.log('this is the adress ', adress);

setTimeout(() => {}, 3000);
