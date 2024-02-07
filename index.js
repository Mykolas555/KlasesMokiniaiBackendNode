const http = require('http');
const url = require('url');
const fs = require('fs');
const replaceTemplate = require('./modules/replaceTemplate');
const data = require('./data/data.json');

//server

const hostname = 'localhost';
const port = '8888';

//templates

const main = fs.readFileSync(`${__dirname}/templates/main.html`, 'utf-8');
const card = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const student = fs.readFileSync(`${__dirname}/templates/student.html`, 'utf-8');


const server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url, true);

    switch(pathname){

        case '/':
            const cardsHtml = data.moksleiviai.map(el=>replaceTemplate(card, el)).join('')
            const output = main.replace('{%STUDENT_CARDS%}', cardsHtml)
            res.writeHead(200,{'Content-Type' : 'text/html'})
            res.end(output)
            break;

        case '/students/sorted':
            const sortedStudents = data.moksleiviai.sort((a, b) => {
            return a.lastName.localeCompare(b.lastName);});
            const cardsHtmls = sortedStudents.map(el => replaceTemplate(card, el)).join('');
            const outputs = main.replace('{%STUDENT_CARDS%}', cardsHtmls);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(outputs);
            break;

        case '/student':
            res.writeHead(200,{'Content-Type' : 'text/html'})
            const outputStudent = replaceTemplate(student, data.moksleiviai[query.id-1]);
            res.end(outputStudent)
            break;

        case '/search':
            const searchQuery = query.q.toLowerCase();
            const filteredStudents = data.moksleiviai.filter(student =>
            student.lastName.toLowerCase().includes(searchQuery));
            const filteredCardsHtml = filteredStudents.map(el => replaceTemplate(card, el)).join('');
            const filteredOutput = main.replace('{%STUDENT_CARDS%}', filteredCardsHtml);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(filteredOutput);
            break;

        default:
            res.writeHead(404,{'Content-Type' : 'text/html'})
            res.end('<h1>Something went wrong</h1>')
    }
})

server.listen(port, hostname, ()=>{console.log(`server listening port ${port}`)})