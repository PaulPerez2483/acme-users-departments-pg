const pg = require('pg');
const uuid = require('uuid');

const client = new pg.Client({
    connectionString: 'postgres://localhost:5432/academy'
});

const generatesIds = (...ids) => {
    return ids.reduce((acc, id) => {
        acc[id] = uuid.v4();
        console.log(acc)
        return acc;
    }, {})
}

const ids = generatesIds('HR', 'SALES', 'MARKETING', 'IT', 'BROKE', 'Moe', 'Curly', 'Larry', 'Ship', 'Kevin');

client.connect();

const office = `
DROP TABLE IF EXISTS office;
DROP TABLE IF EXISTS departments;
CREATE TABLE departments(
    id UUID PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);
    CREATE TABLE office(
        id UUID PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        department_id UUID REFERENCES departments(id)
    );


INSERT INTO departments(id, name) VALUES('${ids.HR}', 'HR');
INSERT INTO departments(id, name) VALUES('${ids.SALES}', 'SALES');
INSERT INTO departments(id, name) VALUES('${ids.MARKETING}', 'MARKETING');
INSERT INTO departments(id, name) VALUES('${ids.IT}', 'IT');
INSERT INTO departments(id, name) VALUES('${ids.BROKE}', 'BROKE');

INSERT INTO office(id, name, department_id) VALUES('${ids.Moe}','moe','${ids.HR}');
INSERT INTO office(id, name, department_id) VALUES('${ids.Larry}','larry','${ids.SALES}');
INSERT INTO office(id, name, department_id) VALUES('${ids.Curly}','curly', '${ids.MARKETING}');
INSERT INTO office(id, name, department_id) VALUES('${ids.Ship}','ship', '${ids.BROKE}');
`
    ;



const sync = async () => {
    await client.query(office);
    console.log('complete')
}
sync();


const findAllOffices = async () => {
    const response = await client.query('SELECT * FROM office');
    return response.rows

}

const findAllDepartments = async () => {
    const response = await client.query('SELECT * FROM departments');
    return response.rows

}

const weAreBroke = async () => {
    const response = await client.query(`SELECT * FROM office WHERE department_id = '${ids.BROKE}'`)
    return response.rows;
}


module.exports = { office, sync, findAllDepartments, findAllOffices, ids, weAreBroke }