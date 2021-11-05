import {Test} from '@nestjs/testing';
import {PlatformClientService} from 'src/platformClient/services';
import {BookingModule} from '../../../booking/booking.module';
import * as request from 'supertest';
import {configModules} from 'src/test/helpers';

const mockApp = async (mockedPlatformService = {request: () => ({})}) =>
  await Test.createTestingModule({
    imports: [
      BookingModule,
      ...configModules(),
    ],
  })
    .overrideProvider(PlatformClientService).useFactory({factory: () => (mockedPlatformService)})
    .compile();

const initializeApp = async (mockedPlatformService?: { request: (args?) => Record<string, any> }) => {
  const app = (await mockApp(mockedPlatformService)).createNestApplication();
  return app.init();
}

describe('Register', () => {

  describe('userRegistration', () => {
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


    it('should register user when correct information are supplied.', async (done) => {
      const query =
        {
          email: "info@gmail.com",
          password: "password",
          name: "John"
        }

      const {body} = await request(app.getHttpServer()).post('/api/user').send({query});
      expect(body.data.register.email).toEqual('info@gmail.com');
      done()
    });


    it('should failed when email exist', async (done) => {
      const query =
        {
          name: "hello@gmail.com",
          password: "test",
          firstName: "David",
          lastName: "John"
        }

      const {body} = await request(app.getHttpServer()).post('api/user').send({query});
      expect(body.errors.message).toEqual('email exist');
      done()
    });

  })

})
