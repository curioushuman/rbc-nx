import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import * as request from 'supertest';
import { MongoDbService } from '@curioushuman/rbc-common';

import { AppModule } from '../../../app.module';
import {
  createMemberDto,
  memberExisting,
  memberExtResponse,
} from '../stubs/member.stub';

// * NOTES
// Currently disabled, as it won't be able to connect to MongoDB without cluster
//   To re-enable, add .spec at the end of the file

// TODO
// [ ] Complete other endpoints
// [ ] Automate the testing upon cluster creation (or something)

describe('MembersController', () => {
  let dbConnection: Connection;
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    dbConnection = moduleRef.get<MongoDbService>(MongoDbService).getDbHandle();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await dbConnection.collection('members').deleteMany({});
  });

  describe('getMembers', () => {
    describe('When records exist', () => {
      test('Then it should return an array of members', async () => {
        await dbConnection.collection('members').insertOne(memberExisting());
        const response = await request(httpServer).get('/members');

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject([memberExtResponse()]);
      });
    });
    describe('When records DO NOT exist', () => {
      test('Then it should return an empty array', async () => {
        const response = await request(httpServer).get('/members');

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject([]);
      });
    });
  });

  describe('createMember', () => {
    it('should create a member', async () => {
      const response = await request(httpServer)
        .post('/members')
        .send(createMemberDto());

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(memberExtResponse());

      const member = await dbConnection
        .collection('members')
        .findOne({ id: createMemberDto().id });
      expect(member).toMatchObject(memberExisting());
    });
  });
});
