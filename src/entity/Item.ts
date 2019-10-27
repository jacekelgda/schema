import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity()
@Unique("UQ_NAMES", ["skuNumber", "variantNumber", "styleNumber"])
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
