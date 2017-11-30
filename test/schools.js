let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
let expect = chai.expect;


let School = require('../models/school');
let Teacher = require('../models/teacher');
let Comments = require('../models/comment');

chai.use(chaiHttp);

describe('Schools', () => {
  beforeEach((done) => {
    School.remove({}, (err) => {
      done();
    });
  });
  describe('/GET schools', () => {
    it('it should return empty array when no schools are present', (done) => {
      chai.request(app)
      .get('/schools')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
    });
    it('it should return all schools', (done) => {
      var expectedSchool = new School({
        name:    "Illinois Institute of Technology",
        location:    "Chicago, IL",
        teachers:
        [  {name: "Jane Doe",
        comments: [{
          body: "Fun class",
          date: Date.now(),
          knowhow: "Took class"
          }]
        }]
      });
      expectedSchool.save();
      chai.request(app)
      .get('/schools')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);
        let returnedSchool = res.body[0];
        console.log(returnedSchool);
        returnedSchool.name.should.be.eql(expectedSchool.name);
        returnedSchool.location.should.be.eql(expectedSchool.location);
        done();
      });
    });
  });
  describe('/POST schools', () => {
    it('it should create a school', (done) => {
      var expectedSchool = new School({
        name:    "Illinois Institute of Technology",
        location:    "Chicago, IL",
        teachers:
        [{name: "Jane Doe",
        comments: [{
          body: "Fun class",
          date: Date.now(),
          knowhow: "Took class"
          }]
        }]
      });
      chai.request(app)
      .post('/schools')
      .send(expectedSchool)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.eql("School successfully added!");
        School.find({name : expectedSchool.name}).exec((err, schools) => {
          schools.length.should.be.eql(1);
          done();
        });
      });

    });
  });
  describe('/GET schools/:sname', () => {
    it('it should return school based on school name', (done) => {
      var expectedSchool = new School({
        name:    "Illinois Institute of Technology",
        location:    "Chicago, IL",
        teachers: [{
          name: "Jane Doe",
          comments: [{
            body: "Fun class",
            date: Date.now(),
            knowhow: "Took class"
            }]
          }]
        });
        expectedSchool.save();
        chai.request(app)
        .get('/schools/' + expectedSchool.name)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.location.should.be.eql(expectedSchool.location);
          done();
        });
      });
    });

    //test for post and get of a teacher in a school
    describe('/GET schools/:sname/teachers', () => {
      //we can't actually do this because with out a :sname for schools we can't all this path
      // it('it should return empty array when no teachers are present', (done) => {
      //   chai.request(app)
      //   .get('/schools/' + expectedSchool.name + '/teachers')
      //   .end((err, res) => {
      //     console.log(res.body);
      //     res.should.have.status(200);
      //     res.body.should.be.a('array');
      //     res.body.length.should.be.eql(0);
      //     done();
      //   });
      // });
      it('it should return all teachers', (done) => {
        var expectedSchool = new School({
          name:    "Illinois Institute of Technology",
          location:    "Chicago, IL",
          teachers:
          [  {name: "Jane Doe",
          comments: [{
            body: "Fun class",
            date: Date.now(),
            knowhow: "Took class"
            }]
          }]
        });
        expectedSchool.save();

        chai.request(app)
        .get('/schools/' + expectedSchool.name + '/teachers')

        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          let returnedSchool = res.body;
          console.log(returnedSchool.name);
          returnedSchool.name.should.be.eql(expectedSchool.name);
          returnedSchool.location.should.be.eql(expectedSchool.location);
          //returnedSchool.teachers.should.be.eql(expectedSchool.teachers)
          done();
        });
      });
    });

    describe('/POST schools/:sname/teacher', () => {
      it('it should create a teacher', (done) => {
        var expectedSchool = new School({
          name:    "Illinois Institute of Technology",
          location:    "Chicago, IL",
          teachers: [{
            name: "John Doe",
            comments: [{
              body: "Fun class",
              date: Date.now(),
              knowhow: "Took class"
            }]
          }]
      });
      chai.request(app)
      .post('/schools/' + expectedSchool.name + '/teachers')
      .send(expectedSchool)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.eql("Teacher successfully added!");
        School.find({name : expectedSchool.name}).exec((err, teachers) => {
          schools.name.teachers.length.should.be.eql(1);
          done();
        });
      });
    });
  });

  describe('/GET schools/:sname/teacher/:tname', () => {
    it('it should return teacher based on teacher name', (done) => {
      var expectedSchool = new School({
        name:    "Illinois Institute of Technology",
        location:    "Chicago, IL",
        teachers:
        [{name: "Jane Doe",
        comments: [{
          body: "Fun class",
          date: Date.now(),
          knowhow: "Took class"
        }]
      }]
    });
    expectedSchool.save();
    chai.request(app)
    .get('/schools/' + expectedSchool.name + '/teachers/' + expectedSchool.teachers[0].name)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.teachers[0].name.should.be.eql(expectedSchool.teachers[0].name);
    //  res.body.comments.should.be.eql(expectedSchool.teachers[0].name.comments[0]);
      done();
    });
  });
});

//Test for all comments
describe('/GET /:name/teachers/:tname/comments', () => {
       it('it should get all comments', (done) => {
         var expectedSchool = new School({
           name:   "Illinois Institute of Technology",
           location:    "Chicago, IL",
           teachers: [{
             name: "Jane Doe",
             comments: [{
               body: "Fun class",
               date: Date.now(),
               knowhow: "Took class"
               }]
             }]
             });
           expectedSchool.save();
           console.log(expectedSchool.name);
           console.log(expectedSchool.teachers[0].name);
          console.log(expectedSchool.teachers[0].comments[0].body);
           chai.request(app)
               .get('/schools/' + expectedSchool.name + '/teachers/' + expectedSchool.teachers[0].name + '/comments')
               .end((err, res) => {
                   //res.should.have.status(200);
                   console.log(res.body.teachers[0].name);
                   res.body.teachers[0].name.should.be.eql(expectedSchool.teachers[0].name);
                    res.body.teachers[0].comments[0].body.should.be.eql(expectedSchool.teachers[0].comments[0].body);
                   done();
               });
       });
   });

});
