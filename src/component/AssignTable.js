import React from "react";
import { Table, Badge, Button } from "react-bootstrap";
const AssignTable = ({ header, data, openEditForm }) => {
  console.log('ScheduleTable이 받은 data', data)

  const renderSubmitColumn = (submitValue) => {
    if (submitValue === '제출하기') {
      return <Button variant="primary">제출하기</Button>;
    } else if (submitValue === '마감') {
      return <Badge bg="danger">마감</Badge>;
    } else {
      return submitValue;
    }
  };
  const renderAssignTypeColumn = (assignTypeValue) => {
    if (assignTypeValue === '잘함') {
      return <Badge bg="danger" >잘함</Badge>;
    } else if (assignTypeValue === '패스') {
      return <Badge bg="success">패스</Badge>
    } else if(assignTypeValue ==='재제출'){
      return <Badge bg='primary'>재제출</Badge>
    }  else {
      return assignTypeValue;
    }
  };

  return (
    <div className="overflow-x">
      <Table striped bordered hover>
        <thead>
          <tr>
            {header.map((title,i) => (
              <th key={i}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} onClick={() => openEditForm(item)}>
                <th>{item.dueDate}</th>
                <th>{item.lecture}</th>
                <th>{renderAssignTypeColumn(item.assignType)}</th>
                <th>{item.status}</th>
                <th>{renderSubmitColumn(item.submit)}</th>
                <th>{item.feedback}</th>
			  </tr>	
				))
          ) : (
			<tr>
				<td colSpan={header.length} style={{ textAlign: "center" }}>No Data to show</td>
			</tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
export default AssignTable;
