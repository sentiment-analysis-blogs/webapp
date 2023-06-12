import React, { useState, useEffect, useContext } from 'react';

import { styled, Box, TextareaAutosize, Button, InputBase, FormControl  } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
// import { analyze_sentiment } from "../../service/senti-api";
import pic from "../../assets/createe.png"

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date(),
    sentiment : ''
}

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);

    const url = post.picture ? post.picture : 'https://media.licdn.com/dms/image/C4E12AQH34GePG5K-wA/article-cover_image-shrink_600_2000/0/1611776502606?e=2147483647&v=beta&t=J_ZazZWkIAMz3LXar2N5hqPoIfr1WV9wH7P8A1A2M-c';
    
    useEffect(() => {
        const getImage = async () => { 
            if(file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                
                const response = await API.uploadFile(data);
                post.picture = response.data;
            }
        }
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
       
    }, [file])



    // const API_URL = 'http://localhost:5000';


    // const analyze_sentiment = async(text) => {
    //     try{
    //         await fetch(`${API_URL}/api/analyze/${text}`,{
    //             method:'GET',
    //             mode: 'cors',
    //             headers: {
    //             'Access-Control-Allow-Origin':'*'
    //             }
    //         })
    //         .then((response)=> response.json())
    //         .then((data)=>{
    //             console.log(data);
    //             return data;
    //         })
    //     }catch(err){
    //         console.log("error",err);
    //     }
    //   }


    const savePost = async () => {
        //yahan daalna hai
       
        
      var SENT;
        const API_URL = 'http://localhost:5000';
        var tt = post.description;

        const analyze_sentiment = async(text) => {
            try{
               const response = await fetch(`${API_URL}/api/analyze/${text}`,{
                    method:'GET',
                    mode: 'cors',
                    headers: {
                    'Access-Control-Allow-Origin':'*'
                    }
                })
                const data = await response.json();
                const sentiment = data["Sentiment"];
                return sentiment;
            }catch(err){
                console.log("error",err);
            }
        }
    
        var sen = await analyze_sentiment(tt);
        
        post.sentiment=sen;    //yahan daalna 
        // console.log(response);
        

        await API.createPost(post);
        navigate('/');
    }

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    return (
        <Container>
            <Image src={url} alt="post" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField onChange={(e) => handleChange(e)} name='title' placeholder="Title" />
                <Button onClick={() => savePost()} variant="contained" color="primary">Publish</Button>
            </StyledFormControl>

            <Textarea
                rowsMin={5}
                placeholder="Tell your story..."
                name='description'
                onChange={(e) => handleChange(e)} 
            />
        </Container>
    )
}

export default CreatePost;