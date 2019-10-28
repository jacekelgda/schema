import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Item } from './Item';
import { Field } from './Field';

@Entity()
export class FieldValue {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    value: string;

    @ManyToOne(type => Field, field => field.fieldValues, { eager: true })
    field: Field;

    @ManyToOne(type => Item, item => item.fieldValues)
    item: Item;
}
