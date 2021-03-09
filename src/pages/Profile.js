import React, {useEffect, useState} from 'react'
import {Container, Button} from "semantic-ui-react" 
import {useParams} from "react-router-dom" 
import ProfileHeader from "../components/profile/ProfileHeader"
import { useAuth } from '../context/auth/AuthContext'
import {useFeed} from "../context/feed/FeedContext"
import ProfilePosts from '../components/profile/ProfilePosts'
export default function Profile() {
    const [skip, setSkip] = useState(9)
    const params = useParams()
    const {state: {currentUser}} = useAuth()
    const {setUserProfile,loadMoreProfilePosts, resetProfile, state: {selectedUserInfo, selectedUserPosts, postCount}} = useFeed()
    useEffect(() => {
        document.title = params.userId === currentUser._id ? "You" : "Profile"
        setUserProfile(params.userId)

        return () => resetProfile()
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.userId])
    const loadMore = e => {
        loadMoreProfilePosts(skip)
        setSkip(s => s + 9)
    }
    return (
        <Container className="mt-50">
            {selectedUserInfo && <ProfileHeader user={selectedUserInfo} postCount={postCount}/>}
            <ProfilePosts posts={selectedUserPosts} userId={selectedUserInfo?._id}/>
            {selectedUserInfo && currentUser.following.includes(selectedUserInfo?._id) && <Button content="Load more images" onClick={() => loadMore()}/>}
        </Container>
    )
}
