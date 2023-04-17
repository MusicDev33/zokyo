import 'scss/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useRef, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { AuthBox } from 'components/AuthBox/AuthBox';
import { ChatBubble } from 'components/ChatBubble/ChatBubble';
import { AutogrowField } from 'components/AutogrowField/AutogrowField';
import { ModeSelect } from 'components/ModeSelect/ModeSelect';

import { getChatsByConvId, sendChat } from 'services/chat.service';
import { getConvs } from 'services/conversation.service';
import { createAccount, logIn } from 'services/auth.service';

function App() {
  const bubbleContainerRef = useRef(null);

  let [convs, setConvs] = useState([]);
  let [bubbles, setBubbles] = useState([]);
  let [mode, setMode] = useState('default');
  let [convId, setConvId] = useState('');

  let [user, setUser] = useState(null);

  const handleEnter = async (text) => {
    if (!user) {
      return;
    }

    const newChat = {
      conversationId: convId,
      role: 'user',
      content: text,
      timestamp: Date.now()
    }

    setBubbles((prevBubbles) => {
      let newBubbles = [
        ...prevBubbles,
        newChat
      ];

      return newBubbles;
    });

    const newMsgData = await sendChat(text, mode, convId, user._id);
    setBubbles((prevBubbles) => [...prevBubbles,
      newMsgData.newChat
    ]);

    if (convId === '') {
      setConvId(newMsgData.newConversation._id);
      setConvs((prevConvs) => {
        return [...prevConvs, newMsgData.newConversation];
      });
    }
  }

  useEffect(() => {
    const bubbleContainer = bubbleContainerRef.current;
    bubbleContainer.scrollTop = bubbleContainer.scrollHeight;
  }, [bubbles]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const loadConvs = async (userId) => {
      const convRes = await getConvs(userId);
      setConvs(convRes.data);
      console.log(convRes.data);
    }

    loadConvs(user._id);
  }, [user]);

  const handleSetMode = (newMode) => {
    setMode(newMode);
  }

  const handleConvClick = async (convId) => {
    const newChats = await getChatsByConvId(convId);
    console.log(newChats);

    setBubbles(newChats.data);
    setConvId(convId);
  }

  const handleLogin = async (username, password, signupReady) => {
    if (signupReady) {
      const userData = await createAccount(username, password);
      setUser(userData);
      return;
    }

    const userData = await logIn(username, password);

    if (userData.success) {
      setUser(userData.data);
    }
  }

  return (
    <div className="App bg">
      <Container fluid className='h-100'>
        <Row className='h-100'>
          <Col sm={2} className="justify-content-start">
            <div className='nav-column py-2'>
              <ModeSelect handle={handleSetMode} />

              <div className='conversations mt-2'>
                {
                  convs.map(conv => (
                    <div className={`conv ${conv._id === convId ? 'selected' : ''}`} onClick={() => {
                      handleConvClick(conv._id);
                    }}>
                      {conv.name}
                    </div>
                  ))
                }
              </div>

              <div className='mt-2 w-100'>
                <AuthBox handleLogin={handleLogin} user={user} />
              </div>
            </div>
          </Col>
          <Col className='text-center w-100 ps-5 pe-0 this-column'>
            <section className='double-container'>
              <div className='chat-bubbles-container' ref={bubbleContainerRef}>
                <div className='chat-bubbles px-3'>
                  {
                    bubbles.map(bubble => (
                      <ChatBubble message={bubble} />
                    ))
                  }
                </div>
              </div>

              <div className='flexbox-2'>
                <AutogrowField maxHeight={350} handleEnter={handleEnter} disabled={user ? false : true} />
              </div>
            </section>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
