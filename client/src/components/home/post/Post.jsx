
import { styled, Box, Typography } from '@mui/material';
// import  pic from "../../assets/default.png";

const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 350px;
    & > img, & > p {
        padding: 0 5px 5px 5px;
    }
`;

const Image = styled('img')({
    width: '100%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
    height: 150
});

const Text = styled(Typography)`
    color: #878787
    font-size: 12px;
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600
`;

const Details = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
`;

const Component=styled(Box)`

border: 1px solid #d3cede;
margin-top:23px;

`;

const SentText=styled(Typography)`
font-size:12px;

`

const Post = ({ post }) => {
    const url = post.picture ? post.picture : 'https://cdn2.hubspot.net/hub/53/file-23115630-jpg/blog/images/blogging_image.jpg';
    
    const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    } 

    return (
        <Container>
            <Image src={url} alt="post" />
            <Text>{post.categories}</Text>
            <Heading>{addEllipsis(post.title, 20)}</Heading>
            <Text>Author: {post.username}</Text>
            <Details>{addEllipsis(post.description, 100)}</Details>

            <Component>
                <SentText>Sentiment : {post.sentiment}</SentText>
            </Component>
        </Container>
    )
}

export default Post;