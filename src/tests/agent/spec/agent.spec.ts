import {Test} from '@nestjs/testing';
import {AgentModule} from '../../../agent/agent.module';
import * as request from 'supertest';

const mockApp = async (mockedPlatformService = {request: () => ({})}) =>
  await Test.createTestingModule({
    imports: [
      AgentModule,
    ],
  })
    .compile();

const initializeApp = async (mockedPlatformService?: { request: (args?) => Record<string, any> }) => {
  const app = (await mockApp(mockedPlatformService)).createNestApplication();
  return app.init();
}

describe('Agent', () => {

  describe('userAgent', () => {
    let app;
    beforeAll(async () => {
      const mockedPlatformService = {
        request: () => ({

        })
      };
      app = await initializeApp(mockedPlatformService)
    });

    afterAll(async () => {
      await app.close();
    });


    it('should Book user when correct information are supplied.', async (done) => {
      const query =
        {
          startDate: new Date(),
          finishDate: new Date(),
        }

      const {body} = await request(app.getHttpServer()).post('/api/agent').send({query});
      expect(body.data.agent.startDate).toEqual(query.startDate);
      done()
    });


    it('should failed when email exist', async (done) => {
      const query =
        {
          email: "hello@gmail.com",
          name: "David",
        }

      const {body} = await request(app.getHttpServer()).post('api/user').send({query});
      expect(body.errors.message).toEqual('email exist');
      done()
    });

  })

})
