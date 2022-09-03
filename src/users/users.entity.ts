import { 
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    Entity,
    Column,
    PrimaryGeneratedColumn
} from "typeorm";



@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
    
    @Column()
    password: String;

    @AfterInsert()
    logInsert() {
        console.log('Inserted User with Id',this.id)
    }

    @AfterUpdate() 
    logUpdate() {
        console.log('Updated User this id',this.id)
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed User with id',this.id)
    }
}