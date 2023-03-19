import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ChatBubble } from 'components/ChatBubble/ChatBubble';
import { AutogrowField } from 'components/AutogrowField';

import { testText } from 'testtext';

function App() {
  let [bubbles, setBubbles] = useState(testText);

  const addChatBubble = (text) => {
    setBubbles([...bubbles, {
      text,
      id: testText.length + 1,
      isFromUser: true
    }]);
  }

  return (
    <div className="App new-gradient">
      <Container fluid className='h-100'>
        <Row className='h-100'>
          <Col sm={2} className="justify-content-start">
            <button className='z-btn-1'>Content</button>
          </Col>
          <Col className='text-center w-100 py-3 px-5'>
            <div className='chat-bubbles-container'>
              <div className='chat-bubbles px-3'>
                {
                  bubbles.map(bubble => (
                    <ChatBubble message={bubble} />
                  ))
                }
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <AutogrowField maxHeight={350} handleEnter={addChatBubble} />
    </div>
  );
}

export default App;
