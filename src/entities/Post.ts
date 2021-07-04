import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Post {
    @Field(() => Int)
    @PrimaryKey()
    id!: number;

    // standard fields
    @Field(() => String)
    @Property({ type: 'date' })
    createdAt = new Date();

    // special hook `onUpdate` that makes sure update happens
    @Field(() => String)
    @Property({ type: 'date', onUpdate: () => new Date() })
    updatedAt = new Date();

    @Field(() => String) // you can remove the Field decorator and choose to not expose this property 
    @Property({ type: 'text' })
    title!: string;
}