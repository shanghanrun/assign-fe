import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Col, Table, Badge } from "react-bootstrap";
import assignStore from '../store/assignStore'

const AssignDialog = ({ open, handleClose }) => {
	const ASSIGN_STATUS=[
		'미제출',
		'패스',
		'잘함',
		'fail'
	]
  const {selectedAssign, updateAssign} = assignStore()
  console.log('selectedAssign :', selectedAssign)
  const [status, setStatus] = useState(selectedAssign.status);
  const [feedback, setFeedback]=useState(selectedAssign.feedback)

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleFeedbackChange = (event) =>{ 
    setFeedback(event.target.value)
  };
  const submitForm = (e) => {
    e.preventDefault(); // 이걸 해야 된다!!
    
    updateAssign(selectedAssign._id, status, feedback);
    handleClose();
  };

  const renderSubmitColumn = (submitValue) => {
    if (submitValue === '제출하기') {
      return <Button variant="primary">제출하기</Button>;
    } else if (submitValue === '마감') {
      return <Badge bg="danger">마감</Badge>;
    } else {
      return submitValue;
    }
  };

  if (!selectedAssign) {
    return <></>;
  }
  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>강의: {selectedAssign.lecture}</p>
        
        <div className="overflow-x">
          <Table>
            <thead>
              <tr>
                <th>마감 날짜</th>
                <th>강의</th>
                <th>과제 제출</th>
                <th>제출 상태</th>
                <th>제출하기</th>
                <th>피드백</th>
              </tr>
            </thead>
            <tbody>
              {selectedAssign?.items?.length > 0 &&
                selectedAssign?.items?.map((item,i) => (
                  <tr key={i}>
                    <td>{item.dueDate}</td>
                    <td>{item.lecture}</td>
                    <td>{item.assignType}</td>
                    <td>{item.status}</td>
                    <td>{renderSubmitColumn(item.submit)}</td>
                    <td>{item.feedback}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        <Form onSubmit={submitForm}>
          <Form.Group as={Col} controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select value={status} onChange={handleStatusChange}>
              {ASSIGN_STATUS.map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
            </Form.Select>

			<Form.Label>Name</Form.Label>
          </Form.Group>
		  <Form.Group as={Col} controlId="feedback">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={handleFeedbackChange}
              type="string"
              placeholder="feedback"
              required
              value={feedback}
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
            <Button type="submit">저장</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AssignDialog;
