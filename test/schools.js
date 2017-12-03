let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
let expect = chai.expect;


chai.use(chaiHttp);

describe('Schools', () => {
  // beforeEach((done) => {
  //   schools = [ ];
  //     done();
  // });
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
  });
  describe('/POST schools', () => {
    it('it should create a school', (done) => {
      var expectedSchool =
      {
        'name':    "Illinois Institute of Technology",
        'location':    "Chicago, IL"

    }
      chai.request(app)
      .post('/schools')
      .send(expectedSchool)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.eql("School successfully added!");

          done();

      });

    });
  });
    describe('/GET schools', () => {
    it('it should return all schools', (done) => {
      chai.request(app)
      .get('/schools')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);
        // let returnedSchool = res.body[0];
        // console.log(returnedSchool);
        // returnedSchool.name.should.be.eql(expectedSchool.name);
        // returnedSchool.location.should.be.eql(expectedSchool.location);
        done();
      });
    });
  });
  describe('/GET schools/:sname', () => {
    it('it should return school based on school name', (done) => {
      var expectedSchool =
      {
        'name':    "Illinois Institute of Technology",
        'location':    "Chicago, IL"

    }
        chai.request(app)
        .get('/schools/' + expectedSchool.name)

        .end((err, res) => {
          //console.log(res.body);
          res.should.have.status(200);
          res.body.should.have.property('name');
          res.body.should.have.property('location');
          done();
        });
      });
    });
    describe('/POST schools/:sname/teacher', () => {
      it('it should create a teacher', (done) => {
        var expectedSchool =
        {
          'name':    "Illinois Institute of Technology",
          'location':    "Chicago, IL"

      }
        var expectedTeacher =
        {
          'name': "John Doe"
        }
      chai.request(app)
      .post('/schools/' + expectedSchool.name + '/teachers')
      .send(expectedTeacher)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.eql("Teacher successfully added!");
          done();
      });
    });
  });

    //test for post and get of a teacher in a school
    describe('/GET schools/:sname/teachers', () => {
      it('it should return all teachers', (done) => {
        var expectedSchool =
        {
          'name':    "Illinois Institute of Technology",
          'location':    "Chicago, IL"

      }
        var expectedTeacher =
        {
          'name': "John Doe"
        }
        chai.request(app)
        .get('/schools/' + expectedSchool.name + '/teachers')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          // let returnedSchool = res.body;
          // console.log(returnedSchool.name);
          // returnedSchool.name.should.be.eql(expectedSchool.name);
          // returnedSchool.location.should.be.eql(expectedSchool.location);
          //returnedSchool.teachers.should.be.eql(expectedSchool.teachers)
          done();
        });
      });
    });


  describe('/GET schools/:sname/teacher/:tname', () => {
    it('it should return teacher based on teacher name', (done) => {
      var expectedSchool =
      {
        'name':    "Illinois Institute of Technology",
        'location':    "Chicago, IL"

      }
      var expectedTeacher =
      {
        'name': "John Doe"
      }
    chai.request(app)
    .get('/schools/' + expectedSchool.name + '/teacher/' + expectedTeacher.name)

    .end((err, res) => {
      res.should.have.status(200);
      // res.body.should.be.a('object');
      // res.body.should.have.property('name');
      // res.body.length.should.be.eql(1);
      res.body.should.have.property('name');
    //  res.body.comments.should.be.eql(expectedSchool.teachers[0].name.comments[0]);
      done();
    });
  });
});

// //Test for all comments
// describe('/GET /:name/teachers/:tname/comments', () => {
//        it('it should get all comments', (done) => {
//          var expectedSchool = new School({
//            name:   "Illinois Institute of Technology",
//            location:    "Chicago, IL",
//            teachers: [{
//              name: "Jane Doe",
//              comments: [{
//                body: "Fun class",
//                date: Date.now(),
//                knowhow: "Took class"
//                }]
//              }]
//              });
//            expectedSchool.save();
//            console.log(expectedSchool.name);
//            console.log(expectedSchool.teachers[0].name);
//           console.log(expectedSchool.teachers[0].comments[0].body);
//            chai.request(app)
//                .get('/schools/' + expectedSchool.name + '/teachers/' + expectedSchool.teachers[0].name + '/comments')
//                .end((err, res) => {
//                    //res.should.have.status(200);
//                    console.log(res.body.teachers[0].name);
//                    res.body.teachers[0].name.should.be.eql(expectedSchool.teachers[0].name);
//                     res.body.teachers[0].comments[0].body.should.be.eql(expectedSchool.teachers[0].comments[0].body);
//                    done();
//                });
//        });
//    });

});
