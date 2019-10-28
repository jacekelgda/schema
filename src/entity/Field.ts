import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { FieldValue } from './FieldValue';

@Entity()
export class Field {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @OneToMany(type => FieldValue, fieldValue => fieldValue.field, { nullable: true })
    fieldValues: FieldValue[];
}
