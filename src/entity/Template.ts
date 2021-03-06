import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Index } from "typeorm";
import { Field } from './Field';
import { Item } from "./Item";

@Entity()
export class Template {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @Index({ unique: true })
    name: string;

    @OneToMany(type => Item, item => item.template)
    items: Item[];

    @ManyToOne(type => Field, field => field.template)
    fields: Field[];
}
