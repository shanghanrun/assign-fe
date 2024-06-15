import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Col, Table, Badge } from "react-bootstrap";
import reportStore from '../store/reportStore'
import userStore from '../store/userStore'

const ReportDialog = ({ assign, open, handleClose }) => {
	
  const {createReport} = reportStore()
  const {user} = userStore()
  const [domain, setDomain] = useState('');
  const [frontEnd, setFrontEnd]=useState('')
  const [backEnd, setBackEnd ]=useState('')
  const [comment, setComment]=useState('')

  useEffect(()=>{

  },[])
  const handleDomainChange = (event) => {
    setDomain(event.target.value);
  };
  const handleFrontEndChange = (event) =>{ 
    setFrontEnd(event.target.value)
  };
  const handleBackEndChange = (event) =>{ 
    setBackEnd(event.target.value)
  };
  const handleCommentChange = (event) =>{ 
    setComment(event.target.value)
  };
  const submitForm = (e) => {
    e.preventDefault(); // 이걸 해야 된다!!
    
    createReport(user, assign._id, assign.dueDate, assign.lecture, domain, frontEnd, backEnd, comment);
    handleClose();
  };

  
  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>과제 제출</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <Form onSubmit={submitForm}>
		  <Form.Group as={Col} controlId="domain">
            <Form.Label>Domain</Form.Label>
            <Form.Control
              onChange={handleDomainChange}
              type="string"
              placeholder="도메인 주소 *"
              required
              value={domain}
            />
          </Form.Group>
		  <Form.Group as={Col} controlId="frontend">
            <Form.Label>FrontEnd</Form.Label>
            <Form.Control
              onChange={handleFrontEndChange}
              type="string"
              placeholder="프론트엔드 주소 *"
              required
              value={frontEnd}
            />
          </Form.Group>
		  <Form.Group as={Col} controlId="backend">
            <Form.Label>BackEnd</Form.Label>
            <Form.Control
              onChange={handleBackEndChange}
              type="string"
              placeholder="백엔드 주소 *"
              required
              value={backEnd}
            />
          </Form.Group>
		  <Form.Group as={Col} controlId="comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              onChange={handleCommentChange}
              type="string"
              placeholder="개선사항 및 의견을 남겨주세요"
              value={comment}
            />
          </Form.Group>
          <div className="assign-button-area">
            <Button
              variant="light"
              onClick={handleClose}
              className="assign-button"
            >
              닫기
            </Button>
            <Button type="submit">제출하기</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReportDialog;
