import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { itWithPostgres } from '../helpers/database-availability.helper';
import { createTestApp } from '../helpers/test-app.helper';

describe('Application conventions (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp({ databaseUrl: process.env.TEST_DATABASE_URL });
  });

  afterAll(async () => {
    await app.close();
  });

  it('reports liveness without depending on PostgreSQL', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/system/health/live')
      .expect(200);

    expect(response.body).toMatchObject({ success: true, data: { status: 'ok' } });
  });

  itWithPostgres('reports readiness on the route the Docker HEALTHCHECK polls', async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/system/health').expect(200);

    expect(response.body.data).toMatchObject({
      status: 'ok',
      checks: { postgresql: 'connected' },
    });
  });

  it('answers unknown routes with the standard error envelope', async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/users').expect(404);

    expect(response.body).toMatchObject({
      success: false,
      statusCode: 404,
      path: '/api/v1/users',
    });
    expect(response.body.timestamp).toBeDefined();
  });

  it('sets hardened response headers and a request correlation id', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/system/health/live')
      .expect(200);

    expect(response.headers).toMatchObject({
      'x-content-type-options': 'nosniff',
      'x-frame-options': 'DENY',
      'referrer-policy': 'no-referrer',
      'cross-origin-resource-policy': 'same-site',
      'cache-control': 'no-store',
    });
    expect(response.headers['content-security-policy']).toContain("default-src 'none'");
    expect(response.headers['x-request-id']).toBeDefined();
  });

  it('allows the configured frontend origin through CORS', async () => {
    const response = await request(app.getHttpServer())
      .options('/api/v1/system/health/live')
      .set('Origin', 'http://localhost:3000')
      .set('Access-Control-Request-Method', 'GET')
      .expect(204);

    expect(response.headers['access-control-allow-origin']).toBe('http://localhost:3000');
  });

  it('does not grant CORS access to untrusted origins', async () => {
    const response = await request(app.getHttpServer())
      .options('/api/v1/system/health/live')
      .set('Origin', 'https://attacker.example')
      .set('Access-Control-Request-Method', 'GET');

    expect(response.headers['access-control-allow-origin']).toBeUndefined();
  });
});
