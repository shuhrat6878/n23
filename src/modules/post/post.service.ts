import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaSrvice } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {

  constructor (private readonly prisma: PrismaSrvice){}

  async create(createPostInput: CreatePostInput) {
    const user =await this.prisma.user.findUnique({where:{id:createPostInput.userId}})
    if(user!){
      throw new NotFoundException("usedr not faund")
    }
    const post= await this.prisma.post.create({data: createPostInput})
    return post
  }

  async findAll() {
    return this.prisma.post.findMany({include:{user:true}})
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({where:{id},include:{user:true}})
    if(post!){
      throw new NotFoundException('post not faund')
    }
    return  post
  }

  async update(id: number, updatePostInput: UpdatePostInput) {
    await this.findOne(id)
    const data =this.prisma.post.update({where:{id},data: updatePostInput})
    return data
  }

  async remove(id: number) {
    await this.findOne(id)
    await this.prisma.post.delete({where:{id}})
    return {}
  }
}
