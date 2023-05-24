const xmlString = `
  <list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const parser = new DOMParser();
const xmlDOM = parser.parseFromString(xmlString, "text/xml");


const listNode = xmlDOM.querySelector("list");
const students = listNode.querySelectorAll("student");
let studentsArr = [];
for (const studentNode of students) {
  const nameNode = studentNode.querySelector("name");
  const nameStr = `${nameNode.querySelector('first').textContent} ${nameNode.querySelector('second').textContent}`
  studentsArr.push(
    {
      name: nameStr,
      age: Number(studentNode.querySelector("age").textContent),
      prof: studentNode.querySelector("prof").textContent,
      lang: nameNode.getAttribute('lang')
    }
  )
}

const result = {
  list: studentsArr
};
console.log('result', result);

