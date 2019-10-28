import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { FieldValue } from './FieldValue';

@Entity()
export class Item {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    reference: string;

    @OneToMany(type => FieldValue, fieldValue => fieldValue.item)
    fieldValues: FieldValue[];
}
