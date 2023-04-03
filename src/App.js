import 'scss/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useRef, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ChatBubble } from 'components/ChatBubble/ChatBubble';
import { AutogrowField } from 'components/AutogrowField/AutogrowField';
import { ModeSelect } from 'components/ModeSelect/ModeSelect';

import { testText } from 'testtext';
import { sendChats, sendChat } from 'services/chat.service';
import { getConvs } from 'services/conversation.service';

function App() {
  const bubbleContainerRef = useRef(null);

  let [bubbles, setBubbles] = useState([]);
  let [mode, setMode] = useState('default');
  let [convId, setConvId] = useState('');
  let [convs, setConvs] = useState([]);

  const handleEnter = async (text) => {
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

    const newMsg = await sendChat(text, mode, convId);
    setBubbles((prevBubbles) => [...prevBubbles,
      newMsg
    ]);

    if (convId === '') {
      setConvId(newMsg.conversationId)
    }
  }

  useEffect(() => {
    const bubbleContainer = bubbleContainerRef.current;
    bubbleContainer.scrollTop = bubbleContainer.scrollHeight;
  }, [bubbles]);

  useEffect(() => {
    const loadConvs = async (userId) => {
      const convRes = await getConvs(userId);
      setConvs(convRes.convs);
    }

    loadConvs('smccowan');
  }, []);

  const handleSetMode = (newMode) => {
    setMode(newMode);
  }

  return (
    <div className="App bg">
      <Container fluid className='h-100'>
        <Row className='h-100'>
          <Col sm={2} className="justify-content-start">
            <div className='nav-column py-2'>
              <ModeSelect handle={handleSetMode} />
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
                <AutogrowField maxHeight={350} handleEnter={handleEnter} />
              </div>
            </section>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
