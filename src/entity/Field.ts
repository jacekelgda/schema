import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { FieldValue } from './FieldValue';
import { Template } from './Template';

@Entity()
export class Field {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @OneToMany(type => FieldValue, fieldValue => fieldValue.field)
    fieldValues: FieldValue[];

    @ManyToOne(type => Template, template => template.fields)
    template: Template;
}
