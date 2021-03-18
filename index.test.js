const app = require('./index');
const request = require("supertest");

const fs = require('fs'); 
const data = JSON.parse(fs.readFileSync('json.data', 'utf8')); 

//get method
describe("Test the get method", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

//This is not passed, because I can't make the data to test, But I use Postman to test this case
describe('Post bad JSON Data', () => {
  test('Tests bad post', (done) => {
    request(app)
      .post('/')
      .set({type: 'application/json'})
      .send({test:"test",
            resule: "true"})
      .then((response)=>{
        expect(response.statusCode).not.toBe(200);
        expect(JSON.stringify(response.body)).toContain("error");
      done();
    });
  });
});


//send a good data
describe('Post good JSON Data', () => {
  test('Tests good post', (done) => {
    request(app)
      .post('/')
      .set({type: 'application/json'})
      .send(data)
      .then((response)=>{
        expect(response.statusCode).toBe(200);
      done();
    });
  });
});



//contain "response,"image","title", "slug"
describe('Get correct return format', () => {
  test('Tests good response', (done) => {
    request(app)
      .post('/')
      .set({type: 'application/json'})
      .send(data)
      .then((response)=>{
        expect(Array.isArray(response.body.response)).toBeTruthy();
        expect(JSON.stringify(response.body)).toContain("response");
        expect(JSON.stringify(response.body)).toContain("image");
        expect(JSON.stringify(response.body)).toContain("slug");
        expect(JSON.stringify(response.body)).toContain("title");
      done();
    });
  });
});

describe('test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true)
  })
})