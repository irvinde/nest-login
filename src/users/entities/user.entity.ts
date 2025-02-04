import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{unique: true})
    email: string;

    @Column('text')
    fullname: string;

    @Column('text', {select: false})
    password: string;

    @Column('boolean', {default: true})
    isactive: boolean;

    @Column('json', {nullable: false})
    roles: string[];

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.email = this.email.toLowerCase();
    }
    
}
