import { Avatar, Button, Flex, Textarea, VStack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, addPost } from '../../actions/userAction';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../../firebase';

function CommentForm({uid}) {
  const dispatch = useDispatch();

  const [content, setContent] = useState('');
  const comment = useSelector((state) => state.CommentReducer.addCommentResult);
  const auth = getAuth(app)
  const [user, setUser] = useState('')
  const createdAt = Date.now()
 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment({ comment: content, uid:uid, createdAt, user:user}));
  };

  useEffect(() => {
    if (comment) {
      setContent('');
    }
  }, [comment]);

  return (
    <VStack w="full" mt={3}  borderBottomWidth="1px" borderColor="gray.200" spacing={4}>
      <Flex
        as="form"
        onSubmit={(e) => handleSubmit(e)}
        align="end"
        w="full"
        bg="white"
        p={4}
        borderRadius="lg"
        boxShadow="sm"
        
      >
        <Avatar name={`${user.displayName}`} src={`${user.photoURL}`} size="md"  />
        <Textarea
          placeholder="Post your reply"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          resize="none"
          border="none"
          _focus={{ boxShadow: 'none' }}
          ml={4}
          required
          rows={2}
          flex="1"
        />
        <Button
          type="submit"
          borderRadius={'40px'}
          colorScheme='teal'
          alignSelf={'end'}
        >
          Reply
        </Button>
      </Flex>
    </VStack>
  );
}

export default CommentForm;
