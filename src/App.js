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
import { sendChats } from 'services/chat.service';

function App() {
  const bubbleContainerRef = useRef(null);

  let [bubbles, setBubbles] = useState([]);
  let [mode, setMode] = useState('default');

  const handleEnter = async (text) => {
    const oldBubbles = bubbles;

    setBubbles((prevBubbles) => {
      let newBubbles = [
        ...prevBubbles, 
        {
          content: text,
          id: testText.length + 1,
          role: 'user'
        }
      ];

      return newBubbles;
    });

    oldBubbles.push({
      content: text,
      id: testText.length + 1,
      role: 'user'
    });

    const oldBubbleData = oldBubbles.map(chatBubble => {
      return {
        content: chatBubble.content,
        role: chatBubble.role
      }
    });

    const newMsg = await sendChats(oldBubbleData, mode);
    setBubbles((prevBubbles) => [...prevBubbles, 
      {
        content: newMsg.content,
        id: testText.length + 1,
        role: 'assistant'
      }
    ]);
  }

  useEffect(() => {
    const bubbleContainer = bubbleContainerRef.current;
    bubbleContainer.scrollTop = bubbleContainer.scrollHeight;
  }, [bubbles])

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
