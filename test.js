const chakram = require("chakram");
const expect = chakram.expect;


describe('Tests', function() {
    let token;
    before('Login',function () {
        let auth = {
            username: 'admin',
            password: 'admin'
        };
        let response=chakram.post("http://127.0.0.1:3000/login", auth);
        expect(response).to.have.json((json)=>{
            token = json.token
        });
        return chakram.wait();

    });

    //get a specific task
    describe('GET /task/:id', function() {

        it('returns a specific task', function() {
             let getTask = chakram.get("http://127.0.0.1:3000/task/5b370ca3fe1afd3bb815d555", {
                 headers: {
                     'x-access-token': token
                 }
             });
            return expect(getTask).to.have.status(200);
        });
    });

    //get the list of all the phases
    describe('GET /phase', function() {
        it('returns a list of phases', function() {
            var getPhases_list = chakram.get("http://127.0.0.1:3000/phase/", {
                headers: {
                    'x-access-token': token
                }
            });
            return expect(getPhases_list).to.have.status(200);
        });
    });

    //create a project
    describe('POST /project/create', function() {
        it('create a project', function () {
            let project = {
                employees: ['5b370ca2fe1afd3bb815d54b'],
                resources: [],
                name: 'Airline Ticketing',
                type: 'Travel',
                start_date: '2017-10-09T00:00:00.000Z',
                deadline: '2018-05-11T00:00:00.000Z',
                budget: 100000,
                percentage_complete: 78,
                client: '5b370ca2fe1afd3bb815d54d'
            };

            let project_post = chakram.post("http://127.0.0.1:3000/project/create", project, {
                headers: {
                    'x-access-token': token
                }
            });
            return expect(project_post).to.have.status(201);
        });
    });

    //update a specific employee
    describe('PATCH /employee/:id/update', function() {
        let employee = {
            first_name: 'dinura',
            last_name: 'wijayarathne',
            date_of_birth: '1994-06-06 05:30:00.000',
            phone: '0782523353',
            email: 'dinura@gmail.com',
            type: 'Dev',
            status: 'Not-Available',
            username: 'dinur-elaa',
            password: 'asdfg'
        };
        it('update an employee', function () {
            var employee_patch = chakram.patch("http://127.0.0.1:3000/employee/5b370ca2fe1afd3bb815d54b/update", employee, {
                headers: {
                    'x-access-token': token
                }
            });
            return expect(employee_patch).to.have.status(200);
        });
    });
    //delete a specific client
    describe('DELETE /client/:id/delete', function() {
        it('delete a client with it\'s whole projects', function() {
            var client_delete = chakram.delete("http://127.0.0.1:3000/client/5b370ca2fe1afd3bb815d54d/delete", {}, {
                headers: {
                    'x-access-token': token
                }
            });
            return expect(client_delete).to.have.status(200);
        });
    });
});
