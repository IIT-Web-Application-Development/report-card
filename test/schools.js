let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
let expect = chai.expect;


let School = require('../models/school');
let Teacher = require('../models/teacher');

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
        teachers: {
          name: "Jane Doe",
          topics:  {
            CommunicationWithStudents : "A",
            LectureAbility : "A",
            Helpfulness : "B",
            Understandability: "A" },
            comments:  [{ body: "great teacher!", date: Date.now(), knowhow: "took class in fall 2017" }] }
          });
          expectedSchool.save();
          chai.request(app)
          .get('/schools')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            let returnedSchool = res.body[0];
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
            teachers: {
              name: "Jane Doe",
              topics:  {
                CommunicationWithStudents : "A",
                LectureAbility : "A",
                Helpfulness : "B",
                Understandability: "A" },
                comments:  [{ body: "great teacher!", date: Date.now(), knowhow: "took class in fall 2017" }] }
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
            })
          });
        });
