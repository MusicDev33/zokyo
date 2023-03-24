import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ChatBubble } from 'components/ChatBubble/ChatBubble';
import { AutogrowField } from 'components/AutogrowField';

import { testText } from 'testtext';
import { sendChat } from 'services/chat.service';

function App() {
  let [bubbles, setBubbles] = useState([]);

  const handleEnter = async (text) => {
    setBubbles((prevBubbles) => [...prevBubbles, 
      {
        text,
        id: testText.length + 1,
        isFromUser: true
      }
    ]);

    const newMsg = await sendChat(text);
    setBubbles((prevBubbles) => [...prevBubbles, 
      {
        text: newMsg.content,
        id: testText.length + 1,
        isFromUser: false
      }
    ]);
  }

  return (
    <div className="App bg">
      <Container fluid className='h-100'>
        <Row className='h-100'>
          <Col sm={2} className="justify-content-start">
            <button className='z-btn-1'>Content</button>
          </Col>
          <Col className='text-center w-100 ps-5 pe-0 this-column'>
            <section className='double-container'>
              <div className='chat-bubbles-container'>
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
