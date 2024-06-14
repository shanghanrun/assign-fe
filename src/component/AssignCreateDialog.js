import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Col, Table } from "react-bootstrap";
import assignStore from '../store/assignStore'
import userStore from '../store/userStore'

const AssignCreateDialog = ({ open, handleClose }) => {
  const {user} = userStore()

  const WEEK=[
    1,2,3,4,5
  ]
  const SUBMIT=[
    '과제 없음',
    '제출하기',
    '마감'
  ]
	const ASSIGN_STATUS=[
		'미제출',
		'패스',
		'잘함',
		'fail',
    '재제출'
	]
  const {createAssign} = assignStore()
  const [status, setStatus] = useState('미제출');
  const [feedback, setFeedback]=useState('')
  const [week, setWeek] =useState(1)
  const [dueDate, setDueDate]=useState('')
  const [lecture, setLecture]=useState('')
  const [assignType, setAssignType]=useState('')
  const [submit, setSubmit] = useState('과제 없음')

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleWeekChange = (event) =>{ 
    setWeek(event.target.value)
  };
  const handleDueDateChange = (event) =>{ 
    setDueDate(event.target.value)
  };
  const handleLectureChange = (event) =>{ 
    setLecture(event.target.value)
  };
  const handleAssignTypeChange = (event) =>{ 
    setAssignType(event.target.value)
  };
  const handleSubmitChange = (event) =>{ 
    setSubmit(event.target.value)
  };
  const handleFeedbackChange = (event) =>{ 
    setFeedback(event.target.value)
  };
  const submitForm = (e) => {
    e.preventDefault(); // 이걸 해야 된다!!
    
    createAssign(week,dueDate.trim(),lecture.trim(),assignType.trim(),status,submit,feedback.trim());
    handleClose();
  };

  // if (!selectedAssign) {
  //   return <></>;
  // }
  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Assign</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <div className="overflow-x">
          <Table>
            <thead>
              <tr>
                <th>week</th>
                <th>마감 날짜</th>
                <th>강의</th>
                <th>과제 제출</th>
                <th>제출 상태</th>
                <th>제출하기</th>
                <th>피드백</th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
          </Table>
        </div>
        <Form onSubmit={submitForm}>

          <Form.Group as={Col} controlId="week">
            <Form.Label>Week</Form.Label>
            <Form.Select value={week} onChange={handleWeekChange}>
              {WEEK.map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="dueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              onChange={handleDueDateChange}
              type="string"
              placeholder="2024-03-12  형식"
              required
              value={dueDate}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="lecture">
            <Form.Label>Lecture</Form.Label>
            <Form.Control
              onChange={handleLectureChange}
              type="string"
              placeholder="Lecture"
              required
              value={lecture}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="assignType">
            <Form.Label>AssignType</Form.Label>
            <Form.Control
              onChange={handleAssignTypeChange}
              type="string"
              placeholder="Assign Type"
              required
              value={assignType}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select value={status} onChange={handleStatusChange}>
              {ASSIGN_STATUS.map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="submit">
            <Form.Label>Submit</Form.Label>
            <Form.Select value={submit} onChange={handleSubmitChange}>
              {SUBMIT.map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
			
		      <Form.Group as={Col} controlId="feedback">
            <Form.Label>Feedback</Form.Label>
            <Form.Control
              onChange={handleFeedbackChange}
              type="string"
              placeholder="feedback"
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

export default AssignCreateDialog;
