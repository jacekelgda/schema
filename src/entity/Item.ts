import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, JoinTable } from "typeorm";
import { FieldValue } from './FieldValue';
import { Template } from './Template';

@Entity()
export class Item {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    reference: string;

    @ManyToOne(type => Template, template => template.items, { eager: true })
    template: Template;

    @OneToMany(type => FieldValue, fieldValue => fieldValue.item, { eager: true })
    @JoinTable()
    fieldValues: FieldValue[];
}
