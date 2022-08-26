import { 
    Controller,
    Post,
    Body,
    Get,
    Patch,
    Delete,
    Param,
    Query,
    NotFoundException
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {

    constructor(private usersService:UsersService){}

    @Post('/signup')
    createUser(
        @Body()
        body:CreateUserDto
        ) {
            const {email,password} = body;
            this.usersService.create(email,password)
        }
    
    @Get('/:id')
    async findUser(
        @Param('id')
        id:string
    ) {
        const user = await this.usersService.findOne(parseInt(id))
        if(!user)
        {
            throw new NotFoundException('Not found user');
        }
        return user;
    }

    @Get()
    findAllUser(
        @Query('email')
        email:string
    ) {
        return this.usersService.find(email)
    }

    @Patch('/:id')
    updateUser(
        @Param('id')
        id:string,
        @Body()
        body:UpdateUserDto
    ) {
        return this.usersService.update(parseInt(id),body)
    }

    @Delete('/:id')
    removeUser(
        @Param('id')
        id:string
    ){
        return this.usersService.remove(parseInt(id))
    }
}
