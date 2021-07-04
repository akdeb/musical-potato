import { Post } from '../entities/Post';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { MyContext } from './types';

@Resolver()
export class PostResolver {
    // return all posts
    @Query(() => [Post])
    async fetchAllPosts(
        @Ctx() { em }: MyContext,
    ): Promise<Post[]> {
        return em.find(Post, {});
    }

    // return post by ID
    @Query(() => Post, { nullable: true })
    async fetchPost(
        @Arg("id") id: number,
        @Ctx() { em }: MyContext,
    ): Promise<Post | null> {
        return em.findOne(Post, { id });
    }

    // create a post
    @Mutation(() => Post)
    async createPost(
        @Arg("title") title: string,
        @Ctx() { em }: MyContext,
    ): Promise<Post> {
        const post = em.create(Post, {title});
        await em.persistAndFlush(post);
        return post;
    }

      // update a post
      @Mutation(() => Post)
      async updatePost(
          @Arg("id") id: number,
          @Arg("title") title: string,
          @Ctx() { em }: MyContext,
      ): Promise<Post | null> {
        await em.nativeUpdate(Post, {id}, {title});
        return em.findOne(Post, {id});
      }

        // delete a post
        @Mutation(() => Boolean)
        async deletePost(
            @Arg("id") id: number,
            @Ctx() { em }: MyContext,
        ): Promise<boolean> {
            await em.nativeDelete(Post, {id});
            return true;
        }
}
