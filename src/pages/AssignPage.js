import {Badge, Button, Container} from 'react-bootstrap'
import AssignTable from '../component/AssignTable';
import { useState, useEffect } from 'react';
import assignStore from '../store/assignStore'
import AssignDialog from '../component/AssignDialog';
import userStore from '../store/userStore'
import AssignCreateDialog from '../component/AssignCreateDialog';
import cc from './../utils/cc';
import Navbar from './../component/Navbar';


const AssignPage=()=>{
	const {user} = userStore()
	const {updated, userAssignList, userWeekOne, userWeekTwo, userWeekThree, userWeekFour, getUserAssignList, setSelectedUserAssign,selectedUserAssign} = assignStore()
	console.log('AssignPage userAssignList :', userAssignList)
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

	// useEffect(()=>{
	// 	getUserAssignList(user?._id)
	// },[updated])
	// 이상하게도 여기서 getUserAssignList()하려 하니, user가 빨리 들어오지 않아서 안된다.
	// 그래서 이전 페이지에서 받아온다.
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
		if(user.level === 'customer') return
		setOpen(true);
		setSelectedUserAssign(assign)
	};

	const handleClose = () => {
		setOpen(false);
	};
	return(
		<div>
			<Navbar />
			<Container>
				{(user?.level==='admin') ? <div className="fixed-header">
					<Container>
					<Button variant="success" onClick={openAssignCreateForm}>Assign 생성</Button>
					</Container>
				</div> : <div></div>}

				{assignOpen && <AssignCreateDialog open={assignOpen} handleClose={handleAssignClose} />}
				
				<h5>상태: <Badge>active</Badge></h5>
				
				<div>
					<h5>1주차</h5>
					<AssignTable
						header={tableHeader}
						data={userWeekOne}
						openEditForm={openEditForm}
					/>
					<div style={{height: '10px'}}></div>
				</div>
				<div>
					<h5>2주차</h5>
					<AssignTable
						header={tableHeader}
						data={userWeekTwo}
						openEditForm={openEditForm}
					/>
					<div style={{height: '10px'}}></div>
				</div>
				<div>
					<h5>3주차</h5>
					<AssignTable
						header={tableHeader}
						data={userWeekThree}
						openEditForm={openEditForm}
					/>
					<div style={{height: '10px'}}></div>
				</div>
				<div>
					<h5>4주차</h5>
					<AssignTable
						header={tableHeader}
						data={userWeekFour}
						openEditForm={openEditForm}
					/>
					<div style={{height: '10px'}}></div>
				</div>
				
			</Container>
			{open && <AssignDialog open={open} handleClose={handleClose} />}

		</div>
	)
}

export default AssignPage;