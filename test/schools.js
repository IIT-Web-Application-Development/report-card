process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../routes/schools.js');
let should = chai.should();
//let expect = chai.expect;


chai.use(chaiHttp);

describe('Schools', () => {
  describe('/GET schools', () => {
    it('it should return empty array when no schools are present', (done) => {
      chai.request(server)
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
      var requestedSchool =
      {
        'name':    "Illinois Institute of Technology",
        'location':    "Chicago, IL"
      }
      chai.request(server)
      .post('/schools')
      .send(requestedSchool)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.eql("School successfully added!");
        done();
      });
    });
  });
  describe('/GET schools', () => {
    it('it should return all schools', (done) => {
      chai.request(server)
      .get('/schools')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);
        done();
      });
    });
  });
  describe('/GET schools/:sname', () => {
    it('it should return school based on school name', (done) => {
      var requestedSchool =
      {
        'name':    "Illinois Institute of Technology",
        'location':    "Chicago, IL"
      }
        chai.request(server)
        .get('/schools/' + requestedSchool.name)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('name');
          res.body.should.have.property('location');
          done();
        });
      });
    });
  describe('/POST schools/:sname/teachers', () => {
      it('it should create a teacher', (done) => {
        var requestedSchool =
        {
          'name':    "Illinois Institute of Technology",
          'location':    "Chicago, IL"
        }
        var requestedTeacher =
        {
          'name': "John Doe"
        }
      chai.request(server)
      .post('/schools/' + requestedSchool.name + '/teachers')
      .send(requestedTeacher)
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
        var requestedSchool =
        {
          'name':    "Illinois Institute of Technology",
          'location':    "Chicago, IL"
        }
        var requestedTeacher =
        {
          'name': "John Doe"
        }
        chai.request(server)
        .get('/schools/' + requestedSchool.name + '/teachers')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          done();
        });
      });
    });
  describe('/GET schools/:sname/teacher/:tname', () => {
    it('it should return teacher based on teacher name', (done) => {
      var requestedSchool =
      {
        'name':    "Illinois Institute of Technology",
        'location':    "Chicago, IL"
      }
      var requestedTeacher =
      {
        'name': "John Doe"
      }
    chai.request(server)
    .get('/schools/' + requestedSchool.name + '/teachers/' + requestedTeacher.name)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('name');
      done();
      });
    });
  });
//***** I think /:tname needs the GET and POST so my pathing may work.*****
//Post all comments
describe('/POST schools/:sname/teachers/:tname/comments/', () =>{
  it('it should post comments', (done) =>{
    var requestedSchool =
    {
          'name':    "Illinois Institute of Technology",
          'location':    "Chicago, IL"
    }
    var requestedTeacher =
    {
          'name': "John Doe"
    }
    var requestedComment =
    {
           body: "Fun class",
           date: Date.now(),
           knowhow: "Took class"
    }
    chai.request(server)
    .post('/schools/'+ requestedSchool.name + '/teachers/' + requestedTeacher.name + '/comments/')
    .send(requestedComment)
    .end((err, res) =>{
      res.should.have.status(200);
      res.body.message.should.eql("Comment successfully added!");
      done();
    });
  });
});
//Gets all comments
describe('/GET schools/:sname/teachers/:tname/comments', ()=> {
  it('it should get all comments', (done) => {
    var requestedSchool =
    {
          'name':    "Illinois Institute of Technology",
          'location':    "Chicago, IL"
    }
    var requestedTeacher =
    {
          'name': "John Doe"
    }
    var requestedComments =
    {
           body: "Fun class",
           date: Date.now(),
           knowhow: "Took class"
    }
    chai.request(server)
    .get('/schools/' + requestedSchool.name + '/teachers/' + requestedTeacher.name + '/comments')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.length.should.be.eql(1);
      done();
      });
    });
  });
//gets a specific comment
describe('/GET schools/:sname/teachers/:tname/comments/:cid', ()=> {
  it('it should get a speciffic comment', (done) => {
    var requestedSchool =
    {
          'name':    "Illinois Institute of Technology",
          'location':    "Chicago, IL"
    }
    var requestedTeacher =
    {
          'name': "John Doe"
    }
    var requestedComment =
    {
           id: 0,
           body: "Fun class",
           date: Date.now(),
           knowhow: "Took class"
    }
    chai.request(server)
    .get('/schools/'+ requestedSchool.name + '/teachers/' + requestedTeacher.name + '/comments/' + requestedComment.id)
    .end((err, res) => {
      res.should.have.status(200);
      //res.bodt.should.have.property('id');
      res.body.should.have.property('body');
      res.body.should.have.property('date');
      res.body.should.have.property('knowhow');
      done();
    });
  });
});
//deletes the specific comment
describe('/DELETE schools/:sname/teachers/:tname/comments/:id', () => {
      it('it should post a speciffic comment', (done) => {
      var requestedSchool =
      {
          'name':    "Illinois Institute of Technology",
          'location':    "Chicago, IL"
      }
      var requestedTeacher =
      {
          'name': "John Doe"
      }
      var requestedComment =
      {
           id:0,
           body: "Fun class",
           date: Date.now(),
           knowhow: "Took class"
      }
      chai.request(server)
      .delete('/schools/'+ requestedSchool.name + '/teachers/' + requestedTeacher.name + '/comments/' + requestedComment.id)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.eql("Comment deleted successfully!");
        done();
      });
    });
  });

});


