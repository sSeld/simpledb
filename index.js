const fs = require('fs');
const rl = require('readline');

async function get(key) {
    // let db = db();
    // return db[key];
    const file = rl.createInterface({input: fs.createReadStream(logDb), output: process.stdout, terminal: false
    });
    file.on('line', (line)=> {
        // console.log(line);
        let split = line.split(',');
        if (split[0] == key){
            return split[1];
        }
    });
}

const logDb = 'log-structured-db';

function db() {
    return fs.readFileSync(logDb, 'UTF-8');
    // return JSON.parse(fs.readFileSync('db.json', 'UTF-8'));
}


function set(key, value) {
    // let db = db();
    // db[key] = value;
    // fs.writeFileSync('db.json', JSON.stringify(db));
    fs.appendFileSync(logDb,`${key},${value}\n`);
}

const run = async () => {
    set('id', 5);
    set('person.id', 5);
    set('person.name', 'jimmy');
    set('person', '{id: 5, name:"jimmy"}');

    let name =  get('person.name');
    console.log(name);
}

run().catch(console.error)
