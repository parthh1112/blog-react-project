/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { PostCard, Container } from '../components'
import appwriteService from "../appwrite/config"
function AllPost() {
    const [posts, setPosts] = useState([])
    // useEffect(() => { }, ())
    appwriteService.getPost([]).then((post) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                        posts.map((post) => {
                            <PostCard key={post.$id} post={post} />
                        })
                    }
                </div>
            </Container>
        </div>
    )
}

export default AllPost