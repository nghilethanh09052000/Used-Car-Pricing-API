import { Reports } from "../reports/reports.entity";
import { 
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
} from "typeorm";



@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
    
    @Column()
    password: String;
    
    @Column({default:true})
    admin:boolean;

    @OneToMany( ()=> Reports, (report) => report.user )
    reports: Reports[];


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