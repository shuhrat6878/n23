import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/modules/post/entities/post.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  email: string;

  @Field()
  password: string;

  @Field(() => [Post])
  posts: Post[];
}
