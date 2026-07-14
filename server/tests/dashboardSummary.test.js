const assert = require('assert');
const { describe, it } = require('node:test');
const { getSummary } = require('../controllers/dashboardController');

describe('dashboard summary controller', () => {
  it('returns a safe fallback payload when dashboard aggregation fails', async () => {
    const req = {};
    const res = {
      statusCode: 200,
      body: null,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(payload) {
        this.body = payload;
        return this;
      },
    };

    const original = require('../services/dashboardService').getSummary;
    require('../services/dashboardService').getSummary = async () => {
      throw new Error('boom');
    };

    try {
      await getSummary(req, res);
      assert.strictEqual(res.statusCode, 200);
      assert.deepStrictEqual(res.body.members, 0);
      assert.deepStrictEqual(res.body.activities, []);
      assert.deepStrictEqual(res.body.membersByDepartment, []);
    } finally {
      require('../services/dashboardService').getSummary = original;
    }
  });
});
