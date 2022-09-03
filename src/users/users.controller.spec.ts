import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import {UsersService} from './users.service';
import {AuthService} from './auth.service';
import {User} from '../../src/users/users.entity'


describe('UsersController', () => {
  
  let controller: UsersController;
  let fakeUsersService:Partial<UsersService>;
  let fakeAuthService:Partial<AuthService>;

  beforeEach(async () => {

    fakeUsersService = {
      findOne:(id:number)=>{
        return Promise.resolve({
          id,email:'nghi@gmail.com',password:'123456'
        }as User);
      },
      find:()=>{},
      // remove:()=>{},
      // update:()=>{}
    };

    fakeAuthService = {
      // signup:()=>{},
      // signin:()=>{}
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide:UsersService,
          useValue:fakeUsersService
        },
        {
          provide:AuthService,
          useValue:fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Find all users returns a list of users with a given email', async () => {

  });
});
