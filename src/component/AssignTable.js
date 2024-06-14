import React, {useState, useEffect} from "react";
import { Table, Badge, Button } from "react-bootstrap";
import ReportDialog from "./ReportDialog";
const AssignTable = ({ header, data, openEditForm }) => {
  const [showReport, setShowReport] = useState(false)

  const today = new Date().toISOString().split('T')[0];  // 2024-06-12 형태로
  console.log('today :', today)

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
  const handleShowReport=()=>{
    setShowReport(true)
  }
  const handleCloseReport =()=>{
    setShowReport(false)
  }

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
            data.map((item, index) => {
              const isDueToday = item.dueDate === today;
              const rowClassName = isDueToday ? 'bg-yellow' : '';
              return (
                <tr
                  key={index}
                  onClick={() => openEditForm(item)}
                  className={rowClassName}
                >
                  <th className={rowClassName}>{item.dueDate}</th>
                  <th className={rowClassName}>{item.lecture}</th>
                  <th className={rowClassName}>{renderAssignTypeColumn(item.assignType)}</th>
                  <th className={rowClassName}>{item.status}</th>
                  <th className={rowClassName}
                    onClick={handleShowReport}
                  >{renderSubmitColumn(item.submit)}</th>
                  <th className={rowClassName}>{item.feedback}</th>
                  {showReport && <ReportDialog
                    assign={item} 
                    open={showReport} handleClose={handleCloseReport}/>}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={header.length}>No data available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
export default AssignTable;
