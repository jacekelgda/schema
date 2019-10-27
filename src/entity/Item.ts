import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Item {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    skuNumber: string;

    @Column()
    variantNumber: string;

    @Column()
    styleNumber: string;

    @Column()
    name: string;

    @Column()
    marketingName: string;

    @Column()
    chain: string;
}
