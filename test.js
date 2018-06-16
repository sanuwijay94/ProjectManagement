const chakram = require("chakram");
const expect = chakram.expect;
const before = chakram.before;


describe('Project', function() {

    //create a project
    describe('POST /project/create', function() {
        let project = {
            employees:['5b181a64be2d3019805b8549', '5b1b73263180d515844fe443'],
            resources:[],
            name:'Airline Ticketing',
            type:'Travel',
            start_date:'2017-10-09T00:00:00.000Z',
            deadline:'2018-05-11T00:00:00.000Z',
            budget:100000,
            percentage_complete:78,
            client:'5b1a155d7f59b2323843063f'
        };

        it('create a project', function() {
            var project_post = chakram.post("http://127.0.0.1:3000/project/create", project);
            return expect(project_post).to.have.status(200);
        });
    });

});


describe('client', function() {

    //delete a specific client
    describe('DELETE /client/:id/delete', function() {
        it('delete a client with it\'s whole projects', function() {
            var client_delete = chakram.delete("http://127.0.0.1:3000/client/5b2362d3ac31352dbc437545/delete");
            return expect(client_delete).to.have.status(200);
        });
    });

});


describe('Employee', function() {

    //update a specific employee
    describe('PATCH /employee/update', function() {
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
            var employee_patch = chakram.patch("http://127.0.0.1:3000/employee/5b1b73263180d515844fe443/update", employee);
            return expect(employee_patch).to.have.status(200);
        });
    });

});

describe('Phase', function() {

    //get the list of all the phases
    describe('GET /phase', function() {
        it('returns a list of phases', function() {
            var getPhases_list = chakram.get("http://127.0.0.1:3000/phase/");
            return expect(getPhases_list).to.have.status(200);
        });
    });

});


describe('Task', function() {

    //get a specific task
    describe('GET /task/:id', function() {
        it('returns a specific task', function() {
            var getTask = chakram.get("http://127.0.0.1:3000/task/5b160877dca37e23d8646dda");
            return expect(getTask).to.have.status(200);
        });
    });

});