import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => Int)
  userId: number;
  @Field()
  title: string;
}
