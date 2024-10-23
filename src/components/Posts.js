import React from 'react'
import PostItem from './PostItem'
import { useDispatch, useSelector } from 'react-redux' 
import { getPosts } from '../features/post/postSlice'

const Posts = () => {
    const dispath = useDispatch()
    const posts = useSelector((state) => state.post.posts )
    return (
        <div>
            <button
                type='submit'
                onClick={() => dispath(getPosts())}
                className='bg-lime-300  hover:bg-lime-400 transition-all p-2 text-sm'
            >
                Get posts
            </button>
            {posts?.map((post)=>( 
                <PostItem key={post.title}  post={post}/>
                                ) 
                        )
            }
            
        </div>
    )
}

export default Posts
