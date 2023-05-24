const jsonString = `
{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}
`;

const result = JSON.parse(jsonString);
for (let person of result.list) {
  person.age = Number(person.age)
}
console.log(result);
