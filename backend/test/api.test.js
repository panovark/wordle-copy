const request = require('supertest');
const app = require('../server');
const words = require('../words');

describe('API endpoints', () => {
  test('GET /word-of-the-day returns a valid word and puzzle number', async () => {
    const res = await request(app).get('/word-of-the-day');
    expect(res.status).toBe(200);
    expect(typeof res.body.word).toBe('string');
    expect(words).toContain(res.body.word);
    expect(typeof res.body.puzzleNumber).toBe('number');
  });

  test('POST /validate-word returns true for valid word', async () => {
    const validWord = words[0];
    const res = await request(app)
      .post('/validate-word')
      .send({ word: validWord });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ word: validWord, validWord: true });
  });

  test('POST /validate-word returns false for invalid word', async () => {
    const res = await request(app)
      .post('/validate-word')
      .send({ word: 'zzzzz' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ word: 'zzzzz', validWord: false });
  });
});
