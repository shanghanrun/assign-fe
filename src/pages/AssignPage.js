import {Badge, Button, Container} from 'react-bootstrap'
import AssignTable from '../component/AssignTable';
import { useState, useEffect } from 'react';
import assignStore from '../store/assignStore'
import AssignDialog from '../component/AssignDialog';
import userStore from '../store/userStore'
import AssignCreateDialog from '../component/AssignCreateDialog';
import cc from './../utils/cc';


const AssignPage=()=>{
	const {user} = userStore()
	const {assignList, getAssignList, setSelectedAssign,selectedAssign} = assignStore()
	console.log('AssignPage assignList :', assignList)
	const [open, setOpen] = useState(false)
	const [assignOpen, setAssignOpen] =useState(false)
	const tableHeader=[
		'마감 날짜',
		'강의',
		'과제 제출',
		'제출 상태',
		'제출하기',
		'피드백'
	]

	useEffect(()=>{
		getAssignList()
	},[])
	useEffect(()=>{
		console.log('assignOpen상태:', assignOpen)
	},[assignOpen])

	const openAssignCreateForm=()=>{
		setAssignOpen(true)
		cc(assignOpen,'assignOpen 을 스위치한다')
	}
	const handleAssignClose =()=>{
		setAssignOpen(false)
	}

	const openEditForm = (assign) => {
		setOpen(true);
		setSelectedAssign(assign)
	};

	const handleClose = () => {
		setOpen(false);
	};
	return(
		<div>
			<Container>
				<Button variant="success" onClick={()=>openAssignCreateForm()}>Assign 생성</Button>

				{assignOpen && <AssignCreateDialog open={assignOpen} handleClose={handleAssignClose} />}
				
				<h5>상태: <Badge>active</Badge></h5>
				
				<div>
					<h5>1주차</h5>
					
					<AssignTable
						header={tableHeader}
						data={assignList}
						openEditForm={openEditForm}
					/>
				</div>
				
			</Container>
			{open && <AssignDialog open={open} handleClose={handleClose} />}
		</div>
	)
}

export default AssignPage;