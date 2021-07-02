import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Post {
    @PrimaryKey()
    id!: number;

    // standard fields
    @Property({ type: 'date' })
    createdAt = new Date();

    // special hook `onUpdate` that makes sure update happens
    @Property({ type: 'date', onUpdate: () => new Date() })
    updatedAt = new Date();

    @Property({ type: 'text' })
    title!: string;
}